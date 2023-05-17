import { Component, Input, OnInit } from '@angular/core';
import {
  Filter,
  FilterId,
} from '../component-store/utils/get-filters-from-pizzas';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { PizzaStore } from '../component-store/pizza.store';

@Component({
  selector: 'app-pizza-filter',
  templateUrl: './pizza-filter.component.html',
  styleUrls: ['./pizza-filter.component.css'],
})
export class PizzaFilterComponent implements OnInit {
  @Input()
  filters: Filter[] | null = [];
  filterTypesControl: FormControl;
  filterComponentsControl: FormControl;
  public pizzasWithFilters$ =
    this.pizzasStore.selectPizzasWithFilters$.subscribe();

  constructor(private pizzasStore: PizzaStore, private fb: FormBuilder) {
    this.filterTypesControl = new FormControl('types');
    this.filterComponentsControl = new FormControl('components');
  }

  ngOnInit(): void {
    this.filterTypesControl.valueChanges.subscribe((value) =>
      this.pizzasStore.setActiveFilters({
        filterId: FilterId.Types,
        values: [value],
      })
    );
    this.filterComponentsControl.valueChanges.subscribe((value) =>
      this.pizzasStore.setActiveFilters({
        filterId: FilterId.Components,
        values: [value],
      })
    );
  }
}
