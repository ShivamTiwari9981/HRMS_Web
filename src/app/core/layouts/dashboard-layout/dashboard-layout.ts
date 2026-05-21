import { Component } from '@angular/core';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from "@angular/material/sidenav";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Navbar } from "../../components/navbar/navbar";
import { RouterOutlet } from "@angular/router";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-dashboard-layout',
  imports: [MatSidenavContainer, MatSidenav, Sidebar, MatSidenavContent, Navbar, RouterOutlet, Footer],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {

}
