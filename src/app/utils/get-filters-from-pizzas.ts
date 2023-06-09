import { FilterId } from '../interfaces/pizza.enum';
import { Filter, FilterValue, Pizza } from '../interfaces/pizzas.interface';

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
    filterId: FilterId.TYPES,
    values: getFilterValues(pizzas, 'types'),
  });
  filterOptions.push({
    filterId: FilterId.COMPONENTS,
    values: getFilterValues(pizzas, 'components'),
  });

  return filterOptions;
}

function getFilterValues(pizzas: Pizza[], filterType: 'types' | 'components') {
  let pizzaTypes: string[] = [];
  pizzas.forEach((pizza: Pizza) => {
    pizzaTypes = [...pizzaTypes, ...pizza[filterType]];
  });
  let pizzaTypesUnique = pizzaTypes.filter(onlyUnique);
  const typeFilterValues: FilterValue[] = [];
  pizzaTypesUnique.forEach((filterOption) => {
    const count = pizzaTypes.filter((v) => v === filterOption).length;
    typeFilterValues.push({ value: filterOption, count });
  });
  return typeFilterValues;
}

function onlyUnique(value: any, index: number, array: string[]) {
  return array.indexOf(value) === index;
}
