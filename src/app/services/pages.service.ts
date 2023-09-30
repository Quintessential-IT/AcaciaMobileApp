import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor() { }

  getPages() {
    return [
      {
        title: 'Home',
        url: '/tabs/tab1',
        icon: 'home'
      },
      {
        title: 'Shop',
        url: '/tabs/products',
        icon: 'basket'
      },
      {
        title: 'Cart',
        url: '/cart',
        icon: 'cart'
      },
      {
        title: 'Checkout',
        url: '/checkout',
        icon: 'checkbox'
      },
      {
        title: 'Search',
        url: '/tabs/search',
        icon: 'search'
      },
      {
        title: 'Wishlist',
        url: '/tabs/tab3',
        icon: 'heart'
      },
      {
        title: 'Orders',
        url: '/tabs/orders',
        icon: 'checkmark-circle-outline'
      }
    ];
  }
}
