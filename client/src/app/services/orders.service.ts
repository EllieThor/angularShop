import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SettingsService } from './settings.service';
import { Router } from '@angular/router';
import { CartsService } from './carts.service';
import { UsersServiceService } from './users.service';
import { Order, ShippingDateCart } from '../models/ordersModel';
import { Cart } from '../models/cartsModel';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  _ordersQnt: any = {};
  _totalPrice: number = 0;
  _newOrder: Order = new Order();
  _formattedShippingDate: string = '';
  _successfulOrder: Order = new Order();
  serverResult: any;
  _isRegexp: boolean = false;
  _datesArr: any;

  searchTerm: string = '';

  constructor(
    public apiService: ApiService,
    public settingsService: SettingsService,
    public nav: Router,
    public cartsService: CartsService,
    public usersService: UsersServiceService
  ) {
    this.getOrdersDates('/orders/getOrdersDates');
  }

  async getOrdersQnt(url: string) {
    this._ordersQnt = (await this.apiService.createPostService(url)) as any;
  }

  async getOrdersDates(url: string) {
    this._datesArr = (await this.apiService.createPostService(
      url
    )) as Array<ShippingDateCart>;

    await this._datesArr.map((date: any) => {
      date.ShippingObj = {
        year: new Date(date.ShippingDate).getUTCFullYear(),
        month: new Date(date.ShippingDate).getUTCMonth() + 1,
        day: new Date(date.ShippingDate).getUTCDate(),
      };
    });

    this._datesArr.map((date: any) => {
      date.isAvailable = this.isShippingAvailable(date.ShippingObj);
    });
  }

  isShippingAvailable(what: any) {
    var count = 0;
    for (var i = 0; i < this._datesArr.length; i++) {
      if (
        this._datesArr[i].ShippingObj.day === what.day &&
        this._datesArr[i].ShippingObj.month === what.month &&
        this._datesArr[i].ShippingObj.year === what.year
      ) {
        count++;
      }
    }
    return count > 2 ? false : true;
  }

  creditRegex(e: any) {
    if (this.settingsService.creditRegexp.test(e.target.value)) {
      // return true;
      this._isRegexp = true;
    } else {
      // return false;
      this._isRegexp = false;
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
    } else if (this._isRegexp === false) {
      alert('הכנס.י פרטי חיוב-כרטיס אשראי תקין-16 ספרות');
    } else {
      let newOrderObj = {
        FinalPrice: this.cartsService._fixedTotalToPay,
        ShippingCity: this._newOrder.ShippingCity,
        ShippingStreet: this._newOrder.ShippingStreet,
        ShippingDate: this._newOrder.ShippingDate,
        CreditCard: this._newOrder.CreditCard.substring(
          this._newOrder.CreditCard.length - 4
        ),
        cartID: this.cartsService._currentCart.ID,
        userID: this.usersService._currentUserObj.ID,
      };
      // `ID`, `Price`, `ShippingCity`, `ShippingStreet`, `ShippingDate`, `CreditCard`, `createdAt`, `updatedAt`, `cartID`, `userID`

      this._successfulOrder = (await this.apiService.createPostService(
        url,
        newOrderObj
      )) as Order;
      if (this._successfulOrder) {
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

    this.cartsService._userCarts = [];
    this.cartsService._cartProducts = [];
    this.cartsService._currentCart = new Cart();
    this.cartsService._recentCart = new Cart();
    this.cartsService._fixedTotalPriseForProd = 0;
    this.cartsService._fixedTotalToPay = 0;
    this.cartsService._qnt = 0;
    this._isRegexp = false;
    this.cartsService.statusCartCheck('/carts/getCarts', {
      userID: this.usersService._currentUserObj.ID,
    });
  }
}
