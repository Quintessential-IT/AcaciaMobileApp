/**
* Storage Services
* @author    ThemesBuckets <themebucketbd@gmail.com>
* @copyright Copyright (c) 2020
* @license   ThemesBuckets
*/


import { Injectable } from '@angular/core';
import { Product } from '../core/models/product.model';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setObject(product: Product, ITEMS_KEY: any) {
    const ret: any = await Preferences.get({ key: ITEMS_KEY });
    const products = JSON.parse(ret.value);
    console.log({ products })

    if (!products || products.length === 0) {
      await Preferences.set({
        key: ITEMS_KEY,
        value: JSON.stringify([product])
      });
    } else {
      let newProducts: any = products;
      newProducts.push(product);

      await Preferences.set({
        key: ITEMS_KEY,
        value: JSON.stringify(newProducts)
      });
    }
  }

  async getObject(ITEMS_KEY: any) {
    const ret: any = await Preferences.get({ key: ITEMS_KEY });
    const products = JSON.parse(ret.value);

    if (!products || products.length === 0) {
      return null;
    }

    return products;
  }

  async removeStorageValue(id: number, ITEMS_KEY: any) {
    const ret: any = await Preferences.get({ key: ITEMS_KEY });
    const products = JSON.parse(ret.value);

    if (!products || products.length === 0) {
      return null;
    }

    let toKeep: Product[] = [];

    for (let i of products) {
      if (i.id !== id) {
        toKeep.push(i);
      }
    }

    await Preferences.set({
      key: ITEMS_KEY,
      value: JSON.stringify(toKeep)
    });

    return true;
  }

  async clear() {
    await Preferences.clear();
  }
}
