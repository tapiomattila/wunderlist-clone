import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilityService } from '../app-services/utility/utility.service';
import { Subscription } from 'rxjs';
import { CategoryService } from '../app-services/sidepanel/category.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {

    headerText = 'Inbox';
    searchSub: Subscription;
    listSub: Subscription;

    constructor(private utilityService: UtilityService,
        private categoryService: CategoryService) { }

    ngOnInit() {

    /**
    * Change the header selection text by search or category selection
    */
        this.searchSub = this.utilityService.searchChanged
            .subscribe(
                (res: string) => {
                    this.headerText = res;
                    if (res === '') {
                        this.headerText = 'Inbox';
                    }
                },
                (err: Error) => {
                    console.log('SHOW ERROR search');
                    console.log(err);
                });

        this.listSub = this.utilityService.listParamsChanged
            .subscribe(
                (res: string) => {
                    if (res !== '') {

                        // set 20 millisecond timer to ensure data availability in UI
                        setTimeout(() => {
                            if (res === 'inbox' || res === 'starred' || res === 'completed') {
                                this.headerText = res.charAt(0).toUpperCase() + res.substring(1, res.length);
                            }
                            else {
                                const selectedCategory = this.categoryService.getCategoryById(res);
                                if (selectedCategory) {
                                    this.headerText = selectedCategory.categoryName;
                                }
                            }
                        }, 20);
                    }
                    if (res === '') {
                        this.headerText = 'Inbox';
                    }
                },
                (err: Error) => {
                    console.log('SHOW ERROR list');
                    console.log(err);
                });
    }

    ngOnDestroy() {
        if (this.searchSub !== undefined) {
            this.searchSub.unsubscribe();
        }

        if (this.listSub !== undefined) {
            this.listSub.unsubscribe();
        }
    }

}
