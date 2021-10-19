import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css'],
})
export class ShippingDetailsComponent implements OnInit {
  cities: any = [];

  constructor(
    public usersService: UsersServiceService,
    public cartsService: CartsService,
    public ordersService: OrdersService,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.ordersService.getOrdersDates('/orders/getOrdersDates');
    this.httpClient.get('assets/israelCities.json').subscribe((data) => {
      this.cities = data;
    });
  }
}
