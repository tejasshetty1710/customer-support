import axios, { AxiosResponse } from "axios";
import {
  CreateCustomerRequest,
  Customer,
  GetCustomersRequest,
  GetCustomersResponse,
} from "../types/customer";
import {
  CreateJobRequest,
  CreateJobResponse,
  GetJobsRequest,
} from "../types/job";

const API_BASE_URL = "http://localhost:9000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  return config;
});

export const getCustomers = (
  request: GetCustomersRequest,
): Promise<GetCustomersResponse> => {
  // @ts-ignore
  const params = new URLSearchParams(request);
  const paramsString = params.toString();

  return api.get(`/customers${paramsString ? "?" + paramsString : ""}`);
};

export const createCustomer = async (
  customerData: CreateCustomerRequest,
): Promise<Customer> => {
  const response: AxiosResponse<Customer> = await api.post(
    "/customers",
    customerData,
  );
  return response.data;
};

export const getJobs = (request: GetJobsRequest) => {
  // @ts-ignore
  const params = new URLSearchParams(request);
  const paramsString = params.toString();
  return api.get(`/jobs${paramsString ? "?" + paramsString : ""}`);
};

export const createJob = (
  jobData: CreateJobRequest,
): Promise<CreateJobResponse> => api.post("/jobs", jobData);

export const getBookingWindows = (date: string) => {
  return api.get(`/booking_windows?show_for_days=7&start_date=${date}`);
};

export default api;
