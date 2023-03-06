import axios from 'axios';

// Add a request interceptor ?
// Add a response interceptor ?

const instance = axios.create({
  baseURL: 'https://pro-openapi.debank.com/v1/',
  headers: {
    'AccessKey': process.env.NEXT_PUBLIC_DEBANK_API_KEY
  },
});

export const executeQuery = async (endpoint: string, params: any) => {
  let result: any = {data: null, error: null};
  try {
    const { data } = await instance.get(`${endpoint}`, { params });
    result.data = data
  } catch(e) {
    console.log(e);
    result.error = `Failed to request the DeBank api`;
  }
  return result;
};