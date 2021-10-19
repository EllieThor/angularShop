import { Pipe, PipeTransform } from '@angular/core';
import { CartProduct } from '../models/cartProductsModel';

@Pipe({
  name: 'filteredArray',
})
export class FilteredArrayPipe implements PipeTransform {
  transform(value: Array<CartProduct>, str: string): any {
    if (str === '') return value;
    return value.filter((prod) => prod.product.ProductName.includes(str));
  }
}
