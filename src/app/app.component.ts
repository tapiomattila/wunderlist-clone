import { Component, OnInit } from '@angular/core';
import { Store } from './app-services/utility/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wunderlistclone';

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.init();
  }
}
