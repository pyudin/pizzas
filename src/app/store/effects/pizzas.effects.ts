import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';

import { PizzaApiService } from '../../services/pizza-api.service';
import * as PizzasActions from '../actions/pizzas.actions';
import { Pizza } from '../../interfaces/pizzas.interface';

@Injectable()
export class PizzasEffects {
  private pizzasApiService = inject(PizzaApiService);

  constructor(private actions$: Actions) {}
  
  public getPizzas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PizzasActions.getPizzasRequested),
      switchMap(() =>
        this.pizzasApiService.getPizzas().pipe(
          map((pizzas: Pizza[]) => {
            return PizzasActions.getPizzasSuccess({ pizzas });
          }),
          catchError((error) => of(PizzasActions.getPizzasFail({ error })))
        )
      )
    )
  );
}
