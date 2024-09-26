export interface UserState {
  _id: string;
  username: string;
  email: string;
  isAdmin?: boolean;
}

export interface ErrorState {
  status: string;
  originalStatus: number;
  data?: {
    message: string;
  };
  error?: string;
}
