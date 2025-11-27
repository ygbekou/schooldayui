import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../models/User';
import { Exam } from '../models/exam';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Constants } from '../app.constants';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-library',
  templateUrl: '../pages/studentLibrary.html',
  providers: [StudentService]
})
export class StudentLibrary implements OnInit {
  
  public activeTab = 0;
  
  currentUser: User;
  public student: Student = new Student();
  RENTALS: string = Constants.RENTALS;
  
  constructor(private studentService: StudentService,
    private changeDetectorRef: ChangeDetectorRef) { 
  }
  ngOnInit() {
    this.currentUser= JSON.parse(atob(Cookie.get('user')));
    if (this.currentUser == null) {
      this.currentUser = new User();
    } else {
      this.setStudent(this.currentUser);
    } 
  }


  onTabChange(evt) {
    this.activeTab = evt.index; 
    if (evt.index == 0) { 
      
    } else if (evt.index == 1) { 

    } else if (evt.index == 2) { 
    
    }
  }

  public setStudent(aUser: User) {
    if (aUser != null && aUser.id > 0) {
      this.studentService.getByUser(aUser)
        .subscribe(result => {
          if (result) {
            this.student = result;
          }
        });
    }
  }

}
