import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/cartProductsModel';
import { Product } from 'src/app/models/productsModel';
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
    public usersService: UsersServiceService
  ) {}

  ngOnInit(): void {
    // this.try({ ID: 1 });
  }
  // try(product: Product) {
  //   let a = this.cartsService._cartProducts.find(
  //     (itemA) => itemA.productID === product.ID
  //   )?.Qnt;

  //   console.log('aaa!!: ', a);
  // }
}
