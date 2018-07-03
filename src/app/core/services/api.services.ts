import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  api_url =  "http://ws2.deluxedelivery.com/api/couriers";
    // api_url =  "http://localhost:3000";

  get(path: string): Observable<any> {
    return this.http.get<any>(`${this.api_url}${path}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post<any>(`${this.api_url}${path}`, JSON.stringify(body))
    .pipe(
      catchError(this.handleError)
    );
  }

  update(path: string, body: Object = {}): Observable<any> {
    return this.http.put<any>(`${this.api_url}${path}`,  JSON.stringify(body))
    .pipe(
      catchError(this.handleError)
    );
  }

 private handleError(error: any){
   return Observable.throw(error)
 }
}
