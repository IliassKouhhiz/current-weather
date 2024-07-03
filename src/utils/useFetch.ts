/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import axios from "axios";
import useStore from "./useStore";
import { errors } from "./error";
import { isValidData, transformer } from "./transformer";

const {VITE_ENV_API_KEY: api_key, VITE_ENV_ENDPOINT: endpoint} = import.meta.env;


const useFetch = (cityName: string, countyCode?: string ) => {
  const {coordinates, data, dataStatus, setCoordinates, setData, setDataStatus, setTransformedData} = useStore();

  const getParams = (): string => [cityName, countyCode].filter(Boolean).join(',');
  const coordinatesApiUrl: string = `https://${endpoint}/geo/1.0/direct?q=${getParams()}&limit=5&appid=${api_key}`;

  /* Fetch coordinates */
  useEffect(() => {
    (
      async function(){
        if(cityName) {
          try {
            const coordinatesData = await axios.get(coordinatesApiUrl);
            const {lat, lon} = coordinatesData.data[0];
            setCoordinates([lat, lon] as string[]);
          } catch(err) {
            setDataStatus('Failure');
            console.error(err);
          }
        }
      }
    )()
  }, [cityName])

  /* Fetch weather data */
  useEffect(() => {
    (
      async function(){
        if (coordinates?.length === 2) {
          try {
            setDataStatus('Pending');
            const response = await axios.get(`https://${endpoint}/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${api_key}&units=metric`);
            setData(response.data);
            setDataStatus('Success');
          } catch(err) {
            setDataStatus('Failure');
            console.error(err)
          }
        }
      }
    )()
  }, [coordinates])

  /* Transform data */
  useEffect(() => {
    try {
      if (dataStatus === 'Success' && isValidData(data)) {
        setTransformedData(transformer(data));
      }
    } catch (err) {
      console.log(data);
      throw new Error(errors[1001]);
    }
  }, [data])
}

export default useFetch;