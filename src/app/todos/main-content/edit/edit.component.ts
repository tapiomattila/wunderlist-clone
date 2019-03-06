import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Todo } from 'src/app/app-models/todo.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from 'src/app/app-services/utility/store.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id: string;
  editTodo: Todo;
  todoSubscription: Subscription;
  todoEditForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store) { }

  ngOnInit() {
    document.querySelector('.modal-edit').classList.toggle('open-edit-modal');
    const el = document.getElementById('app-dark-mask');
    el.classList.add('layer');
    setTimeout(() => {
      document.querySelector('.modal-edit').classList.toggle('open-edit-modal');
    }, 100);

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      });

    this.store.getTodoById(this.id)
      .subscribe(res => {
        this.editTodo = res;
        this.initForm();
      });
  }

  initForm() {
    const todo = this.editTodo;
    this.todoEditForm = new FormGroup({
      editTodo: new FormControl(todo.name, Validators.required)
    });
  }

  closeModalOnCancel() {
    this.closeModal();
    this.routeBack();
  }

  closeModal() {
    document.querySelector('.modal-edit').classList.toggle('open-edit-modal');
    const el = document.getElementById('app-dark-mask');
    el.classList.remove('layer');
  }

  onSubmit() {
    const formValue = this.todoEditForm.controls.editTodo.value;
    const oldTodo = this.editTodo;
    const editDate = new Date();

    const editTodo = new Todo(
      oldTodo.id,
      formValue,
      oldTodo.createdDate,
      editDate,
      false,
      oldTodo.categoryId,
      oldTodo.starred,
      oldTodo.completed
    );

    this.store.editTodo(editTodo)
      .subscribe(res => console.log('res in edit todo: ', res));

    this.clearInput();
    this.closeModal();
    this.routeBack();
  }

  deleteTodo() {
    this.store.softDeleteTodo(this.editTodo).subscribe();

    this.closeModal();
    this.routeBack();
  }

  clearInput() {
    this.todoEditForm.reset();
  }

  routeBack() {
    this.router.navigate(['../']);
  }

}
