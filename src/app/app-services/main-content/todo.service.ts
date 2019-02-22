import { Injectable } from '@angular/core';
import { Todo } from 'src/app/app-models/todo.model';
import { UtilityService } from '../utility/utility.service';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    private editTodo: boolean = false;
    todosChanged = new Subject<Todo[]>();

    private todos: Todo[] = [
        new Todo(this.utilService.createUUID(),
        'First todo', new Date(2019, 2, 14, 4, 14, 0), new Date(2019, 2, 14, 4, 14, 0), false, false, ''),
        // new Todo(this.utilService.createUUID(), 'Sec todo',
        // new Date(2019, 2, 13, 4, 14, 0), new Date(2019, 2, 13, 4, 14, 0), false, false),
        // new Todo(this.utilService.createUUID(), 'Thi todo',
        // new Date(2019, 1, 15, 4, 14, 0), new Date(2019, 1, 15, 4, 14, 0), false, false),
        // new Todo(this.utilService.createUUID(), 
        // 'Fourth todo', new Date(2019, 1, 24, 4, 14, 0), new Date(2019, 1, 24, 4, 14, 0), false, false),
        // new Todo(this.utilService.createUUID(), 'Fi todo',
        // new Date(2019, 2, 2, 11, 14, 0), new Date(2019, 2, 2, 11, 14, 0), false, false),
        // new Todo(this.utilService.createUUID(), 'Si todo',
        // new Date(2019, 4, 1, 14, 24, 0), new Date(2019, 4, 1, 14, 24, 0), false, false),
        // new Todo(this.utilService.createUUID(), 'Sev todo',
        // new Date(2019, 2, 14, 4, 53, 5), new Date(2019, 2, 14, 4, 53, 5), false, false),
        // new Todo(this.utilService.createUUID(), 'Eight todo',
        // new Date(2019, 2, 2, 2, 2, 0), new Date(2019, 2, 2, 2, 2, 0), false, false)
    ];

    constructor(private utilService: UtilityService) { }

    public getTodos() {

        // return a copy of todos
        return this.todos.slice();
    }

    addTodo(todo: Todo) {
        this.todos.push(todo);
        this.todosChanged.next(this.getTodos());
    }

    updateTodo(id: string, todo: Todo) {
        const indexTodo = this.todos.findIndex(el => el.id === id);
        this.todos[indexTodo] = todo;
        this.todosChanged.next(this.getTodos());
        console.log('in update service function');
        console.log('return value');
        console.log(this.todos);
    }

    hardDeleteTodo(todo: Todo) {
        const indexTodo = this.todos.findIndex(el => el.id === todo.id);
        this.todos.splice(indexTodo, 1);
        this.todosChanged.next(this.getTodos());
    }

    softDeleteTodo(todo: Todo) {
        todo.deleted = true;
        console.log('show deleted todo');
        console.log(todo);
        this.updateTodo(todo.id, todo);
    }

    editTodoStateGet() {
        return this.editTodo;
    }
}
