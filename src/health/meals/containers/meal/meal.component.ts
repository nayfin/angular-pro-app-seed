import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap'
import { MealsService, Meal } from '../../../shared/services/meals/meals.service';
import { Store } from 'store';

@Component({
  selector: 'meal',
  styleUrls: ['meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="/img/food.svg" alt="">
          <span
            *ngIf="meal$ | async as meal; else title"> 
            {{ meal.name ? 'Edit' : 'Create'}} Meal
          </span>
          <ng-template #title>
            Loading...
          </ng-template>
        </h1>
      </div> 
      <div
      *ngIf="meal$ | async as meal; else loading">
        <meal-form
          [meal]="meal"
          (create)="addMeal($event)"
          (update)="updateMeal($event)"
          (remove)="removeMeal($event)">
        </meal-form>
      </div> 
      <ng-template #loading>
        <div class="message">
          <img src="/img/loading.svg">
          Fetching meal...
        </div>
      </ng-template>
    </div>
  `
})
export class MealComponent implements OnInit, OnDestroy { 
  
  meal$: Observable<any>;
  subsciption: Subscription;
  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  
  ngOnInit() {
    this.subsciption = this.mealsService.meals$.subscribe();
    this.meal$ = this.route.params
      .switchMap( params => this.mealsService.getMeal(params.id));
  }

  ngOnDestroy() {
    this.subsciption.unsubscribe();
  }

  async addMeal(event: Meal) {
    await this.mealsService.addMeal(event);
    // redirect
    this.backToMeals();
  }
  
  async updateMeal(event: Meal){
    const key = this.route.snapshot.params.id;

    await this.mealsService.updateMeal(key, event);
    // redirect
    this.backToMeals();
  }

  async removeMeal(event: Meal){
    const key = this.route.snapshot.params.id;
    await this.mealsService.removeMeal( key );
    // redirect
    this.backToMeals();
  }

  backToMeals(){
    this.router.navigate(['meals']);
  }
}