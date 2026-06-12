import { Component,ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatError, MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MasterService } from '../../../../core/service/master.service';
import { NotificationService } from '../../../../core/service/notification.service';
import { Router } from '@angular/router';
import { RegisterClientModel } from '../../models/register-client';
import { ClientService } from '../../client.service';
import { firstValueFrom } from 'rxjs';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormModuleModule } from '../../../../shared/moduls/form.module/form.module-module';
import { MatCard, MatCardModule } from "@angular/material/card";
@Component({
  selector: 'app-comapny-setup',
  imports: [
    MatCard, 
    MatFormField, 
    MatLabel, 
    // MatError,
    FormModuleModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule
],
  templateUrl: './comapny-setup.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './comapny-setup.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComapnySetup {
  companyForm!: FormGroup;
  submitted = false;
  CompanyTypes  :any
  subscriptionPlans :any
  save ="Save"
  private fb = inject(FormBuilder);
  private notification = inject(NotificationService);
  private router = inject(Router);
  private masterService = inject(MasterService);
  private clientService = inject(ClientService);

ngOnInit(): void {
  this.init_form();
  this.GetDropdownData();
}

init_form(){
  this.companyForm = this.fb.group({
      CompanyName: ['TechNova Solutions Pvt Ltd', [Validators.required]],
      CompanyEmail: ['contact@technova.com', [Validators.required, Validators.email]],      
      SubscriptionPlanId :['', [Validators.required]],
      Phone :['9876543210', [Validators.required]],
      GSTNumber :['27ABCDE1234F1Z5', [Validators.required]],
      Address :['Sector 62, Noida, Uttar Pradesh, India', [Validators.required]],
      ComapnyTypeId :['0', [Validators.required]],
      SubscriptionEndDate :['', [Validators.required]]
})
}


GetDropdownData() {
  this.masterService.getCompanyRegistrationDropdownData()
    .subscribe({
      next: (res: any) => {
        this.subscriptionPlans = res.Data.SubscriptionPlans;
        this.CompanyTypes = res.Data.CompanyTypes;
      },
      error: (err) => {
        console.log('Error loading dropdown data', err);
      }
    });
}

async RegisterCompany() {
  if (this.companyForm.invalid) {
    this.companyForm.markAllAsTouched();
    return;
  }

  const model: RegisterClientModel = this.companyForm.value;

  try {
    const res = await firstValueFrom(
      this.clientService.RegisterClient(model)
    );
    console.log(res);
    if (res.ErrorNo == 0) {
      this.notification.success("Company register successfully");
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

    // this.loading = false;

  }
}
}
