import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastController: ToastController) {}

  async presentToast(message: string, duration: number, color: string) {
    const toast = await this.toastController.create({
      message,
      duration,
      color
    });
    toast.present();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(async (error: HttpErrorResponse) => {
        if (error) {
          if (error.status === 400) {
            if (error.error.errors) {
              throw error.error;
            } else {
              this.presentToast(error.error.message, 3000, 'danger');
            }
          }
          if (error.status === 401) {
            this.presentToast(error.error.message, 3000, 'danger');
          }
          if (error.status === 404) {
            this.presentToast(error.error.message, 3000, 'danger');
          }
          if (error.status === 500) {
            this.presentToast(error.error.message, 3000, 'danger');
          }
        }
        return Promise.reject(error); // Use Promise.reject() to propagate the error further
      })
    );
  }
}
