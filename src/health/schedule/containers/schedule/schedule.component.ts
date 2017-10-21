import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Store } from 'store';
import { ScheduleService, ScheduleItem } from './../../../shared/services/schedule/schedule.service';
import { WorkoutsService, Workout } from './../../../shared/services/workouts/workouts.service';
import { MealsService, Meal } from './../../../shared/services/meals/meals.service';

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
    <div class="schedule">

      <schedule-calender
        [date]="date$ | async"
        [items]="schedule$ | async"
        (change)="updateDate($event)"
        (select)="changeSection($event)">
      </schedule-calender>
      
      <schedule-assign
        *ngIf="open"
        [section]="selected$ | async"
        [list]="list$ | async"
        (cancel)="closeAssign()"
        (update)="assignItem($event)">
      </schedule-assign>
    </div>
  `
})
export class ScheduleComponent implements OnInit, OnDestroy {

  open = false;

  date$: Observable<Date>;
  schedule$: Observable<ScheduleItem[]>;
  selected$: Observable<any>;

  list$: Observable<Meal[] | Workout>;
  
  subscriptions: Subscription[] = [];

  constructor (
    private store: Store,
    private scheduleService: ScheduleService,
    private workoutsService: WorkoutsService,
    private mealsService: MealsService
  ) {  }
  
  ngOnInit() {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');
    
    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),      
      this.scheduleService.items$.subscribe(),      
      this.mealsService.meals$.subscribe(),
      this.workoutsService.workouts$.subscribe()
    ]
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  
  changeSection(event: any){
    this.open = true;
    this.scheduleService.selectSection(event);    
  }

  updateDate(date: Date) {
    this.scheduleService.updateDate(date);
  }
  
  assignItem(event: string[]){
    this.scheduleService.updateItems(event);
    this.closeAssign();
  }

  closeAssign(){
    this.open = false;
  }
}