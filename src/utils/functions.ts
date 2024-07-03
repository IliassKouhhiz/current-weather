import moment from 'moment';

/**
 * Converts timestamp into the correct timezone time in a specified format 
 * @param timestamp Timestamp
 * @param timezone Timezone
 * @param timestamp Format
 */
export const getTime = (timestamp: number, timezone: number, format: string) => {
  return moment.unix(timestamp).utcOffset(timezone/60).format(format);
};

/**
 * Returns an object with correct times format
 * @param timestamp Timestamp
 * @param timezone Timezone
 * @param sunrise Sunrise
 * @param sunset Sunset
 */
export const getFormattedTimes = (timestamp: number, timezone: number, sunrise: number, sunset: number) => {
  return {
    current: getTime(timestamp, timezone, 'HH:mm'),
    date: getTime(timestamp, timezone, 'D MMM YYYY - HH:mm'),
    sunrise: getTime(sunrise, timezone, 'HH:mm'),
    sunset: getTime(sunset, timezone, 'HH:mm')
  }
};

/**
 * Given the current hour, defines if it is night or day time, and returns a specific css class, to get the correct style
 * @param currentHour CurrentHour
 * @param sunriseHour SunriseHour
 * @param sunsetHour SunsetHour
 */
export const nightMod = (currentHour: string, sunriseHour: string, sunsetHour: string): string => {
  const toMinutes = (time: string): number => time.split(':').map(Number).reduce((acc, time) => (60 * acc) + +time);
  const currentMinutes = toMinutes(currentHour);
  
  return (currentMinutes < toMinutes(sunriseHour) || currentMinutes >= toMinutes(sunsetHour)) ? "card__icon-container--night" : '';
}