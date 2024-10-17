import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Meeting App';
  users:any;

  constructor(private http:HttpClient){}

  ngOnInit():void{
    this.http.get('https://localhost:5001/api/users').subscribe({
      next:response=>this.users=response,
      error: error=>console.log(error),
      complete:()=>console.log('Request has completed')
    });
  }
}
