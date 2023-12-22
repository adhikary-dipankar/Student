import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  studentForm: FormGroup;
  Result: any;
  success:boolean=false;

  constructor(private formBuilder: FormBuilder, private std: StudentService, private router: Router) {
    this.studentForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      UserPassword: ['', Validators.required],
      Name:['',Validators.required],
      Email:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]]
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.std.registerUserLocally(this.studentForm.value);
      this.Result = 'User registered successfully.';
      this.success=true;
      this.studentForm.reset();
    }
  }
}