import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressPage } from './address.page';
import { CoreModule } from '../core/core.module';
import { AddressPageRoutingModule } from './address-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    AddressPageRoutingModule
  ],
  declarations: [AddressPage]
})
export class AddressPageModule {}
