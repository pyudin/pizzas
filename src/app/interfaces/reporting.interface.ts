export type IFilterValue = {
  value: string;
  count: number;
};

export type IFilter = {
  id: string;
  values: IFilterValue[];
};
