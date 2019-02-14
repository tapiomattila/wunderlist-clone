import { Injectable } from '@angular/core';
import { Todo } from 'src/app/app-models/todo.model';
import { UtilityService } from '../utility/utility.service';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    private todos: Todo[] = [
        new Todo(this.utilService.createUUID(), 'First todo', new Date(2019, 2, 14, 4, 14, 0)),
        new Todo(this.utilService.createUUID(), 'Sec todo', new Date(2019, 2, 13, 4, 14, 0)),
        new Todo(this.utilService.createUUID(), 'Thi todo', new Date(2019, 1, 15, 4, 14, 0)),
        new Todo(this.utilService.createUUID(), 'Fourth todo', new Date(2019, 1, 24, 4, 14, 0)),
        new Todo(this.utilService.createUUID(), 'Fi todo', new Date(2019, 2, 2, 11, 14, 0)),
        new Todo(this.utilService.createUUID(), 'Si todo', new Date(2019, 4, 1, 14, 24, 0)),
        new Todo(this.utilService.createUUID(), 'Sev todo', new Date(2019, 2, 14, 4, 53, 5)),
        new Todo(this.utilService.createUUID(), 'Eight todo', new Date(2019, 2, 2, 2, 2, 0))
    ];

    constructor(private utilService: UtilityService) { }

    public getTodos() {

        // return a copy of todos
        return this.todos.slice();
    }

}
