import { createAction, props } from '@ngrx/store';
import { Pizza } from '../../interfaces/pizzas.interface';

const prefix = 'Pizzas';

export const getPizzasRequested = createAction(
  `[${prefix}] Get pizzas requested`
);
export const getPizzasSuccess = createAction(
  `[${prefix}] Get pizzas success`,
  props<{ pizzas: Pizza[] }>()
);
export const getPizzasFail = createAction(
  `[${prefix}] Get pizzas fail`,
  props<{ error: any }>()
);
