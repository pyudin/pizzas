import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Pizza } from '../../interfaces/pizzas.interface';
import { createReducer, on } from '@ngrx/store';
import * as PizzaActions from '../actions/pizzas.actions';

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

export const { selectIds, selectEntities, selectAll } = adapter.getSelectors();

export const pizzasReducer = createReducer<PizzaStoreState>(
  initialState,
  on(PizzaActions.getPizzasRequested, (state) => ({
    ...state,
    pizzasLoading: true,
  })),
  on(PizzaActions.getPizzasSuccess, (state, { pizzas }) => {
    return adapter.setAll(pizzas, {
      ...state,
      pizzasLoading: false,
      pizzasLoaded: true,
    });
  }),
  on(PizzaActions.getPizzasFail, (state, { error }) => ({
    ...state,
    error,
    pizzasLoading: false,
  }))
);
