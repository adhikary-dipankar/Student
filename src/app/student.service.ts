import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  username:string ='';

  private students: any[] = [];

  constructor() { }

  saveData(studentForm: any): Observable<any> {
    this.students.push(studentForm);
    this.saveStudentsToLocalStorage();
    return of({ success: true, message: ' submitted the form successfully.' });
  }

  editData(id: number, studentForm: any): Observable<any> {
    const index = this.students.findIndex(student => student.Id === id);
    if (index !== -1) {
      this.students[index] = studentForm; 
      this.saveStudentsToLocalStorage(); 
      return of({ success: true, message: ' updated the form successfully.' });
    } else {
      return of({ success: false, message: 'Student not found.' });
    }
  }

  deleteData(id: number): Observable<any> {
    const index = this.students.findIndex(student => student.Id === id);
    if (index !== -1) {
      this.students.splice(index, 1);
      this.saveStudentsToLocalStorage();
      return of({ success: true, message: 'Form data is deleted.' });
    } else {
      return of({ success: false, message: 'Student not found.' });
    }
  }

  getAllStudents(): Observable<any> {
    this.loadStudentsFromLocalStorage();
    return of(this.students);
  }

  getStudentById(id: number): Observable<any> {
    const student = this.students.find(s => s.Id === id);
    return of(student);
  }

  private saveStudentsToLocalStorage(): void {
    localStorage.setItem('students', JSON.stringify(this.students));
  }

  private loadStudentsFromLocalStorage(): void {
    const storedStudentsString = localStorage.getItem('students');
    if (storedStudentsString) {
      this.students = JSON.parse(storedStudentsString);
    }
  }
  registerUserLocally(userData: any): void {
  
    localStorage.setItem(userData.UserName, JSON.stringify(userData));
  }

  loginUserLocally(userName: string, userPassword: string): Observable<any> {
    const storedUserDataString = localStorage.getItem(userName);

    if (storedUserDataString) {
      const storedUserData = JSON.parse(storedUserDataString);

      if (storedUserData.UserPassword === userPassword) {
        return of({ success: true, message: 'Login successful.' });
      } else {
        return of({ success: false, message: 'Incorrect password. Please try again with correct password' });
      }
    } else {
      return of({ success: false, message: 'User not found. Please try again with correct user Id and password.' });
    }
  }
}
