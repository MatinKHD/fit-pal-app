import {Component, ChangeDetectionStrategy, OnChanges, SimpleChanges, Input, Output, EventEmitter } from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { Workout } from '../../../../models/workout'

@Component({
  selector: 'workout-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./workout-form.component.html`,
  styleUrls: [`./workout-form.component.scss`]
})
export class WorkoutFormComponent implements OnChanges {

  toggled: boolean = false;
  exist: boolean = false;

  id!: string;

  @Input()
  workout!: Workout

  @Output()
  add: EventEmitter<Workout> = new EventEmitter<Workout>();

  @Output()
  update: EventEmitter<Workout> = new EventEmitter<Workout>();

  @Output()
  remove: EventEmitter<Workout> = new EventEmitter<Workout>();

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    type: 'endurance',
    strength: this.fb.group({
      sets: 0,
      reps: 0,
      weight: 0,
    }),
    endurance: this.fb.group({
      distance: 0,
      duration: 0
    })
  })

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {

    if(this.workout && this.workout.name) {
      this.exist = true;
      const value = this.workout;
      this.form.patchValue(value);
    }
  }

  get placeholder() {
    return `e.g ${ this.form.get('type')?.value === 'endurance' ? 'Treadmill' : 'Bench Press' }`;
  }

  get required() {
    return (
      this.form.get('name')?.hasError('required') &&
      this.form.get('name')?.touched
    )
  }
  createWorkout() {
    if(this.form.value) this.add.emit(this.form.value);
  }

  onToggle() {
    this.toggled = !this.toggled;
  }

  updateWorkout() {
    const data: Workout = {...{id: this.workout.id}, ...this.form.value}
    if(this.form.value) this.update.emit(data);
  }

  removeWorkout() {
    const data: Workout = {...{id: this.workout.id}, ...this.form.value}
    if(this.form.value) this.remove.emit(data);
  }

}
