import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PizzaStore } from './components/component-store/pizza.store';
import { BucketStore } from './components/component-store/bucket.store';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [PizzaStore, BucketStore],
  bootstrap: [AppComponent],
})
export class AppModule {}
