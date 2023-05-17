import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Pizza } from '../../interfaces/pizzas.interface';
import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { PizzaApiService } from '../../services/pizza-api.service';

export interface PizzaStoreState extends EntityState<Pizza> {
  pizzasLoaded: boolean;
  pizzasLoading: boolean;
  error: any;
}

const adapter: EntityAdapter<Pizza> = createEntityAdapter<Pizza>({
  selectId: (pizza) => pizza.id,
});

export const initialState: PizzaStoreState = adapter.getInitialState({
  pizzasLoaded: false,
  pizzasLoading: false,
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

  constructor() {
    super(initialState);
  }

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
