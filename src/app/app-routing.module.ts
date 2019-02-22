import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { MainContentComponent } from './todos/main-content/main-content.component';
import { EditComponent } from './todos/main-content/edit/edit.component';
import { CreateCategoryComponent } from './sidepanel-content/create-category/create-category.component';
import { SearchInputComponent } from './sidepanel-search/search-input/search-input.component';
import { ItemComponent } from './sidepanel-search/search-input/item/item.component';
import { ListChoiceComponent } from './sidepanel-content/list-choice/list-choice.component';
import { ListItemComponent } from './sidepanel-content/list-choice/list-item/list-item.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/todos', pathMatch: 'full' },
    { path: 'todos', component: MainContentComponent, children: [
            { path: ':id/edit', component: EditComponent },
        ]
    },
    {
        path: 'todos/new', component: MainContentComponent
    },
    { path: 'search', component: SearchInputComponent, outlet: 'ssoutlet', children: [
        { path: ':id', component: ItemComponent }
    ] },
    { path: 'list', component: ListChoiceComponent, outlet: 'listsoutlet', children: [
        { path: 'inbox', component: ListItemComponent },
        { path: 'starred', component: ListItemComponent },
        { path: 'completed', component: ListItemComponent },
        { path: ':id', component: ListItemComponent }
    ] },
    { path: 'new-category', component: CreateCategoryComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

})
export class AppRoutingModule {

}
