import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { ScheduleItem } from 'src/models/schedule-item';

@Component({
  selector: 'schedule-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./schedule-section.component.scss'],
  template: `
    <div class="schedule-section">
      <div class="bar">{{ name }}</div>
      <div>
        <div
          class="item food"
          *ngIf="section.meals && section.meals.length >= 1; else addMeal"
          (click)="onSelect('meals', section.meals)"
        >
          <img src="../../../assets/img/meal-primary.png" />
          <span> {{ section.meals | join }}</span>
        </div>
        <ng-template #addMeal>
          <div class="d-flex align-items-center">
            <img
              class="icon mx-1"
              src="../../../assets/img/add-black.png"
              alt=""
            />
            <div class="item" (click)="onSelect('meals')">Assign meal</div>
          </div>
        </ng-template>
        <div class="divider"></div>
        <div
          class="item workout"
          *ngIf="
            section.workouts && section.workouts.length >= 1;
            else addWorkout
          "
          (click)="onSelect('workouts', section.workouts)"
        >
          <img src="../../../assets/img/workout-accent.png" />
          <span> {{ section.workouts }}</span>
        </div>
        <ng-template #addWorkout>
          <div class="d-flex align-items-center">
            <img
              class="icon mx-1"
              src="../../../assets/img/add-black.png"
              alt=""
            />
            <div class="item" (click)="onSelect('workouts')">
              Assign workout
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
})
export class ScheduleSectionComponent {
  @Input()
  name!: string;

  @Input()
  section!: ScheduleItem;

  @Output()
  select: EventEmitter<any> = new EventEmitter<any>();

  onSelect(type: string, assigned: any[] = []) {
    const data = this.section;
    this.select.emit({
      type,
      assigned,
      data,
    });
  }
}
