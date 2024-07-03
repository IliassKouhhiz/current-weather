export interface IGenericObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface IDropdownOptions {
  cityName: string;
  countyCode?: string;
}

export type DataFetchStatus = 'Pending' | 'Success' | 'Failure' | '';