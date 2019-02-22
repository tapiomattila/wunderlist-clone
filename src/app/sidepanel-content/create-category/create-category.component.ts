import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/app-models/category.model';
import { UtilityService } from 'src/app/app-services/utility/utility.service';
import { CategoryService } from 'src/app/app-services/sidepanel/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  newCategoryForm: FormGroup;

  constructor(private router: Router,
    private utilityService: UtilityService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    document.querySelector('.modal-category').classList.toggle('open-category-modal');
    const el = document.getElementById('app-dark-mask');
    el.classList.add('layer');
    setTimeout(() => {
      document.querySelector('.modal-category').classList.toggle('open-category-modal');
    }, 100);

    this.initForm();
  }

  initForm() {

    this.newCategoryForm = new FormGroup({
      categoryName: new FormControl('', Validators.required)
    });
  }

  closeModalOnCancel() {
    this.closeModal();
    this.routeBack();
  }

  closeModal() {
    document.querySelector('.modal-category').classList.toggle('open-category-modal');
    const el = document.getElementById('app-dark-mask');
    el.classList.remove('layer');
  }

  onSubmit() {

    const formValue = this.newCategoryForm.controls.categoryName.value;

    const uniqid = this.utilityService.createUUID();
    const createDate = new Date();
    const newCategory = new Category(
      uniqid,
      formValue,
      createDate
    );

    this.categoryService.addCategory(newCategory);

    this.clearInput();
    this.closeModal();
    this.routeBack();
  }

  deleteTodo() {
    this.closeModal();
    this.routeBack();
  }

  clearInput() {
    this.newCategoryForm.reset();
  }

  routeBack() {
    this.router.navigate(['../']);
  }

}
