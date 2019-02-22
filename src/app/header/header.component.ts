import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../app-services/utility/utility.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    headerText = 'Inbox';

    constructor(private utilityService: UtilityService) { }

    ngOnInit() {

        this.utilityService.searchChanged
            .subscribe(
                (res: string) => {
                    this.headerText = res;
                    if (res === '') {
                        this.headerText = 'Inbox';
                    }
                });
    }

}
