import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {  HeaderComponent, AdminLayoutComponent } from './core';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { SigninComponent } from './login/signin/signin.component';
import { SignupComponent } from './login/signup/signup.component';
import { MaterialModule } from './_shared/material.module';
declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}
@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    AdminLayoutComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy'
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }