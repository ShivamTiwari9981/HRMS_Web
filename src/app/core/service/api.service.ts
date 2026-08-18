import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiType } from '../../shared/enum/ApiType';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private apiURL = `${environment.apiBaseURL}`;
  private http =inject(HttpClient);

  private getBaseUrl(apiType: ApiType = ApiType.DotNet): string {
    return apiType === ApiType.AI
      ? environment.apiUrls.ai
      : environment.apiUrls.dotnet;
  }
  
  get<T>(endpoint: string,apiType: ApiType = ApiType.DotNet) {
    return this.http.get<T>(
      `${this.getBaseUrl(apiType)}${endpoint}`
    );
  }

  getById<T>(endpoint: string,id:string,apiType: ApiType = ApiType.DotNet) {
     return this.http.get<T>(
      `${this.getBaseUrl(apiType)}${endpoint}/${id}`
    );
  }  

   post<T>(endpoint: string,body: any, apiType: ApiType = ApiType.DotNet) {
    return this.http.post<T>(
      `${this.getBaseUrl(apiType)}${endpoint}`,
      body
    );
  }

  // post<T>(url: string, body: any) {
  //   return this.http.post<T>(`${this.apiURL}${url}`, body);
  // }

  put<T>(endpoint: string,body: any,id: any,apiType: ApiType = ApiType.DotNet) {
    return this.http.put<T>(
      `${this.getBaseUrl(apiType)}${endpoint}/${id}`,
      body
    );
  }

  delete<T>(endpoint: string,id:string,apiType: ApiType = ApiType.DotNet) {
    return this.http.delete<T>(
      `${this.getBaseUrl(apiType)}${endpoint}/${id}`
    );
  }

  activate<T>(endpoint: string,body: any,id:string,apiType: ApiType = ApiType.DotNet) {
    return this.http.patch<T>(
      `${this.getBaseUrl(apiType)}${endpoint}/${id}`,
      body
    );
  }
  
  // put<T>(url: string, id: string | number, payload: any): Observable<T> {
  //   return this.http.put<T>(
  //     `${this.apiURL}${url}/${id}`,
  //     payload
  //   );
  // }

  // delete<T>(url: string,id:string) {
  //   return this.http.delete<T>(`${this.apiURL}${url}/${id}`);
  // }
}
