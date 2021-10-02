import { Component, OnInit } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
@Component({
  selector: 'app-resize',
  templateUrl: './resize.component.html',
  styleUrls: ['./resize.component.css'],
})
export class ResizeComponent implements OnInit {
  constructor() {}
  style: any = {};
  ngOnInit(): void {}
  onResizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
    this.style = {
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`,
    };
  }
}
