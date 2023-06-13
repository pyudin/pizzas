import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IFilter } from "../interfaces/reporting.interface";

@Injectable({
    providedIn: 'root',
  })
  export class ReportingApiService {
  
    public getAvailableYears(): Observable<IFilter> {
      return of(filtersResponse);
    }
  
  }

  const filtersResponse = {
    id: 'years',
    values: [{value: '2020', count: 100}, {value: '2021', count: 154}, {value: '2022', count: 197}, {value: '2023', count: 35}]
  }