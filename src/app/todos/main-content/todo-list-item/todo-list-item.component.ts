import { Component, OnInit, Input, Output } from '@angular/core';
import { Todo } from 'src/app/app-models/todo.model';
import { Subject } from 'rxjs';
import { Store } from 'src/app/app-services/utility/store.service';
import { UtilityService } from 'src/app/app-services/utility/utility.service';
import { Category } from 'src/app/app-models/category.model';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent implements OnInit {

  @Input() todoEl: Todo;
  @Output() selTodo = new Subject<Todo>();

  todoCategory: Category;

  constructor(
    private store: Store,
    public utilService: UtilityService) { }

  ngOnInit() {

    if (this.todoEl.categoryId !== '') {
      this.todoCategory = this.store.getCategoryById(this.todoEl.categoryId);
    }
  }

  doubleClickPressed(todo: Todo) {
    this.selTodo.next(todo);
  }

  checked(todo: Todo) {
    console.log('check pressed');
    console.log(todo);
    todo.completed = !todo.completed;
    this.store.editTodo(todo).subscribe();
  }

  starred(todo: Todo) {
    console.log('star pressed');
    console.log(todo);
    todo.starred = !todo.starred;
    this.store.editTodo(todo).subscribe();
  }

  getStarredColor(todo: Todo) {
    return todo.starred;
  }

}
