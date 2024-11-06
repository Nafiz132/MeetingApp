import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccountService } from './_services/account.service';
import { User } from './_models/User';
import { HomeComponent } from "./home/home.component";
import { ToastrService } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    CommonModule,
    NavComponent,
    FormsModule,
    BsDropdownModule,
    HomeComponent,
    TabsModule,
    NgxGalleryModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Meeting App';
  users: any; 
  private toastr = inject(ToastrService);
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) { 
      this.toastr.error('Access Denied!!!')
      return; 
    }
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
