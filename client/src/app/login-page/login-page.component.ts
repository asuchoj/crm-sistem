import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit, OnDestroy{

  form: FormGroup;

  aSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.route.queryParams.subscribe((params: Params) => {
      if(params["registered"]){
        MaterialService.toast('Теперь вы можете зайти в систему использую свои данные');
      } else if(params['accessDenied']){
        MaterialService.toast('Для начала авторизуйтесь в системе');
      } else if(params['sessionFailed']){
        MaterialService.toast('Пожалуйста войдите в систему заново');
      }
    })
  }

  ngOnDestroy(){
    if(this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit(){
    this.form.disable();

    this.aSub = this.auth.login(this.form.value).subscribe(() => {
      this.router.navigate(['/overview'])
      },err => {
      MaterialService.toast(err.error.message);
      this.form.enable();
    })
  }
}
