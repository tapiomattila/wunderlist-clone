import { Injectable } from '@angular/core';
import { UtilityService } from '../utility/utility.service';
import { Category } from 'src/app/app-models/category.model';
import { Subject } from 'rxjs';
import { TodoService } from '../main-content/todo.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    categoriesChanged = new Subject<Category[]>();

    private categories: Category[] = [
        // new Category(this.utilService.createUUID(), 'cat1', new Date(2019, 2, 12, 15, 10), 2),
        // new Category(this.utilService.createUUID(), 'cat2', new Date(2019, 3, 32, 25, 10), 4),
    ];

    constructor(private todoService: TodoService) { }

    getCategories() {
        return this.categories.slice();
    }

    addCategory(category: Category) {
        this.categories.push(category);
        this.categoriesChanged.next(this.getCategories());
    }

    getCategoryById(id: string): Category {
        return this.getCategories().find(el => el.id === id);
    }

    getInboxCount() {
        const todos = this.todoService.getTodos();
        return todos.filter(el => el.deleted === false).length;
    }

    getStarredCount() {
        const todos = this.todoService.getTodos();
        const starredTodos = todos.filter(el => el.starred === true);
        const starredAndNotDeletedLength = starredTodos.filter(el => el.deleted === false).length;
        return starredAndNotDeletedLength;
    }

    getCompletedCount() {
        const todos = this.todoService.getTodos();
        const completedTodos = todos.filter(el => el.completed === true);
        const completedNotDeletedTodosLength = completedTodos.filter(el => el.deleted === false).length;
        return completedNotDeletedTodosLength;
    }
}
