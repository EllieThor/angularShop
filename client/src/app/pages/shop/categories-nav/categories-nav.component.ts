import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories-nav',
  templateUrl: './categories-nav.component.html',
  styleUrls: ['./categories-nav.component.css'],
})
export class CategoriesNavComponent implements OnInit {
  constructor(public productsService: ProductsService) {}

  ngOnInit(): void {}
}
