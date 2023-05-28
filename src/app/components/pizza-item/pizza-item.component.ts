import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TrackByFunction,
} from '@angular/core';
import { Pizza } from '../../interfaces/pizzas.interface';
import { NgFor } from '@angular/common';
import { PizzaBadgeComponent } from '../pizza-badge/pizza-badge.component';

@Component({
  standalone: true,
  imports: [NgFor, PizzaBadgeComponent],
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaItemComponent {
  @Input() pizza?: Pizza;

  public trackByFn: TrackByFunction<string> = (index: number, item: string) =>
    item;
}
