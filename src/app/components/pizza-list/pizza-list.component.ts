import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TrackByFunction,
  inject,
} from '@angular/core';
import { Pizza } from '../../interfaces/pizzas.interface';
import { Observable, tap } from 'rxjs';
import { PizzaStore } from '../component-store/pizza.store';
import { Filter } from '../../utils/get-filters-from-pizzas';
import { AsyncPipe, NgFor } from '@angular/common';
import { PizzaFilterComponent } from '../pizza-filter/pizza-filter.component';
import { PizzaItemComponent } from '../pizza-item/pizza-item.component';
import { RouterLink } from '@angular/router';
import { PizzaCreateComponent } from '../pizza-create/pizza-create.component';

@Component({
  standalone: true,
  imports: [
    NgFor,
    RouterLink,
    AsyncPipe,
    PizzaFilterComponent,
    PizzaItemComponent,
    PizzaCreateComponent,
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

  public pizzaTrackByFn: TrackByFunction<Pizza> = (index: number, pizza: Pizza): number =>
    pizza.id;
}
