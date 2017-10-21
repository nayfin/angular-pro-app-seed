import { Workout } from './health/shared/services/workouts/workouts.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/distinctUntilChanged';

import { ScheduleItem } from './health/shared/services/schedule/schedule.service';
import { Meal } from './health/shared/services/meals/meals.service';
import { User } from './auth/shared/services/auth/auth.service';


export interface State {
  user: User,
  meals: Meal[],
  selected: any,
  list: any,
  workouts: Workout[],
  schedule: ScheduleItem[],
  date: Date,  
  [key: string]: any
}

const state: State = {
  user: undefined,
  meals: undefined,
  selected: undefined,
  list: undefined,
  workouts: undefined,
  schedule: undefined,
  date: undefined, 
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().distinctUntilChanged();

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pluck(name);
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }

}
