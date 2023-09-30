import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Route, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.page.html',
  styleUrls: ['./personal-details.page.scss'],
})
export class PersonalDetailsPage implements OnInit {
  errors: string[] | null = null;
  whitespace = "[a-zA-Z0-9][a-zA-Z0-9 ]+"
  selectedTab: string = 'personal-details'; // Default selected tab
  link = ''
  formData = new FormData();
  DetailsForm = new FormGroup({
    displayName: new FormControl('', [ Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
    email: new FormControl('', [Validators.email, Validators.maxLength(30)]),
    profilePicture: new FormControl('', Validators.required),
  });

  constructor(public accountService: AccountService, private router: Router, private toastController: ToastController) { 
    this.link = 'personal'
  }
  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.accountService.currentUser$.subscribe({
      next: userDetails => {
        userDetails && this.DetailsForm.patchValue(userDetails);
      }
    })
  }

  uploadFile = (event: any) => {
    let fileToUpload = event.target.files[0];
    this.formData.append('profilePicture', fileToUpload);
  }

  updateUserDetails(){
    if(this.DetailsForm.valid)
    {
      const displayNameControl = this.DetailsForm.get('displayName')?.value;
      if(displayNameControl){
        if (/[^A-Za-z]/.test(displayNameControl)) {
          this.showToast('Please use only letters and spaces for the display name', 'danger')
          return
        } 
      }
      this.formData.append('displayName', this.DetailsForm.value.displayName!);
      this.formData.append('email', this.DetailsForm.value.email!);
      console.log(this.formData)
      console.log(this.DetailsForm.value)
      this.accountService.updateUser(this.formData).subscribe({
        next: () => {
          this.showToast('User Details updated', 'success')
          this.DetailsForm.reset(this.DetailsForm.value);
        },
        error: error => this.errors = error.errors
    })
    }
  }

  async showToast(message: string, color: string, duration = 2000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      color: color
    });
    await toast.present();
  }
}
