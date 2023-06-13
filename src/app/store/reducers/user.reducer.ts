import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { User } from 'src/app/services/user-api.service';

export const currentUserFeatureKey = 'currentUser';

export interface UserStoreState {
  user: User | null;
  userLoaded: boolean;
  error: any;
}

export const initialState: UserStoreState = {
  user: null,
  userLoaded: false,
  error: null,
};

export const userReducer = createReducer<UserStoreState>(
  initialState,
  on(UserActions.getUserRequested, (state) => ({
    ...state,
  })),
  on(UserActions.getUserSuccess, (state, { user }) => ({
    ...state,
    user,
    userLoaded: true,
  })),
  on(UserActions.getUserFail, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UserActions.logout, (state => ({...initialState})))
);
