import { Component, OnInit, TrackByFunction, inject } from '@angular/core';
import { PizzaApiService } from '../../services/pizza-api.service';
import { Pizza } from '../../interfaces/pizzas.interface';
import { Observable, tap } from 'rxjs';
import { PizzaStore } from '../component-store/pizza.store';
import {
  Filter,
  getFiltersFromPizzas,
} from '../component-store/utils/get-filters-from-pizzas';
import { CommonModule } from '@angular/common';
import { PizzaFilterComponent } from '../pizza-filter/pizza-filter.component';
import { PizzaItemComponent } from '../pizza-item/pizza-item.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, PizzaFilterComponent, PizzaItemComponent],
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css'],
})
export class PizzaListComponent implements OnInit {
  private pizzaStore = inject(PizzaStore);

  public pizzas$: Observable<Pizza[]> =
    this.pizzaStore.selectPizzasWithFilters$;
  public filters$: Observable<Filter[]> = this.pizzaStore.selectFilters$;

  constructor() {}

  ngOnInit(): void {
    this.pizzaStore.getPizzas();
  }

  public pizzaTrackByFn: TrackByFunction<any> = (index: number, pizza): any =>
    pizza.id;
}
