import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { Path } from 'leaflet';
import { HomeComponent } from './home/home.component';
import { TelemetryComponent } from './pages/telemetry/telemetry.component';
import { ControlComponent } from './pages/control/control.component';
import { PayloadComponent } from './pages/payload/payload.component';
import { LoginComponent } from './auth/login/login.component';
import { guestGuard } from './guards/guest.guard';
import { authGuard } from './guards/auth.guard';
import { ProgrationComponent } from './pages/progration/progration.component';
import { telemetryGuard } from './guards/telemetry.guard';
import { controlGuard } from './guards/control.guard';
import { payloadGuard } from './guards/payload.guard';
import { progrationGuard } from './guards/progration.guard';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'telemetry',component:TelemetryComponent , canActivate:[authGuard,telemetryGuard]},
  {path:'control',component:ControlComponent ,canActivate:[authGuard,controlGuard]},
  {path:'payload',component:PayloadComponent ,canActivate:[authGuard,payloadGuard] },
  {path:'progration',component:ProgrationComponent,canActivate:[authGuard,progrationGuard] },
  {path:'login',component:LoginComponent ,canActivate:[guestGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes) , FormsModule],
 
  exports: [RouterModule]
})
export class AppRoutingModule { }
