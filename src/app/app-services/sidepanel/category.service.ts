import { Injectable } from '@angular/core';
import { Category } from 'src/app/app-models/category.model';
import { Subject } from 'rxjs';
import { TodoService } from '../main-content/todo.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    categoriesChanged = new Subject<Category[]>();

    private categories: Category[] = [];

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

    getCategorySelectedTodoCount(id: string) {
        const todos = this.todoService.getTodos();
        const todosAlive = todos.filter(el => el.deleted === false);
        const filteredByCategoryIdTodos = todosAlive.filter(el => el.categoryId === id);
        return filteredByCategoryIdTodos.length;
    }
}
