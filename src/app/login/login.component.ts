import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  studentForm: FormGroup;
  Result: any;

  constructor(private formBuilder: FormBuilder, private std: StudentService, private router: Router) {
    this.studentForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      UserPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const userName = this.studentForm.value.UserName;
      const userPassword = this.studentForm.value.UserPassword;

      this.std.loginUserLocally(userName, userPassword).subscribe(
        (res: any) => {
          if (res.success) {
            console.log('User is authenticated.', res.message);
            this.Result = res.message;
            this.std.username = userName;
            this.router.navigate(['/home']);
          } else {
            console.log('Failed to authenticate the User.', res.message);
            this.Result = res.message;
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          console.log('Failed to authenticate the User.', error);
          this.Result = 'Failed to authenticate the User. Please try again.';
          this.router.navigate(['/login']);
        }
      );
    }

    this.studentForm.reset();
  }

}


