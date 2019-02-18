import { Component, OnInit } from '@angular/core';
import { Todo } from '../app-models/todo.model';
import { TodoService } from '../app-services/main-content/todo.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  todoInput = '';
  todos: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {

    console.log('show todos');
    this.todos = this.todoService.getTodos();
    console.log(this.todos);
  }

  onEnterPress(event) {
    if (event.key === 'Enter') {
      console.log('enter pressed');
      console.log('show todoInput');
      console.log(this.todoInput);
      this.clearInput();
    }
  }

  clearInput() {
    this.todoInput = '';
  }

}
