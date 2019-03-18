import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/app-services/utility/utility.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '../app-services/utility/store.service';

@Component({
    selector: 'app-sidepanel-search',
    templateUrl: 'sidepanel-search.component.html',
    styleUrls: ['./sidepanel-search.component.scss']
})

export class SidePanelSearchComponent implements OnInit {

    searchForm: FormGroup;

    constructor(
        private utilService: UtilityService,
        private router: Router,
        private store: Store
    ) { }

    ngOnInit() {
        this.initForm();
    }

    minifySidePanel() {
        this.utilService.minifySidePanelToggle();
    }

    initForm() {
        this.searchForm = new FormGroup({
            searchInput: new FormControl('', Validators.required)
        });
    }

    focusSearch() {
        console.log('focus search');
        this.router.navigate(['', { outlets: { ssoutlet: ['search'] } }]);
    }

    focusOutSearch() {
        console.log('focus out in search');
        const value = this.searchForm.controls.searchInput.value;
        if (value === '') {
            this.utilService.setCurrentSearchUrlParams('Inbox');
        }
        this.searchForm.setValue({
            searchInput: ''
        });
        this.router.navigate([{ outlets: { ssoutlet: null } }]);
    }

    onSubmit() {
        const value = this.searchForm.controls.searchInput.value;
        console.log('show search value');
        console.log(value);

        if (value === '') {
            this.store.selectCategory('all');
        }
        else {
            this.utilService.searchUsed = true;
            this.utilService.showSearchTodoCategory = true;
            this.store.showSearchTermTodos(value);
        }
        this.router.navigate(['', { outlets: { ssoutlet: ['search', value] } }]);
    }

    clearInput() {
        this.searchForm.reset();
    }
}
