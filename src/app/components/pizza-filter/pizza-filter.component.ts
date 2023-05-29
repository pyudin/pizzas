import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PizzaStore } from '../component-store/pizza.store';
import { Observable } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { AsyncPipe, NgIf } from '@angular/common';
import { Filter } from 'src/app/interfaces/pizzas.interface';
import { FilterId } from 'src/app/interfaces/pizza.enum';

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe, NgSelectModule, ReactiveFormsModule],
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
}
