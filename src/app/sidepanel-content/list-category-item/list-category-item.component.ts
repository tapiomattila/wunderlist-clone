import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/app-models/category.model';
import { Store } from 'src/app/app-services/utility/store.service';

@Component({
  selector: 'app-list-category-item',
  templateUrl: './list-category-item.component.html',
  styleUrls: ['./list-category-item.component.scss']
})
export class ListCategoryItemComponent implements OnInit {

  @Input() categoryEl: Category;

  constructor(public store: Store) { }

  ngOnInit() {
  }

  selectCategory(category: Category) {
    console.log('show category');
    console.log(category);
  }

}
