import { Component } from '@angular/core';
import { Navbar } from "../../shared/components/navbar/navbar";
import { Sidebar } from "../../shared/components/sidebar/sidebar";
import { Breadcrumb } from "../../shared/components/breadcrumb/breadcrumb";
import { RouterOutlet } from "@angular/router";
import { Footer } from "../../shared/components/footer/footer";
import { Loader } from "../../shared/components/loader/loader";

@Component({
  selector: 'app-main-layout',
  imports: [Navbar, Sidebar, Breadcrumb, RouterOutlet, Footer, Loader],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

}
