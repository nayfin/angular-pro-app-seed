import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { MealsService, Meal } from './../../../shared/services/meals/meals.service';
import { Store } from 'store';

@Component({
  selector: 'meals',
  styleUrls: ['meals.component.scss'],
  template: `
    <div class="meals">
      <div class="meals__title">
        <h1>
          <img src="/img/food.svg">
          Your Meals
        </h1>
        <a
          class="btn__add"
          [routerLink]="['../meals/new']">
          <img src="/img/add-white.svg" alt="">
          New Meals
        </a>
      </div>
      <div
        *ngIf="meals$ | async as meals; else loading">
        <div 
          class="message"
          *ngIf="!meals.length">
          <img src="/img/face.svg" alt="">
          No meals, add a new meal to start
        </div>

        <list-item 
          *ngFor="let meal of meals"
          [item]="meal"
          [linkRootPath]="'../meals'"
          [subtitle]="meal.ingredients | join"
          (remove)="removeMeal($event)">
        </list-item>

      </div>  
      <ng-template #loading>
        <div class="message">
          <img src="/img/loading.svg" alt="">
          Fetching Meals...
        </div>
      </ng-template>
    </div>
  `
})
export class MealsComponent implements OnInit, OnDestroy{

  meals$: Observable<Meal[]>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private mealsService : MealsService
  ) {}

  ngOnInit() {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meals$ = this.store.select<Meal[]>('meals');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeMeal(event: Meal) {
    this.mealsService.removeMeal(event.$key);
  }
}