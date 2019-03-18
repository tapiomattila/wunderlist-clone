import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Todo } from 'src/app/app-models/todo.model';
import { UtilityService } from 'src/app/app-services/utility/utility.service';
import { Router } from '@angular/router';
import { Store } from 'src/app/app-services/utility/store.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit, OnDestroy {

  todos$: Observable<Todo[]>;
  todoForm: FormGroup;
  searchSubscription: Subscription;

  id: string;
  editMode: boolean = false;
  selectedTodo: Todo;

  private customCategorySelected: boolean = false;

  constructor(
    private utilService: UtilityService,
    private router: Router,
    private store: Store) { }

  ngOnInit() {
    this.utilService.setSidePanelObjects();
    if (window.innerWidth < 515) {
      document.querySelector('.menu-btn').classList.add('opaque-hamburger');
      this.utilService.addSidePanelClose();
      this.utilService.removeSidePanelInfoOnSmallScreen();
    }

    this.todos$ = this.store.showInbox();

    this.store.selCategory$.subscribe(res => {
      console.log('show res in sel category: ', res);
      if (res === 'all') {
        console.log('ALL');
        this.customCategorySelected = false;
        this.utilService.showSearchTodoCategory = false;
        this.todos$ = this.store.showInbox();
      }
      else if (res === 'starred') {
        console.log('STARRED');
        this.customCategorySelected = false;
        this.utilService.showSearchTodoCategory = false;
        this.todos$ = this.store.showStarred();
      }
      else if (res === 'completed') {
        console.log('COMPLETED');
        this.customCategorySelected = false;
        this.utilService.showSearchTodoCategory = false;
        this.todos$ = this.store.showCompleted();
      }
      else {
        console.log('res custom: ', res);
        this.customCategorySelected = true;
        this.utilService.showSearchTodoCategory = false;
        this.todos$ = this.store.showCustomCategoryContent(res);
      }
    });

    this.searchSubscription = this.utilService.search$.subscribe(res => {
      if (this.utilService.searchUsed) {
        console.log('search res', res);
        this.utilService.searchUsed = false;
        this.todos$ = this.store.showSearchTermTodos(res);
      }

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

      // if custom category is NOT selected
      if (!this.customCategorySelected) {

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

        this.store.addTodo(todo)
          .subscribe(
            () => console.log('new todo added'),
            err => console.log('Error adding todo', err)
          );

        this.clearInput();
      }
      else {

        let categoryId = '';
        this.store.selCategory$.subscribe(res => categoryId = res);

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
          categoryId,
          false,
          false
        );

        this.store.addTodo(todo)
          .subscribe(
            (res2) => console.log('new todo added', res2),
            err => console.log('Error adding todo', err)
          );

        this.todos$ = this.store.showCustomCategoryContent(categoryId);

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
    this.customCategorySelected = false;
    this.router.navigate(['../']);
  }

  resizeFunc(event) {
    const e = event.target.innerWidth;
    console.log('listened resize event:', e);
    if (e <= 515) {
      document.querySelector('.menu-btn').classList.add('opaque-hamburger');
      this.utilService.addSidePanelClose();
      this.utilService.removeSidePanelInfoOnSmallScreen();
    }
    else {
      document.querySelector('.menu-btn').classList.remove('opaque-hamburger');
      this.utilService.setSidePanelObjects();
      this.utilService.removeSidePanelClose();
      this.utilService.addSidePanelInfoOnLargerScreen();
    }
  }

  ngOnDestroy() {
    if (this.searchSubscription !== undefined) {
      this.searchSubscription.unsubscribe();
    }
  }

}
