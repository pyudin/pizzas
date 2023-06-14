import { inject } from '@angular/core';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn,
} from '@angular/router';
import { delay } from 'rxjs';
import { ReportingApiService } from '../services/reporting-api.service';
import { IFilter } from '../interfaces/reporting.interface';

export const filterResolver: ResolveFn<IFilter> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const reportingApi = inject(ReportingApiService);
  return reportingApi.getAvailableYears();
};
