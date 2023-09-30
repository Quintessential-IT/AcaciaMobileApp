import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { ResetPasswordPage } from './reset-password.page';
import { CoreModule } from '../core/core.module';
import { ResetPasswordPageRoutingModule } from './reset-password-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    ResetPasswordPageRoutingModule
  ],
  declarations: [ResetPasswordPage],
})
export class ResetPasswordPageModule {}
