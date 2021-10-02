import { Component, Input, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/cartProductsModel';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users.service';
import { Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-single-cart-prod',
  templateUrl: './single-cart-prod.component.html',
  styleUrls: ['./single-cart-prod.component.css'],
})
export class SingleCartProdComponent implements OnInit {
  @Input() item: CartProduct = new CartProduct();
  // TODO:  Attempts Output
  // @Output() newItemEvent = new EventEmitter<number>();
  // addNewItem(value: number) {
  //   this.newItemEvent.emit(value);
  // }
  constructor(
    public usersService: UsersServiceService,
    public cartsService: CartsService,
    public ordersService: OrdersService,
    public productsService: ProductsService,
    public apiService: ApiService
  ) {}
  serverResult: any;

  ngOnInit(): void {}
  // UPDATE (CartProducts)
  async changeQnt(url: string, ob?: any) {
    let getByPatterns = {
      cartID: this.cartsService._currentCart.ID,
      productID: ob.productID,
      type: ob.type,
      quantity: ob.quantity,
      price: ob.price,
    };
    this.serverResult = (await this.apiService.createPostService(
      url,
      getByPatterns
    )) as any;
    this.cartsService.gatCartProducts('/carts/getCartProducts');
    // this.productsService._products.find((item) => item.ID === ob.productID);
    this.productsService.getProducts('/products/getProducts', {
      categoryID: 1,
    });
  }
  // DELETE (CartProducts)
  async deleteProductFromCart(url: string, ob?: any) {
    let res;
    if (!ob.productID) {
      res = confirm(
        'ברצונך להסיר את כל המוצרים מהעגלה? \nלחיצה על אישור תסיר את כל הפריטים מהעגלה'
      );
    }

    if (res || ob.productID) {
      this.serverResult = (await this.apiService.createPostService(
        url,
        ob
      )) as any;
      await this.cartsService.gatCartProducts('/carts/getCartProducts');
      await this.productsService.getProducts('/products/getProducts', {
        categoryID: this.productsService._openCategory,
      });
    }
  }
}
