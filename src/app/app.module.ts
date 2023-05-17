import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { PizzaListComponent } from './components/pizza-list/pizza-list.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PizzaFilterComponent } from './components/pizza-filter/pizza-filter.component';
import { PizzaItemComponent } from './components/pizza-item/pizza-item.component';
import { PizzaPageComponent } from './components/pizza-page/pizza-page.component';
import { CountryNamePipe } from './pipes/country-name.pipe';
import { PizzaStore } from './components/component-store/pizza.store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    PizzaListComponent,
    WelcomeComponent,
    PizzaFilterComponent,
    PizzaItemComponent,
    PizzaPageComponent,
    CountryNamePipe,
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule, FormsModule, ReactiveFormsModule],
  providers: [PizzaStore],
  bootstrap: [AppComponent],
})
export class AppModule {}
