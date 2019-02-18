import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainContentComponent } from './main-content/main-content.component';
import { SidePanelSearchComponent } from './sidepanel-search/sidepanel-search.component';
import { SidepanelContentComponent } from './sidepanel-content/sidepanel-content.component';
import { ListCategoryItemComponent } from './sidepanel-content/list-category-item/list-category-item.component';
import { TodoListItemComponent } from './main-content/todo-list-item/todo-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainContentComponent,
    SidePanelSearchComponent,
    SidepanelContentComponent,
    ListCategoryItemComponent,
    TodoListItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
