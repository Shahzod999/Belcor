export type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export interface AuthStateError {
  status: string;
  originalStatus: number;
  data: string;
  error: string;
}
