import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbar, MatIcon, MatMenuModule,MatSidenavModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
@Output()
toggleSidebar = new EventEmitter<void>();

onToggleSidebar(): void {
    this.toggleSidebar.emit();
}
}
