import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
    name: string;
    isAdmin: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class UserApiService {

  public getUser(): Observable<User> {
    return of({name: 'User', isAdmin: true});
  }

}