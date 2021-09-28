import { Pipe, PipeTransform } from '@angular/core';
import { CartProduct } from '../models/cartProductsModel';

@Pipe({
  name: 'filteredArray',
})
export class FilteredArrayPipe implements PipeTransform {
  // transform(value: Array<CartProduct>, str: string): any {
  //   if (str === '') return value;
  //   return value.filter((prod) => prod.product.ProductName.includes(str));
  // }
  transform(value: Array<CartProduct>, str: string): any {
    if (str === '') return value;
    // let arr = value.filter((prod) => prod.product.ProductName.includes(str));
    value.map((prod) =>
      prod.product.ProductName.includes(str)
        ? (prod.isMark = true)
        : (prod.isMark = false)
    );
    return value;
  }

  // transform(value: Array<CartProduct>, args: string): any {
  //   if (args === '') return value;
  //   var re = new RegExp(args, value); //'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
  //   return value.
  // }
  // transform(value: any, args: any): any {
  //   if (args === '') return value;
  //   var re = new RegExp(args, value); //'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
  //   return value.replace(re, '<mark>$&</mark>');
  // }
}
