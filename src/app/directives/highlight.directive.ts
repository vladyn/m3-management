
import { Directive, Input, SimpleChanges, Renderer2, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective implements OnChanges {
  @Input() searchedWord: string = '';
  @Input() content: string = '';
  @Input() classToApply: string = '';
  @Input() setDataMatch = false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void|string {
    const { searchedWord } = changes;

    if (!this.content || searchedWord.firstChange) {
      return;
    }

    if (this.setDataMatch) {
      this.renderer.setProperty(
        this.el.nativeElement,
        'data-match',
        this.content
      );
    }

    if (!this.searchedWord.length || searchedWord.currentValue?.length < 3 || !this.classToApply) {
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.content);
      return;
    }

    this.renderer.setProperty(
      this.el.nativeElement,
      'innerHTML',
      this.getFormattedText()
    );
  }

  getFormattedText() {
    const re = new RegExp(`(${this.searchedWord})`, 'gi');
    return this.content.replace(re, `<span class="${this.classToApply}">$1</span>`);
  }
}


