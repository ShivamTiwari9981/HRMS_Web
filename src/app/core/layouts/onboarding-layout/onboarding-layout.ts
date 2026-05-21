import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";

@Component({
  selector: 'app-onboarding-layout',
  imports: [RouterOutlet, MatSidenavModule, Footer, Navbar],
  templateUrl: './onboarding-layout.html',
  styleUrl: './onboarding-layout.css',
})
export class OnboardingLayout {

}
