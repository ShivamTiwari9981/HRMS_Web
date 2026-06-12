import { AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { ListModuleModule } from '../../../../shared/moduls/list.module/list.module-module';
import { Department } from '../../department.models';
import { DepartmentService } from '../../department.service';
import { MatIcon } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-list',
  imports: [ListModuleModule,
    MatIcon,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule
    ],
  templateUrl: './department-list.html',
  styleUrl: './department-list.css',
})
export class DepartmentList  {
 displayedColumns: string[] = [
    'DepartmentCode',
    'DepartmentName',
    'Description',
    'Status',
    'Action'
  ];
searchControl = new FormControl('');
department: Department[] = [];
isLoading = false;

constructor(
  private cdr: ChangeDetectorRef
) {}

private readonly departmentService = inject(DepartmentService);
private router = inject(Router);
  
  ngOnInit() : void{
   this.loadDepartment()
  }

  ngAfterViewInit() {
  this.departmentService.getAllDepartment().subscribe(res => {
    this.department = res.Data;
    this.cdr.detectChanges();
  });
}

  loadDepartment(){
     this.departmentService.getAllDepartment().subscribe({
      next: (response) => {
        this.department = response.Data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  addDepartment(){
    this.router.navigate(['/departments/add']);
  }

  editDepartment(departmentId : string){
    this.router.navigate(['/departments/edit', departmentId]);
  }

  deleteDepartment(departmentId : string){
    this.departmentService.deleteDepartment(departmentId).subscribe({
      next: (response) => {
        if(response.IsSuccess)
          this.loadDepartment()
        else{
        
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  



}
