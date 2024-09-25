import { Component, Input, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { ManagementComponent } from './management/management.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ManagementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  @Input() name: string = 'm3-management';
  title = 'm3-management';
  constructor(injector: Injector) {
    const management = createCustomElement(ManagementComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('management-element', management);
  }
}
