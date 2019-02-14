import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    constructor() { }

    createUUID() {
        return Math.random().toString(36).substr(2, 5);
    }
}
