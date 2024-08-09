import axios, { AxiosResponse } from 'axios';
import { CreateCustomerRequest, Customer, GetCustomersRequest, GetCustomersResponse } from '../types/customer';
import { CreateJobRequest, CreateJobResponse, GetJobsRequest } from '../types/job';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken') ?? '9e3f6091afd044299941de635a1a6c81';
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  return config;
});

export const getCustomers = (request: GetCustomersRequest): Promise<GetCustomersResponse> => {
    // @ts-ignore
    const params = new URLSearchParams(request);
    const paramsString = params.toString();
 
    return  api.get(`/customers${paramsString ? '?' + paramsString : ''}`);
}

export const createCustomer = async (customerData: CreateCustomerRequest): Promise<Customer> => {
    const response: AxiosResponse<Customer> = await api.post('/customers', customerData);
    return response.data;
}

export const getJobs = (request: GetJobsRequest) => {
    // @ts-ignore
    const params = new URLSearchParams(request);
    const paramsString = params.toString();
  return api.get(`/jobs${paramsString ? '?' + paramsString : ''}`); 
}

export const createJob = (jobData: CreateJobRequest):Promise<CreateJobResponse>  =>
  api.post('/jobs', jobData);

export const getBookingWindows = (date: string) => {
    return api.get(`/company/schedule_availability/booking_windows?start_date=${date}`);
}

export default api;