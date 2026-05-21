import { Component, inject } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { MatFormField, MatLabel, MatError } from "@angular/material/input";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { FormGroup,FormBuilder, FormControl,ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from '../../../core/service/notification.service';
import { StorageService } from '../../../core/service/storage.service';
import { SESSION_STORAGE } from '../../../core/constants/global.constant';
@Component({
  selector: 'app-login',
  imports: [MatCard, MatFormField, MatLabel, MatError,MatInputModule,MatButtonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm!: FormGroup;
  submitted = false;
  isLoading = false;
  errorMessage: string | null = null;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private notification = inject(NotificationService);
  private storageSession = inject(StorageService);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      UserEmail: ['shivamtiwari8756@gmail.com', [Validators.required]],
      Password:  ['Shivam@9981', [Validators.required,Validators.minLength(6),Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]],
    });
  }


  async onLogin() {

  if (this.loginForm.invalid) return;

  this.isLoading = true;

  try {
    const response = await firstValueFrom(
      this.authService.login(this.loginForm.value)
    );
    if (response.IsSuccess) {

      this.set_session(
        response.Data
      );
      if (response.Data.user.IsCompanyProfileCreated) {

        this.router.navigate(['/dashboard/home']);

      } else {

        this.router.navigate(['/company-setup']);
      }

      this.notification.success(response.Message);
    }

  } catch (error: any) {

    this.notification.error(
      error?.error?.Message || 'Login Failed'
    );

  } finally {

    this.isLoading = false;
  }
}
  

  private  set_session(response : any){
    console.log(response.user)
     this.storageSession.set(SESSION_STORAGE.TOKEN, response.Token)
     this.storageSession.set(SESSION_STORAGE.USER, response.user)
     this.storageSession.set(SESSION_STORAGE.CLIENT,response.client)
     this.storageSession.set(SESSION_STORAGE.MENU,response.menu)
     this.storageSession.set(SESSION_STORAGE.ROLE,response.role)
     this.storageSession.set(SESSION_STORAGE.PERMISSIONS,response.rolepermission)
  }
}
