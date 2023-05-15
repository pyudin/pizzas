import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Pizza } from '../../interfaces/pizzas.interface';

export interface PizzaListStore extends EntityState<Pizza> {
  pizzasLoaded: boolean;
  pizzasLoading: boolean;
}
