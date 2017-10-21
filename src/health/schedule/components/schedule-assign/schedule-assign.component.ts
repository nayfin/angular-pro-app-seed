import { Workout } from './../../../shared/services/workouts/workouts.service';
import { Meal } from './../../../shared/services/meals/meals.service';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'schedule-assign',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['schedule-assign.component.scss'],
  template: `
    <div class="schedule-assign">
      <div class="schedule-assign__modal">
        <div class="schedule-assign__title">
          <h1>
            <img src="/img/{{ section.type === 'workouts' ? 'workout' : 'food' }}.svg" alt="{{ section.type === 'workouts' ? 'workout' : 'food' }} icon">
            Assign {{ section.type }}
          </h1>
          <a 
            class="btn__add"
            [routerLink]="getRoute(section.type)">
            <img src="/img/add-white.svg" alt="add {{section.type}} icon">
            New {{section.type}} 
          </a>
        </div>
        
        <div class="schedule-assign__list">
          <span class="schedule-assign__empty"
            *ngIf="!list?.length">
            <img src="/img/face.svg" alt="">
            Nothing here to assign
          </span>
          <div
            *ngFor="let item of list"
            [class.active]="exists(item.name)"
            (click)="toggle(item.name)">
            {{item | json}}
          </div>
        </div>

        <div class="schedule-assign__submite">
          <div>
            <button
              type="button"
              class="button"
              (click)="updateAssign()">
              Update
            </button>
            <button
              type="button"
              class="button button--cancel"
              (click)="cancelAssign()">
              Cancel
            </button>
          </div>
        </div>

      </div>
    </div>
  `
})
export class ScheduleAssignComponent implements OnInit {
  
  private selected: string[];

  @Input()
  section: any;

  @Input()
  list: Meal[] | Workout[] ;
  

  @Output() 
  cancel = new EventEmitter<any>();

  @Output() 
  update = new EventEmitter<any>();
  
  constructor() {}

  ngOnInit(){
    this.selected = [ ...this.section.assigned ];
  }

  getRoute(type: string) {
    return [`../${type}`, 'new']
  }

  exists(name: string) {
    return !!~this.selected.indexOf(name);
  }
  
  toggle(name: string) {
    if(this.exists(name)) {
      this.selected = this.selected.filter(item => item !== name)
    } else {
      this.selected = [...this.selected, name]
    }
  }

  updateAssign() {
    // console.log("updateAssign:", {[this.section.type]: this.selected});
    
    this.update.emit({
      [this.section.type]: this.selected
    })
  }

  cancelAssign(){
    this.cancel.emit();
  }
}