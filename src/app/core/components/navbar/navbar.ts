import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '../../service/auth.service';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbar, MatIcon, MatMenuModule,MatSidenavModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

userName :string ="";
private storageService = inject(StorageService)
private authService = inject(AuthService)
@Output()
toggleSidebar = new EventEmitter<void>();
IsCompanyProfileCreate : boolean =true;
onToggleSidebar(): void {
    this.toggleSidebar.emit();
}

 ngOnInit() {
    this.userName = this.storageService.getUserEmail();
    this.IsCompanyProfileCreate=this.storageService.IsCompanyProfieCompete();
  }

  logout(): void {

  this.authService.logout();

}
}