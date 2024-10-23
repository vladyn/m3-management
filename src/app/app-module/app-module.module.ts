import {
  NgModule,
  DoBootstrap,
  ApplicationRef,
  Injector,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';
import { RouterOutlet } from '@angular/router';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterOutlet,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    AudioPlayerComponent,
  ],
})
export class AppModuleModule implements DoBootstrap {
  constructor(private injector: Injector) {}
  ngDoBootstrap(appRef: ApplicationRef) {
    if (!customElements.get('audio-player-element')) {
      const audioPlayerComponent = createCustomElement(AudioPlayerComponent, {
        injector: this.injector,
      });
      customElements.define('audio-player-element', audioPlayerComponent);
    }
  }
}
