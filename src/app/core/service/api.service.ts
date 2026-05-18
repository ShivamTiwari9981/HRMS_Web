import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiURL = `${environment.apiBaseURL}`;
  private http =inject(HttpClient);
  private api_url ="";
  
  get<T>(url: string) {
    this.api_url =this.apiURL+url;
    return this.http.get<T>(url);
  }

  post<T>(url: string, body: any) {
    this.api_url =this.apiURL+url;
    return this.http.post<T>(this.api_url, body);
  }

  put<T>(url: string, body: any) {
    this.api_url =this.apiURL+url;
    return this.http.put<T>(url, body);
  }

  delete<T>(url: string) {
    this.api_url =this.apiURL+url;
    return this.http.delete<T>(url);
  }
}
