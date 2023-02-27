import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { OrderModule } from 'ngx-order-pipe';
import { AgmCoreModule } from '@agm/core';
import { TruncateModule } from 'ng2-truncate';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BidiModule } from '@angular/cdk/bidi';
import { MenuComponent, HeaderComponent, SidebarComponent, AdminLayoutComponent, AuthLayoutComponent } from './core';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { SigninComponent } from './login/signin/signin.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from '../app/core/index';
import { FileHelpersModule } from 'ngx-file-helpers';
import { SignupComponent } from './login/signup/signup.component';
import { MaterialModule } from './_shared/material.module';
declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
};
@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MenuComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    SigninComponent,
    SignupComponent
    // currencyPipe
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
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: (createTranslateLoader),
    //     deps: [HttpClient]
    //   }
    // }),
    LoadingBarRouterModule,
    OrderModule,
    FileUploadModule,
    FileHelpersModule,
    FlexLayoutModule,
    BidiModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyB3HQ_Gk_XRt6KitPdiHQNGpVn0NDwQGMI' }),
    PerfectScrollbarModule,
    TruncateModule,
    // ToastrModule.forRoot({ positionClass: 'toast-top-right' }),
    Ng2SearchPipeModule,
    NgxChartsModule,
    MaterialModule,ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }