import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import Swal from 'sweetalert2';

export const telemetryGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const router = inject(Router);
  const userType = localStorage.getItem('user_mission') ?? '';


  if (userType == 'Telemetry') {
    return true;
  }


  if (userType !== 'Telemerty') {
    Swal.fire({
      icon: 'warning',
      title: 'Access Denied',
      text: 'You are not authorized to access this page.',
      timer: 1000,
      showConfirmButton: false,
      allowOutsideClick: false,
    })
    return false;
  }


  return true;
};
