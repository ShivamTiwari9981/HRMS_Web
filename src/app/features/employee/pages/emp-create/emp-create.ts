import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmployeeService } from '../../employee.service';
import { Breadcrumb } from "../../../../shared/components/breadcrumb/breadcrumb";
import { NotificationService } from '../../../../core/service/notification.service';
// import {EmployeeDepartmentModel} from "../../../../core/models/department.model"
// import { EmployeeDesignationModel } from '../../../../core/models/Designation.model';
// import { ManagerModel } from '../../../../core/models/manager.model';
// import { GenderModel } from '../../../../core/models/gender.model';

export interface EmployeeDesignationModel {
  ClientId :string,
  DepartmentId : string
  DesignationId : string
  DesignationName :string,
  DesignationCode :string,
};

export interface ManagerModel {
ClientId :string,
EmployeeId : string
DepartmentId : string
EmployeeEmail : string
}

@Component({
  selector: 'app-emp-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    Breadcrumb
],
  templateUrl: './emp-create.html',
  styleUrls: ['./emp-create.css'],
})
export class EmpCreate implements OnInit {
  employeeForm!: FormGroup;
  EmployeeId :string = "";
  submitted = false;
  loading = false;
  

  // departments: EmployeeDepartmentModel[] = [];
   allDesignations: EmployeeDesignationModel[] = [];
   filteredDesignations: EmployeeDesignationModel[] = [];

   allManager :ManagerModel[] =[]
   filteredManager: ManagerModel[] = [];

   
  // managers: ManagerModel[] = [];
  // genderOptions: GenderModel[] = [];

  departments: any;
  // allDesignations: any;
  managers: any;
  genderOptions: any;


  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute)
  private employeeService = inject(EmployeeService);
  private notification = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);


  ngOnInit(): void {
    this.getDropdownList();
   const id = this.route.snapshot.paramMap.get('id');
   this.EmployeeId = id ?"":""
   if (this.EmployeeId) {
    this.getEmployeeById();
  } 
  else {
   this.initForm();
    
  }
  
}

getEmployeeById() {
  this.employeeService.getEmployeeById(this.EmployeeId).subscribe({
    next: (res: any) => {
      this.loading = false;
      console.log(res)
      if (res?.IsSuccess) {
        // Initialize form first if not already done
        this.initForm();
        this.employeeForm = res.Data,
        // Then fill it with the retrieved data

        this.employeeForm.patchValue({
          
          DepartmentName: res.Data.DepartmentName,
          Description: res.Data.Description,
          IsActive: res.Data.IsActive,
        });
        this.cdr.detectChanges();
      } else {
        this.notification.error(res?.Message || 'Unable to fetch department.');
      }
    },
    error: (err: any) => {
      this.loading = false;
      console.error(err);
      this.notification.error(err?.error?.Message || err?.message || 'Unable to fetch department.');
    },
  });
}


  private initForm(): void {
    this.employeeForm = this.fb.group({
      EmployeeId: [''],
      EmployeeCode: ['', [Validators.required, Validators.maxLength(20)]],
      FirstName: ['', [Validators.required, Validators.maxLength(50)]],
      LastName: ['',],
      EmployeeEmail: ['', [Validators.required, Validators.email]],
      Phone: ['', [Validators.required, Validators.maxLength(20)]],
      DepartmentId: ['', Validators.required],
      DesignationId: ['', Validators.required],
      ManagerId: [''],
      Gender: [1, Validators.required],
      Address1: ['', [Validators.maxLength(200)]],
      Address2: ['', [Validators.maxLength(200)]],
      IsLoginUser: [false],
      UserName: [''],
      Password: [''],
      ConfirmPassword: [''],
      JoiningDate: [new Date(), Validators.required],
      IsActive: [true],
    });
  }

  get f() {
    return this.employeeForm.controls;
  }

  get isLoginUserEnabled(): boolean {
    return this.employeeForm?.get('IsLoginUser')?.value;
  }

  getDropdownList(){
  this.employeeService.getDropdownList()
    .subscribe({
      next: (res) => {
        console.log(res)
        this.departments = res.Data.Departments;
        this.allDesignations = res.Data.Designation;
        this.allManager = res.Data.Manager;
        this.genderOptions=res.Data.Gender

        // this.genders = res.genders;
      }
    });
    
}
  
onDepartmentChange(event: MatSelectChange){
  const departmentId = event.value;
  
  this.filteredDesignations = this.allDesignations.filter(
      x => x.DepartmentId === departmentId
    );
    this.FilterManager(departmentId);
}

FilterManager(departmentId:string){
  this.filteredManager = this.allManager.filter(
      x => x.DepartmentId === departmentId
    );
}


  saveEmployee(): void {
    this.submitted = true;

    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const model = this.employeeForm.value;

    if (model.IsLoginUser) {
      const passwordInvalid = !model.Password || model.Password !== model.ConfirmPassword;
      const userNameInvalid = !model.UserName;

      if (userNameInvalid || passwordInvalid) {
        this.employeeForm.markAllAsTouched();
        return;
      }
    }

    console.log('Employee model:', model);

    // TODO: replace with a real create call using EmployeeService
    // this.employeeService.createEmployee(model).subscribe(...)
  }

  cancel(): void {
    this.router.navigate(['/employee/list']);
  }
}
