import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Filter, FilterId } from '../../utils/get-filters-from-pizzas';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PizzaStore } from '../component-store/pizza.store';
import { Observable } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';

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

  public filters$: Observable<Filter[]> = this.pizzasStore.selectFilters$;
  public filterTypesControl: FormControl = new FormControl([]);
  public filterComponentsControl: FormControl = new FormControl([]);

  ngOnInit(): void {
    this.filterTypesControl.valueChanges.subscribe((values) =>
      this.pizzasStore.setActiveFilters({
        filterId: FilterId.Types,
        values,
      })
    );
    this.filterComponentsControl.valueChanges.subscribe((values) =>
      this.pizzasStore.setActiveFilters({
        filterId: FilterId.Components,
        values,
      })
    );
  }
}
