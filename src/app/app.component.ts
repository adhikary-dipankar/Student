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
  userName:string='';
  name:string='';
  email:string='';
  id:string='';
  pass:string='';
  showData:boolean=false;



  constructor(private std:StudentService , private router:Router){}
  get username():any{

    const user =this.std.username;
    if(user!=''){
      return this.log="Logout",this.userlog=true,this.userlogD=false,this.userName=user,user;
      
    }
  }

  logout(){
    this.std.username='';
    this.log="Login/Register";
    this.userlog=false;
    this.userlogD=true;
    this.router.navigate(['/login'])
  }

  show(){

    this.name = (JSON.parse(localStorage.getItem(this.userName)!) || {}).Name || '';
    this.email = (JSON.parse(localStorage.getItem(this.userName)!) || {}).Email || '';
    this.id = (JSON.parse(localStorage.getItem(this.userName)!) || {}).UserName || '';
    this.pass = (JSON.parse(localStorage.getItem(this.userName)!) || {}).UserPassword || '';
    
    this.showData=!this.showData;
    
  }

  }