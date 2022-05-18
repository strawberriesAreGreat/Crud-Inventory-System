import { fetch } from 'cross-undici-fetch'
const config = require("../config/config.js");

export const getWeather = async ({ lat, long }) => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${config.OPENWEATHER.key}`
  )
  const json = await response.json()

  return {
    zip,
    city: json.name,
    conditions: json.weather[0].main,
    temp: Math.round(((json.main.temp - 273.15) * 9) / 5 + 32),
    icon: `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
  }
}