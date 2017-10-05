import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';

import { User } from 'src/auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  styleUrls: ['app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-header">
      <div class="wrapper">
        <img src="/img/logo.svg">
        <div 
          *ngIf="user?.authenticated"
          class="app-header__user-info">
          <span (click)="logoutUser()"></span>
        </div>
      </div>
    </div>
  `
})
export class AppHeaderComponent {

  @Output()
  logout = new EventEmitter<any>();

  @Input()
  user: User;

  constructor() {}

  logoutUser() {
    this.logout.emit();
  }
}