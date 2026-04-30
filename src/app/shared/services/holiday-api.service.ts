import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { HolidayResponse } from '../models/data.models';

@Injectable({
  providedIn: 'root',
})
export class HolidayApiService {
  private apiKey = environment.holidayApiKey;
  private holidayUrl = 'https://holidayapi.com/v1/holidays';
  private http = inject(HttpClient);
  private cache = new Map<string, HolidayResponse>();

  getHolidays(country: string, year: number): Observable<HolidayResponse> {
    const cacheKey = `${country}-${year}`;

    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey)!);
    }

    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('country', country)
      .set('year', year.toString());

    return this.http.get<HolidayResponse>(this.holidayUrl, { params }).pipe(
      tap((response) => {
        this.cache.set(cacheKey, response);
      }),
    );
  }
}
