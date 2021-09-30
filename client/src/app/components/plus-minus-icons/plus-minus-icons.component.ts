import { Component, Input, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/cartProductsModel';
import { ApiService } from 'src/app/services/api.service';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-plus-minus-icons',
  templateUrl: './plus-minus-icons.component.html',
  styleUrls: ['./plus-minus-icons.component.css'],
})
export class PlusMinusIconsComponent implements OnInit {
  @Input() item: CartProduct = new CartProduct();
  serverResult: any;

  constructor(
    public usersService: UsersServiceService,
    public cartsService: CartsService,
    public ordersService: OrdersService,
    public productsService: ProductsService,
    public apiService: ApiService
  ) {}

  ngOnInit(): void {}

  // UPDATE (CartProducts)
  async changeQnt(url: string, ob?: any) {
    let getByPatterns = {
      cartID: this.cartsService._currentCart.ID,
      productID: ob.productID,
      type: ob.type,
      quantity: ob.quantity,
      price: ob.price,
    };
    this.serverResult = (await this.apiService.createPostService(
      url,
      getByPatterns
    )) as any;
    this.cartsService.gatCartProducts('/carts/getCartProducts');
    // this.productsService._products.find((item) => item.ID === ob.productID);
    this.productsService.getProducts('/products/getProducts', {
      categoryID: 1,
    });
  }
}
