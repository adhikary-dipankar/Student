import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { StudentService } from '../student.service';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent {

  studentForm: FormGroup;
  editIndex:number | null=null;
  Result:any;
  searchId: number | null=null;
  studentDetails: any;
  msg:string='';
 

  constructor(private formBuilder: FormBuilder, private std:StudentService){
    this.studentForm = this.formBuilder.group({
      Id: [,Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Age: [, [Validators.required, Validators.min(16), Validators.max(35)]],
      DateofBirth:['',[Validators.required]],
      PhoneNumber: [, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      Email: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]],
      BloodGroup: ['', Validators.required],
      Address: ['', Validators.required],  
    });
  }


  onSubmit() {
    if (this.studentForm.valid) {
      if (this.editIndex !== null) {
        console.log(this.studentForm.value);
        this.studentForm.get('Id')?.enable();
        this.std.editData(this.studentForm.value.Id, this.studentForm.value).subscribe(
          (res) => {
            console.log('Form data is updated.', res);
            this.msg = "Hey "+this.studentForm.value.FirstName+" "+this.studentForm.value.LastName+" , "+res.message;
          },
          (error) => {
            console.log('Failed to update data.', error);
            this.msg = error.error.message;
          }
        );
        this.editIndex = null;
        this.studentForm.reset();
      } else {
        this.std.saveData(this.studentForm.value).subscribe(
          (res: any) => {
            if (res.success) {
              console.log('Form data is saved.', res.message);
              this.msg = "Hey "+this.studentForm.value.FirstName+" "+this.studentForm.value.LastName+" , "+res.message;
            } else {
              console.log('Failed to save data.', res.message);
              this.msg = res.message;
            }
          },
          (error) => {
            console.log('Failed to save data.', error);
            this.msg = error.error.message;
          }
        );
      }
    }
      this.studentForm.reset();
      this.studentForm.get('Id')?.enable();
    }
  


  clearForm() {
    this.studentForm.reset();
    this.msg='';
    this.studentForm.get('Id')?.enable();

 
  } 

  editStdForm(i: number) {
    this.editIndex = i;

    const selectedStudent = this.Result[i];
    const idControl = this.studentForm.get('Id');
    if (idControl) {
      idControl.disable();
    }

    this.studentForm.patchValue({
      Id: selectedStudent.Id,
      FirstName: selectedStudent.FirstName,
      LastName: selectedStudent.LastName,
      Age: selectedStudent.Age,
      DateofBirth: selectedStudent.DateofBirth,
      PhoneNumber: selectedStudent.PhoneNumber,
      Email: selectedStudent.Email,
      BloodGroup: selectedStudent.BloodGroup,
      Address: selectedStudent.Address,
    });
    console.log(this.studentForm);
  }
  
  editStudentDetails() {
    if (this.studentDetails) {
      this.editIndex=1;
      const idControl = this.studentForm.get('Id');
      if (idControl) {
        idControl.disable();
      }
      this.studentForm.setValue({
        Id: this.studentDetails.Id,
        FirstName: this.studentDetails.FirstName,
        LastName: this.studentDetails.LastName,
        Age: this.studentDetails.Age,
        DateofBirth: this.studentDetails.DateofBirth,
        PhoneNumber: this.studentDetails.PhoneNumber,
        Email: this.studentDetails.Email,
        BloodGroup: this.studentDetails.BloodGroup,
        Address: this.studentDetails.Address,
      });
    }
  }
  
  deleteStudentDetails() {
    if (this.studentDetails) {
      this.std.deleteData(this.studentDetails.Id).subscribe(
        () => {
          console.log('Form data is deleted');
          this.studentDetails = null;
          this.searchId = 0;
        },
        (error) => {
          console.log('Failed to delete data.', error);
          this.msg=error.error.message;
        }
      );
    }
  }
  

  deleteForm(i:number) {
    const std =this.Result.splice(i, 1);

    this.std.deleteData(std[0]['Id']).subscribe(
      () => {
        console.log('Form data is deleted');
      },
      (error) => {
        console.log('Failed to delete data.', error);
        this.msg=error.error.message;
      }
    );

    if(this.editIndex === i){
      this.editIndex = null;
    }
  }

  showFormData(){
    this.std.getAllStudents().subscribe(
      (res) => {
        console.log('Form data is showing.',res);
        this.Result=res;
      },
      (error) => {
        console.log('Failed to show the data.',error);
        this.Result=error.error.message;
      }
    ); 
  }

  DShowFormData(){
    this.Result=false;
  
  }

  DFormData(){
    this.studentDetails=false;
    this.searchId=null;
  
  }

  searchById() {
    if (this.searchId !== null) {
      this.std.getStudentById(this.searchId).subscribe(
        (res) => {
          console.log('Student details:', res);
          this.studentDetails = res;
        },
        (error) => {
          console.log('Failed to fetch student details.', error);
          this.studentDetails = null;
        }
      );
    }
  }
}

