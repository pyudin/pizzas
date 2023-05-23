import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Pizza } from '../interfaces/pizzas.interface';
import { PizzaType } from '../interfaces/pizza.enum';

@Injectable({
  providedIn: 'root',
})
export class PizzaApiService {
  private pizzas: Pizza[] = [
    {
      id: 1,
      name: 'Margarita',
      price: 146,
      components: ['tomato sauce', 'mozzarella cheese', 'basil'],
      types: [PizzaType.VEGAN],
      availableFrom: '18-5-2023',
      currency: 'UAH',
    },
    {
      id: 2,
      name: 'Papperoni',
      price: 160,
      components: ['pizza sauce', 'mozzarella cheese', 'pepperoni'],
      types: [PizzaType.HOT, PizzaType.MEAT],
      availableFrom: '14-5-2023',
      currency: 'UAH',
    },
    {
      id: 3,
      name: 'Havaiska',
      price: 138,
      components: ['pizza sauce', 'mozzarella cheese', 'chicken', 'pineapple'],
      types: [PizzaType.HOT],
      availableFrom: '22-5-2023',
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
      availableFrom: '29-5-2023',
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
      availableFrom: '13-5-2023',
      currency: 'UAH',
    },
    {
      id: 6,
      name: 'Sicilian Pizza',
      price: 158,
      components: ['onions', 'anchovies', 'tomatoes', 'herbs', 'strong cheese'],
      types: [PizzaType.VEGAN],
      availableFrom: '14-5-2023',
      currency: 'UAH',
    },
    {
      id: 7,
      name: 'New York-Style Pizza',
      price: 164,
      components: [
        'tomato sauce',
        'mozzarella cheese',
        'pepperoni',
        'sausage',
        'mushroom',
        'anchovies',
      ],
      types: [PizzaType.MEAT],
      availableFrom: '18-5-2023',
      currency: 'UAH',
    },
    {
      id: 8,
      name: 'Pizza ortolana',
      price: 154,
      components: ['tomato sauce', 'mozzarella cheese', 'eggplant', 'zucchini'],
      types: [PizzaType.VEGAN],
      availableFrom: '19-5-2023',
      currency: 'UAH',
    },
  ];

  public getPizzas(): Observable<Pizza[]> {
    return of(this.pizzas);
  }

  public addPizza(pizza: Partial<Pizza>): Observable<Pizza> {
    const newId = this.pizzas[this.pizzas.length - 1].id + 1;
    this.pizzas.push({ ...pizza, id: newId } as Pizza);
    console.log(this.pizzas);
    return of({ ...pizza, id: newId } as Pizza);
  }
}
