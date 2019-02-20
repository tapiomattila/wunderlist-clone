import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { MainContentComponent } from './todos/main-content/main-content.component';
import { EditComponent } from './todos/main-content/edit/edit.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/todos', pathMatch: 'full' },
    {
        path: 'todos', component: MainContentComponent, children: [
            { path: ':id/edit', component: EditComponent },
        ]
    },
    {
        path: 'todos/new', component: MainContentComponent
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

})
export class AppRoutingModule {

}
