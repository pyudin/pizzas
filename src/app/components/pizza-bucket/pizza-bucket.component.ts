import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { BucketStore } from '../component-store/bucket.store';
import { CommonModule } from '@angular/common';
import { filter, take } from 'rxjs';
import { PizzaStore } from '../component-store/pizza.store';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-pizza-bucket',
  templateUrl: './pizza-bucket.component.html',
  styleUrls: ['./pizza-bucket.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PizzaBucketComponent {
  @HostListener('document:click', ['$event']) onDocumentClick() {
    this.showBucketDetails = false;
  }
  public bucketStore = inject(BucketStore);
  public pizzasStore = inject(PizzaStore);

  public pizzaCount$ = this.bucketStore.selectPizzasInBucketCount$;
  public selectPizzasInBucket$ = this.bucketStore.selectPizzasInBucket$;
  public showBucketDetails = false;

  public getPizzaNameById = (id: number) =>
    this.pizzasStore.selectPizzaNameById(id);

  public openDetails(): void {
    this.pizzaCount$
      .pipe(
        filter((count) => count > 0),
        take(1)
      )
      .subscribe(() => {
        this.showBucketDetails = !this.showBucketDetails;
      });
  }
  public clearBucket(): void {
    this.bucketStore.resetBucket();
    this.showBucketDetails = !this.showBucketDetails;
  }
  public hideBucket(): void {
    this.showBucketDetails = !this.showBucketDetails;
  }
}
