import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// guards
import { AuthGaurd } from './../auth/shared/guards/auth.guard';
// shared modules
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
  { path: 'meals', canActivate: [AuthGaurd], loadChildren: './meals/meals.module#MealsModule' },
  { path: 'workouts', canActivate: [AuthGaurd], loadChildren: './workouts/workouts.module#WorkoutsModule' },
  { path: 'schedule', canActivate: [AuthGaurd], loadChildren: './schedule/schedule.module#ScheduleModule' }
]

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot()
  ]
})

export class HealthModule {}