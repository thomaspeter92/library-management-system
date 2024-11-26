import { Injectable, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Observable, take, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.currentUser.pipe(
      take(1), // Ensure the guard completes after emitting the first value
      map((user) => {
        console.log(user);

        const isAuthenticated = !!user;

        if (isAuthenticated) {
          return true;
        }

        // Redirect to login if not authenticated
        this.router.navigate(['login']);
        return false;
      })
    );
  }
}
