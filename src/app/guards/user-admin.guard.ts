import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCurrentUserIsAdmin } from '../store/selectors/user.selectors';

export const UserAdminGuard = () => {
  const store = inject(Store);
  return store.select(getCurrentUserIsAdmin);
};
