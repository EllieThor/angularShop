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
// function highlight(text) {
//   var inputText = document.getElementById('inputText');
//   var innerHTML = inputText.innerHTML;
//   var index = innerHTML.indexOf(text);
//   if (index >= 0) {
//     innerHTML =
//       innerHTML.substring(0, index) +
//       "<span class='highlight'>" +
//       innerHTML.substring(index, index + text.length) +
//       '</span>' +
//       innerHTML.substring(index + text.length);
//     inputText.innerHTML = innerHTML;
//   }
// }
