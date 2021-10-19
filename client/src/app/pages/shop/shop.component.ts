import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { SettingsService } from 'src/app/services/settings.service';
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
    public nav: Router,
    public settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts('/products/getProducts', {
      categoryID: 1,
    });
    if (!this.usersService._currentUserObj.ID) {
      this.nav.navigate(['/home']);
    }
  }

  // open close cart by screen
  @HostListener('window:resize', []) updateDays() {
    // lg (for laptops and desktops - screens equal to or greater than 1200px wide)
    // md (for small laptops - screens equal to or greater than 992px wide)
    // sm (for tablets - screens equal to or greater than 768px wide)
    // xs (for phones - screens less than 768px wide)

    if (window.innerWidth >= 1200) {
      this.settingsService._isCartVisible = true;
      this.settingsService._screenSize = 'lg';
    } else if (window.innerWidth >= 992) {
      this.settingsService._isCartVisible = true;
      this.settingsService._screenSize = 'md';
    } else if (window.innerWidth >= 768) {
      this.settingsService._isCartVisible = false;
      this.settingsService._screenSize = 'sm';
    } else if (window.innerWidth < 768) {
      this.settingsService._isCartVisible = false;
      this.settingsService._screenSize = 'xs';
    }
  }
}
//
