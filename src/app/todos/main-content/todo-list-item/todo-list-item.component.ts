import { Component, OnInit, Input, Output } from '@angular/core';
import { Todo } from 'src/app/app-models/todo.model';
import { Subject } from 'rxjs';
import { TodoService } from 'src/app/app-services/main-content/todo.service';


@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent implements OnInit {

  @Input() todoEl: Todo;
  @Output() selTodo = new Subject<Todo>();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  doubleClickPressed(todo: Todo) {
    this.selTodo.next(todo);
  }

  checked(todo: Todo) {
    todo.done = !todo.done;
    this.todoService.updateTodo(todo.id, todo);
  }
}
