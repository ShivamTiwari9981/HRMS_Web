import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
   private config: any;

  setConfig(data: any) {
    this.config = data;
  }

  getConfig() {
    return this.config;
  }
}
