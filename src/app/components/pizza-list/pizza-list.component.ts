import { Component, OnInit } from '@angular/core';
import { PizzaApiService } from '../../services/pizza-api.service';
import { Pizza } from '../../interfaces/pizzas.interface';
import { Observable, tap } from 'rxjs';
//import { Store } from '@ngrx/store';
//import { getPizzasRequested } from 'src/app/store/actions/pizzas.actions';
import { PizzaStore } from '../component-store/pizza.store';
import { getFiltersFromPizzas } from '../component-store/utils/get-filters-from-pizzas';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css'],
})
export class PizzaListComponent implements OnInit {
  pizzas$: Observable<Pizza[]> = this.pizzaStore.selectPizzas$.pipe(
    tap((pizzas) => getFiltersFromPizzas(pizzas))
  );

  constructor(
    public pizzaApi: PizzaApiService, // private store: Store
    private pizzaStore: PizzaStore
  ) {}

  ngOnInit(): void {
    this.pizzaStore.getPizzas();
    // this.store.dispatch(getPizzasRequested())
  }
}
