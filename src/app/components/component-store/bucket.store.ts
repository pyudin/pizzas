import { Injectable, inject } from '@angular/core';
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

@Injectable()
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
        return acc + p.count * (pizzasEntity[p.pizzaId]?.price ?? 0);
      }, 0);
    })
  );

  constructor() {
    super(initialState);
  }

  public addPizzaToBucket = (pizzaId: number, count: number) => {
    this.patchState((state) => {
      const pizzasInBucket = state.orderedPizzas;
      const newPizzaIndex = pizzasInBucket.findIndex(
        (p) => p.pizzaId === pizzaId
      );
      if (newPizzaIndex === -1) {
        pizzasInBucket.push({ pizzaId, count });
      } else {
        pizzasInBucket[newPizzaIndex].count =
          pizzasInBucket[newPizzaIndex].count + count;
      }
      return { orderedPizzas: pizzasInBucket };
    });
  };
  public resetBucket = () => this.patchState({ orderedPizzas: [] });
}
