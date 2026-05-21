import { Injectable } from '@angular/core';
import { SESSION_STORAGE } from '../constants/global.constant';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
   set(key: string, value: any) {
    
    localStorage.setItem(key, JSON.stringify(value));
    const data = localStorage.getItem(key);
  }

  get(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clearSession(): void {

    localStorage.clear();

  }

  clearAll(): void {

  sessionStorage.clear();

  localStorage.clear();

}

  removeSession(key: string): void {
    localStorage.removeItem(key);
  }

  // ------------------- User Method ---------------------------------

  getCurrentUser(): any {
    return this.get(SESSION_STORAGE.USER);
  }

  getMenu(): any {
    return this.get(SESSION_STORAGE.MENU);
  }

  getUserName(): string {

    return this.getCurrentUser()?.UserName || '';

  }

   getUserFullName(): string {
    return this.getCurrentUser()?.FullName || '';
  }

  getRole(): any {
    return this.get(SESSION_STORAGE.ROLE);
  }

   getPermission(): any {
    return this.get(SESSION_STORAGE.PERMISSIONS);
  }

  getUserEmail(): string {

    return this.getCurrentUser()?.UserEmail || '';

  }

  getUserId(): string {

    return this.getCurrentUser()?.UserId || '';

  }

  getClientId(): string {

    return this.getCurrentUser()?.clientId || '';

  }

  getAccessToken(): string {
    return this.get(SESSION_STORAGE.TOKEN)

  }

  IsCompanyProfieCompete(): boolean {

    return this.getCurrentUser()?.IsCompanyProfileCreated || false;

  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}
