import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/app-services/sidepanel/category.service';
import { Category } from 'src/app/app-models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidepanel-content',
  templateUrl: './sidepanel-content.component.html',
  styleUrls: ['./sidepanel-content.component.scss']
})
export class SidepanelContentComponent implements OnInit, OnDestroy {

  categories: Category[];
  categorySubs: Subscription;

  constructor(private categoryService: CategoryService,
    private router: Router) { }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();

    this.categorySubs = this.categoryService.categoriesChanged
      .subscribe(
        (categories: Category[]) => {
          this.categories = categories;
        });
  }

  showAll() {
    console.log('showAll pressed');
    this.router.navigate(['', { outlets: { listsoutlet: ['list', 'inbox'] } }]);
  }

  showStarred() {
    console.log('showStarred pressed');
    this.router.navigate(['', { outlets: { listsoutlet: ['list', 'starred'] } }]);
  }

  showCompleted() {
    console.log('showCompleted pressed');
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
    this.router.navigate(['new-category']);
  }

  categorySelectedFunc(category: Category) {
    console.log('category selected');
    this.router.navigate(['', { outlets: { listsoutlet: ['list', category.id] } }]);
  }


  ngOnDestroy() {
    if (this.categorySubs !== undefined) {
      this.categorySubs.unsubscribe();
    }
  }

}
