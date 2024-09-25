import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppModuleModule } from "./app/app-module/app-module.module";

  const compilerOptions = {
    ngZone: 'noop' as 'noop'
  };

  platformBrowserDynamic().bootstrapModule(AppModuleModule, compilerOptions)
    .catch(err => console.error(err));
