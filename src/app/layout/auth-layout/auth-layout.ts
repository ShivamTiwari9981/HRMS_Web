import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from "@angular/router";
import { Loader } from "../../shared/components/loader/loader";

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {

}
