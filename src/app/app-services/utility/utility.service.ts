import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    // Search
    private searchChanged = new BehaviorSubject('Inbox');
    search$ = this.searchChanged.asObservable();
    searchUsed: boolean = false;
    showSearchTodoCategory: boolean = false;
    // --------------------------------------------

    // List choice (category)
    private listParamsChanged = new BehaviorSubject('Inbox');
    listParamsChanged$ = this.listParamsChanged.asObservable();
    // --------------------------------------------

    private minifyCreateCategoryListObj = {
        child: undefined,
        parent: undefined
    };
    private minifyProfileCaretObj = {
        child: undefined,
        parent: undefined
    };
    private minifyNotificationMsgObj = {
        child: undefined,
        parent: undefined
    };
    private minifyCategoryNamesObj = {};
    private minifyCategoryTodoCountObj = {};

    constructor() { }

    createUUID() {
        return Math.random().toString(36).substr(2, 5);
    }

    minifyToggleProfileCaretSet(valueChild: Element, valueParent: Node) {
        this.minifyProfileCaretObj.child = valueChild;
        this.minifyProfileCaretObj.parent = valueParent;
    }
    minifyToggleProfileCaretGet() { return this.minifyProfileCaretObj; }

    minifyToggleNotificationMsgSet(valueChild: Element, valueParent: Node) {
        this.minifyNotificationMsgObj.child = valueChild;
        this.minifyNotificationMsgObj.parent = valueParent;
    }
    minifyToggleNotificationMsgGet() { return this.minifyNotificationMsgObj; }

    minifyToggleCategoriesSet(valueObj: Object) { this.minifyCategoryNamesObj = valueObj; }
    minifyToggleCategoriesGet() { return this.minifyCategoryNamesObj; }
    minifyToggleCategoriesTodoCountSet(valueObj: Object) { this.minifyCategoryTodoCountObj = valueObj; }
    minifyToggleCategoriesTodoCountGet() { return this.minifyCategoryTodoCountObj; }

    minifyToggleCreateCategorySet(valueChild: Element, valueParent: Node) {
        this.minifyCreateCategoryListObj.child = valueChild;
        this.minifyCreateCategoryListObj.parent = valueParent;
    }
    minifyToggleCreateCategoryGet() { return this.minifyCreateCategoryListObj; }

    addSidePanelClose() {
        document.querySelector('.app-container').classList.add('close');
        document.querySelector('app-todos').classList.add('close');
        document.querySelector('.img-dropdown').classList.add('close');
        document.querySelector('.img-profile').classList.add('close');
        document.querySelector('.profile-drd__list').classList.add('close');
    }

    removeSidePanelClose() {
        document.querySelector('.app-container').classList.remove('close');
        document.querySelector('app-todos').classList.remove('close');
        document.querySelector('.img-dropdown').classList.remove('close');
        document.querySelector('.img-profile').classList.remove('close');
        document.querySelector('.profile-drd__list').classList.remove('close');
    }

    // PROFILE CARET
    private removeProfileCaretChild(profileCaret) {
        this.minifyToggleProfileCaretSet(profileCaret, profileCaret.parentNode);
        profileCaret.parentNode.removeChild(profileCaret);
    }

    private addProfileCaretChild() {
        const profileCaretObj = this.minifyToggleProfileCaretGet();
        const parent = profileCaretObj.parent;
        const child = profileCaretObj.child;
        parent.appendChild(child);
    }

    // PROFILE NOTIFICATION MSG
    private removeProfileNotificationMsg(profileNotificationMsg) {
        this.minifyToggleNotificationMsgSet(profileNotificationMsg, profileNotificationMsg.parentNode);
        profileNotificationMsg.parentNode.removeChild(profileNotificationMsg);
    }

    private addProfileNotificationMsg() {
        const profileNotificationMsgObj = this.minifyToggleNotificationMsgGet();
        const parent = profileNotificationMsgObj.parent;
        const child = profileNotificationMsgObj.child;
        parent.appendChild(child);
    }

    // CATEGORY ITEM NAMES
    private removeCategoryItemNames(catItemNames) {
        const itemNameObj = {};
        catItemNames.forEach((el, index) => {
            const child = el;
            itemNameObj[index] = child;
            child.parentNode.removeChild(child);
        });

        this.minifyToggleCategoriesSet(itemNameObj);
    }

    private addCategoryItemNames() {
        // .icon-and-name in sidepanel-content
        const itemNameValuesObj = this.minifyToggleCategoriesGet();
        const parent = document.querySelectorAll('.icon-and-name');
        parent.forEach((el, index) => {
            if (itemNameValuesObj[index] !== undefined) {
                el.appendChild(itemNameValuesObj[index]);
            }
        });
    }

    // CATEGORY TODO COUNT
    private removeCategoryTodoCounts(catItemTodoCount) {
        // toggle category todo count when minifying from hamburget icon
        const itemCountObj = {};
        catItemTodoCount.forEach((el, index) => {
            const child = el;
            itemCountObj[index] = child;
            child.parentNode.removeChild(child);
        });

        this.minifyToggleCategoriesTodoCountSet(itemCountObj);
    }

    private addCategoryTodoCounts() {
        // .list-item in sidepanel-content
        const itemCountObj = this.minifyToggleCategoriesTodoCountGet();
        const parent = document.querySelectorAll('.list-item');
        parent.forEach((el, index) => {
            if (itemCountObj[index] !== undefined) {
                el.appendChild(itemCountObj[index]);
            }

        });
    }

    // CREATE CATEGORY TEXT
    private removeCreateCategoryText(createCategoryTextChild) {
        this.minifyToggleCreateCategorySet(createCategoryTextChild, createCategoryTextChild.parentNode);
        createCategoryTextChild.parentNode.removeChild(createCategoryTextChild);
    }

    private addCreateCategoryText() {
        const createCategoryTextValues = this.minifyToggleCreateCategoryGet();
        const parent = createCategoryTextValues.parent;
        const child = createCategoryTextValues.child;
        parent.appendChild(child);
    }

    setSidePanelObjects() {

        // .profile-caret in sidepanel-content
        const profileCaret = document.querySelector('.profile-caret');
        // .notification-msg in sidepanel-content
        const profileNotificationMsg = document.querySelector('.notification-msg');
        // .category-item-name in sidepanel-content and list-category-item
        const catItemNames = document.querySelectorAll('.category-item-name');
        // .count in sidepanel-content
        const catItemTodoCount = document.querySelectorAll('.count');
        // .create-new-text in sidepanel-content
        const createCategoryTextChild = document.querySelector('.create-new-text');

        if (
            profileCaret &&
            profileNotificationMsg &&
            catItemNames &&
            catItemTodoCount &&
            createCategoryTextChild
        ) {
            this.minifyToggleProfileCaretSet(profileCaret, profileCaret.parentNode);
            this.minifyToggleNotificationMsgSet(profileNotificationMsg, profileNotificationMsg.parentNode);

            const itemNameObj = {};
            catItemNames.forEach((el, index) => {
                const child = el;
                itemNameObj[index] = child;
            });
            this.minifyToggleCategoriesSet(itemNameObj);

            const itemCountObj = {};
            catItemTodoCount.forEach((el, index) => {
                const child = el;
                itemCountObj[index] = child;
            });
            this.minifyToggleCategoriesTodoCountSet(itemCountObj);
            this.minifyToggleCreateCategorySet(createCategoryTextChild, createCategoryTextChild.parentNode);
        }
    }

    minifySidePanelToggle() {

        if (window.innerWidth > 515) {
            // .profile-caret in sidepanel-content
            const profileCaret = document.querySelector('.profile-caret');
            profileCaret ? this.removeProfileCaretChild(profileCaret) : this.addProfileCaretChild();

            // .notification-msg in sidepanel-content
            const profileNotificationMsg = document.querySelector('.notification-msg');
            profileNotificationMsg ? this.removeProfileNotificationMsg(profileNotificationMsg) : this.addProfileNotificationMsg();

            // .category-item-name in sidepanel-content and list-category-item
            const catItemNames = document.querySelectorAll('.category-item-name');
            (catItemNames.length && catItemNames.length > 0) ? this.removeCategoryItemNames(catItemNames) : this.addCategoryItemNames();

            // .count in sidepanel-content
            const catItemTodoCount = document.querySelectorAll('.count');
            (catItemTodoCount.length && catItemTodoCount.length > 0) ?
                this.removeCategoryTodoCounts(catItemTodoCount) : this.addCategoryTodoCounts();

            const appContClose = document.querySelector('.app-container').classList.contains('close');
            if (appContClose && window.innerWidth > 515) {
                this.removeSidePanelClose();
                document.querySelector('.magnifying-glass').classList.remove('close');
            }
            else {
                this.addSidePanelClose();
                document.querySelector('.magnifying-glass').classList.add('close');
            }

            // .create-new-text in sidepanel-content
            const createCategoryTextChild = document.querySelector('.create-new-text');
            createCategoryTextChild ? this.removeCreateCategoryText(createCategoryTextChild) : this.addCreateCategoryText();
        }
        else {
            console.log('window width too small');
        }

    }

    removeSidePanelInfoOnSmallScreen() {
        // .profile-caret in sidepanel-content
        const profileCaret = document.querySelector('.profile-caret');
        // .notification-msg in sidepanel-content
        const profileNotificationMsg = document.querySelector('.notification-msg');
        // .category-item-name in sidepanel-content and list-category-item
        const catItemNames = document.querySelectorAll('.category-item-name');
        // .count in sidepanel-content
        const catItemTodoCount = document.querySelectorAll('.count');
        // .create-new-text in sidepanel-content
        const createCategoryTextChild = document.querySelector('.create-new-text');
        if (
            profileCaret &&
            profileNotificationMsg &&
            catItemNames &&
            catItemTodoCount &&
            createCategoryTextChild
        ) {
            this.removeProfileCaretChild(profileCaret);
            this.removeProfileNotificationMsg(profileNotificationMsg);
            this.removeCategoryItemNames(catItemNames);
            this.removeCategoryTodoCounts(catItemTodoCount);
            this.removeCreateCategoryText(createCategoryTextChild);
        }
    }

    addSidePanelInfoOnLargerScreen() {

        // add childs
        console.log('addSidePanelInfoOnLargerScreen');
        this.addProfileCaretChild();
        this.addProfileNotificationMsg();
        this.addCategoryItemNames();
        this.addCategoryTodoCounts();
        this.addCreateCategoryText();
    }

    // Search
    setCurrentSearchUrlParams(route: string) {
        this.searchChanged.next(route);
    }

    // List choice
    setCurrentListChoiceUrlParams(route: string) {
        this.listParamsChanged.next(route);
    }

}
