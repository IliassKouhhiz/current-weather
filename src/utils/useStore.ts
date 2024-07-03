import { create } from 'zustand'
import { DataFetchStatus, IDropdownOptions, IGenericObject } from '../typings/common'
import { ITransformedData } from './transformer';

export interface IStore {
  /* Initial states */
  coordinates: string[];
  data: IGenericObject;
  dataStatus: DataFetchStatus;
  transformedData: ITransformedData | null;
  selectedCity: IDropdownOptions;

  /* Set states functions */
  setCoordinates: (coordinates: string[]) => void;
  setData: (data: IGenericObject) => void;
  setDataStatus: (dataStatus: DataFetchStatus) => void;
  setTransformedData: (transformedData: ITransformedData) => void;
  setSelectedCity: (selectedCity: IDropdownOptions) => void;
}

const useStore = create<IStore>((set) => ({
  /* Initial states */
  coordinates: [],
  data: {},
  dataStatus: '',
  transformedData: null,
  selectedCity: {cityName: ''},

  /* Set states functions */
  setCoordinates: (coordinates) => set(() => ({ coordinates })),
  setData: (data) => set(() => ({ data })),
  setDataStatus: (dataStatus) => set(() => ({ dataStatus })),
  setTransformedData: (transformedData) =>  set(() => ({ transformedData })),
  setSelectedCity: (selectedCity) =>  set(() => ({ selectedCity })),
}));

export default useStore;