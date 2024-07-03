import React from 'react';

import { ITransformedData } from '../../utils/transformer';
import { getFormattedTimes, nightMod } from '../../utils/functions';
import { IGenericObject } from '../../typings/common';

export interface ICard {
  data: ITransformedData | IGenericObject
}

const Card: React.FC<ICard> = ({data}) => {
  const {city, temperature, feelsLike, weather, timestamp, timezone, sunriseHour, sunsetHour} = {...data} as ITransformedData;
  const {current, date, sunrise, sunset} = getFormattedTimes(timestamp, timezone, sunriseHour, sunsetHour);

  return (
    <section className="card">
      <div className={`card__icon-container ${nightMod(current, sunrise, sunset)}`}>
        <img loading="lazy" className="card__icon" src={`https://openweathermap.org/img/wn/${weather?.icon}@4x.png`} alt={weather?.description} />
      </div>
      <div className="card__description">
        <h2 className="card__city">{city}</h2>
        <p>{`${date}`}</p>
        <span className="card__weather">
          <p>{weather?.current}</p>
          <p>{weather?.description}</p>
        </span>
        <span className="card__info">
          <p>{'Sunrise: '}<strong>{sunrise}</strong></p>
          <p>{'Sunset: '}<strong>{sunset}</strong></p>
          <p>{`Temperature: `}<strong>{`${temperature}C°`}</strong></p>
          <p>{`Feels like: `}<strong>{`${feelsLike}C°`}</strong></p>
        </span>
      </div>
    </section>
  );
};

export default Card;