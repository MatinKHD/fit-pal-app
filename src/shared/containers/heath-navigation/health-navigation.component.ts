import { Component } from "@angular/core";

@Component({
  selector: 'app-health-navigation',
  styles: [`

    span {
        font-weight: 600;
        line-height: 35px;
    }

    button {
        border: none;
        outline: none;
        padding: 10px 20px;
        margin: 0 30px;
        border-radius: 10px;
        transition: all .2s;
    }
    button:hover, .active {
        color: white;
        background: #f80057;
    }
  `],
  template: `
    <div class="d-flex flex-row justify-content-between my-5">
      <button
        [routerLink]="'/health/schedule'"
        routerLinkActive="active">
        Schedule
      </button>
      <button
        [routerLink]="'/health/meals'"
        routerLinkActive="active">
        Add Meal
      </button>
      <button
        [routerLink]="'/health/workouts'"
        routerLinkActive="active">
        Add Workout
      </button>
    </div>
  `
})
export class HealthNavigationComponent {}
