import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  constructor(
    public usersService: UsersServiceService,
    public cartsService: CartsService,
    public ordersService: OrdersService,
    public productsService: ProductsService,
    public nav: Router
  ) {}

  ngOnInit(): void {
    this.productsService.getCategories('/products/getCategories');
    this.productsService.getProducts('/products/getProducts', {
      categoryID: 1,
    });
    // TODO: אם המשתמש התנתק באופן לא מבוקר או סגר דפדפן בפעם הבאה שפותח- הפרטים כבר קיימים וכפתור התחל/חזרה לקנייה קיים
    if (!this.usersService._currentUserObj.ID) {
      this.nav.navigate(['/home']);
    }
  }
}
//
