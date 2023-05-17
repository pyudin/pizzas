import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Pizza } from '../interfaces/pizzas.interface';
import { PizzaType } from '../interfaces/pizza.enum';

@Injectable({
  providedIn: 'root',
})
export class PizzaApiService {
  constructor() {}

  public getPizzas(): Observable<Pizza[]> {
    return of([
      {
        id: 1,
        name: 'Margarita',
        price: 146,
        components: ['tomato sauce', 'mozzarella cheese', 'basil'],
        types: [PizzaType.VEGAN],
        availableFrom: 'time',
        currency: 'UAH',
      },
      {
        id: 2,
        name: 'Papperoni',
        price: 160,
        components: ['pizza sauce', 'mozzarella cheese', 'pepperoni'],
        types: [PizzaType.HOT, PizzaType.MEAT],
        availableFrom: 'time',
        currency: 'UAH',
      },
      {
        id: 3,
        name: 'Havaiska',
        price: 138,
        components: [
          'pizza sauce',
          'mozzarella cheese',
          'chicken',
          'pineapple',
        ],
        types: [PizzaType.HOT, PizzaType.MEAT],
        availableFrom: 'time',
        currency: 'UAH',
      },
      {
        id: 4,
        name: 'Chicago pizza',
        price: 151,
        components: [
          'crumbled sausage',
          'ham',
          'bacon',
          'mushrooms',
          'black olives',
          'onions',
        ],
        types: [PizzaType.MEAT],
        availableFrom: 'time',
        currency: 'UAH',
      },
      {
        id: 5,
        name: 'California pizza',
        price: 154,
        components: [
          'chicken',
          'peanut sauce',
          'artichoke hearts',
          'goat cheese',
        ],
        types: [],
        availableFrom: 'time',
        currency: 'UAH',
      },
    ]);
  }
}
