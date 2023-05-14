import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ScheduleItem } from 'src/models/schedule-item';
import { ScheduleList } from 'src/models/shedule-list';

@Component({
  selector: 'schedule-calendar',
  styleUrls: ['./schedule-calendar.component.scss'],
  template: `
    <schedule-controls
      [selected]="selectedDay"
      (move)="onWeekChange($event)"
    ></schedule-controls>
    <schedule-days
      [selected]="selectedDayIndex"
      (select)="selectDay($event)"
    ></schedule-days>

    <schedule-section
      *ngFor="let section of sections"
      [name]="section.name"
      [section]="getSection(section.key)"
      (select)="selectSetion($event, section.key)"
    >
    </schedule-section>
  `,
})
export class ScheduleCalendarComponent implements OnChanges {
  selectedDayIndex!: number;
  selectedDay!: Date;
  selectedWeek!: Date;

  sections = [
    { key: 'morning', name: 'Morning' },
    { key: 'lunch', name: 'Lunch' },
    { key: 'evening', name: 'Evening' },
    { key: 'snacks', name: 'Snacks & Drinks' },
  ];

  @Input()
  set date(date: Date | null) {
    if (date?.getTime()) {
      this.selectedDay = new Date(date?.getTime());
    }
  }

  @Input()
  items!: ScheduleList;

  @Output()
  change: EventEmitter<Date> = new EventEmitter<Date>();

  @Output()
  select: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  getSection(name: string): ScheduleItem {
    // console.log(this.items[name]);
    return (this.items && this.items[name]) || {};
  }

  selectSetion({ type, assigned, data }: any, section: string) {
    const day = this.selectedDay;
    this.select.emit({
      type,
      assigned,
      section,
      day,
      data,
    });
  }

  ngOnChanges() {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfTheWeek(new Date(this.selectedDay));
  }

  selectDay(day: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + day);
    this.change.emit(selectedDay);
  }

  onWeekChange(weekOffset: number) {
    const startOfTheWeek = this.getStartOfTheWeek(new Date());
    const startDate = new Date(
      startOfTheWeek.getFullYear(),
      startOfTheWeek.getMonth(),
      startOfTheWeek.getDate()
    );
    startDate.setDate(startDate.getDate() + weekOffset * 7);
    this.change.emit(startDate);
  }

  private getToday(date: Date) {
    let today = date.getDay() - 1;
    if (today < 0) {
      today = 6;
    }
    return today;
  }

  private getStartOfTheWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }
}
