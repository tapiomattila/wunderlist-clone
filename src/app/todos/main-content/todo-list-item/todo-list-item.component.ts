import { Component, OnInit, Input, Output } from '@angular/core';
import { Todo } from 'src/app/app-models/todo.model';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent implements OnInit {

  @Input() todoEl: Todo;
  @Output() selTodo = new Subject<Todo>();

  constructor() { }

  ngOnInit() {
  }

  doubleClickPressed(todo: Todo) {
    this.selTodo.next(todo);
  }
}
