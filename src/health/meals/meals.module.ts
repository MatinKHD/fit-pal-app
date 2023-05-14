import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { HealthSharedModule } from "../shared/health-shared.module"
import { SharedModule } from "../../shared/shared.module";

import { MealsComponent } from "./containers/meals/meals.component";
import { MealComponent } from "./containers/meal/meal.component";

import { MealFormComponent } from "./components/meal-form.component";

const ROUTES: Routes = [
  { path: '', component: MealsComponent },
  { path: 'new', component: MealComponent},
  { path: ':id', component: MealComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    HealthSharedModule,
    SharedModule
  ],
  declarations: [
    MealsComponent,
    MealComponent,
    MealFormComponent
  ]
})
export class MealsModule {}
