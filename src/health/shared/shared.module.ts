import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// third party modules
import { AngularFireDatabaseModule } from 'angularfire2/database';
// components
import { ListItemComponent } from './components/list-item/list-item.component';
// services
import { MealsService } from './services/meals/meals.service';
import { WorkoutsService } from './services/workouts/workouts.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    ListItemComponent
  ],
  exports: [
    ListItemComponent
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return { 
      ngModule: SharedModule,
      providers: [
        MealsService,
        WorkoutsService,
      ]
    }
  }
}