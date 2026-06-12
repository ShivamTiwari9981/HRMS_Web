export interface Employee {
  EmployeeId: string;
  EmployeeCode: string;
  FullName: string;
  EmployeeEmail: string;
  Phone : string;
  DepartmentName: string;
  DesignationName: string;
  JoiningDate: Date | string;
  IsActive: boolean;
}

export interface EmployeeCreate {
  EmployeeId: string;
  EmployeeCode: string;
  FistName: string;
  EmployeeEmail: string;
  Phone : string;
  DepartmentId: string;
  DesignationId: string;
  ManagerId:string;
  Gender:string;
  Address1 : string;
  Address2 : string;
  IsLoginUser : boolean;
  JoiningDate: Date | string;
  IsActive: boolean;
}