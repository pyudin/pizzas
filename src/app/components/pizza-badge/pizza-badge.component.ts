import { NgFor, NgSwitch, NgSwitchCase } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TrackByFunction } from '@angular/core';

@Component({
  standalone: true,
  imports: [NgFor, NgSwitch, NgSwitchCase],
  selector: 'app-pizza-badge',
  templateUrl: './pizza-badge.component.html',
  styleUrls: ['./pizza-badge.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaBadgeComponent {
  @Input()
  public types?: string[];

  public trackByFn: TrackByFunction<string>= (index: number, item: string) => item;
}
