import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  provinceList = [
    {name: 'Free State', value: 'Free State'},
    {name: 'Mpumalanga', value: 'Mpumalanga'},
    {name: 'Northen Province', value: 'Northen Province'},
    {name: 'Eastern Cape', value: 'Eastern Cape'},
    {name: 'Limpopo', value: 'Limpopo'},
    {name: 'North West Province', value: 'North West Province'},
    {name: 'KwaZulu-Natal', value: 'KwaZulu-Natal'},
    {name: 'Gauteng', value: 'Gauteng'},
  ];
  link = ''
  whitespace = "[a-zA-Z0-9][a-zA-Z0-9 ]+"
  addressForm = new FormGroup({
    streetAddress: new FormControl('',[Validators.required]),
    complexName: new FormControl('', [Validators.required]),
    suburb: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    province: new FormControl('', Validators.required),
    postalCode: new FormControl(0, [Validators.required, Validators.min(1), Validators.minLength(4), Validators.maxLength(4)]),
  });

  constructor(private accountService: AccountService, private router: Router, private toastController: ToastController) { 
    this.link = 'address'
  }
  ngOnInit(): void {
    this.getAddress();
  }

  getAddress(){
    this.accountService.GetUserAddress().subscribe({
      next: address => {
        address && this.addressForm.patchValue(address);
      }
    })
  }

  updateUsersAddress(){
    this.accountService.updateUserAddress(this.addressForm.value).subscribe({
      next: () => {
        this.showToast('Address updated', 'success')
        this.addressForm.reset(this.addressForm.value);
        this.router.navigateByUrl('/account');
      },
      error: () => {
        this.showToast('Address could not be updated', 'danger')
      }
    })
  }
  

  onProvinceSelected(event: any){
    this.addressForm.value.province = event.target.value;
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
