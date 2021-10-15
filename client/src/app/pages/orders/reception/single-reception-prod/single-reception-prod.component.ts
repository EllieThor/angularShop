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
  @Input('appUiHighlight') searchTerm!: string;
  @Input() caseSensitive = false;
  constructor(
    public usersService: UsersServiceService,
    public cartsService: CartsService,
    public ordersService: OrdersService,
    public productsService: ProductsService
  ) {}

  ngOnInit(): void {}

  // highlight(text: string) {
  //   var inputText: any = document.getElementById('inputText');
  //   var innerHTML = inputText.innerHTML;
  //   var index = innerHTML.indexOf(text);
  //   if (index >= 0) {
  //     innerHTML =
  //       innerHTML.substring(0, index) +
  //       '<mark>' +
  //       innerHTML.substring(index, index + text.length) +
  //       '</mark>' +
  //       innerHTML.substring(index + text.length);
  //     console.log('s1:  ', innerHTML);
  //     inputText.innerHTML = innerHTML;
  //     console.log('s2:  ', inputText);
  //   }
  // }
}
