import { Injectable } from '@angular/core';
import { Category, Product } from '../models/productsModel';
import { ApiService } from './api.service';
import { SettingsService } from './settings.service';

import * as moment from 'moment';
import 'moment/locale/pt-br';
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
    public settingsService: SettingsService
  ) {
    // this._time = moment().format('LLLL');
    // console.log('time: ', this._time);
  }

  async addNewProd(url: string, event?: any) {
    // TODO: validation
    event.preventDefault();
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
  }

  async updateProd(url: string, event?: any) {
    // TODO: validation
    event.preventDefault();
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
  //FIXME: server not have upload function yet
  // upload image
  // async uploadIMG(url: string) {
  //   if (this._newProductObj.ImageName !== undefined) {
  //     const formData = new FormData();
  //     const files: any = this._newProductObj.ImageName;
  //     console.log('formData: ', formData);
  //     console.log('files: ', files);
  //     console.log('url: ', url);
  //     if (files.length) {
  //       for (let i: number = 0; i < files.length; i++) {
  //         formData.append('uploads[]', files[i], files[i]['name']);

  //         // formData.append('uploads[]', files);
  //       }
  //       this._newProductObj.ImageName = files[0].name;
  //       console.log('test: ', this._newProductObj.ImageName);
  //       this.serverResult = await this.apiService.createPostService(
  //         url,
  //         formData
  //       );
  //       console.log('uploadIMG serverResult: ', this.serverResult);
  //     }
  //   } else {
  //     alert('Click to upload image please');
  //   }
  // }
  fileChange(e: any) {
    this.uploadedFiles = e.target.files;
  }

  async uploadIMG(url: string) {
    if (this._newProductObj.ImageName !== undefined) {
      let formData = new FormData();

      if (this.uploadedFiles.length) {
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
      }
    } else {
      alert('Click to upload image please');
    }
  }

  addProdClick() {
    this._showAdminForm = true;
    this._addVsEdit = 0;
    this._newProductObj = new Product();
  }
  // `ID`, `ProductName`, `Price`, `Description`, `ImageName`, `createdAt`, `updatedAt`, `categoryID`
}
