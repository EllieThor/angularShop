import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SettingsService } from './settings.service';
import { Router } from '@angular/router';
import { CartsService } from './carts.service';
import { UsersServiceService } from './users.service';
import { Order } from '../models/ordersModel';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  _ordersQnt: any = {};
  _totalPrice: number = 0;
  _newOrder: Order = new Order();
  _successfulOrder: Order = new Order();
  serverResult: any;
  _isRegexp: boolean = false;
  _datesArr: any;
  // {cartID: 16, ShippingDate: '2021-10-02T00:00:00.000Z'}
  constructor(
    public apiService: ApiService,
    public settingsService: SettingsService,
    public nav: Router,
    public cartsService: CartsService,
    public usersService: UsersServiceService
  ) {}

  async getOrdersQnt(url: string) {
    this._ordersQnt = (await this.apiService.createPostService(url)) as any;
  }

  async getOrdersDates(url: string) {
    this._datesArr = (await this.apiService.createPostService(url)) as any;
    console.log('this._datesArr: ', this._datesArr);
  }

  creditRegex(e: any) {
    let regexp =
      /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
    if (regexp.test(e.target.value)) {
      // return true;
      this._isRegexp = true;
      console.log(true);
    } else {
      // return false;
      this._isRegexp = false;
      console.log(false);
    }
  }

  async addOrder(url: string, event?: any) {
    event.preventDefault();
    if (this._newOrder.ShippingCity === '') {
      alert('בחר.י עיר למשלוח');
    } else if (this._newOrder.ShippingStreet === '') {
      alert('הכנס.י רחוב למשלוח');
    } else if (this._newOrder.ShippingDate === '') {
      alert('בחר.י תאריך למשלוח');
    } else if (this._newOrder.CreditCard === '') {
      alert('הכנס.י פרטי חיוב');
    } else {
      let newOrderObj = {
        FinalPrice: this.cartsService._fixedTotalToPay,
        ShippingCity: this._newOrder.ShippingCity,
        ShippingStreet: this._newOrder.ShippingStreet,
        ShippingDate: this._newOrder.ShippingDate,
        CreditCard: this._newOrder.CreditCard,
        cartID: this.cartsService._currentCart.ID,
        userID: this.usersService._currentUserObj.ID,
      };
      // `ID`, `Price`, `ShippingCity`, `ShippingStreet`, `ShippingDate`, `CreditCard`, `createdAt`, `updatedAt`, `cartID`, `userID`

      this._successfulOrder = (await this.apiService.createPostService(
        url,
        newOrderObj
      )) as Order;
      if (this._successfulOrder) {
        console.log('_successfulOrder: ', this._successfulOrder);

        this.cartsService.updateIsPaidCartStatus(
          '/carts/updateIsPaidCartStatus',
          {
            ID: this.cartsService._currentCart.ID,
          }
        );

        this.cartsService.statusCartCheck('/carts/getCarts', {
          userID: this._successfulOrder.userID,
        });
      } else {
        alert('שגיאה, יש לטעון מחדש את העמוד');
      }
    }
  }

  goHome() {
    this._successfulOrder = new Order();
    this._newOrder = new Order();
    this.nav.navigate(['/home']);
  }
}
