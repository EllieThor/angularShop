import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/productsModel';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-single-prod-card',
  templateUrl: './single-prod-card.component.html',
  styleUrls: ['./single-prod-card.component.css'],
})
export class SingleProdCardComponent implements OnInit {
  @Input() product: Product = new Product();
  constructor(
    public cartsService: CartsService,
    public productsService: ProductsService
  ) {}

  ngOnInit(): void {}
}
