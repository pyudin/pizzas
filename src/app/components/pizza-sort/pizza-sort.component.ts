import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza-sort',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pizza-sort.component.html',
  styleUrls: ['./pizza-sort.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaSortComponent {

}
