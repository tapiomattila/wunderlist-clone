import { Injectable } from '@angular/core';
import { TodoService } from './todo.service';
import { CategoryService } from '../sidepanel/category.service';

@Injectable({
    providedIn: 'root'
})
export class TodoListShowService {

    constructor(private todoService: TodoService,
                private categoryService: CategoryService) { }

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

    showSelectedCategoryFilterTodos(categoryId: string) {
        console.log('IN SELECTED CATEGORY');
        const todos = this.todoService.getTodos();
        const todosFiltered = todos.filter(el => el.deleted === false);
        const todosCategorySelected = todosFiltered.filter(el => el.categoryId === categoryId);
        return todosCategorySelected;
    }

    showSearchResultCategories(searchResult: string) {
        const todos = this.todoService.getTodos();
        const todosNotDeleted = todos.filter(el => el.deleted === false);

        const categories = this.categoryService.getCategories();
        const searchCategory = categories.find(el => el.categoryName === searchResult);
        let todosFromSearchCategory;

        if (searchCategory) {
            todosFromSearchCategory = todosNotDeleted.filter(el => el.categoryId === searchCategory.id);
        }

        return todosFromSearchCategory;
    }
}
