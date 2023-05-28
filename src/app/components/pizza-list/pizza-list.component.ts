import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TrackByFunction,
  inject,
} from '@angular/core';
import { Filter, Pizza } from '../../interfaces/pizzas.interface';
import { Observable, tap } from 'rxjs';
import { PizzaStore } from '../component-store/pizza.store';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { PizzaFilterComponent } from '../pizza-filter/pizza-filter.component';
import { PizzaItemComponent } from '../pizza-item/pizza-item.component';
import { RouterLink } from '@angular/router';
import { PizzaCreateComponent } from '../pizza-create/pizza-create.component';
import { PizzaBadgeComponent } from '../pizza-badge/pizza-badge.component';
import { PizzaBucketComponent } from '../pizza-bucket/pizza-bucket.component';
import { BucketStore } from '../component-store/bucket.store';

@Component({
  standalone: true,
  imports: [
    NgFor,
    RouterLink,
    AsyncPipe,
    JsonPipe,
    PizzaFilterComponent,
    PizzaItemComponent,
    PizzaCreateComponent,
    PizzaBadgeComponent,
    PizzaBucketComponent,
  ],
  providers: [],
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

  public pizzaTrackByFn: TrackByFunction<Pizza> = (
    index: number,
    pizza: Pizza
  ): number => pizza.id;
  public trackByFn: TrackByFunction<string> = (index: number, item: string) =>
    item;
}
