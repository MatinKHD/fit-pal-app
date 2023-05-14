import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// shared-modules
import { HealthSharedModule } from '../shared/health-shared.module';
import { SharedModule } from '../../shared/shared.module';

//containers
import { ScheduleComponent } from './containers/schedule/schedule.component';

//components
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';
import { ScheduleSectionComponent } from './components/schedule-section/schedule-section.component';
import { ScheduleAssignComponent } from './components/schedule-assign/schedule-assign.component';

const ROUTES: Routes = [{ path: '', component: ScheduleComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    HealthSharedModule,
    SharedModule,
  ],
  declarations: [
    ScheduleComponent,
    ScheduleCalendarComponent,
    ScheduleControlsComponent,
    ScheduleDaysComponent,
    ScheduleSectionComponent,
    ScheduleAssignComponent,
  ],
})
export class ScheduleModule {}
