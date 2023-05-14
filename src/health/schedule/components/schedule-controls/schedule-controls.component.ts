import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: 'schedule-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./schedule-controls.component.scss'],
  template: `
    <div class="controls-container">
      <button class="btn" (click)="moveDate( offset - 1 )" type="button">
        <img src="../../../../assets/img/chevron-left.png" alt="">
      </button>
      <p>{{ selected | date: 'd,MMMM,y'}}</p>
      <button class="btn" (click)="moveDate( offset + 1 )" type="button">
        <img src="../../../../assets/img/chevron-right.png" alt="">
      </button>
    </div>
  `
})
export class ScheduleControlsComponent {

  offset: number = 0

  @Input()
  selected!: Date;

  @Output()
  move: EventEmitter<number> = new EventEmitter<number>();

  moveDate(offset: number) {
    this.offset = offset;
    this.move.emit(offset)
  }

}

