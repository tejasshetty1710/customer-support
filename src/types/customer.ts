// Customer type
export type Customer = {
  object: 'customer';
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  email: string | null;
  billable_email: string | null;
  billable_name: string | null;
  billable_phone_number: string | null;
  display_name: string;
  mobile_number: string | null;
  home_number: string | null;
  work_number: string | null;
  company: string | null;
  job_title: string | null;
  notes: string | null;
  notifications_enabled: boolean;
  archived: boolean;
  parent_customer_id: string | null;
  tags: {
    object: 'list';
    data: any[];
    url: string;
  };
  url: string;
  type: string;
  is_contractor: boolean;
  do_not_service: boolean;
  job_metadata: {
    lifetime_value: number;
    last_service_at: string | null;
  };
  addresses: {
    object: 'list';
    data: any[];
    url: string;
  };
  lead_source: string | null;
};
  
  // Request types
  export interface GetCustomersRequest {
    page: number;
    page_size: number;
    sort_by?: 'name' | 'dateJoined' | 'totalSpent';
    sort_order?: 'asc' | 'desc';
    q?: string;
  }
  
  export interface CreateCustomerRequest {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
  }
  
  export interface UpdateCustomerRequest {
    id: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    address?: string;
  }
  
  // Response types
  export interface GetCustomersResponse {
    customers: Customer[];
    total_count: number;
    page: number;
    page_size: number;
  }
  
  export interface CreateCustomerResponse {
    id: any;
    customer: Customer;
  }
  
  export interface UpdateCustomerResponse {
    customer: Customer;
  }
  
  export interface DeleteCustomerResponse {
    success: boolean;
    deletedCustomerId: number;
  }
  
  // Error response type
  export interface ErrorResponse {
    message: string;
    code: string;
  }