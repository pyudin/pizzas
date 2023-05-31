import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BucketStore } from '../component-store/bucket.store';
import { PizzaStore } from '../component-store/pizza.store';
import { RouterLink } from '@angular/router';
import { Observable, combineLatestWith, map } from 'rxjs';
import { PizzaInBucketExtended } from 'src/app/interfaces/pizzas.interface';

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

  public dateNow = new Date();
  public selectPizzasInBucket$ = this.bucketStore.selectPizzasInBucket$;
  public selectPizzasInBucketExtended$: Observable<PizzaInBucketExtended[]> =
    this.selectPizzasInBucket$.pipe(
      combineLatestWith(this.pizzasStore.selectPizzas$),
      map(([pizzasInBucket, pizzas]) => {
        return pizzasInBucket.map((pizzaInBucket) => {
          const pizzaIndex = pizzas.findIndex(
            (p) => (p.id = pizzaInBucket.pizzaId)
          );
          const pizza: Partial<PizzaInBucketExtended> = pizzaInBucket;
          pizza.name = pizzas[pizzaIndex].name;
          pizza.price = pizzas[pizzaIndex].price;
          return pizza as PizzaInBucketExtended;
        });
      })
    );
  public getBucketPizzasCount$: Observable<number> =
    this.bucketStore.selectPizzasInBucketCount$;
  public getBucketPizzasSum$: Observable<number> =
    this.bucketStore.selectBucketPizzasSumPrice$;

  public clearBucket(): void {
    this.bucketStore.resetBucket();
  }
  public onSubmit(): void {
    console.log(this.dateNow.getHours() + ':' + this.dateNow.getMinutes());
  }

  public getMinDeliveryTime(): string {
    const minutes = this.dateNow.getMinutes();
    const hours = this.dateNow.getHours();
    const deliveryMinutes = minutes + 30;
    if (deliveryMinutes < 60) return `${hours}:${deliveryMinutes}`;
    return `${hours + 1}:${deliveryMinutes - 60}`;
  }
}
