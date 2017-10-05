import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// third party modules
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
// app modules
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
  { 
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login'},
      { path: 'login',  loadChildren: './login/login.module#LoginModule'},
      { path: 'register',  loadChildren: './register/register.module#RegisterModule'},
    ]
  }
]

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyDgg3RGg-joU_AIplPcTo9pB3OvEnlPBKc",
  authDomain: "uap-fitness.firebaseapp.com",
  databaseURL: "https://uap-fitness.firebaseio.com",
  projectId: "uap-fitness",
  storageBucket: "uap-fitness.appspot.com",
  messagingSenderId: "1024525279956"
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule {
  
}  