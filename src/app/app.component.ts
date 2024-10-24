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
  src = signal('/assets/audio/E_DarinaD_D_2024-10-07_H_100748_060_CLID_00894553778.wav');

  constructor(injector: Injector) {
    this.title.set('m3-management');
    const management = createCustomElement(ManagementComponent, {injector});
    //before defining the custom element, check if it is already defined
    if (!customElements.get('management-element')) {
    // Register the custom element with the browser.
    customElements.define('management-element', management);
    }

    // register audio-player-element
    if (!customElements.get('audio-player-element')) {
      const audioPlayerComponent = createCustomElement(AudioPlayerComponent, {
        injector
      });
      customElements.define('audio-player-element', audioPlayerComponent);
  }
  }
}
