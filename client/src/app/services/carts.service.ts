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
  _cartItems: Array<CartProduct> = [];
  _currentCart: Cart = new Cart();
  _recentCart: Cart = new Cart();
  _welcomeByCartStatus: number = 0;
  result: any;

  constructor(
    public apiService: ApiService,
    public settingsService: SettingsService,
    public nav: Router
  ) {}

  // cart status check
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

  // READ (carts)
  async getCarts(url: string, ob: any) {
    this._userCarts = (await this.apiService.createPostService(
      url,
      ob
    )) as Array<Cart>;
    console.log('getCartFN: ', this._userCarts);
  }

  // CREATE (carts)
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

  // READ (CartProducts)
  async gatCartProducts(url: string) {
    let getByPatterns = {
      cartID: this._currentCart.ID,
    };
    this._cartItems = (await this.apiService.createPostService(
      url,
      getByPatterns
    )) as Array<CartProduct>;
    console.log('_cartItems: ', this._cartItems);
  }

  // CREATE (CartProducts)
  async addProdToCart(url: string, ob: any) {
    let getByPatterns = {
      cartID: this._currentCart.ID,
      productID: ob.productID,
      TotalPrice: ob.Price,
    };
    let qnt;
    let findIndex = this._cartItems.findIndex(
      (item) => item.productID == ob.productID
    );
    console.log('findIndex: ', findIndex);
    if (findIndex == -1) {
      this.result = (await this.apiService.createPostService(
        url,
        getByPatterns
      )) as any;
      console.log('result: ', this.result);
    } else {
      qnt = this._cartItems[findIndex].Qnt;
      console.log('index ', findIndex, 'need to change qnt to : ', qnt + 1);
    }
    this.gatCartProducts('/carts/getCartProducts');
  }
}
