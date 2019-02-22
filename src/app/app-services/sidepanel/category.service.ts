import { Injectable } from '@angular/core';
import { UtilityService } from '../utility/utility.service';
import { Category } from 'src/app/app-models/category.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    categoriesChanged = new Subject<Category[]>();

    private categories: Category[] = [
        new Category(this.utilService.createUUID(), 'cat1', new Date(2019, 2, 12, 15, 10), 2),
        new Category(this.utilService.createUUID(), 'cat2', new Date(2019, 3, 32, 25, 10), 1),
        // new Category(this.utilService.createUUID(), 'cat3', new Date(2019, 4, 2, 45, 10), 4),
        // new Category(this.utilService.createUUID(), 'cat4', new Date(2019, 5, 15, 35, 10)),
        // new Category(this.utilService.createUUID(), 'cat5', new Date(2019, 1, 12, 45, 10), 2),
        // new Category(this.utilService.createUUID(), 'cat6', new Date(2019, 2, 11, 25, 10), 1),
        // new Category(this.utilService.createUUID(), 'cat7', new Date(2019, 1, 22, 15, 10), 65),
        // new Category(this.utilService.createUUID(), 'cat8', new Date(2019, 3, 12, 55, 10)),
        // new Category(this.utilService.createUUID(), 'cat1', new Date(2019, 2, 12, 15, 10), 2),
        // new Category(this.utilService.createUUID(), 'cat2', new Date(2019, 3, 32, 25, 10), 1),
        // new Category(this.utilService.createUUID(), 'cat3', new Date(2019, 4, 2, 45, 10), 4),
        // new Category(this.utilService.createUUID(), 'cat4', new Date(2019, 5, 15, 35, 10)),
        // new Category(this.utilService.createUUID(), 'cat5', new Date(2019, 1, 12, 45, 10), 2),
        // new Category(this.utilService.createUUID(), 'cat6', new Date(2019, 2, 11, 25, 10), 1),
        // new Category(this.utilService.createUUID(), 'cat7', new Date(2019, 1, 22, 15, 10), 65),
        // new Category(this.utilService.createUUID(), 'cat8', new Date(2019, 3, 12, 55, 10)),
        // new Category(this.utilService.createUUID(), 'cat1', new Date(2019, 2, 12, 15, 10), 2),
        // new Category(this.utilService.createUUID(), 'cat2', new Date(2019, 3, 32, 25, 10), 1),
        // new Category(this.utilService.createUUID(), 'cat3', new Date(2019, 4, 2, 45, 10), 4),
        // new Category(this.utilService.createUUID(), 'cat4', new Date(2019, 5, 15, 35, 10)),
        // new Category(this.utilService.createUUID(), 'cat5', new Date(2019, 1, 12, 45, 10), 2),
        // new Category(this.utilService.createUUID(), 'cat6', new Date(2019, 2, 11, 25, 10), 1),
        // new Category(this.utilService.createUUID(), 'cat7', new Date(2019, 1, 22, 15, 10), 65),
        // new Category(this.utilService.createUUID(), 'cat8', new Date(2019, 3, 12, 55, 10)),
    ];

    constructor(private utilService: UtilityService) { }

    getCategories() {
        return this.categories.slice();
    }

    addCategory(category: Category) {
        this.categories.push(category);
        this.categoriesChanged.next(this.getCategories());
    }
}
