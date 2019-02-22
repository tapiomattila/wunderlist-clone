import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/app-models/todo.model';
import { TodoService } from 'src/app/app-services/main-content/todo.service';
import { UtilityService } from 'src/app/app-services/utility/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit, OnDestroy {

  todos: Todo[];
  todoSubscription: Subscription;
  todoStarredSubscription: Subscription;
  todoCompletedSubscription: Subscription;
  todoForm: FormGroup;

  @ViewChild('todoInput') todoInput: ElementRef;

  id: string;
  editMode: boolean = false;
  selectedTodo: Todo;

  constructor(private todoService: TodoService,
    private utilService: UtilityService,
    private router: Router) { }

  ngOnInit() {

    // this.todos = this.todoService.getTodos();

    const todos = this.todoService.getTodos();
    this.todos = todos.filter(el => el.deleted === false);

    // Show only todos that have not been deleted (soft delete)
    this.todoSubscription = this.todoService.todosChanged
      .subscribe(
        (todosEl: Todo[]) => {
          // const todoList = todosEl.filter(el => el.deleted === false);
          // this.todos = todoList;
          // console.log('show todos in all');
          // console.log(this.todos);

          return this.todoService.showTodosSubject
            .subscribe(
              (res: string) => {
                console.log('SHOW TODOS SHOW');
                console.log(res);

                if (res === 'all') { this.todos = this.showAllTodos(); }
                else if (res === 'starred') { this.todos = this.showStarredTodos(); }
                else if (res === 'completed') { this.todos = this.showCompletedTodos(); }
                else {
                  this.todos = [];
                  console.error('SOMETHING WENT WRONG IN TODOS LIST');
                  console.log('error handling');
                }
              });
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
    const status = this.todoForm.controls.todo.status;

    if (status !== 'VALID') {
      console.log('status is invalid');
    }
    else {
      const formValue = this.todoForm.controls.todo.value;
      const uniqId = this.utilService.createUUID();
      const createdDate = new Date();
      const editDate = new Date();
      const todo = new Todo(
        uniqId,
        formValue,
        createdDate,
        editDate,
        false,
        '',
        false,
        false);

      this.todoService.addTodo(todo);
      this.clearInput();
    }
  }

  focusInput() {
    console.log('focus');
    // const path = this.route.routeConfig.path;
    // if (path === 'todos') {
    //   this.router.navigate(['new'], { relativeTo: this.route });
    // }
  }

  editTodo(todo) {
    this.selectedTodo = todo;
    this.router.navigate(['todos', todo.id, 'edit']);
  }

  focusOutTodoInput() {
    console.log('focus out in todo input');
    this.router.navigate(['../']);
  }

  showAllTodos() {
    const todos = this.todoService.getTodos();
    const todosAll = todos.filter(el => el.deleted === false);
    return todosAll;
  }

  showStarredTodos() {
    const todos = this.todoService.getTodos();
    const todosFiltered = todos.filter(el => el.deleted === false);
    const starred = todosFiltered.filter(el => el.starred === true);
    return starred;
  }

  showCompletedTodos() {
    const todos = this.todoService.getTodos();
    const todosFiltered = todos.filter(el => el.deleted === false);
    const completed = todosFiltered.filter(el => el.completed === true);
    return completed;
  }

  ngOnDestroy() {
    if (this.todoSubscription !== undefined) {
      this.todoSubscription.unsubscribe();
    }
  }

}
