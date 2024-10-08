import { NgModule, Inject, DoBootstrap, ApplicationRef, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';
import { RouterOutlet } from '@angular/router';
import { SensitiveWordsComponent } from '../sensitive-words/sensitive-words.component';



@NgModule({
  declarations: [SensitiveWordsComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterOutlet
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
