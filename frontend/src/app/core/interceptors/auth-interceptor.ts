import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, exhaustMap, map } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  let authToken;
  inject(AuthService)
    .currentUser.pipe(
      take(1),
      map((user) => {
        if (user && user.token) {
          return user.token;
        }
        return null;
      })
    )
    .subscribe((token) => {
      authToken = token;
    });
  if (authToken) {
    return next(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      })
    );
  }
  return next(req);
}
