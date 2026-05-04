import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  let loggedIn = false;

auth.isLoggedIn$.subscribe(status => {
  loggedIn = status;
});

  if (loggedIn) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};