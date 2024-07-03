import { IGenericObject } from "../typings/common";

export const isValidData = (obj: IGenericObject) => Boolean(
  obj?.weather &&
  obj?.main && 
  obj?.dt && 
  obj?.name
);

export interface ITransformedData {
  city: string;
  timestamp: number;
  timezone: number;
  sunriseHour: number;
  sunsetHour: number;
  weather: {
    current: string;
    description: string;
    icon: string;
  };
  temperature: number;
  feelsLike: number;
}

/**
 * Transforms fetched data into a defined object with defined type
 * @param obj Fetched data object with generic type
 */
export const transformer = (obj: IGenericObject): ITransformedData => {
  const { name, main, dt, weather, timezone, sys } = obj;
  const { description, icon, main: current} = weather[0];

  return  {
    city: name,
    timestamp: dt,
    timezone,
    sunriseHour: sys.sunrise,
    sunsetHour: sys.sunset,
    weather: {
      description,
      icon,
      current
    },
    temperature: Math.round(main.temp),
    feelsLike: Math.round(main.feels_like)
  } as ITransformedData;
};
