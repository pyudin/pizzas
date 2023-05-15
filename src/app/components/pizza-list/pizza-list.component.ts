import { Component, OnInit } from '@angular/core';
import { PizzaApiService } from '../../services/pizza-api.service';
import { Pizza } from '../../interfaces/pizzas.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css'],
})
export class PizzaListComponent implements OnInit {
  pizzas$: Observable<Pizza[]> = this.pizzaApi.getPizzas();

  constructor(public pizzaApi: PizzaApiService) {}

  ngOnInit(): void {}
}
