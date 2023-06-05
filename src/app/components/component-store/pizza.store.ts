import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  ActiveFilter,
  Filter,
  FilterValue,
  Pizza,
  PizzaSorting,
} from '../../interfaces/pizzas.interface';
import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { PizzaApiService } from '../../services/pizza-api.service';
import { getFiltersFromPizzas } from '../../utils/get-filters-from-pizzas';
import { FilterId, Sorting } from 'src/app/interfaces/pizza.enum';
import { isNonNullish } from 'src/app/utils/nullish-check';
import {
  compareDates,
  compareNumbers,
  compareStrings,
  SelectorNumberFn,
  SelectorStringFn,
} from 'src/app/utils/compare';

export interface PizzaStoreState extends EntityState<Pizza> {
  pizzasLoaded: boolean;
  pizzasLoading: boolean;
  activeFilters: ActiveFilter[];
  filters: Filter[];
  sorting: PizzaSorting;
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
  sorting: { field: Sorting.NAME, direction: 'asc' },
  error: null,
});

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

type filterCheckFn = (pizza: Pizza, values: string[]) => boolean;
type filterFitMappers = {
  [key in FilterId]: filterCheckFn;
};
const isTypeFitFn: filterCheckFn = (pizza: Pizza, values: string[]) => {
  for (let i = 0; i < values.length; i++) {
    if (pizza.types.includes(values[i])) return true;
  }
  if (!values.length) return true;
  return false;
};
const isComponentFitFn: filterCheckFn = (pizza: Pizza, values: string[]) => {
  for (let i = 0; i < values.length; i++) {
    if (pizza.components.includes(values[i])) return true;
  }
  if (!values.length) return true;
  return false;
};

const isFilterFit: filterFitMappers = {
  [FilterId.TYPES]: isTypeFitFn,
  [FilterId.COMPONENTS]: isComponentFitFn,
};
type PizzaSortFn = (
  pizzaA: Pizza,
  pizzaB: Pizza,
  direction: 'asc' | 'desc'
) => number;
type PizzasSortMapper = {
  [key in Sorting]: PizzaSortFn;
};
const getName: SelectorStringFn<Pizza> = (pizza: Pizza) => pizza.name;
const getPrice: SelectorNumberFn<Pizza> = (pizza: Pizza) => pizza.price;
const getAvailableDate: SelectorStringFn<Pizza> = (pizza: Pizza) =>
  pizza.availableFrom;
const pizzaSortFn: PizzasSortMapper = {
  [Sorting.NAME]: compareStrings(getName),
  [Sorting.PRICE]: compareNumbers(getPrice),
  [Sorting.AVAILABLE_DATE]: compareDates(getAvailableDate),
};

@Injectable()
export class PizzaStore extends ComponentStore<PizzaStoreState> {
  private readonly pizzaApiService = inject(PizzaApiService);

  public selectPizzas$ = this.select(selectAll);
  public selectPizzasEntities$ = this.select(selectEntities);

  public selectFilters$ = this.select((state) => state.filters);
  public selectActiveFilters$ = this.select((state) => state.activeFilters);
  public selectPizzasWithFilters$ = this.select(
    this.selectPizzas$,
    this.selectActiveFilters$,
    (pizzas, activeFilters) =>
      pizzas.filter((pizza) =>
        activeFilters.every((filter) => {
          const filterFn = isFilterFit[filter.filterId];
          return filterFn(pizza, filter.values);
        })
      )
  );
  public selectPizzasSort$ = this.select((state) => state.sorting);
  public selectPizzasWithSortAndFilter$ = this.select(
    this.selectPizzasWithFilters$,
    this.selectPizzasSort$,
    (pizzas, sorting) =>
      pizzas.sort((a, b) => pizzaSortFn[sorting.field](a, b, sorting.direction))
  );
  public selectTypes$: Observable<FilterValue[]> = this.select(
    (state) =>
      state.filters.filter((filter) => filter.filterId === FilterId.TYPES)[0]
        .values
  );
  public selectComponents$ = this.select(
    (state) =>
      state.filters.filter(
        (filter) => filter.filterId === FilterId.COMPONENTS
      )[0].values
  );
  public selectPizzaNameById = (id: number): Observable<string> =>
    this.select(this.selectPizzasEntities$, (pizzasEntity) => {
      return pizzasEntity[id]?.name;
    }).pipe(filter(isNonNullish));

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
      return newState;
    });
  };
  public setSorting = (sortingField: Sorting) => {
    this.patchState((state) => {
      if (sortingField === state.sorting.field) {
        if (state.sorting.direction === 'asc')
          return { sorting: { field: sortingField, direction: 'desc' } };
        else return { sorting: { field: sortingField, direction: 'asc' } };
      }
      return { sorting: { field: sortingField, direction: 'asc' } };
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

  public createPizza = this.effect<Partial<Pizza>>((pizza$) => {
    return pizza$.pipe(
      switchMap((newPizzaRef) =>
        this.pizzaApiService.addPizza(newPizzaRef).pipe(
          tapResponse(
            (newPizza) => {
              this.patchState((state) => adapter.addOne(newPizza, state));
            },
            (error) => {
              this.patchState({ error });
            }
          )
        )
      )
    );
  });
}
