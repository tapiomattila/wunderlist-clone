import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Todo } from 'src/app/app-models/todo.model';
import { TodoService } from 'src/app/app-services/main-content/todo.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/app-services/utility/utility.service';
import { CategoryService } from 'src/app/app-services/sidepanel/category.service';

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
              private todoService: TodoService,
              private utilService: UtilityService,
              private categoryService: CategoryService) { }

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

    const todos = this.todoService.getTodos();
    this.editTodo = todos.find(res => res.id === this.id);
    this.initForm();
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

    this.todoService.updateTodo(oldTodo.id, editTodo);

    this.clearInput();
    this.closeModal();
    this.routeBack();
  }

  deleteTodo() {
    this.todoService.softDeleteTodo(this.editTodo);

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
