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

  searchTerm = 'Lorem';
  caseSensitive = false;
  constructor(
    public usersService: UsersServiceService,
    public cartsService: CartsService,
    public ordersService: OrdersService,
    public productsService: ProductsService
  ) {}

  ngOnInit(): void {}

  // highlight() {
  //   // FIXME: אין כזה אלמנט עם כזה איידי ולכן לא עובד
  //   var inputText: any = document.getElementById('inputText');
  //   console.log('inputText :', inputText);
  //   var innerHTML = inputText.innerHTML;
  //   var index = innerHTML.indexOf(this._searchInCart);
  //   if (index >= 0) {
  //     innerHTML =
  //       innerHTML.substring(0, index) +
  //       '<mark>' +
  //       innerHTML.substring(index, index + this._searchInCart.length) +
  //       '</mark>' +
  //       innerHTML.substring(index + this._searchInCart.length);
  //     console.log('s1:  ', innerHTML);
  //     inputText.innerHTML = innerHTML;
  //     console.log('s2:  ', inputText);
  //   }
  // }
}
