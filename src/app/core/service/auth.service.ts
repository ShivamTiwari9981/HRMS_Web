import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ApiService } from './api.service';
import { SignupModel } from '../../features/auth/models/signup.model';
import { API_END_POINT, SESSION_STORAGE } from '../constants/global.constant';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: any;
  permissions: string[] = [];
  menus: any[] = [];
  private storage_service = inject(StorageService)
  private router = inject(Router);
  private api_service = inject(ApiService)

  login(data: any) {
    return this.api_service.post<any>(API_END_POINT.API_LOGIN, data);
  }


  logout() {
    this.storage_service.clearAll();
    this.router.navigate(['/account/login']);
  }

signup(data: SignupModel) {
  return this.api_service.post<any>(API_END_POINT.API_SIGNUP, data);
}



}
