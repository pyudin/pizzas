import { FilterId } from "../components/component-store/utils/get-filters-from-pizzas";

export interface Pizza {
  id: number;
  name: string;
  price: number;
  components: string[];
  types: string[];
  availableFrom: string;
  currency: string;
}

export interface ActiveFilter {
  filterId: FilterId;
  values: string[];

}