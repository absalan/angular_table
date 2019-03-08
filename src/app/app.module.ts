import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { LeftNavComponent } from './components/layouts/left-nav/left-nav.component';
import { TableComponent } from './components/shared/table/table.component';
import { TableModule } from './modules/table/table.module';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    HeaderComponent,
    FooterComponent,
    LeftNavComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
