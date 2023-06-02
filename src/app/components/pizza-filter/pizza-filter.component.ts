import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PizzaStore } from '../component-store/pizza.store';
import { filter, map, Observable, take } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Filter, PizzaSorting } from 'src/app/interfaces/pizzas.interface';
import { FilterId, Sorting } from 'src/app/interfaces/pizza.enum';

@Component({
  standalone: true,
  imports: [CommonModule, NgSelectModule, ReactiveFormsModule],
  selector: 'app-pizza-filter',
  templateUrl: './pizza-filter.component.html',
  styleUrls: ['./pizza-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaFilterComponent implements OnInit {
  private pizzasStore = inject(PizzaStore);

  public Sorting = Sorting;

  public filters$: Observable<Filter[]> = this.pizzasStore.selectFilters$;
  public sorting$: Observable<PizzaSorting> =
    this.pizzasStore.selectPizzasSort$;

  public filterTypesControl: FormControl = new FormControl([]);
  public filterComponentsControl: FormControl = new FormControl([]);

  ngOnInit(): void {
    this.filterTypesControl.valueChanges.subscribe((values) =>
      this.pizzasStore.setActiveFilters({
        filterId: FilterId.TYPES,
        values,
      })
    );
    this.filterComponentsControl.valueChanges.subscribe((values) =>
      this.pizzasStore.setActiveFilters({
        filterId: FilterId.COMPONENTS,
        values,
      })
    );
  }

  public setSortingByName() {
    this.pizzasStore.setSorting(Sorting.NAME);
  }
  public setSortingByPrice() {
    this.pizzasStore.setSorting(Sorting.PRICE);
  }
  public setSortingByDate() {
    this.pizzasStore.setSorting(Sorting.AVAILABLE_DATE);
  }
  public showSortingIcon(field: Sorting): Observable<'asc' | 'desc'> {
    return this.sorting$.pipe(
      filter((sorting) => sorting.field === field),
      map((sorting) => sorting.direction)
    );
  }
}
