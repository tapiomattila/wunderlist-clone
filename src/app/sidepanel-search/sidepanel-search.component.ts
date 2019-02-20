import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../app-services/utility/utility.service';

@Component({
    selector: 'app-sidepanel-search',
    templateUrl: 'sidepanel-search.component.html',
    styleUrls: ['./sidepanel-search.component.scss']
})

export class SidePanelSearchComponent implements OnInit {

    constructor(private utilService: UtilityService) { }

    ngOnInit() { }

    minifySidePanel() {

        // -------------------------------------------
        // toggle profile caret items when minifying from hamburger icon
        const profileCaret = document.querySelector('.profile-caret');
        if (profileCaret) {
            this.utilService.minifyToggleProfileCaretSet(profileCaret, profileCaret.parentNode);
            profileCaret.parentNode.removeChild(profileCaret);
        }
        else {
            const profileCaretObj = this.utilService.minifyToggleProfileCaretGet();
            const parent = profileCaretObj.parent;
            const child = profileCaretObj.child;
            parent.appendChild(child);
        }

        // -------------------------------------------
        // toggle notification msg icons when minifying from hamburger icon
        const profileNotificationMsg = document.querySelector('.notification-msg');
        if (profileNotificationMsg) {
            this.utilService.minifyToggleNotificationMsgSet(profileNotificationMsg, profileNotificationMsg.parentNode);
            profileNotificationMsg.parentNode.removeChild(profileNotificationMsg);
        }
        else {
            const profileNotificationMsgObj = this.utilService.minifyToggleNotificationMsgGet();
            const parent = profileNotificationMsgObj.parent;
            const child = profileNotificationMsgObj.child;
            parent.appendChild(child);
        }

        // -------------------------------------------
        // toggle category names when minifying from hamburget icon
        const catItemNames = document.querySelectorAll('.category-item-name');
        if (catItemNames.length && catItemNames.length > 0) {

            const itemNameObj = {};
            catItemNames.forEach((el, index) => {
                const child = document.querySelector('.category-item-name');

                itemNameObj[index] = child;
                child.parentNode.removeChild(child);
            });

            this.utilService.minifyToggleCategoriesSet(itemNameObj);
        } else {
            const itemNameValuesObj = this.utilService.minifyToggleCategoriesGet();
            const parent = document.querySelectorAll('.icon-and-name');
            parent.forEach((el, index) => {
                el.appendChild(itemNameValuesObj[index]);
            });
        }

        // -------------------------------------------
        // toggle category todo count when minifying from hamburget icon
        const catItemTodoCount = document.querySelectorAll('.count');
        if (catItemTodoCount.length && catItemTodoCount.length > 0) {
            const itemCountObj = {};

            catItemTodoCount.forEach((el, index) => {
                const child = document.querySelector('.count');
                itemCountObj[index] = child;
                child.parentNode.removeChild(child);
            });

            this.utilService.minifyToggleCategoriesTodoCountSet(itemCountObj);
        } else {
            const itemCountObj = this.utilService.minifyToggleCategoriesTodoCountGet();
            const parent = document.querySelectorAll('.list-item');
            parent.forEach((el, index) => {
                el.appendChild(itemCountObj[index]);
            });
        }

        document.querySelector('.app-container').classList.toggle('close');
        document.querySelector('app-todos').classList.toggle('close');
        document.querySelector('.img-dropdown').classList.toggle('close');
        document.querySelector('.img-profile').classList.toggle('close');
        document.querySelector('.profile-drd__list').classList.toggle('close');

        // -------------------------------------------
        // toggle create new text
        const createCategoryTextChild = document.querySelector('.create-new-text');
        if (createCategoryTextChild) {
            this.utilService.minifyToggleCreateCategorySet(createCategoryTextChild, createCategoryTextChild.parentNode);
            createCategoryTextChild.parentNode.removeChild(createCategoryTextChild);
        } else {
            const createCategoryTextValues = this.utilService.minifyToggleCreateCategoryGet();
            const parent = createCategoryTextValues.parent;
            const child = createCategoryTextValues.child;
            parent.appendChild(child);
        }
    }
}
