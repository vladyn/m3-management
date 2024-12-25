import { Directive, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[appCounting]',
  standalone: true,
})
export class CountingDirective implements OnChanges {
  constructor(private readonly el: ElementRef) {
    this.el.nativeElement.style.color = 'red';
  }

  ngOnChanges(): void {
    const text = this.el.nativeElement.textContent;
    const count = this.countWords(text);
    this.el.nativeElement.textContent = `${text} (${count})`;
  }

  countWords(text: string): number {
    return text.split(' ').length;
  }
}
