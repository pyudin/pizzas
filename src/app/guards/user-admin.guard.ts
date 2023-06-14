import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCurrentUserIsAdmin } from '../store/selectors/user.selectors';
import { Observable } from 'rxjs';

export const UserAdminGuard = (): Observable<boolean> => {
  const store = inject(Store);
  return store.select(getCurrentUserIsAdmin);
};
