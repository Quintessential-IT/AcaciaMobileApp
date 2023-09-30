import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { User_Role } from '../core/models/User_Role';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  errors: string[] | null = null;
  roles: User_Role[] = [];
  complexPassword = "(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$"

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router: Router, private toastController: ToastController) { }

  registerForm = this.formBuilder.group({
    displayName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email], [this.checkEmailExits()]],
    password: ['', [Validators.required, Validators.pattern(this.complexPassword)]],
    roles : ['', Validators.required],
    profilePicture : ['', Validators.required],
  });
  formData = new FormData();

  ngOnInit(): void {
    this.getRoles();
  }

  checkEmailExits(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        take(1),
        switchMap(() => {
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res => res ? {emailExists: true} : null),
            finalize(() => control.markAsTouched())
          )
        })
      )
    }
  }

  getRoles(){
    this.accountService.getUserRoles().subscribe({
      next: response => this.roles = [...response],
      error: error => console.log(error)
    })
  }

  onRoleSelected(event: any){
    this.registerForm.value.roles = event.target.value;
  }

  uploadFile = (event: any) => {
    let fileToUpload = event.target.files[0];
    this.formData.append('profilePicture', fileToUpload);
  }

  onSubmit(){
    if(this.registerForm.valid)
    {
      const displayNameControl = this.registerForm.get('displayName')?.value;
      if(displayNameControl){
        if (/[^A-Za-z]/.test(displayNameControl)) {
          this.showToast('Please use only letters and spaces for the display name', 'danger')
          return
        } 
      }

      this.formData.append('displayName', this.registerForm.value.displayName!);
      this.formData.append('email', this.registerForm.value.email!);
      this.formData.append('password', this.registerForm.value.password!);
      this.formData.append('roles', this.registerForm.value.roles!);
      console.log(this.formData)
      console.log(this.registerForm.value)
      this.accountService.register(this.formData).subscribe(
        () => {
          this.router.navigateByUrl('/tabs/products')
        },
        error => {
          this.errors = error.errors;
        }
      );  
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
