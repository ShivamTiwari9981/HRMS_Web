import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DepartmentService } from '../../department.service';
import { NotificationService } from '../../../../core/service/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../../department.models';

@Component({
  selector: 'app-department-create',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    
  ],
  templateUrl: './department-create.html',
  styleUrls: ['./department-create.css'],
})
export class DepartmentCreate {
  departmentForm!: FormGroup;
  submitted = false;
  loading = false;
  DepartmentId :any;
  department!: Department;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute)
  private departmentService = inject(DepartmentService);
  private notification = inject(NotificationService);
  constructor(
  private cdr: ChangeDetectorRef
) {}


  ngOnInit(): void {
   const id = this.route.snapshot.paramMap.get('id');
   this.DepartmentId = id;
   if (this.DepartmentId) {
    this.getDepartmentById();
  } 
  else {
   this.formInitilize()
  }
  
}

formInitilize(){
 this.departmentForm = this.fb.group({
      DepartmentName: ['', [Validators.required, Validators.maxLength(100)]],
      Description: [''],
      IsActive: [true],
    });

}
  
 ngAfterViewInit() {
  this.getDepartmentById()
}

  getDepartmentById() {
  this.departmentService.getDepartmentById(this.DepartmentId).subscribe({
    next: (res: any) => {
      this.loading = false;
      console.log(res)
      if (res?.IsSuccess) {
        // Initialize form first if not already done
        this.formInitilize();
        this.department = res.Data,
        // Then fill it with the retrieved data

        this.departmentForm.patchValue({
          
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

  get f() {
    return this.departmentForm.controls;
  }

saveDepartment(): void {
    this.submitted = true;

    if (this.departmentForm.invalid) {
      this.departmentForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const model = this.departmentForm.value;

    // Check if creating or updating
    if (this.DepartmentId) {
      this.department.DepartmentName = model.DepartmentName;
      this.department.Description = model.Description
      this.updateDepartment(this.department);  // Edit mode
    } else {
      this.addDepartment(model);     // Create mode
    }
  }

  addDepartment(model: any): void {
    this.departmentService.createDepartment(model).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res?.IsSuccess) {
          this.notification.success(res.Message || 'Department added successfully');
          this.router.navigate(['/departments/list']);
        } else {
          this.notification.error(res?.Message || 'Unable to save department.');
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.notification.error(err?.error?.Message || err?.message || 'Unable to save department.');
      },
    });
  }

  updateDepartment(model: any): void {

    this.departmentService.updateDepartment(this.DepartmentId!, model).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res?.IsSuccess) {
          this.notification.success(res.Message || 'Department updated successfully');
          this.router.navigate(['/departments/list']);
        } else {
          this.notification.error(res?.Message || 'Unable to update department.');
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.notification.error(err?.error?.Message || err?.message || 'Unable to update department.');
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/departments/department/list']);
  }
}
