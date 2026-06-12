import { Component, inject, OnInit } from '@angular/core';
import { MatListModule } from "@angular/material/list";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { SidebarItem } from '../../models/sidebar.model';
import { RouterLink, RouterLinkActive } from '@angular/router'; // 1. Import from @angular/router
import { AuthService } from '../../service/auth.service';
import { StorageService } from '../../service/storage.service';
import { SESSION_STORAGE } from '../../constants/global.constant';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule,
    MatExpansionModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  // 1. Inject service without writing a constructor
  private storageService = inject(StorageService); 
  
  // 2. Define the structural menu items array
  menuItems: SidebarItem[] = [];

  ngOnInit(): void {

    this.menuItems=this.storageService.get(SESSION_STORAGE.MENU);
    this.menuItems = this.menuItems.sort((a, b) => {

  // Dashboard always first
  if (a.MenuName === 'Dashboard') return -1;
  if (b.MenuName === 'Dashboard') return 1;

  // Other menus by display order
  return a.DisplayOrder - b.DisplayOrder;

});
  }
}
