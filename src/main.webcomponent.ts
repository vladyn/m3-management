import { AudioPlayerComponent } from './app/audio-player/audio-player.component';
import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { appConfig } from './app/app.config';
// import 'zone.js';

createApplication(appConfig)
    .then((app) => {
        const SensitiveWords = createCustomElement(AudioPlayerComponent, { injector: app.injector });
        customElements.define('audio-player-element', SensitiveWords);
    })
    .catch((err) => console.error(err));
