import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import 'rxjs/add/operator/map';

import { AuthService } from './../services/auth/auth.service';

@Injectable()
export class AuthGaurd implements CanActivate {
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate() {
    return this.authService.authState
      .map((user) => {
        if(!user) {
          // TODO: will ['auth','login'] work?
          this.router.navigate(['/auth/login'])
        }
        return !!user;
      })
  }
}