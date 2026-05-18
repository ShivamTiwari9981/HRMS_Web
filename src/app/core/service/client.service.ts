import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clientId = '';

  setTenant(id: string) {
    this.clientId = id;
  }

  getTenant(): string {
    return this.clientId;
  }
}
