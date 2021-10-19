import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-area',
  templateUrl: './products-area.component.html',
  styleUrls: ['./products-area.component.css'],
})
export class ProductsAreaComponent implements OnInit {
  constructor(public productsService: ProductsService) {}

  ngOnInit(): void {}
}
