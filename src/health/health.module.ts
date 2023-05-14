import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { HealthSharedModule } from "./shared/health-shared.module";
import { SharedModule } from "../shared/shared.module";

import { AuthGuard} from "../shared/guards/auth/auth.guard";

import { HealthComponent }from "./containers/health.component";

const ROUTES: Routes = [
  {path: 'schedule', canActivate: [AuthGuard], loadChildren:() => import('./schedule/schedule.module').then(m => m.ScheduleModule)},
  {path: 'meals', canActivate: [AuthGuard], loadChildren:() => import('./meals/meals.module').then(m => m.MealsModule)},
  {path: 'workouts', canActivate: [AuthGuard], loadChildren:() => import('./workout/workout.module').then(m => m.WorkoutModule)},
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    HealthSharedModule.forRoot(),
    SharedModule.forRoot()
  ],
  declarations: [
    HealthComponent
  ]
})
export class HealthModule {}
