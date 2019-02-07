import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Subscription} from "rxjs";

import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.sass']
})
export class RegisterPageComponent implements OnInit, OnDestroy{

  form: FormGroup;

  aSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ){}

  ngOnInit(){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnDestroy(){
    if(this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit(){
    this.form.disable();
    this.aSub = this.auth.register(this.form.value).subscribe(() => {
      this.router.navigate(['/login'],{
        queryParams: {
          registered: true
        }
      })
    },err => {
      console.warn(err);
      this.form.enable();
    })
  }

}
