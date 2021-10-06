import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-resize',
  templateUrl: './resize.component.html',
  styleUrls: ['./resize.component.css'],
})
export class ResizeComponent implements OnInit {
  constructor() {}
  style: any = {};
  cartPercent: number = 23.8668;
  productsPercent: number = 76.1332;
  cartStyle: any = {};
  productsStyle: any = {};
  //  style="
  //       width: calc(76.1332% - 2px);
  //       user-select: none;
  //       pointer-events: none;
  //       height: 100px;
  //     "
  ngOnInit(): void {}
  // onResizeEnd(event: ResizeEvent): void {
  //   console.log('Element was resized', event);
  //   this.style = {
  //     width: `${event.rectangle.width}px`,
  //     height: `${event.rectangle.height}px`,
  //   };
  // }
  onResizeEnd(event: any): void {
    console.log('Element was resized', event.clientX);
  }

  update_size(ev: any) {
    ev.preventDefault();
    console.log('update_size: ', ev);
    var cart_div = document.getElementById('cart');
    var products_div = document.getElementById('products');
    var shop_width = document.getElementById('shop')?.offsetWidth;
    var new_cart_width = Math.floor(ev.clientX);
    // var new_products_width = shop_width - new_cart_width - 4;
    // cart_div.style.width = new_cart_width + 'px';
    // products_div.style.width = new_products_width + 'px';
  }

  // document.addEventListener("DOMContentLoaded", function () {
  //   var cart_div = document.getElementById("cart");
  //   var products_div = document.getElementById("products");
  //   var shop_width = document.getElementById("shop").offsetWidth;
  //   var new_cart_width = Math.floor((shop_width - 4) / 2);
  //   var new_products_width = shop_width - new_cart_width - 4;
  //   cart_div.style.width = new_cart_width + "px";
  //   products_div.style.width = new_products_width + "px";
  // });
}
