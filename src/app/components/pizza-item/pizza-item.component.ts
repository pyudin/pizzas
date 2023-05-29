import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  TrackByFunction,
  inject,
} from '@angular/core';
import { Pizza } from '../../interfaces/pizzas.interface';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { PizzaBadgeComponent } from '../pizza-badge/pizza-badge.component';
import { BucketStore } from '../component-store/bucket.store';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, NgClass, ReactiveFormsModule, PizzaBadgeComponent],
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaItemComponent {
  @Input() pizza?: Pizza;
  public bucketStore = inject(BucketStore);

  public orderedNumber = new FormControl();
  public showDetails = false;

  public addPizzaToBucket(): void {
    if (!this.orderedNumber.value) return;
    this.bucketStore.addPizzaToBucket(
      this.pizza?.id as number,
      this.orderedNumber.value
    );
    this.orderedNumber.setValue('');
  }

  public trackByFn: TrackByFunction<string> = (index: number, item: string) =>
    item;
}
