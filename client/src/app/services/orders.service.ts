import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SettingsService } from './settings.service';
import { Router } from '@angular/router';
import { CartsService } from './carts.service';
import { UsersServiceService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  _ordersQnt: any = {};
  _totalPrice: number = 0;
  constructor(
    public apiService: ApiService,
    public settingsService: SettingsService,
    public nav: Router,
    public cartService: CartsService,
    public usersService: UsersServiceService
  ) {}

  async getOrdersQnt(url: string) {
    this._ordersQnt = (await this.apiService.createPostService(url)) as any;
  }

  // async getTotalPrice(url: string) {
  //   this._totalPrice = (await this.apiService.createPostService(url)) as number;
  // }
}
