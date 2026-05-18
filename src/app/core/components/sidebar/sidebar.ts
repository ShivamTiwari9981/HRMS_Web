import { Component, inject, OnInit } from '@angular/core';
import { MatListModule } from "@angular/material/list";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { SidebarItem } from '../../models/sidebar.model';
import { SidebarService } from '../../service/sidebar.service';
import { RouterLink, RouterLinkActive } from '@angular/router'; // 1. Import from @angular/router

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
  private sidebarService = inject(SidebarService); 
  
  // 2. Define the structural menu items array
  menuItems: SidebarItem[] = [];

  ngOnInit(): void {
    // 3. Populate array on initialization
    this.menuItems = this.sidebarService.getMenu();
    console.log(this.menuItems)
  }
}
