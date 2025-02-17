import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Path } from 'leaflet';
import { HomeComponent } from './home/home.component';
import { TelemetryComponent } from './pages/telemetry/telemetry.component';
import { ControlComponent } from './pages/control/control.component';
import { PayloadComponent } from './payload/payload.component';
import { LoginComponent } from './auth/login/login.component';
import { guestGuard } from './guards/guest.guard';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'telemetry',component:TelemetryComponent , canActivate:[authGuard]},
  {path:'control',component:ControlComponent ,canActivate:[authGuard]},
  {path:'payload',component:PayloadComponent ,canActivate:[authGuard] },
  {path:'login',component:LoginComponent ,canActivate:[guestGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
