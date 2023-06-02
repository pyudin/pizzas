import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pizza } from '../interfaces/pizzas.interface';
import { PizzaType } from '../interfaces/pizza.enum';

@Injectable({
  providedIn: 'root',
})
export class PizzaApiService {
  private pizzas: Pizza[] = pizzasList;

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

const pizzasList = [
  {
    id: 1,
    name: 'Margarita',
    price: 146,
    components: ['tomato sauce', 'mozzarella cheese', 'basil'],
    types: [PizzaType.VEGAN],
    availableFrom: '2023-5-18',
    currency: 'UAH',
    pic: './../../../assets/margherita-pizza.jpg',
    description:
      'Pizza Margherita (pronounced mahr-geh-ree-tah) is basically a Neapolitan pizza, typically made with tomatoes, mozzarella cheese, garlic, fresh basil, and extra-virgin olive oil. I think of it as a sophisticated version of your basic cheese pizza and also a wonderful Caprese salad, but with a crust.',
  },
  {
    id: 2,
    name: 'Papperoni',
    price: 160,
    components: ['pizza sauce', 'mozzarella cheese', 'pepperoni'],
    types: [PizzaType.HOT, PizzaType.MEAT],
    availableFrom: '2023-5-14',
    currency: 'UAH',
    pic: './../../../assets/pepperoni-pizza.jpg',
    description:
      "Pepperoni pizza is an American pizza variety which includes one of the country's most beloved toppings. Pepperoni is actually a corrupted form of peperoni (one “p”), which denotes a large pepper in Italian, but nowadays it denotes a spicy salami, usually made with a mixture of beef, pork, and spices. \n The popularity of pepperoni pizza had only started to rise in the 1950s. Nowadays, beef pepperoni pizza is the most popular pizza variety, but there are also versions such as fish pepperoni pizza and port pepperoni pizza. The preparation varies from one state to another, but the popularity of this pizza has made it a staple across the United States, and it’s usually prepared simply with mozzarella, tomato sauce, and pepperoni.",
  },
  {
    id: 3,
    name: 'Havaiska',
    price: 138,
    components: ['pizza sauce', 'mozzarella cheese', 'chicken', 'pineapple'],
    types: [PizzaType.HOT],
    availableFrom: '2023-5-22',
    currency: 'UAH',
    pic: '',
    description:
      'Pizza Margherita (pronounced mahr-geh-ree-tah) is basically a Neapolitan pizza, typically made with tomatoes, mozzarella cheese, garlic, fresh basil, and extra-virgin olive oil. I think of it as a sophisticated version of your basic cheese pizza and also a wonderful Caprese salad, but with a crust.',
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
    availableFrom: '2023-5-29',
    currency: 'UAH',
    pic: '',
    description:
      'Pizza Margherita (pronounced mahr-geh-ree-tah) is basically a Neapolitan pizza, typically made with tomatoes, mozzarella cheese, garlic, fresh basil, and extra-virgin olive oil. I think of it as a sophisticated version of your basic cheese pizza and also a wonderful Caprese salad, but with a crust.',
  },
  {
    id: 5,
    name: 'California pizza',
    price: 154,
    components: ['chicken', 'peanut sauce', 'artichoke hearts', 'goat cheese'],
    types: [],
    availableFrom: '2023-5-13',
    currency: 'UAH',
    pic: '',
    description:
      'Pizza Margherita (pronounced mahr-geh-ree-tah) is basically a Neapolitan pizza, typically made with tomatoes, mozzarella cheese, garlic, fresh basil, and extra-virgin olive oil. I think of it as a sophisticated version of your basic cheese pizza and also a wonderful Caprese salad, but with a crust.',
  },
  {
    id: 6,
    name: 'Sicilian Pizza',
    price: 158,
    components: ['onions', 'anchovies', 'tomatoes', 'herbs', 'strong cheese'],
    types: [PizzaType.VEGAN],
    availableFrom: '2023-5-14',
    currency: 'UAH',
    pic: '',
    description:
      'Pizza Margherita (pronounced mahr-geh-ree-tah) is basically a Neapolitan pizza, typically made with tomatoes, mozzarella cheese, garlic, fresh basil, and extra-virgin olive oil. I think of it as a sophisticated version of your basic cheese pizza and also a wonderful Caprese salad, but with a crust.',
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
    availableFrom: '2023-5-18',
    currency: 'UAH',
    pic: '',
    description:
      'Pizza Margherita (pronounced mahr-geh-ree-tah) is basically a Neapolitan pizza, typically made with tomatoes, mozzarella cheese, garlic, fresh basil, and extra-virgin olive oil. I think of it as a sophisticated version of your basic cheese pizza and also a wonderful Caprese salad, but with a crust.',
  },
  {
    id: 8,
    name: 'Pizza ortolana',
    price: 154,
    components: ['tomato sauce', 'mozzarella cheese', 'eggplant', 'zucchini'],
    types: [PizzaType.VEGAN],
    availableFrom: '2023-5-19',
    currency: 'UAH',
    pic: '',
    description:
      'Pizza Margherita (pronounced mahr-geh-ree-tah) is basically a Neapolitan pizza, typically made with tomatoes, mozzarella cheese, garlic, fresh basil, and extra-virgin olive oil. I think of it as a sophisticated version of your basic cheese pizza and also a wonderful Caprese salad, but with a crust.',
  },
];
