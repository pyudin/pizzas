import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { ActiveFilter, Pizza } from '../../interfaces/pizzas.interface';
import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { PizzaApiService } from '../../services/pizza-api.service';
import {
  Filter,
  FilterId,
  getFiltersFromPizzas,
} from './utils/get-filters-from-pizzas';

export interface PizzaStoreState extends EntityState<Pizza> {
  pizzasLoaded: boolean;
  pizzasLoading: boolean;
  activeFilters: ActiveFilter[];
  filters: Filter[];
  error: any;
}

const adapter: EntityAdapter<Pizza> = createEntityAdapter<Pizza>({
  selectId: (pizza) => pizza.id,
});

export const initialState: PizzaStoreState = adapter.getInitialState({
  pizzasLoaded: false,
  pizzasLoading: false,
  activeFilters: [],
  filters: [],
  error: null,
});

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

@Injectable()
export class PizzaStore extends ComponentStore<PizzaStoreState> {
  private readonly pizzaApiService = inject(PizzaApiService);
  public selectPizzas$ = this.select(selectAll);
  public pizzasAvailableCount$ = this.select(selectTotal);
  public isAvailablePizza$ = this.select(
    this.pizzasAvailableCount$,
    (count) => count > 0
  );
  public selectFilters$ = this.select((state) => state.filters);
  public selectActiveFilters$ = this.select((state) => state.activeFilters);
  public selectPizzasWithFilters$ = this.select(
    this.selectPizzas$,
    this.selectActiveFilters$,
    (pizzas, activeFilters) => {
      const filteredPizzas = pizzas
        .filter((pizza) => {
          let pizzaTypeFit: boolean = true;
          const typesFilter = activeFilters.filter(
            (f) => f.filterId === FilterId.Types
          );
          if (!!typesFilter.length) {
            if (typesFilter[0].values[0] === '') return pizzaTypeFit;
            pizzaTypeFit = pizza.types.includes(typesFilter[0].values[0]);
          }
          return pizzaTypeFit;
        })
        .filter((pizza) => {
          let pizzaComponentFit: boolean = true;
          const componentsFilter = activeFilters.filter(
            (f) => f.filterId === FilterId.Components
          );
          if (!!componentsFilter.length) {
            if (componentsFilter[0].values[0] === '') return componentsFilter;
            pizzaComponentFit = pizza.components.includes(
              componentsFilter[0].values[0]
            );
          }
          return pizzaComponentFit;
        });
      return filteredPizzas;
    }
  );

  constructor() {
    super(initialState);
  }

  public setActiveFilters = (newFilter: ActiveFilter): void => {
    this.patchState((state) => {
      const newState = {
        ...state,
        activeFilters: [
          ...state.activeFilters.filter(
            (f) => f.filterId !== newFilter.filterId
          ),
          newFilter,
        ],
      };
      // console.log(newState);
      return newState;
    });
  };

  public getPizzas = this.effect<void>((void$: Observable<void>) => {
    return void$.pipe(
      tap({
        next: () => {
          this.patchState((state) => ({ pizzasLoading: true }));
        },
      }),
      switchMap(() => {
        return this.pizzaApiService.getPizzas().pipe(
          tapResponse(
            (pizzas) => {
              this.patchState((state) => {
                return adapter.upsertMany(pizzas, {
                  ...state,
                  pizzasLoading: false,
                  pizzasLoaded: true,
                  filters: getFiltersFromPizzas(pizzas),
                });
              });
            },
            (error) => {
              this.patchState({ error, pizzasLoading: false });
            }
          )
        );
      })
    );
  });
}
