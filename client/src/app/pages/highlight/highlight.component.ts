import { Component } from '@angular/core';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
})
export class HighlightComponent {
  searchTerm = 'lorem ipsum';
  caseSensitive = false;
}
