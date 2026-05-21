import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './shared/models/material/material-module';
import { AuthService } from './core/service/auth.service';
import { StorageService } from './core/service/storage.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MaterialModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('HRMS.Web');
  private authService = inject(StorageService)

  ngOnInit(): void {

    // this.authService.loadSession();
    
  }
}
