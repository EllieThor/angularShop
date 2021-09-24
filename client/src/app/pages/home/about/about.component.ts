import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor(
    public ordersService: OrdersService,
    public productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productsService.getProductsQnt('/products/getProductsQnt');
    this.ordersService.getOrdersQnt('/orders/getOrdersQnt');
  }
}
