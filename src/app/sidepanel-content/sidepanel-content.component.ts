import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../app-services/sidepanel/category.service';
import { Category } from '../app-models/category.model';

@Component({
  selector: 'app-sidepanel-content',
  templateUrl: './sidepanel-content.component.html',
  styleUrls: ['./sidepanel-content.component.scss']
})
export class SidepanelContentComponent implements OnInit {

  categories: Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    console.log('show categories');
    this.categories = this.categoryService.getCategories();
    console.log(this.categories);
  }

  showAll() {
    console.log('showAll pressed');
  }

  showStarred() {
    console.log('showStarred pressed');
  }

  showCompleted() {
    console.log('showCompleted pressed');
  }

  profileDrd() {
    console.log('profile pressed');
    document.querySelector('.profile-drd__list').classList.toggle('open');
  }

}
