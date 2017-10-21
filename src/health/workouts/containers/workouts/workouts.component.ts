import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { WorkoutsService, Workout } from './../../../shared/services/workouts/workouts.service';
import { Store } from 'store';

@Component({
  selector: 'workouts',
  styleUrls: ['workouts.component.scss'],
  template: `
    <div class="workouts">
      <div class="workouts__title">
        <h1>
          <img src="/img/workout.svg">
          Your Workouts
        </h1>
        <a
          class="btn__add"
          [routerLink]="['new']">
          <img src="/img/add-white.svg" alt="">
          New Workout
        </a>
      </div>
      <div
        *ngIf="workouts$ | async as workouts; else loading">
        <div 
          class="message"
          *ngIf="!workouts.length">
          <img src="/img/face.svg" alt="">
          No workouts, add a new workout to start
        </div>

        <list-item 
          *ngFor="let workout of workouts"
          [item]="workout"
          [subtitle]="workout | workout"
          [linkRootPath]="'../workouts'"
          (remove)="removeWorkout($event)">
        </list-item>

      </div>  
      <ng-template #loading>
        <div class="message">
          <img src="/img/loading.svg" alt="">
          Fetching Workouts...
        </div>
      </ng-template>
    </div>
  `
})
export class WorkoutsComponent implements OnInit, OnDestroy{

  workouts$: Observable<Workout[]>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private workoutsService : WorkoutsService
  ) {}

  ngOnInit() {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workouts$ = this.store.select<Workout[]>('workouts');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeWorkout(event: Workout) {
    this.workoutsService.removeWorkout(event.$key);
  }
}