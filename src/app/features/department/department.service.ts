import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { PaginationRequest } from '../../shared/models/PaginationModel';
import { API_END_POINT } from '../../core/constants/global.constant';
import { Department } from './department.models';

@Injectable({
  providedIn: 'root',
})

export class DepartmentService {
  private api_service = inject(ApiService);

  getAllDepartment() {
    return this.api_service.get<any>(
      API_END_POINT.GET_ALL_DEPARTMENT,
    );
  }

  getDepartmentById(id : string) {
    return this.api_service.getById<any>(
      API_END_POINT.GET_DEPARTMENT_BY_ID,
      id
    );
  }

  createDepartment(payload: any) {
    return this.api_service.post<any>(
      API_END_POINT.CREATE_DEPARTMENT,
      payload
    );
  }

  updateDepartment (departmentId : string, payload :Department){
    return this.api_service.put<any>(
      API_END_POINT.UPDATE_DEPARTMENT,
      payload,
      departmentId
      
    );
  }

  deleteDepartment(id : string) {
    return this.api_service.delete<any>(
      API_END_POINT.DELETE_DEPARTMENT,
      id
    );
  }

  reOpenDepartment(id : string) {
    return this.api_service.activate<any>(
      API_END_POINT.ACTIVATE_DEPARTMENT,
      null,
      id,
    );
  }
}