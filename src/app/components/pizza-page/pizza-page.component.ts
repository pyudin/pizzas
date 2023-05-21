import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-pizza-page',
  templateUrl: './pizza-page.component.html',
  styleUrls: ['./pizza-page.component.css'],
})
export class PizzaPageComponent implements OnInit {
  public pizzaName?: string | null;

  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.pizzaName = this.route.snapshot.paramMap.get('name');
  }
}
