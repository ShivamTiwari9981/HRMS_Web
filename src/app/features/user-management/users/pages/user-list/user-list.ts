import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatTableModule } from '@angular/material/table'; 
import { RouterLink } from '@angular/router'; 
import {
  AfterViewInit,
  Component,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-user-list',
  imports: [MatIconModule, MatCardModule,
     MatInputModule,MatPaginatorModule,
     MatTableModule,RouterLink
    
    ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements AfterViewInit {

  displayedColumns: string[] = [
    'name',
    'email',
    'role',
    'status',
    'mapping',
    'action'
  ];

  dataSource = new MatTableDataSource([
    {
      userId: 1,
      name: 'John Doe',
      email: 'john@gmail.com',
      role: 'Admin',
      isActive: true
    },
    {
      userId: 2,
      name: 'Aman Sharma',
      email: 'aman@gmail.com',
      role: 'HR',
      isActive: true
    },
    {
      userId: 3,
      name: 'Rohit Kumar',
      email: 'rohit@gmail.com',
      role: 'Employee',
      isActive: false
    }
  ]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event): void {

    const filterValue =
      (event.target as HTMLInputElement).value;

    this.dataSource.filter =
      filterValue.trim().toLowerCase();

  }

}
