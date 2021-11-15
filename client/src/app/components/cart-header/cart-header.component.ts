import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';
import { SettingsService } from 'src/app/services/settings.service';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.css'],
})
export class CartHeaderComponent implements OnInit {
  serverResult: any;
  constructor(
    public cartsService: CartsService,
    public nav: Router,
    public apiService: ApiService,
    public productsService: ProductsService,
    public settingsService: SettingsService,
    public usersService: UsersServiceService
  ) {}

  ngOnInit(): void {}

  navToOrders() {
    if (this.cartsService._cartProducts.length !== 0) {
      this.nav.navigate(['/orders']);
    } else {
      alert('אין פריטים בעגלה');
    }
  }

  // DELETE (CartProducts)
  async deleteProductFromCart(url: string, ob?: any) {
    let res;
    if (!ob.productID) {
      res = confirm(
        'ברצונך להסיר את כל הפריטים מהעגלה? \nלחיצה על אישור תסיר את כל הפריטים מהעגלה'
      );
    }

    if (res || ob.productID) {
      this.serverResult = (await this.apiService.createPostService(
        url,
        ob
      )) as any;
      await this.cartsService.gatCartProducts('/carts/getCartProducts');
      await this.productsService.getProducts('/products/getProducts', {
        categoryID: this.productsService._openCategory,
      });
    }
  }
}
