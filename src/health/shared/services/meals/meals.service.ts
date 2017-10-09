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

export interface Meal {
  name: string,
  ingredients: string[],
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable()
export class MealsService {
    
  meals$: Observable<Meal[]> = this.db.list(`meals/${this.uid}`)
    .do( meals => {
      console.log("meals$:",this.uid);
      this.store.set('meals', meals)
    });
  
  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}
  
  get uid() {
    // console.log('this.authService.user meals.service user:', this.authService.user);   
    return this.authService.user.uid;
  }

  getMeal(key: string) {
    if(!key) return Observable.of({});

    return this.store.select<Meal[]>(`meals`)
      .filter( Boolean ) // Stops stream if meals are empty
      .map(meals => meals.find( (meal: Meal) => meal.$key === key) )
  }
  addMeal(meal: Meal){
    return this.db.list(`meals/${this.uid}`).push(meal);
  }
  updateMeal(key: string, meal: Meal){
    return this.db.object(`meals/${this.uid}/${key}`).update(meal);
  }
  removeMeal(key: string){
    return this.db.list(`meals/${this.uid}`).remove(key)
  }
}