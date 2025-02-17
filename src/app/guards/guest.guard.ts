import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const guestGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let token = localStorage.getItem('authToken');

  if (token) {
    Swal.fire({
      icon: 'warning',
      title: 'Access Denied',
      text: 'You are already logged in.',
      timer: 1000, // Closes after 1 second
      showConfirmButton: false,
      allowOutsideClick: false,
    }).then(() => {
      router.navigateByUrl('/');
    });
    return false;
  }
  return true;
};
