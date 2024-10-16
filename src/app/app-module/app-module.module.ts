import { NgModule, Inject, DoBootstrap, ApplicationRef, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';
import { RouterOutlet } from '@angular/router';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';
import { SensitiveWordsComponent } from '../sensitive-words/sensitive-words.component'



@NgModule({
  declarations: [SensitiveWordsComponent, AudioPlayerComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterOutlet,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ]
})
export class AppModuleModule implements DoBootstrap {
  constructor(private injector: Injector) {
  }
  ngDoBootstrap(appRef: ApplicationRef) {
    if (!customElements.get('sensitive-words-element')) {
      // Register only if 'sensitive-words-element' entry is not found in the registry

      // Step 3: AppComponent stores the constructor class
      const wordsComponent = createCustomElement(SensitiveWordsComponent, {
          injector: this.injector,    // This injector is used to load the component's factory
      });

      // Step 4: Registering custom tag 'sensitive-words-element' with the obtained custom class
      customElements.define('sensitive-words-element', wordsComponent);
  }
  }
}
