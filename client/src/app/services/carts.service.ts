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
  _recentCart: Cart = new Cart();
  _welcomeByCartStatus: number = 0;

  constructor(
    public apiService: ApiService,
    public settingsService: SettingsService,
    public nav: Router
  ) {}

  // READ
  async statusCartCheck(url: string, ob: any) {
    await this.getCarts(url, ob);

    if (this._userCarts.length === 0) {
      this._welcomeByCartStatus = 1;
      this.createCart('/carts/createCart', ob);
    } else {
      // 0-unpaid 1-paid if recentCart var is undefined - there is no unpaid cart
      let recentCart = this._userCarts.find((cart) => cart.IsPaid === 0);

      if (recentCart === undefined) {
        this._welcomeByCartStatus = 3;
        await this.createCart('/carts/createCart', ob);
        this.getRecentCart();
        await this.getCarts(url, ob);
      } else {
        // if recentCart var is defined - there is unpaid cart
        this._welcomeByCartStatus = 2;
        this._currentCart = recentCart;
      }
    }
  }
  // statusCartCheck with console.log's
  // async statusCartCheck(url: string, ob: any) {
  //   await this.getCarts(url, ob);

  //   console.log('all carts in statusCartCheck : ', this._userCarts);

  //   if (this._userCarts.length === 0) {
  //     // welcome for your first time
  //     console.log('welcome for your first time');
  //     this._welcomeByCartStatus = 1;
  //     this.createCart('/carts/createCart', ob);
  //   } else {
  //     // 0-unpaid 1-paid
  //     let recentCart = this._userCarts.find((cart) => cart.IsPaid === 0);
  //     console.log('recentCartVAR: ', recentCart);

  //     // if recentCart var is undefined - there is no unpaid cart
  //     if (recentCart === undefined) {
  //       console.log('start shop again');
  //       this._welcomeByCartStatus = 3;
  //       // create new cart
  //       await this.createCart('/carts/createCart', ob);
  //       // get recent cart
  //       this.getRecentCart();
  //       // get all cart again (with the new cart)
  //       await this.getCarts(url, ob);
  //     } else {
  //       // if recentCart var is defined - there is unpaid cart
  //       // resume shopping
  //       console.log('resume shopping');
  //       this._welcomeByCartStatus = 2;
  //       this._currentCart = recentCart;
  //       console.log('this._currentCart : ', this._currentCart);
  //     }
  //   }
  //   console.log('_welcomeByCartStatus: ', this._welcomeByCartStatus);
  //   console.log('_userCarts: ', this._userCarts);
  //   console.log('_currentCart: ', this._currentCart);
  // }
  //READ

  async getCarts(url: string, ob: any) {
    this._userCarts = (await this.apiService.createPostService(
      url,
      ob
    )) as Array<Cart>;
    console.log('getCartFN: ', this._userCarts);
  }

  // CREATE
  async createCart(url: string, ob: any) {
    this._currentCart = (await this.apiService.createPostService(
      url,
      ob
    )) as Cart;

    console.log('this._currentCart after create cart: ', this._currentCart);
  }

  getRecentCart() {
    console.log('getRecentCart');
    // item 0 is the last one (date) because sequelize order the carts : order: [["createdAt", "DESC"]]
    this._recentCart = this._userCarts[0];
    console.log('your recent cart : ', this._recentCart);
    console.log('recent Cart DATE : ', this._recentCart.createdAt);
  }
}
// products/getProductsAndOrdersQnt
// products/getProducts
