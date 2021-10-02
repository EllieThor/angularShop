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
  // @Input() isProdInCart: boolean = false;
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
    await this.cartsService.gatCartProducts('/carts/getCartProducts');
    await this.productsService.getProducts('/products/getProducts', {
      categoryID: this.productsService._openCategory,
    });
  }

  // add product event handler
  async addProdToCart(url: string, ob: any) {
    console.log('add: ', ob);
    let qnt;
    let findIndex = this.cartsService._cartProducts.findIndex(
      (item) => item.productID == ob.productID
    );

    console.log('findIndex: ', findIndex);

    if (findIndex == -1) {
      // insert
      this.insertProductToCart(url, {
        cartID: this.cartsService._currentCart.ID,
        productID: ob.product.ID,
        priceForOne: ob.price,
      });
    } else {
      // change
      qnt = this.cartsService._cartProducts[findIndex].Qnt;
      this.changeQnt('/carts/changeQnt', {
        productID: ob.product.ID,
        type: 1,
        quantity: qnt,
        price: ob.price,
      });
    }
  }

  // CREATE (CartProducts)
  async insertProductToCart(url: string, ob?: any) {
    this.serverResult = (await this.apiService.createPostService(
      url,
      ob
    )) as any;
    await this.cartsService.gatCartProducts('/carts/getCartProducts');
    await this.productsService.getProducts('/products/getProducts', {
      categoryID: this.productsService._openCategory,
    });
  }

  async deleteProductFromCart(url: string, ob?: any) {
    let res;
    if (!ob.productID) {
      res = confirm(
        'ברצונך להסיר את כל המוצרים מהעגלה? \nלחיצה על אישור תסיר את כל הפריטים מהעגלה'
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
