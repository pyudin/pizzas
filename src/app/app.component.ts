import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserRequested, logout } from './store/actions/user.actions';
import {
  getCurrentUserIsAdmin,
  getCurrentUserLoaded,
} from './store/selectors/user.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'pizza';
  public userLoaded$: Observable<boolean> =
    this.store.select(getCurrentUserLoaded);

  constructor(private store: Store) {}
  userLogin() {
    this.store.dispatch(getUserRequested());
  }
  userLogout() {
    this.store.dispatch(logout());
  }
}
