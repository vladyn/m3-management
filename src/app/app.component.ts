import { Component, Input, Injector, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { ManagementComponent } from './management/management.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ManagementComponent, AudioPlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  @Input() name: string = 'm3-management';
  public title = signal('');

  constructor(injector: Injector) {
    this.title.set('m3-management');
    const management = createCustomElement(ManagementComponent, {injector});
    //before defining the custom element, check if it is already defined
    if (!customElements.get('management-element')) {
    // Register the custom element with the browser.
    customElements.define('management-element', management);
    }
  }
}
