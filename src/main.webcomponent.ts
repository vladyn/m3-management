import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { appConfig } from './app/app.config';
import { SensitiveWordsComponent } from './app/sensitive-words/sensitive-words.component';
// import 'zone.js';

createApplication(appConfig)
    .then((app) => {
        const SensitiveWords = createCustomElement(SensitiveWordsComponent, { injector: app.injector });
        customElements.define('sensitive-words-element', SensitiveWords);
    })
    .catch((err) => console.error(err));
