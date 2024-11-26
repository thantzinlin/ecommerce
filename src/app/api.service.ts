import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiurl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private router: Router
  ) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    return new HttpHeaders();
  }

  private handleError = (error: any): Observable<never> => {
    const returnMessage =
      error.error?.returnmessage || error.message || 'Internal Server Error';

    if (error.status === 401) {
      localStorage.removeItem('token');

      this.router.navigate(['/login']);
      this.toast.info(returnMessage, 'Info');
    } else {
      this.toast.error(returnMessage, 'Error');
    }
    return throwError(() => new Error(returnMessage));
  };

  get<T>(
    endpoint: string,
    params?: HttpParams,
    requiresAuth: boolean = true
  ): Observable<T> {
    const headers = requiresAuth
      ? this.createAuthorizationHeader()
      : new HttpHeaders();
    return this.http
      .get<T>(`${this.apiurl}/${endpoint}`, { headers, params })
      .pipe(catchError(this.handleError));
  }

  post<T>(
    endpoint: string,
    body: any,
    requiresAuth: boolean = true
  ): Observable<T> {
    const headers = requiresAuth
      ? this.createAuthorizationHeader()
      : new HttpHeaders();
    return this.http
      .post<T>(`${this.apiurl}/${endpoint}`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  put(url: string, body: any, requiresAuth: boolean = true): Observable<any> {
    const headers = requiresAuth
      ? this.createAuthorizationHeader()
      : new HttpHeaders();
    return this.http
      .put<any>(`${this.apiurl}${url}`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  delete(url: string, requiresAuth: boolean = true): Observable<any> {
    const headers = requiresAuth
      ? this.createAuthorizationHeader()
      : new HttpHeaders();
    return this.http
      .delete<any>(`${this.apiurl}${url}`, { headers })
      .pipe(catchError(this.handleError));
  }

  getAll(url: string, body: any): Observable<any> {
    return this.http.post<any>(`${this.apiurl}${url}`, body);
  }
}
