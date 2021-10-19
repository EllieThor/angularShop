import { Component, Input, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/cartProductsModel';
import { Product } from 'src/app/models/productsModel';
import { ApiService } from 'src/app/services/api.service';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-plus-minus-icons',
  templateUrl: './plus-minus-icons.component.html',
  styleUrls: ['./plus-minus-icons.component.css'],
})
export class PlusMinusIconsComponent implements OnInit {
  @Input() item: CartProduct = new CartProduct();
  @Input() product: Product = new Product();
  @Input() isProdInCart: boolean = false;

  serverResult: any;

  constructor(
    public cartsService: CartsService,
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
    await this.cartsService.gatCartProducts('/carts/getCartProducts');
    await this.productsService.getProducts('/products/getProducts', {
      categoryID: this.productsService._openCategory,
    });
  }
}
