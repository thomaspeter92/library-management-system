import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { LoansService } from '../services/loans.service';
import { forkJoin } from 'rxjs';

export const loansResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const loansService = inject(LoansService);

  const activeLoans = loansService.getAllActiveUserLoans();
  const pastLoans = loansService.getAllPastUserLoans();

  return forkJoin({
    activeLoans: activeLoans,
    pastLoans: pastLoans,
  });
};
