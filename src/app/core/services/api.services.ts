import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class ApiService {
  constructor(private http: HttpClient) {}

  api_url =  "http://doe.deluxedelivery.com/api";

  get(path: string): Observable<any> {
    return this.http.get<any>(`${this.api_url}${path}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post<any>(`${this.api_url}${path}`, body)
    .pipe(
      catchError(this.handleError)
    );
  }

  update(path: string, body: Object = {}): Observable<any> {
    return this.http.put<any>(`${this.api_url}${path}`, body)
    .pipe(
      catchError(this.handleError)
    );
  }

 private handleError(error: any){
   return Observable.throw(error.json())
 }
}
