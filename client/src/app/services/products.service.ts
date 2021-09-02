import { Injectable } from '@angular/core';
import { Category, Product } from '../models/productsModel';
import { ApiService } from './api.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  _productsQnt: any = {};
  _products: Array<Product> = [];
  _categories: Array<Category> = [];
  _newProductObj: Product = new Product();
  _searchFor: string = '';
  serverResult: any;

  constructor(
    public apiService: ApiService,
    public settingsService: SettingsService
  ) {}

  async addNewProd(url: string, event?: any) {
    event.preventDefault();
    let newProdObj = {
      ProductName: this._newProductObj.ProductName,
      Price: this._newProductObj.Price,
      Description: this._newProductObj.Description,
      ImageName: this._newProductObj.ImageName,
      CategoryID: this._newProductObj.CategoryID,
    };
    // `ProductName`, `Price`, `Description`, `ImageName`, `CategoryID`

    this.serverResult = await this.apiService.createPostService(
      url,
      newProdObj
    );
    console.log('new Product: ', this.serverResult);
  }

  async getProductsQnt(url: string) {
    this._productsQnt = (await this.apiService.createPostService(url)) as any;
  }

  async getCategories(url: string) {
    this._categories = (await this.apiService.createPostService(
      url
    )) as Array<Category>;
  }

  async getProducts(url: string, ob: any) {
    this._products = (await this.apiService.createPostService(
      url,
      ob
    )) as Array<Product>;
  }

  async searchForProd(url: string) {
    let searchFor = {
      searchFor: this._searchFor,
    };
    this._products = (await this.apiService.createPostService(
      url,
      searchFor
    )) as Array<Product>;
  }
}
