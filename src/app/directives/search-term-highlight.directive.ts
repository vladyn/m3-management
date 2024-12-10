import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[searchTermHighlight]',
  standalone: true,
})
export class SearchTermHighlight implements OnChanges {
  @Input() searchTerm: string = '';
  @Input() paragraphToHighlight: string = '';

  constructor(private element: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm'] || changes['paragraphToHighlight']) {
      this.boldSearchTerm();
    }
  }

  private boldSearchTerm() {
    if (!this.searchTerm || !this.paragraphToHighlight) {
      this.element.nativeElement.innerHTML = this.paragraphToHighlight;
      return;
    }

    const escapedSearchTerm = this.escapeRegExp(this.searchTerm);
    const regex = new RegExp(`\\b${escapedSearchTerm}\\b`, 'gi');
    const highlightedText = this.paragraphToHighlight.replace(regex, match => `<strong>${match}</strong>`);

    this.element.nativeElement.innerHTML = highlightedText;
  }

  private escapeRegExp(text: string): string {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
}
