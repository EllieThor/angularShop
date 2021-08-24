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
  _currentCart: Cart = new Cart();
  // _currentCart: Array<Cart> = [];
  result: any;
  constructor(
    public apiService: ApiService,
    public settingsService: SettingsService,
    public nav: Router
  ) {}

  // READ
  async statusCartCheck(url: string, ob: any) {
    await this.getCarts(url, ob);
    console.log('all carts in statusCartCheck : ', this._userCarts);
    // this._userCarts = (await this.apiService.createPostService(
    //   url,
    //   ob
    // )) as Array<Cart>;

    if (this._userCarts.length === 0) {
      // welcome for your first time
      console.log(' welcome for your first time');
      this.createCart('/carts/createCart', ob);
    } else {
      // 0-unpaid 1-paid
      let recentCart = this._userCarts.find((cart) => cart.IsPaid === 0);
      console.log('recentCartVAR: ', recentCart);
      // if recentCart var is undefined-there is no unpaid cart

      if (recentCart === undefined) {
        // create new cart
        await this.createCart('/carts/createCart', ob);
        console.log('start shop again');
        this.getRecentCart();
        await this.getCarts(url, ob);
      } else {
        // resume shopping
        console.log('resume shopping');
        this._currentCart = recentCart;
        console.log('this._currentCart : ', this._currentCart);
      }
    }
    console.log('_userCarts: ', this._userCarts);
  }

  //READ
  async getCarts(url: string, ob: any) {
    this._userCarts = (await this.apiService.createPostService(
      url,
      ob
    )) as Array<Cart>;
    console.log('getCartFN: ', this._userCarts);
  }

  getRecentCart() {
    console.log('getRecentCart');
    // this._userCarts.find((cart) => cart.createdAt === 0);
  }

  // CREATE
  async createCart(url: string, ob: any) {
    let getByPatterns = {
      userID: ob.userID,
    };

    this.result = (await this.apiService.createPostService(
      url,
      getByPatterns
    )) as Array<Cart>;

    console.log('this.result after create cart: ', this.result);
  }
}
