import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/app-models/category.model';
import { UtilityService } from 'src/app/app-services/utility/utility.service';
import { Store } from 'src/app/app-services/utility/store.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  newCategoryForm: FormGroup;
  @ViewChild('newCategoryInput') categoryInput: ElementRef;

  constructor(
    private router: Router,
    private utilityService: UtilityService,
    private store: Store) { }

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

    this.categoryInput.nativeElement.focus();
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

    this.store.createCategory(newCategory)
      .pipe(
        catchError(err => {
          console.log(`Error occurred createCategory: ${err}`);
          return throwError(err);
        }))
      .subscribe(
        () => console.log('new category created'),
        err => console.log('Error creating category', err)
      );

    this.clearInput();
    this.closeModal();
    this.routeBack();
  }

  clearInput() {
    this.newCategoryForm.reset();
  }

  routeBack() {
    this.utilityService.searchUsed = false;
    this.utilityService.showSearchTodoCategory = false;

    this.router.navigate(['../']);
  }

}
