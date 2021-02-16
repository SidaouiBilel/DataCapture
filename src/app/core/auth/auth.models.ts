export interface AuthState {
  isAuthenticated: boolean;
  token: string;
  refreshToken:string,
  profile: any;
}
