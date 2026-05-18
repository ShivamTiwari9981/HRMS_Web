import { Component, inject } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { MatCard } from "@angular/material/card";
import { MatFormField, MatLabel, MatError } from "@angular/material/input";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { FormGroup,FormBuilder, FormControl,ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from '../../../core/service/notification.service';
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
    if(response.IsSuccess)
    {
      console.log(response)
      this.notification.success(response.Message)
      await this.router.navigate(['/dashboard']);
      return 
      
    }
      
      
    } 
    catch (error: any) {
      console.log("ehh")
      this.notification.error(error.error.Message)
      
    } finally {
      this.isLoading = false;
    }
  }
}
