import { AuthState } from './auth.models';
import { AuthActions, AuthActionTypes } from './auth.actions';

export const initialState: AuthState = { 
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  profile: {}
};

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.SAVE:
      return { ...state, profile: action.payload };

    case AuthActionTypes.LOGIN:
      const logindata = action.payload;
      return { ...state, isAuthenticated: true, token : logindata["token"] , refreshToken:logindata["refreshToken"]};

    case AuthActionTypes.REFRESH:
      const refreshdata = action.payload;
      if(window["dk-RefreshToken"]){
        window["dk-RefreshToken"](refreshdata["token"] , refreshdata["refreshToken"] , true);
      }
      return { ...state, isAuthenticated: true, token : refreshdata["token"] , refreshToken:refreshdata["refreshToken"]};

    case AuthActionTypes.LOGOUT:
      return { ...state, isAuthenticated: false, token: null,refreshToken:null, profile: {} };

    default:
      return state;
  }
}
