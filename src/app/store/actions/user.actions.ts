import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/services/user-api.service';
const prefix = 'User';

export const getUserRequested = createAction(`[${prefix}] Get user requested`);
export const getUserSuccess = createAction(
  `[${prefix}] Get user success`,
  props<{ user: User }>()
);
export const getUserFail = createAction(
  `[${prefix}] Get user fail`,
  props<{ error: any }>()
);
export const logout = createAction(`[${prefix}] User logout`);
