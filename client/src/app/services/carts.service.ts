import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../models/cartsModel';
import { ApiService } from './api.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  _userCarts: Array<Cart> = [];
  // _currentCart: Cart = new Cart();
  _currentCart: Array<Cart> = [];
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

    this._userCarts = (await this.apiService.createPostService(
      url,
      getByPatterns
    )) as Array<Cart>;

    if (this._userCarts.length === 0) {
      // welcome for your first time
      console.log(' welcome for your first time');
      this.createCart('/carts/createCart', getByPatterns);
    } else {
      // 0-unpaid 1-paid
      let recentCart = this._userCarts.filter((cart) => cart.IsPaid === 0);
      console.log('recentCart: ', recentCart);
      // if recentCart is undefined-there is no unpaid cart

      if (recentCart === undefined) {
        // create new cart
        this.createCart('/carts/createCart', getByPatterns);
      } else {
        // resume shopping
        console.log('resume shopping');
        this._currentCart = recentCart;
      }
    }
    console.log('this cart: ', this._userCarts);
  }

  // CREATE
  async createCart(url: string, ob: any) {
    let getByPatterns = {
      userID: ob.userID,
    };

    this._userCarts = (await this.apiService.createPostService(
      url,
      getByPatterns
    )) as Array<Cart>;

    console.log('this cart: ', this._userCarts);
  }
}
