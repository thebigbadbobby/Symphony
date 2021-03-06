import axios from 'axios'
// See this issue for more info: https://github.com/axios/axios/issues/175#issuecomment-165521644

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://api.kahzum.com'

export const axiosWrap = axios.create({
  baseURL,
  /* other custom settings */
});