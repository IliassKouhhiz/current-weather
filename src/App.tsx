import useFetch from './utils/useFetch'
import useStore from "./utils/useStore";

import './App.scss'
import './styles/styles.scss'

import Card from './components/card/card';
import CourtesyMessage from './components/courtesy-message/courtesy-message';
import Dropdown from './components/dropdown/dropdown';

import { IDropdownOptions } from './typings/common';

const App = () => {
  const {transformedData, selectedCity, dataStatus} = useStore();
  const {cityName, countyCode} = selectedCity;
  
  useFetch(cityName, countyCode);

  const dropdownOptions: IDropdownOptions[] = [
    {cityName: 'Milan', countyCode: 'IT'},
    {cityName: 'Abu Dhabi', countyCode: 'UAE'},
    {cityName: 'San Francisco', countyCode: 'US'},
  ];
  
  return (
    <div className="container">
      <h1 className={cityName ? "container__title container__title--minimized" : "container__title"}>Current Weather</h1>
      <Dropdown options={dropdownOptions}/>
      {transformedData && dataStatus === 'Success' ? <Card data={transformedData}/> : <CourtesyMessage dataStatus={dataStatus}/>}
    </ div>
  )
}

export default App
