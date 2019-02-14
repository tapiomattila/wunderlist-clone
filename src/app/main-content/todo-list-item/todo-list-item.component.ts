import { Component, OnInit, Input } from '@angular/core';
import { Todo } from 'src/app/app-models/todo.model';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent implements OnInit {

  @Input() todoEl: Todo;

  constructor() { }

  ngOnInit() {
  }

  test(todo: Todo) {
    console.log('show todo');
    console.log(todo);
  }
}
