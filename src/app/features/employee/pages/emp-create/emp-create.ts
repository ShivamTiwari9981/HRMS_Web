import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmployeeService } from '../../employee.service';

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
  ],
  templateUrl: './emp-create.html',
  styleUrls: ['./emp-create.css'],
})
export class EmpCreate implements OnInit {
  employeeForm!: FormGroup;
  submitted = false;

  departments = [
    { id: 'dept-1', name: 'Human Resources' },
    { id: 'dept-2', name: 'Finance' },
    { id: 'dept-3', name: 'Engineering' },
    { id: 'dept-4', name: 'Sales' },
  ];

  designations = [
    { id: 'des-1', name: 'Software Engineer' },
    { id: 'des-2', name: 'Senior Analyst' },
    { id: 'des-3', name: 'Product Manager' },
    { id: 'des-4', name: 'HR Specialist' },
  ];

  managers = [
    { id: 'mgr-1', name: 'Alice Johnson' },
    { id: 'mgr-2', name: 'Michael Brown' },
    { id: 'mgr-3', name: 'Sara Lee' },
  ];

  genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.employeeForm = this.fb.group({
      EmployeeId: [''],
      EmployeeCode: ['', [Validators.required, Validators.maxLength(20)]],
      FistName: ['', [Validators.required, Validators.maxLength(50)]],
      EmployeeEmail: ['', [Validators.required, Validators.email]],
      Phone: ['', [Validators.required, Validators.maxLength(20)]],
      DepartmentId: ['', Validators.required],
      DesignationId: ['', Validators.required],
      ManagerId: ['', Validators.required],
      Gender: ['Male', Validators.required],
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
