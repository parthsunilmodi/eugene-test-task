import axios from 'axios';

export const axiosI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export default axiosI;
