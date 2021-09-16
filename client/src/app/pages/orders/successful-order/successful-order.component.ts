import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/models/cartProductsModel';
import { Order } from 'src/app/models/ordersModel';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-successful-order',
  templateUrl: './successful-order.component.html',
  styleUrls: ['./successful-order.component.css'],
})
export class SuccessfulOrderComponent implements OnInit {
  fileUrl!: SafeResourceUrl;
  _text: string = '';
  _introduction: string = '';
  _summary: string = '';
  _4credit: string = '';
  _newOrder: Order = new Order();
  constructor(
    private sanitizer: DomSanitizer,
    public usersService: UsersServiceService,
    public cartsService: CartsService,
    public ordersService: OrdersService,
    public productsService: ProductsService,
    public nav: Router
  ) {}

  ngOnInit(): void {
    this.cartsService._cartProducts.map((product) =>
      this.printSingleProd(product)
    );

    this._4credit = this.ordersService._successfulOrder.CreditCard.substring(
      this.ordersService._successfulOrder.CreditCard.length - 4
    );

    this._introduction = `SWEET HEART \n reception \n ${this.ordersService._successfulOrder.createdAt}\n \n`;

    this._summary = `\n סה"ס לתשלום \n ${this.ordersService._successfulOrder.FinalPrice.toFixed(
      2
    )}₪  \n \n \n  ארבע ספרות אחרונות של אמצעי תשלום : ${
      this._4credit
    } \n \n תודה ולהתראות! :) יום טוב `;

    const blob = new Blob([this._introduction + this._text + this._summary], {
      type: 'application/octet-stream',
    });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      window.URL.createObjectURL(blob)
    );
  }
  printSingleProd(ob: CartProduct) {
    let qntOverOne = '\n' + `${ob.Qnt}x` + `${ob.product.Price}₪`;
    this._text += `\n${ob.product.ProductName}   סה"כ: ${ob.TotalPrice}₪  ${
      ob.Qnt > 1 ? qntOverOne : ''
    }\n`;
  }
}
//  {
//         "ID": 1,
//         "Qnt": 1,
//         "TotalPrice": 50,
//         "createdAt": "2021-08-26T12:42:17.000Z",
//         "updatedAt": "2021-08-26T12:42:17.000Z",
//         "productID": 40,
//         "cartID": 31,
//         "product": {
//             "ProductName": "סימפוניה זיתים",
//             "Price": 19.7,
//             "ImageName": "1596962647453_ESB34_L_P_5839108_1.png"
//         }
//     }
// item.Qnt * item.product.Price;
