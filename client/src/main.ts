// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';


// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { importProvidersFrom } from '@angular/core';  // Required for importing providers
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ToastrModule } from 'ngx-toastr';

// Modify appConfig to include BrowserAnimationsModule in providers
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers || [],
    importProvidersFrom(BrowserAnimationsModule, ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',  
    }))
  ]
})
.catch((err) => console.error(err));
