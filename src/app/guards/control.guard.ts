import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import Swal from 'sweetalert2';

export const controlGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean => {
    const router = inject(Router);
    const  userType = localStorage.getItem('type')??'';
   
      
      if (userType=='admin' || userType=='Control') {
        return true;
    }
    
    
      if (userType!== 'Control' && userType !== 'admin') {
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
   