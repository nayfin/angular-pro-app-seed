import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../../shared/services/auth/auth.service';

@Component({
  selector: 'Register',
  template: `
    <div>
      <auth-form (submitted)="registerUser($event)">
        <h1>Register</h1>
        <a routerLink="/auth/login"> Already have an account?</a>
        <button type="submit">
          Create Account
        </button>
        <div class="error" *ngIf="error">
         {{error}}
        </div>
      </auth-form>
    </div>
  `
})
export class RegisterComponent {

  error: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async registerUser(form: FormGroup) {
    const { email, password } = form.value;
    try {
      await this.authService.createUser(email, password);
      this.router.navigate(['/']);      
    } catch(err) {
      console.log(err);
      this.error = err.message;
    }
  }
}