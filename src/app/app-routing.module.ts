import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserAdminGuard } from './guards/user-admin.guard';

const routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/welcome/welcome.component').then(
        (m) => m.WelcomeComponent
      ),
  },
  {
    path: 'pizzas-list',
    loadComponent: () =>
      import('./components/pizza-list/pizza-list.component').then(
        (m) => m.PizzaListComponent
      ),
  },
  {
    path: 'bucket',
    loadComponent: () =>
      import('./components/pizza-bucket-page/pizza-bucket-page.component').then(
        (m) => m.PizzaBucketPageComponent
      ),
  },
  {
    path: 'reporting',
    canMatch: [UserAdminGuard],
    loadComponent: () =>
      import('./components/reporting-page/reporting-page.component').then(
        (m) => m.ReportingPageComponent
      ),
  },
  {
    path: 'reporting',
    loadComponent: () =>
      import('./components/access-denied/access-denied.component').then(
        (m) => m.AccessDeniedComponent
      ),
  },
  {
    path: ':name',
    loadComponent: () =>
      import('./components/pizza-page/pizza-page.component').then(
        (m) => m.PizzaPageComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
