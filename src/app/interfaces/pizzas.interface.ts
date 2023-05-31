import { FilterId } from './pizza.enum';

export type Pizza = {
  id: number;
  name: string;
  price: number;
  components: string[];
  types: string[];
  availableFrom: string;
  currency: string;
  pic: string;
  description: string;
};

export type ActiveFilter = {
  filterId: FilterId;
  values: string[];
};

export type FilterValue = {
  value: string;
  count: number;
};

export type Filter = {
  filterId: FilterId;
  values: FilterValue[];
};

export type PizzaInBucket = {
  pizzaId: number;
  count: number;
};
export type PizzaInBucketExtended = {
  pizzaId: number;
  count: number;
  name: string;
  price: number;
};
