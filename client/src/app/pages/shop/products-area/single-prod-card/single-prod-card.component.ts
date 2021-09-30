import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/cartProductsModel';
import { Product } from 'src/app/models/productsModel';
import { ApiService } from 'src/app/services/api.service';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users.service';

@Component({
  selector: 'app-single-prod-card',
  templateUrl: './single-prod-card.component.html',
  styleUrls: ['./single-prod-card.component.css'],
})
export class SingleProdCardComponent implements OnInit {
  @Input() product: Product = new Product();
  @Input() item: CartProduct = new CartProduct();
  constructor(
    public cartsService: CartsService,
    public productsService: ProductsService,
    public usersService: UsersServiceService,
    public apiService: ApiService
  ) {}

  serverResult: any;
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
