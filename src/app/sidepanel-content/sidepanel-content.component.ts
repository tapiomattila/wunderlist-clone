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
    this.categories = this.categoryService.getCategories();
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
    document.querySelector('.profile-drd__list').classList.toggle('open');

    const containClose = document.querySelector('.profile-drd__list').classList.contains('close');
    if (containClose) {
      document.querySelector('.profile-drd').classList.remove('open-style');
    }
    else {
      document.querySelector('.profile-drd').classList.add('open-style');
    }
  }

}
