import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-comp',
  templateUrl: './child-comp.component.html',
  styleUrls: ['./child-comp.component.css'],
})
export class ChildCompComponent implements OnInit {
  @Input('appUiHighlight') searchTerm!: string;
  @Input() caseSensitive = false;
  constructor() {}

  ngOnInit(): void {}
}
