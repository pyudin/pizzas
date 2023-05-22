import { Component, Input } from '@angular/core';
import { Pizza } from '../../interfaces/pizzas.interface';
import { CommonModule } from '@angular/common';
import { PizzaBadgeComponent } from '../pizza-badge/pizza-badge.component';

@Component({
  standalone: true,
  imports: [CommonModule, PizzaBadgeComponent],
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.css'],
})
export class PizzaItemComponent {
  @Input() pizza?: Pizza;

  public trackByFn = (index: number, item: string) => item;
}
