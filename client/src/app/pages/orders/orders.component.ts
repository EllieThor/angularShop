import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(
    public usersService: UsersServiceService,
    public cartsService: CartsService,
    public ordersService: OrdersService,
    public productsService: ProductsService,
    public nav: Router
  ) {}

  ngOnInit(): void {
    if (!this.usersService._currentUserObj.ID) {
      this.nav.navigate(['/home']);
    }
  }
}
