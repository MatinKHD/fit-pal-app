import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, takeUntil, distinctUntilChanged } from 'rxjs';

import { Store } from 'store';

import { Unsub } from 'unsub';

import { User } from '../../../models/user';

@Injectable()
export class AuthService extends Unsub {
  api: string = 'http://localhost:3000';

  // loggedInUser: UserModel | null = JSON.parse(localStorage.getItem('loggedInUser') as string);
  //
  // auth$: Observable<UserModel> = this.http.get<UserModel>(`${this.api}/users/${this.loggedInUser?.id}`).pipe(
  //   tap(next => {
  //     if(next === null){
  //       this.store.set("user", null)
  //       return
  //     }
  //     let authenticatedUser: UserModel = next.email ? { ...next, authenticated: true} : { ...next, authenticated: false}
  //     this.store.set("user", authenticatedUser)
  //     return authenticatedUser;
  //   })
  // )

  auth = () => {
    let jsonUser = localStorage.getItem('loggedInUser') as string;
    let user: any = JSON.parse(jsonUser);

    if (!user?.email) {
      this.store.set('user', null);
      return;
    }
    let authenticatedUser: User = user?.email
      ? { ...user, authenticated: true }
      : { ...user, authenticated: false };
    this.store.set('user', authenticatedUser);
    return authenticatedUser;
  };

  uid: string = JSON.parse(localStorage.getItem('loggedInUser') as string).id;

  constructor(private http: HttpClient, private store: Store) {
    super();
  }

  createUser(event: { email: string; password: string }) {
    let uid: string | null = `_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('id', uid);
    let _user = { ...{ id: uid, ...event, authenticated: false } };
    localStorage.setItem('loggedInUser', JSON.stringify(_user));
    return this.http.post<User[]>(`${this.api}/users`, _user);
  }

  updateBiometricsOfUser(
    user: any,
    data: { gender: string; age: number; weight: number; height: number }
  ) {
    let _user = {
      ...{
        id: user.id,
        email: user.email,
        password: user.password,
        authenticated: user.authenticated,
      },
      ...data,
    };

    localStorage.setItem('loggedInUser', JSON.stringify(_user));
    this.auth();
    return this.http.patch(`${this.api}/users/${user.id}`, data);
  }

  loginUser(event: { email: string; password: string }) {
    return this.fetchUsers()
      .pipe(distinctUntilChanged(), takeUntil(this.unsubscribe))
      .forEach((user: User[]) => {
        let loggedInUser = user.filter(
          (u) =>
            u.email?.includes(event.email) &&
            u.password?.includes(event.password)
        );
        let authenticatedUser: any = {
          ...loggedInUser[0],
          authenticated: true,
        };
        if (user.includes(loggedInUser[0])) {
          localStorage.setItem(
            'loggedInUser',
            JSON.stringify(authenticatedUser)
          );
        } else alert('Email or Password is incorrect');
      });
  }

  logoutUser() {
    this.store.set('authenticated', false);
  }

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api}/users`);
  }
}
