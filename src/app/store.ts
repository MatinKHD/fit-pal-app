import { BehaviorSubject, distinctUntilChanged, pluck, Observable } from 'rxjs';

import { State } from './state';

const state: State = {
  user: undefined,
  meals: undefined,
  date: undefined,
  workouts: undefined,
  schedule: undefined,
  selected: undefined,
  list: undefined,
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe<any>(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({
      ...this.value,
      [name]: state,
    });
  }
}
