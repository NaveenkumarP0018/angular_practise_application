import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if (window['consoleLogE']) {
  console.warn = () => 'console has been disabled in production mode';
  console.log = () => 'console log has been disabled in production mode';
  Object.freeze(console);
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));