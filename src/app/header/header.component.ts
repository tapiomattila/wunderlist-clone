import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilityService } from '../app-services/utility/utility.service';
import { Subscription, throwError } from 'rxjs';
import { Store } from '../app-services/utility/store.service';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {

    headerText = 'Inbox';
    searchSub: Subscription;
    listSub: Subscription;

    constructor(
        private utilityService: UtilityService,
        private store: Store) { }

    ngOnInit() {

        /**
        * Change the header selection text by search or category selection
        */
        this.searchSub = this.utilityService.search$
            .pipe(
                catchError(err => {
                    console.log(`Error occurred search$: ${err}`);
                    return throwError(err);
                }))
            .subscribe(
                (res: string) => {
                    this.headerText = res;
                    console.log('show res IN HEADER:', res);
                    if (res !== 'Inbox') {
                        this.headerText = 'Search';
                    }
                    if (res === '') {
                        this.headerText = 'Inbox';
                    }
                });

        this.listSub = this.utilityService.listParamsChanged$
            .pipe(
                catchError(err => {
                    console.log(`Error occurred listParamsChanged: ${err}`);
                    return throwError(err);
                }))
            .subscribe(
                (res: string) => {
                    if (res !== '') {

                        // set 20 millisecond timer to ensure data availability in UI
                        setTimeout(() => {
                            if (res === 'inbox' || res === 'starred' || res === 'completed') {
                                this.headerText = res.charAt(0).toUpperCase() + res.substring(1, res.length);
                            }
                            else {
                                const selectedCategory = this.store.getCategoryById(res);
                                if (selectedCategory) {
                                    this.headerText = selectedCategory.categoryName;
                                }
                            }
                        }, 20);
                    }
                    if (res === '') {
                        this.headerText = 'Inbox';
                    }
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
