import { Component } from '@angular/core';
import { StudentService } from './student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  log:string="";
  userlog:boolean=false;
  userlogD:boolean=true;


  constructor(private std:StudentService , private router:Router){}
  get username():any{

    const user =this.std.username;
    if(user!=''){
      return this.log="Logout",this.userlog=true,this.userlogD=false,user;
      
    }
  }

  logout(){
    this.std.username='';
    this.log="Login/Register";
    this.userlog=false;
    this.userlogD=true;
    this.router.navigate(['/login'])
  }


  }