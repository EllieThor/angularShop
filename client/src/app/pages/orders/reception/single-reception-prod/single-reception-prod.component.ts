import { Component, Input, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/cartProductsModel';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-single-reception-prod',
  templateUrl: './single-reception-prod.component.html',
  styleUrls: ['./single-reception-prod.component.css'],
})
export class SingleReceptionProdComponent implements OnInit {
  @Input() prod: CartProduct = new CartProduct();
  constructor(
    public usersService: UsersServiceService,
    public cartsService: CartsService,
    public ordersService: OrdersService,
    public productsService: ProductsService
  ) {}

  ngOnInit(): void {}
}
