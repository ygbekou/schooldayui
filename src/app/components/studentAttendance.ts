import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/User';
import { AttendanceDetails } from 'app/models/attendanceDetails';
import { Student } from 'app/models/student';
import { CourseService, StudentService } from 'app/services';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-student-attendance',
  templateUrl: '../pages/studentAttendance.html',
  providers: [CourseService,StudentService]
})
export class StudentAttendance implements OnInit {

    loggedInUser: User = new User();
    student: Student = new Student();

    attendanceDetails : AttendanceDetails[];


  constructor( private studentService : StudentService,
    private courseService : CourseService) {
    
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
          this.getAllAttendanceDetailsByStudentId(this.student.id);
        });

    }
  }

  public getAllAttendanceDetailsByStudentId(studentId : number) {
    this.courseService.getAllAttendanceDetailsByStudentId(studentId)
      .subscribe(result => {
        this.attendanceDetails = result;
        this.attendanceDetails.forEach(function(at){
          if(at.estPresent==1){
            at.isPresent = true;
          }else{
            at.isPresent = false;
          }
          at.descHour =  at.attendance.beginHour + "H" + at.attendance.beginMinute + " - " + at.attendance.endHour+ "H"+ at.attendance.endMinute;
        });
        // console.log(this.attendanceDetails);
      }),
      error => console.log(error),
      () => console.log('get expense complete');
  }


 

}
