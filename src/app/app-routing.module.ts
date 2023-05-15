import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PizzaListComponent } from './components/pizza-list/pizza-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PizzaPageComponent } from './components/pizza-page/pizza-page.component';

const routes = [
  {
    path: '',
    // redirectTo: 'pizzas-list',
    // pathMatch: 'full',
    component: WelcomeComponent,
  },
  {
    path: 'pizzas-list',
    component: PizzaListComponent,
  },
  {
    path: ':name',
    component: PizzaPageComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
