import { Customer } from "./customer";

export interface Job {
  id: number;
  customer_id: number;
  customer?: Customer; // Optional, in case customer details are included
  title: string;
  description: string;
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  scheduled_date: string;
  completed_date?: string;
  total_amount: number;
  notes?: string;
}

// Request types
export interface GetJobsRequest {
  page: number;
  page_size: number;
  sort_by?: "scheduledDate" | "status" | "totalAmount";
  sort_order?: "asc" | "desc";
  status?: "scheduled" | "in_progress" | "completed" | "cancelled";
  start_date?: string;
  end_date?: string;
  customer_id?: string | null;
}

export interface CreateJobRequest {
  customer_id: number;
  title: string;
  description: string;
  scheduled_date: string;
  total_amount: number;
  notes?: string;
}

export interface UpdateJobRequest {
  id: number;
  title?: string;
  description?: string;
  status?: "scheduled" | "in_progress" | "completed" | "cancelled";
  scheduled_date?: string;
  completed_date?: string;
  total_amount?: number;
  notes?: string;
}

// Response types
export interface GetJobsResponse {
  jobs: Job[];
  total_count: number;
  page: number;
  page_size: number;
}

export interface CreateJobResponse {
  job: Job;
}

export interface UpdateJobResponse {
  job: Job;
}

export interface DeleteJobResponse {
  success: boolean;
  deleted_job_id: number;
}

// Error response type (if different from customer errors)
export interface JobErrorResponse {
  message: string;
  code: string;
  field?: string; // Optional field for validation errors
}
