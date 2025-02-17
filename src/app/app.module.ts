import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';

import {PagesComponent} from './pages/pages.component';
import {TelemetryComponent} from './pages/telemetry/telemetry.component';
import {ControlComponent} from './pages/control/control.component';
import {PayloadComponent} from './payload/payload.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {FooterComponent} from './shared/footer/footer.component';
import {LoginComponent} from './auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


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
    FormsModule,
    LoginComponent,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
