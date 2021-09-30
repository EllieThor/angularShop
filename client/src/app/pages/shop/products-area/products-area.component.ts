import { Component, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/cartProductsModel';
import { Product } from 'src/app/models/productsModel';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-products-area',
  templateUrl: './products-area.component.html',
  styleUrls: ['./products-area.component.css'],
})
export class ProductsAreaComponent implements OnInit {
  constructor(
    public usersService: UsersServiceService,
    public cartsService: CartsService,
    public ordersService: OrdersService,
    public productsService: ProductsService
  ) {}

  ngOnInit(): void {}
  callBackFN(ob: any) {
    this.cartsService._cartProducts.find((prod) => {
      prod.productID === ob.ID;
    });

    // console.log(
    //   'this.cartsService._cartProducts: ',
    //   this.cartsService._cartProducts
    // );
    // console.log(
    //   'product ob: ',
    //   ob,
    //   ' is ',
    //   this.cartsService._cartProducts.findIndex((prod) => {
    //     prod.productID == ob.ID;
    //   })
    // );
    console.log(
      'aaa:   ',
      this.cartsService._cartProducts.find((prod) => {
        prod.productID === ob.ID;
      })
    );
  }

  trackProduct(product: Product) {
    // let a = this.cartsService._cartProducts.find((prod) => {
    // prod.productID === product.ID;
    // });
    // console.log('testNow: ', a?.Qnt);
    console.log('testNow: ', product);
    // return a?.Qnt;
  }
}
