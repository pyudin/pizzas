import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-pizza-page',
  templateUrl: './pizza-page.component.html',
  styleUrls: ['./pizza-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaPageComponent implements OnInit {
  private route = inject(ActivatedRoute);

  public pizzaName?: string | null;

  constructor() {}
  ngOnInit() {
    this.pizzaName = this.route.snapshot.paramMap.get('name');
  }
}
