import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BucketStore } from '../component-store/bucket.store';
import { PizzaStore } from '../component-store/pizza.store';
import { RouterLink } from '@angular/router';
import {
  Observable,
  combineLatest,
  combineLatestWith,
  filter,
  map,
} from 'rxjs';
import { PizzaInBucket } from 'src/app/interfaces/pizzas.interface';

@Component({
  selector: 'app-pizza-bucket-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pizza-bucket-page.component.html',
  styleUrls: ['./pizza-bucket-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaBucketPageComponent {
  public bucketStore = inject(BucketStore);
  public pizzasStore = inject(PizzaStore);

  public selectPizzasInBucket$ = this.bucketStore.selectPizzasInBucket$;
  public getPizzaNameById = (id: number) =>
    this.pizzasStore.selectPizzaNameById(id);
  public getPizzaPriceById = (id: number) =>
    this.pizzasStore.selectPizzaPriceById(id);
  public getPizzaPriceSum = (id: number): Observable<number> =>
    this.selectPizzasInBucket$.pipe(
      combineLatestWith(this.getPizzaPriceById(id)),
      map(
        ([pizzasInBucket, price]) =>
          pizzasInBucket.filter(
            (pizzaInBucket) => pizzaInBucket.pizzaId === id
          )[0].count * price
      )
    );
  public getBucketPizzasCount$: Observable<number> =
    this.bucketStore.selectPizzasInBucketCount$;
  public getBucketPizzasSum$: Observable<number> =
    this.bucketStore.selectBucketPizzasSumPrice$;

  public clearBucket(): void {
    this.bucketStore.resetBucket();
  }
}
