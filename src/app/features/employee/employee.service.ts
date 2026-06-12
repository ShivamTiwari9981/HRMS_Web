import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { API_END_POINT } from '../../core/constants/global.constant';
import { PaginationRequest } from '../../shared/models/PaginationModel';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
   private api_service = inject(ApiService)
    getEmployees(data: PaginationRequest) {
      return this.api_service.post<any>(
        API_END_POINT.GET_ALL_EMPLOYEE,
        data
      );
}
}