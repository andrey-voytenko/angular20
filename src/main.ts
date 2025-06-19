import {bootstrapApplication, enableDebugTools} from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {ApplicationRef, enableProdMode, enableProfiling} from '@angular/core';

enableProfiling();

bootstrapApplication(App, appConfig).then((appRef) => {
  // Get the ApplicationRef
  const applicationRef = appRef.injector.get(ApplicationRef);
  // Get the root component
  const appComponent = applicationRef.components[0];
  // Enable debug tools
  enableDebugTools(appComponent);
})
  .catch((err) => console.error(err));
