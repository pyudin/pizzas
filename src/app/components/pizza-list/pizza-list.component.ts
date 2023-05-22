import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction, inject } from '@angular/core';
import { Pizza } from '../../interfaces/pizzas.interface';
import { Observable } from 'rxjs';
import { PizzaStore } from '../component-store/pizza.store';
import { Filter } from '../component-store/utils/get-filters-from-pizzas';
import { AsyncPipe, NgFor } from '@angular/common';
import { PizzaFilterComponent } from '../pizza-filter/pizza-filter.component';
import { PizzaItemComponent } from '../pizza-item/pizza-item.component';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    NgFor,
    RouterLink,
    AsyncPipe,
    PizzaFilterComponent,
    PizzaItemComponent,
  ],
  providers: [PizzaStore],
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
