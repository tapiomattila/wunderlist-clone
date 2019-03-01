import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/app-models/todo.model';
import { TodoService } from 'src/app/app-services/main-content/todo.service';
import { UtilityService } from 'src/app/app-services/utility/utility.service';
import { Router } from '@angular/router';
import { TodoListShowService } from 'src/app/app-services/main-content/todo-list-show.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit, OnDestroy {

  todos: Todo[];
  todoSubscription: Subscription;
  searchSubscription: Subscription;
  todoForm: FormGroup;

  id: string;
  editMode: boolean = false;
  selectedTodo: Todo;

  constructor(private todoService: TodoService,
    private utilService: UtilityService,
    private router: Router,
    private todoListShowService: TodoListShowService) { }

  ngOnInit() {

    const todos = this.todoService.getTodos();
    this.todos = todos.filter(el => el.deleted === false);
    this.showCategorySelectedTodos();
    this.showTodosBySearchResult();
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

      // created category selected, give this category for the given todo
      if (this.utilService.listCategorySelected) {
        this.todoService.showTodosSubject.subscribe(
          (res: string) => {
            const formValue = this.todoForm.controls.todo.value;
            if (formValue === null || formValue === '') { return; }
            const uniqId = this.utilService.createUUID();
            const createdDate = new Date();
            const editDate = new Date();
            const todo = new Todo(
              uniqId,
              formValue,
              createdDate,
              editDate,
              false,
              res,
              false,
              false
            );

            this.todoService.addTodo(todo);
            this.clearInput();
          }
        );
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

  showCategorySelectedTodos() {
    // Show only todos that have not been deleted (soft delete)
    this.todoSubscription = this.todoService.todosChanged
      .subscribe(
        () => {

          return this.todoService.showTodosSubject
            .subscribe(
              (res: string) => {
                if (res === 'all') { this.todos = this.todoListShowService.showAllTodos(); }
                else if (res === 'starred') { this.todos = this.todoListShowService.showStarredTodos(); }
                else if (res === 'completed') { this.todos = this.todoListShowService.showCompletedTodos(); }
                else if (this.utilService.listCategorySelected) {
                  this.todos = this.todoListShowService.showSelectedCategoryFilterTodos(res);
                }
                else {
                  this.todos = [];
                  console.error('SOMETHING WENT WRONG IN TODOS LIST, empty list');
                }
              },
              (err: Error) => {
                console.log('show error in main content showTodosSubject');
                console.log(err);
                console.log(err.message);
              });
        },
        (err: Error) => {
          console.log('show error in main content todosChanged');
          console.log(err);
          console.log(err.message);
        });
  }

  showTodosBySearchResult() {
    this.searchSubscription = this.utilService.searchChanged
      .subscribe(
        (res: string) => {

          let searchResult = '';
          const searchInputLower = res.toLowerCase();

          if (searchInputLower !== 'inbox' &&
            searchInputLower !== 'starred' &&
            searchInputLower !== 'completed') {
            searchResult = searchInputLower;
          }
          switch (res) {
            case 'inbox':
              this.todos = this.todoListShowService.showAllTodos();
              break;
            case 'starred':
              this.todos = this.todoListShowService.showStarredTodos();
              break;
            case 'completed':
              this.todos = this.todoListShowService.showCompletedTodos();
              break;
            case '':
              this.todos = this.todoListShowService.showAllTodos();
              break;
            case searchResult:
              this.todos = this.todoListShowService.showSearchResultCategories(res);
              break;
            default:
              this.todos = this.todoListShowService.showAllTodos();
              break;
          }
        },
        (err: Error) => {
          console.log('SHOW ERROR search');
          console.log(err);
          console.log(err.message);
        });
  }

  ngOnDestroy() {
    if (this.todoSubscription !== undefined) {
      this.todoSubscription.unsubscribe();
    }

    if (this.searchSubscription !== undefined) {
      this.searchSubscription.unsubscribe();
    }
  }

}
