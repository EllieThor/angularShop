import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/productsModel';
import { ApiService } from 'src/app/services/api.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css'],
})
export class FormProductComponent implements OnInit {
  constructor(
    public productsService: ProductsService,
    public apiService: ApiService
  ) {}

  ngOnInit(): void {}

  // uploadedFiles: Array<File> = [];
  // _newProductObj: Product = new Product();
  // serverResult: any;
  // _isImgUploaded: boolean = false;

  // fileChange(e: any) {
  //   this.uploadedFiles = e.target.files;

  //   console.log('fileChange: ', e.target.files);
  // }

  // async uploadIMG() {
  //   if (this.uploadedFiles.length !== 0) {
  //     let formData = new FormData();
  //     formData.append(
  //       'file',
  //       this.uploadedFiles[0],
  //       this.uploadedFiles[0].name
  //     );
  //     formData.append('upload_preset', 'online-shop');

  //     this.serverResult = await this.apiService.createPostService('', formData);
  //     console.log('serverResult: ', this.serverResult);

  //     this._newProductObj.ImageName = this.serverResult.secure_url;
  //     if (this.serverResult.secure_url !== '') {
  //       this._isImgUploaded = true;
  //     }
  //     console.log(
  //       'this.serverResult.secure_url: ',
  //       this.serverResult.secure_url
  //     );
  //   } else {
  //     alert('בחר.י תמונה לפני לחיצה על כפתור זה');
  //   }
  // }
}
