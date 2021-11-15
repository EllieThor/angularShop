import { Component, Input, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/cartProductsModel';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-single-cart-prod',
  templateUrl: './single-cart-prod.component.html',
  styleUrls: ['./single-cart-prod.component.css'],
})
export class SingleCartProdComponent implements OnInit {
  @Input() item: CartProduct = new CartProduct();

  constructor(
    public cartsService: CartsService,
    public productsService: ProductsService,
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
    this.productsService.getProducts('/products/getProducts', {
      categoryID: 1,
    });
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
