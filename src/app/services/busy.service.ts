import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;
  loading?: HTMLIonLoadingElement;

  constructor(private loadingController: LoadingController) { }

  busy() {
    if (this.busyRequestCount === 0) {
      this.presentLoading();
    }
    this.busyRequestCount++;
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.dismissLoading();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'custom-loading', // You can define your custom CSS class
      message: 'Loading...',
      translucent: true,
      spinner: 'circular' // Ionic spinner type
    });
    await this.loading.present();
  }

  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
}
