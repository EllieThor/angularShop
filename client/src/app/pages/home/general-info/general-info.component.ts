import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css'],
})
export class GeneralInfoComponent implements OnInit {
  constructor(
    public usersService: UsersServiceService,
    public cartService: CartsService,
    public ordersService: OrdersService,
    public productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productsService.getProductsQnt('/products/getProductsQnt');
    this.ordersService.getOrdersQnt('/orders/getOrdersQnt');
  }
}
