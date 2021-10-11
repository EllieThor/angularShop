import { Component, HostListener, OnInit } from '@angular/core';
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
  _isCartVisible = true;
  constructor(
    public usersService: UsersServiceService,
    public cartsService: CartsService,
    public ordersService: OrdersService,
    public productsService: ProductsService,
    public nav: Router
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts('/products/getProducts', {
      categoryID: 1,
    });
    if (!this.usersService._currentUserObj.ID) {
      this.nav.navigate(['/home']);
    }
  }

  visibleDays = 7;
  _screenSize: string = 'lg';
  // TODO: add open close cart by screen
  @HostListener('window:resize', []) updateDays() {
    // lg (for laptops and desktops - screens equal to or greater than 1200px wide)
    // md (for small laptops - screens equal to or greater than 992px wide)
    // sm (for tablets - screens equal to or greater than 768px wide)
    // xs (for phones - screens less than 768px wide)

    if (window.innerWidth >= 1200) {
      this.visibleDays = 7; // lg
      this._isCartVisible = true;
      this._screenSize = 'lg';
    } else if (window.innerWidth >= 992) {
      this.visibleDays = 6; //md
      this._isCartVisible = true;
      this._screenSize = 'md';
    } else if (window.innerWidth >= 768) {
      this.visibleDays = 5; //sm
      this._isCartVisible = false;
      this._screenSize = 'sm';
    } else if (window.innerWidth < 768) {
      this.visibleDays = 3; //xs
      this._isCartVisible = false;
      this._screenSize = 'xs';
    }
    console.log('visibleDays: ' + this.visibleDays);
  }
}
//
