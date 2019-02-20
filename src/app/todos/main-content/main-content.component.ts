import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/app-models/todo.model';
import { TodoService } from 'src/app/app-services/main-content/todo.service';
import { UtilityService } from 'src/app/app-services/utility/utility.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  todos: Todo[];
  todoSubscription: Subscription;
  todoForm: FormGroup;

  id: string;
  editMode: boolean = false;
  selectedTodo: Todo;

  constructor(private todoService: TodoService,
    private utilService: UtilityService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.todos = this.todoService.getTodos();
    this.todoSubscription = this.todoService.todosChanged
      .subscribe(
        (todos: Todo[]) => {
          this.todos = todos;
        });
    this.initForm();
  }

  initForm() {

    this.todoForm = new FormGroup({
      todo: new FormControl('', Validators.required)
    });
  }

  clearInput() {
    this.todoForm.reset();
  }

  onSubmit() {

    console.log('show formvalue after submit');
    console.log(this.todoForm.controls);
    console.log(this.todoForm.controls.todo.status);
    const status = this.todoForm.controls.todo.status;

    if (status !== 'VALID') {
      console.log('status is invalid');
    }
    else {
      const formValue = this.todoForm.controls.todo.value;
      const uniqId = this.utilService.createUUID();
      const createdDate = new Date();
      const editDate = new Date();
      const todo = new Todo(uniqId, formValue, createdDate, editDate, false, false);
      this.todoService.addTodo(todo);
      this.clearInput();
    }
  }

  focusInput() {
    const path = this.route.routeConfig.path;
    if (path === 'todos') {
      this.router.navigate(['new'], { relativeTo: this.route });
    }
  }

  editTodo(todo) {
    this.selectedTodo = todo;
    this.todoService.changeEditTodoState();
    this.router.navigate(['todos', todo.id, 'edit']);
  }

}
