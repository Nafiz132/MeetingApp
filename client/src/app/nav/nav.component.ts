import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, 
    CommonModule,
    BsDropdownModule,RouterModule
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']  // Corrected to styleUrls
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public accountService: AccountService, private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
  }



  login(): void {
    this.accountService.login(this.model).subscribe({
      next: _=> {
        this.router.navigateByUrl('/members'),
        this.toastr.success('Login successful!', 'Welcome')
      },
        
      // error: error => this.toastr.error(error.error)
    });
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
