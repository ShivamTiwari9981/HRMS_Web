import { inject, Injectable } from '@angular/core';
import { RegisterClientModel } from './models/register-client';
import { ApiService } from '../../core/service/api.service';
import { API_END_POINT } from '../../core/constants/global.constant';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private api_service = inject(ApiService)
  RegisterClient(data: RegisterClientModel) {
    return this.api_service.post<any>(API_END_POINT.API_CLIENT_REGISTER, data);
  }
}
