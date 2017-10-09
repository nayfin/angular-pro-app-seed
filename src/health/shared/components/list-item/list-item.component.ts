import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'list-item',
  styleUrls: ['list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="list-item">
      <a [routerLink]="getRoute(item)">
        
        <p class="list-item__name">
          {{item.name}}
        </p>

        <p class="list-item__ingredients">
          <span> {{item.ingredients}} </span>
        </p>
        
      </a>

      <div class="list-item__delete">
        
        <p>
          Delete item?
        </p>
        <div 
          *ngIf="toggled"
          class="list-item__delete">
          <button 
            class="confirm"
            type="button"
            (click)="removeItem()">
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
          class="trash"
          (click)="toggle()">
          <img src="/img/remove.svg" alt="trash can icon">
        </button>
      </div>
    </div>
  `
})
export class ListItemComponent {
  
  toggled = false;

  @Input() item: any;

  @Output() remove = new EventEmitter<any>();
  constructor(
    
  ) {}

  getRoute(item: any) {
    return [`../meals`,
      item.$key,
    ];
  }

  removeItem(){
    this.remove.emit(this.item);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}