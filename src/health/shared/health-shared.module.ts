import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

//services
import { MealsService } from "./services/meals/meals.service";
import { WorkoutsService } from "./services/workouts/workouts.service";
import { ScheduleService } from "./services/schedule/schedule.service";

//components
import { ListItemsComponent } from "./components/list-items/list-items.component";

//pipes
import { JoinPipe } from "./pipes/join.pipe";
import { WorkoutPipe } from "./pipes/workout.pipe";


@NgModule({
    imports:[
      CommonModule,
      RouterModule,
      HttpClientModule
    ],
    declarations: [
      ListItemsComponent,
      JoinPipe,
      WorkoutPipe
    ],
    exports: [
      ListItemsComponent,
      JoinPipe,
      WorkoutPipe
    ]
})
export class HealthSharedModule {
  static forRoot(): ModuleWithProviders<HealthSharedModule>{
    return {
      ngModule: HealthSharedModule,
      providers: [
        MealsService,
        WorkoutsService,
        ScheduleService
      ]
    }
  }
}
