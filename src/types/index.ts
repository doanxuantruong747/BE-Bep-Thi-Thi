/** @format */

export interface IUserResponse {
  data?: any[];
  message?: string;
  status?: number;
  success?: boolean;
}

export interface Login {
  email: string;
  password: string;
  type: string;
  idToken: string;
  device_name: string;
  device_id: string;
  platform: string;
  ip_address: string;
  login_at: string;
}

export interface Pagination {
  page: number;
  limit: number;
  search: string;
}

export interface CheckOtp {
  otp_code: string;
  request_type: string;
  email: string;
  password: string;
  code_change: string;
}

export interface updateProfile {
  passcode: string;
  finger: string;
  name: string;
  password: string;
  access_token: string;
  email: string;
}

export interface craeteUser {
  email: string;
  avatar: string;
  name: string;
  userId: string;
}
