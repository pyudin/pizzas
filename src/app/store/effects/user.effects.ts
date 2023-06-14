import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';

import * as UserActions from '../actions/user.actions';
import { UserApiService } from 'src/app/services/user-api.service';

@Injectable()
export class UserEffects implements OnInitEffects {
  userApiService = inject(UserApiService);

  constructor(private actions$: Actions) {}

  ngrxOnInitEffects() {
    return UserActions.getUserRequested();
  }

  public getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUserRequested),
      switchMap(() =>
        this.userApiService.getUser().pipe(
          map((user) => {
            return UserActions.getUserSuccess({ user });
          }),
          catchError((error) => of(UserActions.getUserFail({ error })))
        )
      )
    )
  );
}
