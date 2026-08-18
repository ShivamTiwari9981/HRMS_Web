import { AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge, of, Subject, catchError, debounceTime, distinctUntilChanged, startWith, switchMap, takeUntil, tap } from 'rxjs';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../employee.model';
import { PaginationRequest } from '../../../../shared/models/PaginationModel';
import { AiAssistantRoutingModule } from "../../../../ai-assistant/ai-assistant-routing-module";
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    AiAssistantRoutingModule
],
  templateUrl: './emp-list.html',
  styleUrl: './emp-list.css',
})
export class EmpList implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'EmployeeCode',
    'FullName',
    'EmployeeEmail',
    'DepartmentName',
    'DesignationName',
    'JoiningDate',
    'Status',
    'Action'
  ];

  employees: Employee[] = [];
  totalRecords = 0;
  pageSize = 10;
  searchControl = new FormControl('');

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoading = false;

  private readonly employeeService = inject(EmployeeService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroy$ = new Subject<void>();
  private readonly router = inject(Router);

  
  ngAfterViewInit(): void {
    const search$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        if (this.paginator) {
          this.paginator.pageIndex = 0;
        }
      })
    );

    merge(
      this.sort.sortChange.pipe(tap(() => this.paginator.pageIndex = 0)),
      this.paginator.page,
      search$
    ).pipe(
      startWith({}),
      tap(() => (this.isLoading = true)),
      switchMap(() =>
        this.employeeService.getEmployees(this.buildRequest()).pipe(
          catchError(() => of({ Data: [], TotalRecords: 0 }))
        )
      ),
      tap((res) => {
        this.employees = res.Data ?? [];
        this.totalRecords = res.TotalRecords ?? 0;
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildRequest(): PaginationRequest {
    return {
      pageNumber: 1,
      pageSize: this.paginator?.pageSize ?? this.pageSize,
      searchText: this.searchControl.value || undefined,
      sortColumn: this.sort?.active || 'fullName',
      sortDirection: this.sort?.direction || 'asc'
    };
  }

  addEmployee(): void {
    // navigate to add employee page
    this.router.navigate(['/employee/add']);
  }

  editEmployee(employeeId : string){
    this.router.navigate(['/employee/edit', employeeId]);
  }

  deleteEmployee(id: string): void {
    // delete logic
    console.log('Delete employee id:', id);
  }
}
