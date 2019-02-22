import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { TodosComponent } from './todos/todos.component';
import { MainContentComponent } from './todos/main-content/main-content.component';
import { TodoListItemComponent } from './todos/main-content/todo-list-item/todo-list-item.component';
import { EditComponent } from './todos/main-content/edit/edit.component';
import { CreateCategoryComponent } from './sidepanel-content/create-category/create-category.component';
import { ListCategoryItemComponent } from './sidepanel-content/list-category-item/list-category-item.component';
import { SidepanelContentComponent } from './sidepanel-content/sidepanel-content.component';
import { SidePanelSearchComponent } from './sidepanel-search/sidepanel-search.component';
import { SearchInputComponent } from './sidepanel-search/search-input/search-input.component';
import { ItemComponent } from './sidepanel-search/search-input/item/item.component';
import { ListChoiceComponent } from './sidepanel-content/list-choice/list-choice.component';
import { ListItemComponent } from './sidepanel-content/list-choice/list-item/list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainContentComponent,
    SidePanelSearchComponent,
    SidepanelContentComponent,
    ListCategoryItemComponent,
    TodoListItemComponent,
    PageNotFoundComponent,
    EditComponent,
    TodosComponent,
    CreateCategoryComponent,
    SearchInputComponent,
    ItemComponent,
    ListChoiceComponent,
    ListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
