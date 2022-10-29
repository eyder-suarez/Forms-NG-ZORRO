import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from '../ng-zorro/ng-zorro.module';

import { FormsComponent } from './forms/forms.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FormsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroModule,
    RouterModule //Necesario para poder utilizar routerLink en el HTML

  ],
  exports: [
    FormsComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class ComponentsModule { }
