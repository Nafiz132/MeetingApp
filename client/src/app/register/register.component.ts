import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  // @Input() usersFromHomeComponent:any[]=[];
  @Output() cancelRegister= new EventEmitter();

  model:any={}

  constructor(private accountService: AccountService){}
  ngOnInit(): void {
    // this.usersFromHomeComponent = this.usersFromHomeComponent.sort((a, b) => 
    //   a.userName.localeCompare(b.userName)
    // );
  }

  register(){
    this.accountService.register(this.model).subscribe({
      next: ()=>{
          this.cancel();
      },
      error:error=>console.log(error)
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
