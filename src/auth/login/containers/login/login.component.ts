import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../../shared/services/auth/auth.service';

@Component({
  selector: 'login',
  template: `
    <div>
      <auth-form (submitted)="loginUser($event)">
        <h1>Login</h1>
        <a routerLink="/auth/register"> Not Registered?</a>
        <button type="submit">
          Login
        </button>
        <div class="error" *ngIf="error">
          {{error}}
        </div>
      </auth-form>
    </div>
  `
})
export class LoginComponent {

  error: string;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async loginUser(form: FormGroup) {
    const { email, password } = form.value;
    try {
      await this.authService.loginUser(email, password);
      this.router.navigate(['/']);
    } catch(err) {
      console.log(err);
      this.error = err.message;
    }
  }
}