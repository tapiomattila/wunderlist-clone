import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/app-models/category.model';
import { Observable } from 'rxjs';
import { UtilityService } from '../app-services/utility/utility.service';
import { Store } from '../app-services/utility/store.service';

@Component({
  selector: 'app-sidepanel-content',
  templateUrl: './sidepanel-content.component.html',
  styleUrls: ['./sidepanel-content.component.scss']
})
export class SidepanelContentComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(
    private router: Router,
    private utilService: UtilityService,
    public store: Store) { }

  ngOnInit() {
    this.categories$ = this.store.getCategories();
  }

  showAll() {
    console.log('showAll pressed');
    this.utilService.setCurrentListChoiceUrlParams('inbox');
    this.store.selectCategory('all');
    this.router.navigate(['', { outlets: { listsoutlet: ['list', 'inbox'] } }]);
  }

  showStarred() {
    console.log('showStarred pressed');
    this.utilService.setCurrentListChoiceUrlParams('starred');
    this.store.selectCategory('starred');
    this.router.navigate(['', { outlets: { listsoutlet: ['list', 'starred'] } }]);
  }

  showCompleted() {
    console.log('showCompleted pressed');
    this.utilService.setCurrentListChoiceUrlParams('completed');
    this.store.selectCategory('completed');
    this.router.navigate(['', { outlets: { listsoutlet: ['list', 'completed'] } }]);
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

  createCategory() {
    console.log('create pressed');
    this.router.navigate(['todos', 'new-category']);
  }

  categorySelectedFunc(category: Category) {
    console.log('category selected');

    this.utilService.setCurrentListChoiceUrlParams(category.categoryName);

    this.store.selectCategory(category.id);
    this.router.navigate(['', { outlets: { listsoutlet: ['list', category.id] } }]);
  }
}
