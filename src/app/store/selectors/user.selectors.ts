import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  UserStoreState,
  currentUserFeatureKey,
} from '../reducers/user.reducer';

export const getCurrentUserState = createFeatureSelector<UserStoreState>(
  currentUserFeatureKey
);
export const getCurrentUserLoaded = createSelector(
  getCurrentUserState,
  (state) => state.userLoaded
);
export const getCurrentUser = createSelector(
  getCurrentUserState,
  (state) => state.user
);
export const getCurrentUserIsAdmin = createSelector(
  getCurrentUserState,
  (state) => state.user?.isAdmin ?? false
);
