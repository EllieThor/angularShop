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

  // *****************************************************

  //<!-- TODO:  עובד ! לא לגעת -->
  transform(value: Array<CartProduct>, str: string): any {
    if (str === '') return value;
    value.map((prod) => {
      prod.product.ProductName.includes(str)
        ? (prod.isMark = true)
        : (prod.isMark = false);
    });
    return value;
  }

  // *****************************************************

  // ssssssssssssssssssssssssssssssssssssssssssssssssssss

  //<!-- TODO:  עובד ! לא לגעת -->

  // FIXME: עובד אבל דופק את המיקום של האותיות ולא מזהה את התגית כתגית
  // FIXME: עובד אבל רק על האות הראשונה וזה לא מוחק
  // transform(value: Array<CartProduct>, str: string): any {
  //   if (str === '') return value;

  //   value.map((prod) => {
  //     // console.log('prod.product.ProductName: ', prod.product.ProductName);
  //     prod.product.ProductName = this.boldString(prod.product.ProductName, str);
  //     // console.log('aa: ', prod.product.ProductName);
  //   });
  //   return value;
  // }

  // boldString(prodName: string, str: string) {
  //   let strRegExp = new RegExp(str, 'g');
  //   return prodName.replace(
  //     strRegExp,
  //     '<span class="markMe">' + str + '</span>'
  //   );
  // }

  // ssssssssssssssssssssssssssssssssssssssssssssssssssss

  // לא יודעת
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
