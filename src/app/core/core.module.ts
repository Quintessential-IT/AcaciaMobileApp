import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from './text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TextInputComponent
 ],
 imports: [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
],
  exports: [
    TextInputComponent
  ]
})
export class CoreModule { }
