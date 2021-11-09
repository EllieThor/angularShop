import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from '../models/cartProductsModel';
import { Cart } from '../models/cartsModel';
import { ApiService } from './api.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  _userCarts: Array<Cart> = [];
  _cartProducts: Array<CartProduct> = [];
  _currentCart: Cart = new Cart();
  _recentCart: Cart = new Cart();
  _welcomeByCartStatus: number = 0;
  serverResult: any;
  _fixedTotalPriseForProd: number = 0;
  _fixedTotalToPay: number = 0;
  _qnt: number = 0;
  constructor(
    public apiService: ApiService,
    public settingsService: SettingsService,
    public nav: Router
  ) {}

  // cart status check
  // async statusCartCheck(url: string, ob: any) {
  //   await this.getCarts(url, ob);

  //   if (this._userCarts.length === 0) {
  //     this._welcomeByCartStatus = 1;
  //     this.createCart('/carts/createCart', ob);
  //   } else {
  //     // 0-unpaid 1-paid if recentCart var is undefined - there is no unpaid cart
  //     let recentCart = this._userCarts.find((cart) => cart.IsPaid === 0);
  //     // FIXME: לתקן ברכת פתוח או אחרון

  //     if (recentCart === undefined) {
  //       this._welcomeByCartStatus = 3;
  //       await this.createCart('/carts/createCart', ob);
  //       this.getRecentCart();
  //       await this.getCarts(url, ob);
  //     } else {
  //       // if recentCart variable is defined - there is unpaid cart
  //       this._welcomeByCartStatus = 2;
  //       this._currentCart = recentCart;
  //       this._recentCart = this._userCarts[1];
  //       await this.gatCartProducts('/carts/getCartProducts');
  //     }
  //   }
  // }

  async statusCartCheck(url: string, ob: any) {
    await this.getCarts(url, ob);

    if (this._userCarts.length === 0) {
      this._welcomeByCartStatus = 1;
      await this.createCart('/carts/createCart', ob);
      await this.getCarts(url, ob);
      this._currentCart = this._userCarts[0];
      this._recentCart = new Cart();
    } else {
      // 0-unpaid 1-paid if recentCart var is undefined - there is no unpaid cart
      let activeCart = this._userCarts.find((cart) => cart.IsPaid === 0);

      if (activeCart === undefined) {
        //כל העגלות שולמו
        this._welcomeByCartStatus = 3;
        await this.createCart('/carts/createCart', ob);
        await this.getCarts(url, ob);
        // item 0 is the current item  and item 1 is the last one (date) because sequelize order the carts : order: [["createdAt", "DESC"]]
        this._currentCart = this._userCarts[0];
        this._recentCart = this._userCarts[1];
      } else {
        // יש עגלה שלא שולמה
        this._currentCart = activeCart;
        this._recentCart = this._userCarts[1];
        await this.gatCartProducts('/carts/getCartProducts');
        // this._welcomeByCartStatus =
        //   this._fixedTotalToPay > 0
        //     ? 2
        //     : this._recentCart === undefined
        //     ? 1
        //     : 3;
        if (this._fixedTotalToPay > 0) {
          this._welcomeByCartStatus = 2;
        } else {
          this._welcomeByCartStatus = this._recentCart === undefined ? 1 : 3;
        }
      }
    }
  }

  // carts
  // CREATE (carts)
  async createCart(url: string, ob: any) {
    this._currentCart = (await this.apiService.createPostService(
      url,
      ob
    )) as Cart;
  }

  // READ (carts)
  async getCarts(url: string, ob: any) {
    this._userCarts = (await this.apiService.createPostService(
      url,
      ob
    )) as Array<Cart>;
  }

  // UPDATE (carts)
  async updateIsPaidCartStatus(url: string, ob?: any) {
    this.serverResult = (await this.apiService.createPostService(
      url,
      ob
    )) as any;
  }

  getRecentCart() {
    // item 0 is the last one (date) because sequelize order the carts : order: [["createdAt", "DESC"]]
    this._recentCart = this._userCarts[0];
  }

  // CartProducts

  // READ (CartProducts)
  async gatCartProducts(url: string) {
    this._fixedTotalPriseForProd = 0;
    let getByPatterns = {
      cartID: this._currentCart.ID,
    };
    this._cartProducts = (await this.apiService.createPostService(
      url,
      getByPatterns
    )) as Array<CartProduct>;

    this._cartProducts.map((cartItem) => {
      this._fixedTotalPriseForProd += Number(
        (cartItem.product.Price * cartItem.Qnt).toFixed(2)
      );
    });

    this.calcTotalToPay();
  }

  calcTotalToPay() {
    this._fixedTotalToPay = 0;
    this._cartProducts.map((prod) => {
      this._fixedTotalToPay += prod.TotalPrice;
    });
  }
}
