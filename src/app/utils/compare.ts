import { Pizza } from '../interfaces/pizzas.interface';

export type SelectorNumberFn<T> = (pizza: T) => number;
export type SelectorStringFn<T> = (pizza: T) => string;
export function compareNumbers<T>(selector: SelectorNumberFn<T>) {
  return (a: T, b: T, sortDirection: 'asc' | 'desc') => {
    if (sortDirection === 'asc') {
      return selector(a) - selector(b);
    }
    return selector(b) - selector(a);
  };
}

export function compareStrings<T>(selector: SelectorStringFn<T>) {
  return (a: T, b: T, sortDirection: 'asc' | 'desc') => {
    if (sortDirection === 'asc') {
      return selector(a).localeCompare(selector(b));
    }
    return selector(b).localeCompare(selector(a));
  };
}

export function compareDates<T>(selector: SelectorStringFn<T>) {
  return (a: T, b: T, sortDirection: 'asc' | 'desc') => {
    const dateA = new Date(selector(a));
    const dateB = new Date(selector(b));
    if (sortDirection === 'asc') {
      return dateA.getTime() - dateB.getTime();
    }
    return dateB.getTime() - dateA.getTime();
  };
}
