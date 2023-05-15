import { Component, Input } from '@angular/core';
import { Pizza } from '../../interfaces/pizzas.interface';

@Component({
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.css'],
})
export class PizzaItemComponent {
  @Input() pizza?: Pizza;
}
