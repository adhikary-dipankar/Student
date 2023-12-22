import { Component, ElementRef} from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private std:StudentService){}
  get username():any{

    const user =this.std.username;
    if(user!=''){
      return user;
      
    }
  }
  
}