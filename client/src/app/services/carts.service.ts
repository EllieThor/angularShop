import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../models/cartsModel';
import { ApiService } from './api.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  _currentCarts: Array<Cart> = [];
  // _currentCart: Cart = new Cart();
  constructor(
    public apiService: ApiService,
    public settingsService: SettingsService,
    public nav: Router
  ) {}

  // READ
  async statusCartCheck(url: string, ob: any) {
    let getByPatterns = {
      userID: ob.userID,
    };

    this._currentCarts = (await this.apiService.createPostService(
      url,
      getByPatterns
    )) as Array<Cart>;
    if (this._currentCarts.length === 0) {
      this.createCart('/carts/createCart', getByPatterns);
    } else {
      let recentCart = this._currentCarts.find((cart) => {
        cart.IsPaid === 0;
      });
      console.log('recentCart: ', recentCart);
    }
    console.log('this cart: ', this._currentCarts);
  }

  // CREATE
  async createCart(url: string, ob: any) {
    let getByPatterns = {
      userID: ob.userID,
    };

    this._currentCarts = (await this.apiService.createPostService(
      url,
      getByPatterns
    )) as Array<Cart>;

    console.log('this cart: ', this._currentCarts);
  }
}
