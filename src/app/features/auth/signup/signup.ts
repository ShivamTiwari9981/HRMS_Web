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
  constructor (private router : Router){}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      UserName: ['comapny1@gmail.com', [Validators.required]],
      Email: ['shivamtiwari8756@gmail.com', [Validators.required, Validators.email]],      
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
    if (this.signupForm.invalid) return;
    const model: SignupModel = this.signupForm.value;
    this.loading = true;
    try {
      const res = await firstValueFrom(
        this.auth.registerClient(model)
      );
      console.log('Client Registered:', res);
      this.router.navigate(['/auth/login'])
    } 
    catch (error: any) {
      console.error('Registration failed', error);
    } 
    finally {
      this.loading = false;
    }
  }

  
}
  