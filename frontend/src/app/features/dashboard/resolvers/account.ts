import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { LoansService } from '../services/loans.service';
import { forkJoin } from 'rxjs';
import { UserService } from '../services/user.service';
import { AuthService } from '../../../core/services/auth.service';

export const acccountResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const loansService = inject(LoansService);
  const userService = inject(UserService);

  const userId = authService.currentUser.value?.id;

  const activeLoans = loansService.getAllActiveUserLoans();
  const pastLoans = loansService.getAllPastUserLoans(1, 5);
  const user = userService.getUserById(userId!);

  return forkJoin({
    activeLoans: activeLoans,
    pastLoans: pastLoans,
    user: user,
  });
};
