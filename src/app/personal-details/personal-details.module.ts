import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalDetailsPageRoutingModule } from './personal-details-routing.module';

import { PersonalDetailsPage } from './personal-details.page';
import { CoreModule } from '../core/core.module';
import { ResetPasswordPageModule } from '../reset-password/reset-password.module';
import { AddressPageModule } from '../address/address.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    PersonalDetailsPageRoutingModule,
  ],
  declarations: [PersonalDetailsPage]
})
export class PersonalDetailsPageModule {}
