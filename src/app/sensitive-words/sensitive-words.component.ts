import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sensitive-words',
  templateUrl: './sensitive-words.component.html',
  styleUrl: './sensitive-words.component.scss'
})
export class SensitiveWordsComponent {
  @Input() title: string = 'Blias';
}
