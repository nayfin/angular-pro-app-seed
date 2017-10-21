import { Component, Input, ChangeDetectionStrategy, Output, SimpleChanges, EventEmitter } from '@angular/core';

import { ScheduleItem } from './../../../shared/services/schedule/schedule.service';

@Component({
  selector: 'schedule-section',
  styleUrls: ['schedule-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="schedule-section">
      
      <div class="schedule-section__bar">
        {{name}}
      </div>

      <div>
        <div class="schedule-section__item food"
          *ngIf="section.meals; else addMeal"
          (click)="onSelect('meals', section.meals)">
          <span> {{section.meals | join }}</span>
        </div>

        <ng-template #addMeal>
          <div 
            class="schedule-section__item"
            (click)="onSelect('meals')">
            Assign Meal
          </div>
        </ng-template>

        <div class="schedule-section__item workout"
          *ngIf="section.workouts; else addWorkouts"
          (click)="onSelect('workouts', section.workouts)">
          <span> {{section.workouts | join }}</span>
        </div>
  
        <ng-template #addWorkouts>
          <div 
            class="schedule-section__item"
            (click)="onSelect('workouts')" >
            Assign workout
          </div>
        </ng-template>

      </div>  

    </div>
  `
})
export class ScheduleSectionComponent {

  @Input()
  name: string;

  @Input()
  section: ScheduleItem;
  
  @Output() 
  select = new EventEmitter<any>();

  onSelect(type: string, assigned: string [] = []) {
    const data = this.section;
    this.select.emit({
      type,
      assigned,
      data
    })
  }

}