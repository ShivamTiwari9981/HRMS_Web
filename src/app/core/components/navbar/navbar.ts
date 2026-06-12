import { Component, EventEmitter, inject, Output, OnInit } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MatToolbar, MatIcon, MatMenuModule, MatSidenavModule, MatDividerModule, MatBadgeModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  userName: string = "";
  IsCompanyProfileCreate: boolean = true;

  private storageService = inject(StorageService);
  private authService = inject(AuthService);

  @Output()
  toggleSidebar = new EventEmitter<void>();

  ngOnInit() {
    this.userName = this.storageService.getUserEmail();
    this.IsCompanyProfileCreate = this.storageService.IsCompanyProfieCompete();
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  logout(): void {
    this.authService.logout();
  }
}