import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, 
    CommonModule,
    BsDropdownModule
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']  // Corrected to styleUrls
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }



  login(): void {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.log(error)
    });
  }
  logout() {
    this.accountService.logout();
  }
}
