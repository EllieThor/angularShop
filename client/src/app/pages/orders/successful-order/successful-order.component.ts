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
    let cartID = this.ordersService._successfulOrder.cartID;
    let _cartProducts = this.cartsService._cartProducts;
    let cart = this.cartsService._userCarts.find(
      (cart) => cart.ID === this.ordersService._successfulOrder.cartID
    );
    let prodList = '';
    _cartProducts.map((product) => this.printSingleProd(product));
    console.log('app-successful-order cartID : ', cartID);
    console.log('app-successful-order cart : ', cart);
    console.log('app-successful-order _cartProducts : ', _cartProducts);

    const data = 'some text!!';
    // const blob = new Blob([data], { type: 'application/octet-stream' });
    const blob = new Blob([this._text], { type: 'application/octet-stream' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      window.URL.createObjectURL(blob)
    );
  }
  printSingleProd(ob: CartProduct) {
    this._text = ob.product.ProductName;
  }
}
