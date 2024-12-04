import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject, TemplateRef } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, exhaustMap, map } from 'rxjs';
import { ModalService } from '../../shared/components/modal/modal.service';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);

  return authService.currentUser.pipe(
    take(1),
    switchMap((user) => {
      if (user && user.token) {
        // Check if token expiry has passed
        if (user.expiry && new Date(user.expiry).getTime() < Date.now()) {
          authService.logout(); // Log out the user
          throw new Error('Token has expired'); // Throw an error
        }
        // Add the token to the request headers
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        return next(clonedRequest);
      }
      return next(req);
    })
  );
}
