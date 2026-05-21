import { Component, inject } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { StorageService } from '../../../../core/service/storage.service';

@Component({
  selector: 'app-dashboard-home',
  imports: [MatCardModule],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css',
})
export class DashboardHome {
  fullName = ""
  private storageService = inject(StorageService)

   ngOnInit() {
    this.fullName = this.storageService.getUserFullName();
  }

}
