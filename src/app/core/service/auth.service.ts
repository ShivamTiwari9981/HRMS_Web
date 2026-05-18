import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ApiService } from './api.service';
import { SignupModel } from '../../features/auth/models/signup.model';
import { API_END_POINT } from '../constants/global.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';
  private storage_service = inject(StorageService)
  private api_service = inject(ApiService)

  login(data: any) {
    return this.api_service.post<any>(API_END_POINT.API_LOGIN, data);
  }

saveToken(token: string) {
    this.storage_service.set(this.tokenKey, token);
  }
  

  logout() {
    this.storage_service.remove(this.tokenKey);
  }

  getToken(): string | null {
    return this.storage_service.get(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }


registerClient(data: SignupModel) {
  return this.api_service.post<any>(API_END_POINT.API_CLIENT_REGISTER, data);
}
}
