import { Component, Input, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/cartProductsModel';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users.service';
import { Output, EventEmitter } from '@angular/core';
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
    public productsService: ProductsService
  ) {}

  ngOnInit(): void {}
}
