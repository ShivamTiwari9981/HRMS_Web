import { Component, inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { SignupModel } from '../models/signup.model';
import { MatCard } from "@angular/material/card";
import { MatFormField, MatLabel, MatError } from "@angular/material/input";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { FormGroup,FormBuilder, FormControl,ReactiveFormsModule, Validators} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../core/service/auth.service';
import { NotificationService } from '../../../core/service/notification.service';
@Component({
  selector: 'app-signup',
  imports: [MatCard, MatFormField, RouterModule,MatLabel, MatError, MatIcon,ReactiveFormsModule,MatInputModule,MatButtonModule,RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  hide =false;
  hidePassword = true;
  hideConfirmPassword = true;
  signupForm!: FormGroup;
  submitted = false;
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private notification = inject(NotificationService);
  private router = inject(Router);
  

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      UserName: ['comapny1@gmail.com', [Validators.required]],
      UserEmail: ['shivamtiwari8756@gmail.com', [Validators.required, Validators.email]],      
      Password: ['Shivam@9981', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
]],

  ConfirmPassword: ['Shivam@9981', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
  ]]
    });
  }

  get f() {
    return this.signupForm.controls;
  }
 loading = false;

async signup() {

  if (this.signupForm.invalid) {
    this.signupForm.markAllAsTouched();
    return;
  }

  const model: SignupModel = this.signupForm.value;

  this.loading = true;

  try {

    const res = await firstValueFrom(
      this.auth.signup(model)
    );

    if (res.IsSuccess) {

      this.notification.success(res.Message);

      console.log('Signup User:', res);

      await this.router.navigate(['/account/login']);

    } else {

      this.notification.error(res.Message);

    }

  } 
  catch (error: any) {

    console.log(error);

    this.notification.error(
      error?.error?.Message ||
      error?.message ||
      'Signup Failed'
    );

  } 
  finally {

    this.loading = false;

  }
}

  
}
  