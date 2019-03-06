import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Todo } from 'src/app/app-models/todo.model';
import { UtilityService } from '../utility/utility.service';
import { Category } from 'src/app/app-models/category.model';

@Injectable({
    providedIn: 'root',
})
export class InMemoryWebApiDataService implements InMemoryDbService {

    constructor(private utilService: UtilityService) { }

    createDb() {
        const todos: Todo[] = [
            new Todo(
                this.utilService.createUUID(),
                'First todo', new Date(2019, 2, 14, 4, 14, 0),
                new Date(2019, 2, 14, 4, 14, 0), false, '', false, false
            ),
            new Todo(
                this.utilService.createUUID(),
                'Second todo', new Date(2019, 2, 14, 4, 14, 0),
                new Date(2019, 2, 14, 4, 14, 0), false, '', false, false
            ),
        ];

        const categories: Category[] = [
            new Category(this.utilService.createUUID(), 'test1', new Date())
        ];
        return {
            todos: todos,
            categories: categories
        };
    }
}
