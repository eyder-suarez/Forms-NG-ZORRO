import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from '../ng-zorro/ng-zorro.module';

import { FormsComponent } from './forms/forms.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    FormsComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroModule
  ],
  exports: [
    FormsComponent,
    LoginComponent
  ]
})
export class ComponentsModule { }
