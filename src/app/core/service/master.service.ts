import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { API_END_POINT } from '../constants/global.constant';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private api_service = inject(ApiService)

  getCompanyRegistrationDropdownData() {
  return this.api_service.get<any>(
    API_END_POINT.COMPANY_DROPDOWN_DATA
  );
}}
