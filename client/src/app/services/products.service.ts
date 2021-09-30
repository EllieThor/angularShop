import { Injectable } from '@angular/core';
import { Category, Product } from '../models/productsModel';
import { ApiService } from './api.service';
import { SettingsService } from './settings.service';

import * as moment from 'moment';
import 'moment/locale/pt-br';
import { CartsService } from './carts.service';
// moment().format('LLLL');

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
  // admin product form
  _showAdminForm: boolean = false;
  // add-0, edit-1
  _addVsEdit: number = 0;
  _time: any;
  _openCategory: number = 1;

  uploadedFiles: Array<File> = [];
  constructor(
    public apiService: ApiService,
    public settingsService: SettingsService,
    public cartsService: CartsService
  ) {
    // this._time = moment().format('LLLL');
    // console.log('time: ', this._time);
  }

  async addNewProd(url: string, event?: any) {
    event.preventDefault();
    if (this._newProductObj.ProductName === '') {
      alert('יש למלא שם פריט');
    } else if (this._newProductObj.Price === undefined) {
      alert('יש למלא מחיר פריט');
    } else if (this._newProductObj.Description === '') {
      alert('יש למלא תיאור פריט');
    } else if (this._newProductObj.ImageName === '') {
      alert('יש להעלות תמונת פריט');
    } else if (this._newProductObj.categoryID === 0) {
      alert('יש בחור קטגוריית פריט');
    } else {
      let newProdObj = {
        ProductName: this._newProductObj.ProductName,
        Price: this._newProductObj.Price,
        Description: this._newProductObj.Description,
        ImageName: this._newProductObj.ImageName,
        categoryID: this._newProductObj.categoryID,
      };
      // `ProductName`, `Price`, `Description`, `ImageName`, `categoryID`

      this.serverResult = await this.apiService.createPostService(
        url,
        newProdObj
      );
      console.log('this.serverResult addNewProd: ', this.serverResult);
      this._newProductObj = new Product();
      this.getProducts('/products/getProducts', {
        categoryID: this.serverResult.categoryID,
      });
    }
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
    this._openCategory = ob.categoryID;
    this._products = (await this.apiService.createPostService(
      url,
      ob
    )) as Array<Product>;

    this._products.map((product) => {
      product.qnt = this.cartsService._cartProducts.find(
        (item) => item.productID === product.ID
      )?.Qnt;
    });

    console.log('yael: ', this._products);
    // this.cartsService._cartProducts.find(
    //   (itemA) => itemA.productID === product.ID
    // )?.Qnt;
  }

  async updateProd(url: string, event?: any) {
    event.preventDefault();

    if (this._newProductObj.ProductName === '') {
      alert('יש למלא שם פריט');
    } else if (this._newProductObj.Price === undefined) {
      alert('יש למלא מחיר פריט');
    } else if (this._newProductObj.Description === '') {
      alert('יש למלא תיאור פריט');
    } else if (this._newProductObj.categoryID === 0) {
      alert('יש בחור קטגוריית פריט');
    } else if (this._newProductObj.ImageName === '') {
      alert('יש להעלות תמונת פריט');
    } else {
      let ob = {
        ID: this._newProductObj.ID,
        ProductName: this._newProductObj.ProductName,
        Price: this._newProductObj.Price,
        Description: this._newProductObj.Description,
        ImageName: this._newProductObj.ImageName,
        categoryID: this._newProductObj.categoryID,
      };
      console.log('ob updateProd : ', ob);

      this.serverResult = (await this.apiService.createPostService(
        url,
        ob
      )) as any;
      console.log('this.serverResult updateProd: ', this.serverResult);
      this.getProducts('/products/getProducts', {
        categoryID: this._newProductObj.categoryID,
      });
      this._newProductObj = new Product();
    }

    let ob = {
      ID: this._newProductObj.ID,
      ProductName: this._newProductObj.ProductName,
      Price: this._newProductObj.Price,
      Description: this._newProductObj.Description,
      ImageName: this._newProductObj.ImageName,
      categoryID: this._newProductObj.categoryID,
    };
    console.log('ob updateProd : ', ob);

    this.serverResult = (await this.apiService.createPostService(
      url,
      ob
    )) as any;
    console.log('this.serverResult updateProd: ', this.serverResult);
    this.getProducts('/products/getProducts', {
      categoryID: this._newProductObj.categoryID,
    });
    this._newProductObj = new Product();
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

  fileChange(e: any) {
    this.uploadedFiles = e.target.files;
  }

  async uploadIMG(url: string) {
    if (this.uploadedFiles.length !== 0) {
      let formData = new FormData();

      for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append(
          'uploads[]',
          this.uploadedFiles[i],
          this.uploadedFiles[i].name
        );
      }

      this._newProductObj.ImageName = this.uploadedFiles[0].name;
      console.log('test: ', this._newProductObj.ImageName);

      this.serverResult = await this.apiService.createPostService(
        url,
        formData
      );
      console.log('uploadIMG serverResult: ', this.serverResult);
    } else {
      alert('בחר.י תמונה לפני לחיצה על כפתור זה');
    }
  }

  addProdClick() {
    this._showAdminForm = true;
    this._addVsEdit = 0;
    this._newProductObj = new Product();
  }
  // `ID`, `ProductName`, `Price`, `Description`, `ImageName`, `createdAt`, `updatedAt`, `categoryID`
}
