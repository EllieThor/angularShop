import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/models/cartProductsModel';
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
  constructor(
    private sanitizer: DomSanitizer,
    public usersService: UsersServiceService,
    public cartsService: CartsService,
    public ordersService: OrdersService,
    public productsService: ProductsService,
    public nav: Router
  ) {}

  ngOnInit(): void {
    // _successfulOrder
    let _cartProducts = this.cartsService._cartProducts;
    let cart = this.cartsService._userCarts.find(
      (cart) => cart.ID === this.ordersService._successfulOrder.cartID
    );
    console.log('$$$$$$$$$$$$$$$$$$: ', cart);
    _cartProducts.map((product) => this.printSingleProd(product));

    const blob = new Blob([this._text], { type: 'application/octet-stream' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      window.URL.createObjectURL(blob)
    );
  }
  // TODO: אם יש מאותו מוצר יותר מאחד- יהיה מחיר לאחד, סימן כפול וכמות
  printSingleProd(ob: CartProduct) {
    let qntOverOne = `${ob.Qnt}  x  ${ob.product.Price}`;
    this._text += `${ob.product.ProductName}   סכום: ${ob.TotalPrice}   ${
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
