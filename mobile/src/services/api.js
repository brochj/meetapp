import axios from 'axios';
import appConfig from '~/config/appConfig';

const api = axios.create({
  baseURL: appConfig.apiBaseURL,
});

export default api;
