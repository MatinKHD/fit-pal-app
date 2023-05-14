import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { Meal } from 'src/models/meal';
import { Workout } from 'src/models/workout';

@Component({
  selector: 'schedule-assign',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./schedule-assign.component.scss'],
  template: `
    <div class="schedule-assign">
      <div class="modal">
        <div class="title">
          <h1>
            <img
              src="../../../assets/img/{{
                section?.type === 'workout' ? 'strength' : 'love'
              }}.png"
            />
            Assign {{ section?.type }}
          </h1>
          <a [routerLink]="getRoute(section.type)">
            <img class="icon" src="../../../assets/img/add.png" alt="" />
            New {{ section.type }}
          </a>
        </div>
        <div class="list">
          <span *ngIf="!list?.length" class="empty">
            <img src="../../../assets/img/crying.png" class="icon" />
            <span>Nothing to Assign!</span>
          </span>
          <div
            *ngFor="let item of list"
            [class.active]="exist(item.name)"
            (click)="toggleItem(item.name)"
          >
            <img
              class="icon"
              src="../../../assets/img/checkmark-{{
                exist(item.name) ? 'active' : 'disabled'
              }}.png"
            />
            {{ item.name }}
          </div>
        </div>
        <div
          class="submit"
          [class.w-50]="section?.type === 'workouts'"
          [class.w-60]="section?.type === 'meals'"
        >
          <button
            type="button"
            class="btn btn-primary"
            (click)="updateAssign()"
          >
            Update
          </button>
          <button type="button" class="btn btn-warn" (click)="cancelAssign()">
            Cancel
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ScheduleAssignComponent implements OnInit {
  selected: string[] = [];

  @Input()
  section!: any;

  @Input()
  list!: any[] | null;

  @Output()
  update: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  cancel: EventEmitter<any> = new EventEmitter<any>();

  getRoute(name: string) {
    return `../${name}/new`;
  }

  ngOnInit() {
    this.selected = [...this.section.assigned];
  }

  exist(name: string) {
    return !!~this.selected.indexOf(name);
  }

  toggleItem(name: string) {
    if (this.exist(name))
      this.selected = this.selected.filter((item) => item !== name);
    else this.selected = [...this.selected, name];
  }

  updateAssign() {
    this.update.emit({
      [this.section.type]: this.selected,
    });
  }

  cancelAssign() {
    this.cancel.emit();
  }
}
