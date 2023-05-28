import { inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { PizzaInBucket } from 'src/app/interfaces/pizzas.interface';
import { PizzaStore } from './pizza.store';
import { map, withLatestFrom } from 'rxjs';

export interface BucketStoreState {
  orderedPizzas: PizzaInBucket[];
}

export const initialState: BucketStoreState = {
  orderedPizzas: [],
};

export class BucketStore extends ComponentStore<BucketStoreState> {
  private pizzasStore = inject(PizzaStore);
  public selectPizzasInBucketCount$ = this.select((state) =>
    state.orderedPizzas.reduce((count, pizza) => {
      return count + pizza.count;
    }, 0)
  );
  public selectPizzasInBucket$ = this.select((state) => state.orderedPizzas);
  public selectBucketPizzasSumPrice$ = this.select(
    (state) => state.orderedPizzas
  ).pipe(
    withLatestFrom(this.pizzasStore.selectPizzasEntities$),
    map(([pizzasInBucket, pizzasEntity]) => {
      return pizzasInBucket.reduce((acc, p) => {
        return acc + p.count * (pizzasEntity[p.pizzaId]?.price ?? 0)
      }, 0)
    })
  );

  constructor() {
    super(initialState);
  }

  public addPizzaToBucket = (pizzaId: number, count: number) => {
    this.patchState((state) => {
      const pizzasInBucket = state.orderedPizzas;
      const newPizza: boolean = !pizzasInBucket.filter(
        (p) => p.pizzaId === pizzaId
      ).length;
      if (newPizza) {
        pizzasInBucket.push({ pizzaId, count });
      } else {
        const indexOfExistingPizza = pizzasInBucket.findIndex(
          (pizzaInBucket) => pizzaInBucket.pizzaId === pizzaId
        );
        pizzasInBucket[indexOfExistingPizza].count =
          pizzasInBucket[indexOfExistingPizza].count + count;
      }
      return { ...state, orderedPizzas: pizzasInBucket };
    });
  };
  public resetBucket = () => this.patchState({ orderedPizzas: [] });
}
