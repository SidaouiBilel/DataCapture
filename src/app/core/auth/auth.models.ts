export interface AuthState {
  isAuthenticated: boolean;
  token: string;
  profile: any;
  refreshToken:string;
}
