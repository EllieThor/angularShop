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

  // carts
  // CREATE (carts)
  async createCart(url: string, ob: any) {
    console.log('this._currentCart obobobobob: ', ob);
    this._currentCart = (await this.apiService.createPostService(
      url,
      ob
    )) as Cart;

    console.log('this._currentCart after create cart: ', this._currentCart);
  }

  // READ (carts)
  async getCarts(url: string, ob: any) {
    this._userCarts = (await this.apiService.createPostService(
      url,
      ob
    )) as Array<Cart>;
    console.log('getCartFN: ', this._userCarts);
  }

  // UPDATE (carts)
  async updateIsPaidCartStatus(url: string, ob?: any) {
    this.serverResult = (await this.apiService.createPostService(
      url,
      ob
    )) as any;

    console.log('updateIsPaidCartStatus serverResult: ', this.serverResult);
  }

  getRecentCart() {
    console.log('getRecentCart');
    // item 0 is the last one (date) because sequelize order the carts : order: [["createdAt", "DESC"]]
    this._recentCart = this._userCarts[0];
    console.log('your recent cart : ', this._recentCart);
    console.log('recent Cart DATE : ', this._recentCart.createdAt);
  }

  // CREATE (CartProducts) event handler
  async addProdToCart(url: string, ob: any) {
    let getByPatterns = {
      cartID: this._currentCart.ID,
      productID: ob.productID,
      priceForOne: ob.price,
    };
    let qnt;
    let findIndex = this._cartProducts.findIndex(
      (item) => item.productID == ob.productID
    );
    console.log('findIndex: ', findIndex);

    if (findIndex == -1) {
      // insert
      this.insertProductToCart(url, getByPatterns);
    } else {
      // change
      qnt = this._cartProducts[findIndex].Qnt;
      this.changeQnt('/carts/changeQnt', {
        productID: ob.productID,
        type: 1,
        quantity: qnt,
        price: ob.price,
      });
    }
    this.gatCartProducts('/carts/getCartProducts');
  }

  //FIXME: .toFixed(2) not work with this._fixedTotalPriseForProd
  // READ (CartProducts)
  async gatCartProducts(url: string) {
    let totalPrise = 0;
    let getByPatterns = {
      cartID: this._currentCart.ID,
    };
    this._cartProducts = (await this.apiService.createPostService(
      url,
      getByPatterns
    )) as Array<CartProduct>;
    console.log('_cartProducts: ', this._cartProducts);
    // _fixedTotalPriseForProd
    this._cartProducts.map((cartItem) => {
      totalPrise += Number(cartItem.product.Price) * Number(cartItem.Qnt);
    });
    // this._fixedTotalPriseForProd = Number(totalPrise).toFixed(2);
    this._fixedTotalPriseForProd = totalPrise;

    this.calcTotalToPay();
  }

  calcTotalToPay() {
    this._fixedTotalToPay = 0;
    this._cartProducts.map((prod) => {
      this._fixedTotalToPay += prod.TotalPrice;
    });
  }
  // CREATE (CartProducts)
  async insertProductToCart(url: string, ob?: any) {
    this.serverResult = (await this.apiService.createPostService(
      url,
      ob
    )) as any;
    console.log('serverResult: ', this.serverResult);
    this.gatCartProducts('/carts/getCartProducts');
  }

  // READ (CartProducts)
  async changeQnt(url: string, ob?: any) {
    let getByPatterns = {
      cartID: this._currentCart.ID,
      productID: ob.productID,
      type: ob.type,
      quantity: ob.quantity,
      price: ob.price,
    };
    this.serverResult = (await this.apiService.createPostService(
      url,
      getByPatterns
    )) as any;
    this.gatCartProducts('/carts/getCartProducts');
  }

  // DELETE (CartProducts)
  async deleteProductFromCart(url: string, ob?: any) {
    this.serverResult = (await this.apiService.createPostService(
      url,
      ob
    )) as any;
    this.gatCartProducts('/carts/getCartProducts');
  }
}
