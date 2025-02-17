import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let token = localStorage.getItem('authToken');

  if (!token) {
    Swal.fire({
      icon: 'warning',
      title: 'Access Denied',
      text: 'Please log in first.',
      timer: 1000, // Closes after 2 seconds
      showConfirmButton: false,
      allowOutsideClick: false,
    }).then(() => {
      router.navigateByUrl('/login');
    });

    return false;
  }
  return true;
};
