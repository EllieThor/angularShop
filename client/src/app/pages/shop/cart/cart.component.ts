import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';
import { SettingsService } from 'src/app/services/settings.service';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    public usersService: UsersServiceService,
    public cartsService: CartsService,
    public productsService: ProductsService,
    public settingsService: SettingsService
  ) {}

  ngOnInit(): void {}
  checkSize() {
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
