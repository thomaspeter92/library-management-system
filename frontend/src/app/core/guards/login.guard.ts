import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser.pipe(
      take(1),
      map((user) => {
        if (user) {
          // If user is logged in, redirect to dashboard
          this.router.navigate(['/']);
          return false;
        }
        // Allow navigation to login if not logged in
        return true;
      })
    );
  }
}
