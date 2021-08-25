import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  _productsQnt: any = {};
  constructor(
    public apiService: ApiService,
    public settingsService: SettingsService
  ) {}

  async getProductsQnt(url: string) {
    this._productsQnt = (await this.apiService.createPostService(url)) as any;
    console.log('getProductsQnt: ', this._productsQnt);
  }
}
