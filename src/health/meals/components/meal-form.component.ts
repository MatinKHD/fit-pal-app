import { Component, ChangeDetectionStrategy, OnChanges, SimpleChanges, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { Meal } from "../../../models/meal";

@Component({
  selector: 'meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .meal-form {
      width: 500px;
    }
    h3{
      font-size: 18px;
    }
    .custom-input {
      border: none;
      outline: none;
    }
    .icon-container { background:#DCDCDC77; }
    .icon-container:hover { background: #00000032; }
  `],
  templateUrl:`./meal-form.component.html`
})
export class MealFormComponent implements OnChanges {

  toggled: boolean = false;
  exist: boolean = false;

  id!: string;

  @Input()
  meal!: Meal;

  @Output()
  add: EventEmitter<Meal> = new EventEmitter();
  @Output()
  update: EventEmitter<Meal> = new EventEmitter();
  @Output()
  remove: EventEmitter<Meal> = new EventEmitter();

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  })

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {

    if(this.meal && this.meal.name) {
      this.exist = true;
      this.emptyIngredient();

      const value = this.meal;
      this.form.patchValue(value);

      if(value.ingredients) {
        for (const item of value.ingredients) {
          this.ingredient.push(new FormControl(item))
        }
      }
    }
  }

  get ingredient() {
    return this.form.get('ingredients') as FormArray
  }

  get required() {
    return (
      this.form.get('name')?.hasError('required') &&
      this.form.get('name')?.touched
    )
  }

  emptyIngredient() {
    while (this.ingredient.controls.length) this.ingredient.removeAt(0)
  }


  addIngredient() {
    this.ingredient.push(new FormControl(''))
  }

  removeIngredient(index: number) {
    this.ingredient.removeAt(index);
  }

  createMeal() {
    if(this.form.value) this.add.emit(this.form.value);
  }

  onToggle() {
    this.toggled = !this.toggled;
  }

  updateMeal() {
    const data: Meal = {...{id: this.meal.id}, ...this.form.value}
    if(this.form.value) this.update.emit(data);
  }

  removeMeal() {
    const data: Meal = {...{id: this.meal.id}, ...this.form.value}
    if(this.form.value) this.remove.emit(data);
  }
}
