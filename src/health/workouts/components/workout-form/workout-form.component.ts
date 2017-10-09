import { Component, ChangeDetectionStrategy, OnChanges, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

import { Workout } from '../../../shared/services/workouts/workouts.service';

@Component({
  selector: 'workout-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['workout-form.component.scss'],
  template: `
   
    <div class="workout-form">

      <form [formGroup]="form">

        <div class="workout-form__name">
          <label>
            <h3> Workout Name </h3>
            <input 
              type="text"
              [placeholder]="placeholder"
              formControlName="name">
            <div 
              *ngIf="required"
              class="error">
              Workout names is required
            </div>
          </label>

          <label>
            <h3>Workout Type</h3>
            <workout-type formControlName="type">
            
            </workout-type>
          </label>
        </div>

        <div class="workout-form__details">
          {{type}}
          <div 
            *ngIf="type === 'strength'">
            <div 
              formGroupName="strength"
              class="workout-form__fields">
              <label >
                <h3>Reps</h3>
                <input 
                  type="number"
                  formControlName="reps">
              </label>
              <label >
                <h3>Sets</h3>
                <input 
                  type="number"
                  formControlName="sets">
              </label>
              <label >
                <h3>Weight <span>(kg)</span></h3>
                <input 
                  type="number"
                  formControlName="weight">
              </label>
            </div>  
          </div>
          
          <div
            *ngIf="type === 'endurance'">
            <div 
              formGroupName="endurance"
              class="workout-form__fields">
              <label>
                <h3>Distance <span>(km)</span></h3>
                <input 
                  type="number"
                  formControlName="distance">
              </label>

              <label >
                <h3>Duration <span>(min)</span></h3>
                <input 
                  type="number"
                  formControlName="duration">
              </label>
            </div>  
          </div>
        </div>

        <div class="workout-form__submit">
          <div>
            <button 
              class="button"
              type="button"
              *ngIf="!exists"
              [disabled]="required"
              (click)="createWorkout()">
              Create Workout
            </button>
            <button 
              class="button"
              type="button"
              *ngIf="exists"
              [disabled]="required"
              (click)="updateWorkout()">
              Save Workout
            </button>
            <a 
              class="button"
              [routerLink]="['../']">
              Cancel
            </a>
          </div>

          <div 
            class="workout-form__delete"
            *ngIf="exists">
            <div *ngIf="toggled">
              <button 
                class="confirm"
                type="button"
                (click)="removeWorkout()">
                Yes
              </button>
      
              <button 
                class="cancel"
                type="button"
                (click)="toggle()">
                No
              </button>
            </div>
    
            <button 
              class="button button--delete"
              (click)="toggle()">
              Delete
            </button>
          </div>
        </div>

      </form>
        
    </div>
  `
})
export class WorkoutFormComponent implements OnChanges {
  
  
  @Input() 
  workout: Workout;
  
  @Output()
  create = new EventEmitter<Workout>();
  
  @Output()
  update = new EventEmitter<Workout>();
  
  @Output()
  remove = new EventEmitter<Workout>();

  toggled = false;
  exists = false; 
  
  form = this.fb.group({
    name: ['', Validators.required],
    type: 'strength',
    strength: this.fb.group({
      reps: 0,
      sets: 0,
      weight: 0
    }),
    endurance: this.fb.group({
      distance: 0,
      duration: 0
    }),
  })
  
  constructor(
    private fb: FormBuilder,
  ) { }
  
  get type(): string{
    return this.form.get('type').value;
  } 

  get placeholder() {
    return `e.g. ${this.type === 'strength' ? 'Squats' : 'Skipping'}`
  }
  ngOnChanges( changes: SimpleChanges ) {
    if( this.workout && this.workout.name) {

      this.exists = true;

      const value = this.workout;
      this.form.patchValue({name: value.name});

    }
  }

  get required() {
    const nameControl = this.form.get('name');
    return (
      nameControl.hasError('required') && 
      nameControl.touched
    )
  }

  createWorkout() {
    if(this.form.valid){
      this.create.emit(this.form.value);
    }
  }
  updateWorkout(){
    if(this.form.valid){
      this.update.emit(this.form.value);
    }
  }
  removeWorkout() {
    this.remove.emit(this.form.value);
  }
  
  toggle() {
    this.toggled = !this.toggled;
  }
}