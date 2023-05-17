import { Pizza } from '../../../interfaces/pizzas.interface';

export enum FilterId {
  Types = 'TYPES',
  Components = 'COMPONENTS',
}
type FilterValue = {
  value: string;
  count: number;
};
export type Filter = {
  filterId: FilterId;
  values: FilterValue[];
};
export function getFiltersFromPizzas(pizzas: Pizza[]): Filter[] {
  // let filterOptions: Filter[] = Object.values(FilterId).map((filterId) => ({
  //   filterId,
  //   values: [],
  // }));
  // console.log(filterOptions[0].filterId === FilterId.Types);
  // filterOptions.forEach((filterOption) => {
  //   pizzas.forEach((pizza) => pizza[filterOption.filterId.toLowerCase()]);
  // });
  let filterOptions: Filter[] = [];

  filterOptions.push({
    filterId: FilterId.Types,
    values: getFilterValues(pizzas, 'types'),
  });
  filterOptions.push({
    filterId: FilterId.Components,
    values: getFilterValues(pizzas, 'components'),
  });

  return filterOptions;
}

function getFilterValues(pizzas: Pizza[], filterType: 'types' | 'components') {
  let pizzaTypes: string[] = [];
  pizzas.forEach((pizza: Pizza) => {
    pizzaTypes = [...pizzaTypes, ...pizza[filterType]];
  });
  let pizzaTypesFiltred = pizzaTypes.filter(onlyUnique);
  const typeFilterValues: FilterValue[] = [];
  pizzaTypesFiltred.forEach((filterOption) => {
    const count = pizzaTypes.filter((v) => v === filterOption).length;
    typeFilterValues.push({ value: filterOption, count });
  });
  return typeFilterValues;
}

function onlyUnique(value: any, index: number, array: string[]) {
  return array.indexOf(value) === index;
}
