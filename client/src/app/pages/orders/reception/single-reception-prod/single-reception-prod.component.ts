import { Component, Input, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/cartProductsModel';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-single-reception-prod',
  templateUrl: './single-reception-prod.component.html',
  styleUrls: ['./single-reception-prod.component.css'],
})
export class SingleReceptionProdComponent implements OnInit {
  @Input() prod: CartProduct = new CartProduct();

  constructor(public ordersService: OrdersService) {}

  ngOnInit(): void {}
}
