import { Component, OnInit } from '@angular/core';
import { SearchAttendance } from 'app/models/searchAttendance';
import { SelectItem } from 'primeng/primeng';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import { User } from 'app/models/User';
import { CourseService, StudentService } from 'app/services';
import { AttendanceDetails } from 'app/models/attendanceDetails';
import { Student } from 'app/models/student';


@Component({
  selector: 'app-search-student-attendance',
  templateUrl: '../pages/searchStudentAttendance.html',
  providers: [CourseService,StudentService]
})
export class SearchStudentAttendance implements OnInit {

  loggedInUser: User = new User();
  student: Student = new Student();

  status: string = 'Absent'; 
  public user: User;
  etats: SelectItem[] = [];
  searchAttendance : SearchAttendance = new SearchAttendance();
  attendanceDetails : AttendanceDetails[];


  constructor(private courseService : CourseService, private studentService : StudentService) {

    this.etats =  [{ label: 'Présent', value: 1 },
    { label: 'Absent', value: 0 }]
    this.searchAttendance.status = 0;

  }


  ngOnInit() {

    this.loggedInUser = JSON.parse(atob(Cookie.get('user')));
    if (this.loggedInUser.role == 3) {
      this.setStudent(this.loggedInUser);
    }
   
  }

  public setStudent(aUser: User) {
    if (aUser != null && aUser.id > 0) {
      this.studentService.getByUser(aUser)
        .subscribe(result => {
          this.student = result;
        });

    }
  }

  search() {
    this.courseService.getSearchAttendanceDetailsByStudentId(this.searchAttendance,this.student.id)
    .subscribe(result => {
      this.attendanceDetails = result;
      this.attendanceDetails.forEach(at => {
        if (at.estPresent == 1) {
          at.isPresent = true;
        } else {
          at.isPresent = false;
        }
        at.descHour =  at.attendance.beginHour + "H" + at.attendance.beginMinute +
         " - " + at.attendance.endHour+ "H"+ at.attendance.endMinute;       
      });
      console.log(this.attendanceDetails);
    },
    error => console.log(error),
    () => console.log('get expense complete')); 
    
}

}
