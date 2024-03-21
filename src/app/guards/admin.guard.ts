import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

  var authService = inject(AuthService);
  var router = inject(Router);
  var returnValue = false;

  if (authService.isAdmin()) {
    returnValue = true;
  } else {
    router.navigate([`home`]);
  }


  return returnValue;
};
