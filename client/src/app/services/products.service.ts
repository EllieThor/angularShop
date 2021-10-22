import { Injectable } from '@angular/core';
import { Category, Product } from '../models/productsModel';
import { ApiService } from './api.service';
import { SettingsService } from './settings.service';
import { CartsService } from './carts.service';

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
  _isImgUploaded: boolean = false;

  constructor(
    public apiService: ApiService,
    public settingsService: SettingsService,
    public cartsService: CartsService
  ) {}

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

      console.log('this._newProductObj: ', this._newProductObj);
      this.serverResult = await this.apiService.createPostService(
        url,
        newProdObj
      );
      this.getProducts('/products/getProducts', {
        categoryID: this._newProductObj.categoryID,
      });
      this._newProductObj = new Product();
      this.settingsService._isCartVisible = false;
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
    console.log('this._products after update: ', this._products);

    this._products.map((product) => {
      product.qnt = this.cartsService._cartProducts.find(
        (item) => item.productID === product.ID
      )?.Qnt;
    });
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

      this.serverResult = (await this.apiService.createPostService(
        url,
        ob
      )) as any;

      this.getProducts('/products/getProducts', {
        categoryID: this._newProductObj.categoryID,
      });
      this._newProductObj = new Product();
      this.settingsService._isCartVisible = false;
    }
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
    this._isImgUploaded = false;
    console.log('fileChange: ', e.target.files);
  }

  async uploadIMG() {
    if (this.uploadedFiles.length !== 0) {
      let formData = new FormData();
      formData.append(
        'file',
        this.uploadedFiles[0],
        this.uploadedFiles[0].name
      );
      formData.append('upload_preset', 'online-shop');

      this.serverResult = await this.apiService.createPostService('', formData);

      this._newProductObj.ImageName = this.serverResult.secure_url;
      if (this.serverResult.secure_url !== '') {
        this._isImgUploaded = true;
      }
    } else {
      alert('בחר.י תמונה לפני לחיצה על כפתור זה');
    }
  }

  addProdClick() {
    this.settingsService._isCartVisible = true;
    this._showAdminForm = true;
    this._addVsEdit = 0;
    this._newProductObj = new Product();
  }
  // `ID`, `ProductName`, `Price`, `Description`, `ImageName`, `createdAt`, `updatedAt`, `categoryID`
}
