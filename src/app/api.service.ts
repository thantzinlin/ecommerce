import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiurl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(url: string, body: any) {
    return this.http.post<any>(`${this.apiurl}${url}`, body);
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); // Customize logging here
    return throwError(() => new Error(error.message || 'Server error'));
  }

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http
      .get<T>(`${this.apiurl}/${endpoint}`, { params })
      .pipe(catchError(this.handleError));
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .post<T>(`${this.apiurl}/${endpoint}`, body)
      .pipe(catchError(this.handleError));
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.apiurl}${url}`, body);
  }

  delete(url: string): Observable<any> {
    return this.http.delete<any>(`${this.apiurl}${url}`);
  }
}
