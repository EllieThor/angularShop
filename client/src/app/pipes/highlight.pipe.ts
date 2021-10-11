import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

  // transform(value: Array<CartProduct>, str: string): string {
  //   return value
  //     ? str.replace(
  //         new RegExp(value, 'i'),
  //         `<span class="highlight">${value}</span>`
  //       )
  //     : str;
  // }
}
