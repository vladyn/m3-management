import { Pipe, PipeTransform, Renderer2, ElementRef } from '@angular/core';

@Pipe({
  name: 'searchTerm',
  standalone: true,
})
export class SearchTerm implements PipeTransform {
  constructor(private renderer: Renderer2) {}

  transform(value: string, searchTerm: string): string {
    if (!searchTerm || !value) {
      return value;
    }

    const searchWords = searchTerm.trim().split(/\s+/);
    const container = this.renderer.createElement('div');

    const re = new RegExp(searchTerm, 'gi');
    return value.replace(re, match => `<span class="highlight">${match}</span>`);
  }
}
