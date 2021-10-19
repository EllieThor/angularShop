import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css'],
})
export class ReceptionComponent implements OnInit {
  constructor(
    public cartsService: CartsService,
    public ordersService: OrdersService
  ) {}

  ngOnInit(): void {}
}
