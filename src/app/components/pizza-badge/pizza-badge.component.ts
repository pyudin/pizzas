import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-pizza-badge',
  templateUrl: './pizza-badge.component.html',
  styleUrls: ['./pizza-badge.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaBadgeComponent {
  @Input()
  types?: string[];

}
