import { Component, ChangeDetectionStrategy, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef( () => WorkoutTypeComponent),
  multi: true,
}

@Component({
  selector: 'workout-type',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TYPE_CONTROL_ACCESSOR],
  styleUrls: [`./workout-type.component.scss`],
  template: `
    <div class="d-flex justify-content-start align-items-center container">
      <div
        *ngFor="let selector of selectors"
        class="pane"
        [class.active]="selector === value"
        (click)="setSelector(selector)">
        <img class="icon mr-3" src="../../../../assets/img/{{ selector }}.png" alt="">
        <p>{{ selector }}</p>
      </div>
    </div>
  `
})
export class WorkoutTypeComponent implements ControlValueAccessor{

  selectors = ['endurance', 'strength'];

  value!: string;

  private onTouch!: Function;
  private onModelChange!: Function;

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: any): void {
    this.value = obj
  }

  setSelector(selector: string) {
    this.value = selector;
    this.onModelChange(selector);
    this.onTouch();
  }

}
