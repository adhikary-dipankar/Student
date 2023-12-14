import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactUs: FormGroup;
  contactArr: any[] =[];
  msg:string='';


  constructor(private fb: FormBuilder){
    this.contactUs = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: [, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]],
      comment: ['', Validators.required],
      
    });
  }

  onSubmit() {
    if(this.contactUs.valid){
      const Con = this.contactUs.value;
      this.contactArr.push(Con)
      const JsonCon = JSON.stringify(this.contactArr);

      localStorage.setItem("Feedback",JsonCon);
      this.msg="Hey   "+this.contactUs.value.name+" , Thank you for your valuable Feedback. We are so happy to solve your query. Wish you a very energetic journey with us."

      this.contactUs.reset();

    }
    else{
      this.msg="Hey having any query or suggestions, kindly give your valuable feedback to us."
      this.contactUs.reset();
      
    }
  }
    
}