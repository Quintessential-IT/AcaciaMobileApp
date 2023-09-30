import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private accountService: AccountService, private router: Router, private activatedRoute: ActivatedRoute, private toastController: ToastController) { 
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/tabs/products';
  }
  ngOnInit(): void {
  }
  showForgotPasswordModal = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  returnUrl: string;

  forgotPassword(){
    console.log(this.forgotPasswordForm.value.email)
    this.accountService.sendForgotPasswordRequest(this.forgotPasswordForm.value.email).subscribe({
      next: () => {
        // this.modalService.hide()
        this.showToast('If a matching account was found, you will receive an email that will allow you to reset your password.', 'success')
      }
    })
  }

  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe({
      next: user => this.router.navigateByUrl(this.returnUrl),
    });
  }

  async openForgotPasswordModal() {
    this.showForgotPasswordModal = true;
  }

  // Method to close the forgot password modal
  closeForgotPasswordModal() {
    this.showForgotPasswordModal = false;
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
