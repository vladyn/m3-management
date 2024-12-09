import { Pipe, PipeTransform, Renderer2, ElementRef } from '@angular/core';

@Pipe({
  name: 'searchTermAndHighlight',
  standalone: true,
})
export class SearchTerm implements PipeTransform {
  constructor(private renderer: Renderer2) {}

  transform(value: string, searchTerm: string): string {
    if (searchTerm && value) {
      let startIndex = value.toLowerCase().indexOf(searchTerm.toLowerCase());

      if (startIndex != -1) {
        let endLength = searchTerm.length;
        let matchingString = value.substring(startIndex, startIndex + endLength);
        return value.replace(matchingString, '<strong>' + matchingString + '</strong>');
      }
    }
    return value;
  }
}
