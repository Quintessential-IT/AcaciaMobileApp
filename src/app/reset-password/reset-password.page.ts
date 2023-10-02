import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  errors: string[] | null = null;
  link = ''
  complexPassword = "(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$"

  passwordForm = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', [Validators.required, Validators.pattern(this.complexPassword)]),
  });
  
  constructor(public accountService: AccountService, private toastController: ToastController) { 
    this.link = 'password'
  }
  ngOnInit(): void {

  }

  resetPassword(){
    const oldPasswordControl = this.passwordForm.get('oldPassword');
    const newPasswordControl = this.passwordForm.get('newPassword');
    if (oldPasswordControl?.value === newPasswordControl?.value) {
      this.showToast('New password cannot be the same as the current password.', 'danger')
      return;
    }

    this.accountService.resetPassword(this.passwordForm.value).subscribe({
      next: () => {
        this.showToast('Password updated', 'success')
        this.passwordForm.reset();
      },
      error: error => {
        this.showToast('Password Chnage Failed', 'danger'),
        this.errors = error.errors
      }
    })
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
