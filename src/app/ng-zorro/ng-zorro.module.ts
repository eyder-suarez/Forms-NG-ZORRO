import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';







@NgModule({
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzButtonModule
  ],
  exports: [
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzButtonModule
  ],
  providers: [
    NzModalService
  ]
})
export class NgZorroModule { }
