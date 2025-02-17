import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let token = localStorage.getItem('user_token');

  if (!token) {
    router.navigateByUrl('/');
    return false;
  }
  return true;
};
