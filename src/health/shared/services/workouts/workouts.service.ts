import { Subscription } from 'rxjs/Subscription';
import { User } from 'src/auth/shared/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of'

import { AuthService } from './../../../../auth/shared/services/auth/auth.service';
import { Store } from 'store';

export interface Workout {
  name: string,
  type: string,
  strength: any,
  endurance: any,
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable()
export class WorkoutsService {

  authSubscription: Subscription;
  workouts$: Observable<Workout[]> = this.db.list(`workouts/${this.uid}`)
    .do( workouts => {
      console.log("workouts$:", this.uid);
      this.store.set('workouts', workouts)
    });
  
  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}
  
  get uid() {
    // console.log('this.authService.user workouts.service user:', this.authService.user);   
    return this.authService.user.uid;
  }

  getWorkout(key: string) {
    if(!key) return Observable.of({});

    return this.store.select<Workout[]>(`workouts`)
      .filter( Boolean ) // Stops stream if workouts are empty
      .map(workouts => workouts.find( (workout: Workout) => workout.$key === key) )
  }

  addWorkout(workout: Workout){
    return this.db.list(`workouts/${this.uid}`).push(workout);
  }
  
  updateWorkout(key: string, workout: Workout){
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }
  
  removeWorkout(key: string){
    return this.db.list(`workouts/${this.uid}`).remove(key)
  }
}