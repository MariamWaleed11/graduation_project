import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {PagesComponent} from './pages/pages.component';
import {TelemetryComponent} from './pages/telemetry/telemetry.component';
import {ControlComponent} from './pages/control/control.component';
import {PayloadComponent} from './pages/payload/payload.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {FooterComponent} from './shared/footer/footer.component';
import {LoginComponent} from './auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptor} from './interceptors/auth.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    TelemetryComponent,
    ControlComponent,
    PayloadComponent,
    NavbarComponent,
    FooterComponent,
    




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoginComponent,
    FormsModule
    



  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor , multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
