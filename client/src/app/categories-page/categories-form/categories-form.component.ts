import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {MaterialService} from "../../shared/classes/material.service";
import {Category} from "../../shared/interfaces/interfaces";

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef;

  isNew = true;

  form: FormGroup;

  image: File;

  imagePreview: any;

  category: Category;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private categoriesService: CategoriesService
  ){}

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]]
    });

    this.form.disable();

    this.route.params.pipe(
      switchMap((params: Params) => {
        if(params['id']) {
          this.isNew = false;
          return this.categoriesService.getById(params['id'])
        }

        return of(null)
      })
    ).subscribe((category: Category) => {
      if(category) {
        this.form.patchValue({name: category.name});
        this.imagePreview = category.imageSrc;
        this.category = category;

        MaterialService.updateTextInputs();
      }

      this.form.enable();
    }, err => MaterialService.toast(err.error.message))
  }

  onSubmit(){
    this.form.disable();

    if(this.isNew){
      this.categoriesService.create(this.form.value.name, this.image).subscribe(category => {
        console.log(1);
        this.category = category;
        MaterialService.toast('Изменения сохранены');
        this.form.enable();
      }, err => {
        console.log(2);
        MaterialService.toast(err.error.message);
        this.form.enable();
      })
    } else {
      this.categoriesService.update(this.category._id, this.form.value.name, this.image).subscribe(category => {
        console.log(1);
        this.category = category;
        MaterialService.toast('Изменения сохранены');
        this.form.enable();
      }, err => {
        console.log(2);
        MaterialService.toast(err.error.message);
        this.form.enable();
      })
    }
  }

  triggerClick(){
    this.inputRef.nativeElement.click();
    this.form.enable();
  }

  onFileUpload(event: any){
    const file = event.target.files[0];

    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result
    };

    reader.readAsDataURL(file)

  }
}
