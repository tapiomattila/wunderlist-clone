import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { Todo } from 'src/app/app-models/todo.model';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Category } from 'src/app/app-models/category.model';
import { UtilityService } from './utility.service';

@Injectable({
    providedIn: 'root'
})
export class Store {

    // todos store CRUD
    private todosUrl = 'api/todos';  // URL to web memory data api
    private todosSubj = new BehaviorSubject([]);
    todos$: Observable<Todo[]> = this.todosSubj.asObservable();

    // category selection
    private selectedCategory = new BehaviorSubject('all');
    selCategory$: Observable<string> = this.selectedCategory.asObservable();

    // categories store
    private categoryUrl = 'api/categories';
    private categoriesSubj = new BehaviorSubject([]);
    categories$: Observable<Category[]> = this.categoriesSubj.asObservable();

    constructor(
        private http: HttpClient,
        private utilityService: UtilityService) { }

    init() {

        // initialize todos
        const todosHttp$: Observable<Todo[]> = this.http.get<Todo[]>(this.todosUrl);
        todosHttp$
            .pipe(
                catchError(err => {
                    console.log(`Error occurred in store [todosHttp$]: ${err}`);
                    return throwError(err);
                }),
                tap(() => console.log('HTTP request executed for todos')),
                tap(res => console.log('Show http$ response', res))
            )
            .subscribe(
                (todos: Todo[]) => this.todosSubj.next(todos)
            );

        // initialize categories
        const categoriesHttp$: Observable<Category[]> = this.http.get<Category[]>(this.categoryUrl);
        categoriesHttp$
            .pipe(
                catchError(err => {
                    console.log(`Error occurred in store [categoriesHttp$]: ${err}`);
                    return throwError(err);
                }),
                tap(() => console.log('HTTP request for categories'))
            )
            .subscribe(
                (categories: Category[]) => this.categoriesSubj.next(categories)
            );

        this.selectedCategory.next('all');
    }

    showInbox() {
        return this.filterByNotDeleted()
            .pipe(
                catchError(err => {
                    console.log(`Error occurred in store [showInbox()]: ${err}`);
                    return throwError(err);
                })
            );
    }

    filterByNotDeleted() {
        return this.todos$.pipe(
            map((todos: Todo[]) => todos.filter(todo => todo.deleted === false)),
            catchError(err => {
                console.log(`Error occurred in store [filterByNotDeleted()]: ${err}`);
                return throwError(err);
            })
        );
    }

    addTodo(todo: Todo): Observable<Todo[]> {
        const todos = this.todosSubj.getValue();
        todos.push(todo);
        this.todosSubj.next(todos);

        // POST request to backend

        return of(todos)
            .pipe(
                catchError(err => {
                    console.log(`Error occurred in store [addTodo()]: ${err}`);
                    return throwError(err);
                })
            );
    }

    getTodoById(id: string): Observable<Todo> {
        const todos = this.todosSubj.getValue();

        return of(todos.find(todoEl => todoEl.id === id))
            .pipe(
                catchError(err => {
                    console.log(`Error occurred in store [getTodoById()]: ${err}`);
                    return throwError(err);
                })
            );
    }

    editTodo(todo: Todo): Observable<Todo> {
        const todos = this.todosSubj.getValue();
        const editIndex = todos.findIndex(el => el.id === todo.id);

        const todosCopy = todos.slice();
        todosCopy[editIndex] = todo;

        this.todosSubj.next(todosCopy);

        // PUT request to backend

        return of(todo)
            .pipe(
                catchError(err => {
                    console.log(`Error occurred in store [editTodo()]: ${err}`);
                    return throwError(err);
                })
            );
    }

    softDeleteTodo(todo: Todo): Observable<Todo> {
        todo.deleted = true;
        return this.editTodo(todo)
            .pipe(
                catchError(err => {
                    console.log(`Error occurred in store [softDeleteTodo()]: ${err}`);
                    return throwError(err);
                })
            );
    }

    hardDeleteTodo(todo: Todo): Observable<Todo> {
        const todos = this.todosSubj.getValue();
        const deleteIndex = todos.findIndex(el => el.id === todo.id);
        todos.splice(deleteIndex, 1);
        this.todosSubj.next(todos);

        // DELETE request to backend

        return of(todo);
    }

    selectCategory(type: string) {

        switch (type) {
            case 'all':
                this.selectedCategory.next('all');
                break;
            case 'starred':
                this.selectedCategory.next('starred');
                break;
            case 'completed':
                this.selectedCategory.next('completed');
                break;
            default:
                this.selectedCategory.next(type);
                console.log('custom category selected');
                break;
        }
    }

    showStarred(): Observable<Todo[]> {
        return this.todos$.pipe(
            map((todos: Todo[]) => todos.filter(el => el.deleted === false)),
            map((todos: Todo[]) => todos.filter(el => el.starred === true)),
            catchError(err => {
                console.log(`Error occurred in store [showStarred()]: ${err}`);
                return throwError(err);
            })
        );
    }

    showCompleted(): Observable<Todo[]> {
        return this.todos$.pipe(
            map((todos: Todo[]) => todos.filter(el => el.deleted === false)),
            map((todos: Todo[]) => todos.filter(el => el.completed === true)),
            catchError(err => {
                console.log(`Error occurred in store [showCompleted()]: ${err}`);
                return throwError(err);
            })
        );
    }

    showCustomCategoryContent(categoryId: string): Observable<Todo[]> {

        const categories = this.categoriesSubj.getValue() as Category[];
        const selectedCategory = categories.find(el => el.id === categoryId);

        const todos = this.todosSubj.getValue() as Todo[];
        const selectedCategoryTodos = todos.filter(el => el.categoryId === selectedCategory.id);

        return of(selectedCategoryTodos)
            .pipe(
                catchError(err => {
                    console.log(`Error occurred in store [showCustomCategoryContent()]: ${err}`);
                    return throwError(err);
                })
            );
    }

    showSearchTermTodos(searchTerm: string): Observable<Todo[]> {

        this.utilityService.setCurrentSearchUrlParams(searchTerm);

        return this.todos$.pipe(
            map((todos: Todo[]) => todos.filter(el => el.deleted === false)),
            map((todos: Todo[]) => todos.filter(el => el.name === searchTerm)),
            catchError(err => {
                console.log(`Error occurred in store [showSearchTermTodos()]: ${err}`);
                return throwError(err);
            })
        );
    }

    getCategories(): Observable<Category[]> {
        return this.categories$
            .pipe(
                catchError(err => {
                    console.log(`Error occurred in [getCategories()]: ${err}`);
                    return throwError(err);
                })
            );
    }

    getCategoryById(id: string) {
        const categories = this.categoriesSubj.getValue();
        const selectedCategory = categories.find(el => el.id === id);
        return selectedCategory;
    }

    createCategory(category: Category): Observable<Category[]> {

        const categories = this.categoriesSubj.getValue();
        categories.push(category);
        this.categoriesSubj.next(categories);

        // POST request to backend

        return of(categories)
            .pipe(
                catchError(err => {
                    console.log(`Error occurred in [createCategory()]: ${err}`);
                    return throwError(err);
                })
            );
    }

}
