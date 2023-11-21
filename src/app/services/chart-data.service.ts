import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor( private http: HttpClient ) { }

  getChartData(): Observable<any> {
    return this.http.get('assets/chart-data.json');
  }

  // getChartData(iso3: string, year: number): Observable<any> {
  //   const headers = new HttpHeaders().set('x-api-key', environment.x_api_key);

  //   const params = new HttpParams().set('iso3code', iso3).set('year', year);
    
  //   return this.http.get<any>(environment.getDataURL, { headers, params });
  // }

  // getBearerToken(): any {
  //   const creds = {
  //     grant_type: environment.grant_type,
  //     client_id: environment.client_id,
  //     client_secret: environment.client_secret,
  //     scope: ""
  //   }
  //   return this.http.post(environment.tokenBearerURL, creds);
  // }
}
