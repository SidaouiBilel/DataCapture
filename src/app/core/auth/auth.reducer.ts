import { AuthState } from './auth.models';
import { AuthActions, AuthActionTypes } from './auth.actions';

export const initialState: AuthState = {
  isAuthenticated: false,
  domain: 'B09C2351B7B64554ADB488CD2E239693'
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return { ...state, isAuthenticated: true };

    case AuthActionTypes.LOGOUT:
      return { ...state, isAuthenticated: false };

    default:
      return state;
  }
}
