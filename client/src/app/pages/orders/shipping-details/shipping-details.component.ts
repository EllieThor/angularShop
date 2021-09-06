import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/usersModel';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css'],
})
export class ShippingDetailsComponent implements OnInit {
  cities: any = [];
  biggestCities: Array<City> = [];

  constructor(
    public usersService: UsersServiceService,
    public cartsService: CartsService,
    public ordersService: OrdersService,
    public productsService: ProductsService,
    private httpClient: HttpClient
  ) {}
  //FIXME: biggestCities should work properly but got the 10 first cities
  ngOnInit(): void {
    this.httpClient.get('assets/israelCities.json').subscribe((data) => {
      this.cities = data;
      this.biggestCities = [...this.cities]
        .sort((a, b) => Number(b.population) - Number(a.population))
        .slice(0, 10);
      console.log('10 cities: ', this.biggestCities);
      // this.threeVacations = vacTest.sort((a, b) => b.follows.length - a.follows.length).slice(0, 3);
    });
  }
}
