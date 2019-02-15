import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

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

}
