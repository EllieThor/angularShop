import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css'],
})
export class SearchProductsComponent implements OnInit {
  constructor(public productsService: ProductsService) {}

  ngOnInit(): void {}
}
