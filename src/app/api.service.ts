import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseurl = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) {}

  getAll(url: string, body: any) {
    return this.http.post<any>(`${this.baseurl}${url}`, body);
  }

  get(url: string): Observable<any> {
    return this.http.get<any>(`${this.baseurl}${url}`);
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post<any>(`${this.baseurl}${url}`, body);
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.baseurl}${url}`, body);
  }

  delete(url: string): Observable<any> {
    return this.http.delete<any>(`${this.baseurl}${url}`);
  }
}
