import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import {
  BehaviorSubject,
  Subject,
  Observable,
  tap,
  map,
  switchMap,
  withLatestFrom,
  take,
} from 'rxjs';

import { Store } from 'store';

import { AuthService } from 'src/shared/services/auth/auth.service';
import { ScheduleList } from 'src/models/shedule-list';
import { ScheduleItem } from 'src/models/schedule-item';

@Injectable()
export class ScheduleService {
  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();
  private listItem$ = new Subject();

  items$ = this.listItem$.pipe(
    withLatestFrom(this.section$),
    map(([items, section]: any[]) => {
      const id = section.data.id;

      console.log(section.data);

      const defaults: ScheduleItem = {
        meals: null,
        workouts: null,
        section: section.section,
        timeStamp: new Date(section.day).getTime(),
      };

      const payload = {
        id: this.uid,
        ...(id ? section.data : defaults),
        ...items,
      };

      if (id) {
        return this.updateSection(id, payload).pipe(take(1)).subscribe();
      }
      return this.createSection(payload).pipe(take(1)).subscribe();
    })
  );

  selected$ = this.section$.pipe(
    tap((next) => this.store.set('selected', next))
  );

  list$ = this.section$.pipe(
    map((value: any) => this.store.value[value.type]),
    tap((next) => this.store.set('list', next))
  );

  schedule$: Observable<ScheduleItem[]> = this.date$.pipe(
    tap((next) => this.store.set('date', next)),
    map((day: any) => {
      const startAt = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate()
      ).getTime();

      const endAt =
        new Date(
          day.getFullYear(),
          day.getMonth(),
          day.getDate() + 1
        ).getTime() - 1;

      return { startAt, endAt };
    }),
    switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt, endAt)),
    map((data: any[]) => {
      const mapped: ScheduleList = {};
      for (const prop of data) {
        if (!mapped[prop.section]) mapped[prop.section] = prop;
      }
      return mapped;
    }),
    tap((next: any) => this.store.set('schedule', next))
  );

  get uid() {
    return this.authService.uid;
  }

  get api() {
    return `http://localhost:3000/schedule`;
  }

  constructor(
    private store: Store,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  updateItems(items: string[]) {
    this.listItem$.next(items);
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  selectSection(data: any) {
    this.section$.next(data);
  }

  private createSection(payload: any) {
    console.log('create section with new id', payload);
    return this.http.post(`${this.api}`, payload);
  }

  private updateSection(id: string, payload: any) {
    console.log('update section with an existing id');
    return this.http.put(`${this.api}/${id}`, payload);
  }

  private getSchedule(startAt: number, endAt: number) {
    const options = {
      params: new HttpParams().append(startAt.toString(), endAt),
    };
    return this.http.get<any[]>(`${this.api}`);
  }
}
