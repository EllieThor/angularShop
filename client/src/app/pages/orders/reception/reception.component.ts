import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css'],
})
export class ReceptionComponent implements OnInit {
  _searchInCart: string = '';
  constructor(
    public usersService: UsersServiceService,
    public cartsService: CartsService,
    public ordersService: OrdersService,
    public productsService: ProductsService
  ) {}

  ngOnInit(): void {}

  highlight(text: string) {
    var inputText: any = document.getElementById('inputText');
    var innerHTML = inputText.innerHTML;
    var index = innerHTML.indexOf(text);
    if (index >= 0) {
      innerHTML =
        innerHTML.substring(0, index) +
        '<mark>' +
        innerHTML.substring(index, index + text.length) +
        '</mark>' +
        innerHTML.substring(index + text.length);
      console.log('s1:  ', innerHTML);
      inputText.innerHTML = innerHTML;
      console.log('s2:  ', inputText);
    }
  }
}
