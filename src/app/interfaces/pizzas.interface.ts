import { FilterId } from './pizza.enum';

export type Pizza = {
  id: number;
  name: string;
  price: number;
  components: string[];
  types: string[];
  availableFrom: string;
  currency: string;
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
