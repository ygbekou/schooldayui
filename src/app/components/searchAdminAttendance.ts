import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Constants } from '../app.constants';
import { CourseService } from 'app/services';
import { SchoolYearDropdown } from './dropdowns/dropdown.schoolYear';
import { TermDropdown } from './dropdowns/dropdown.term';
import { Term } from 'app/models/term';
import { SchoolYear } from 'app/models/schoolYear';
import { User } from 'app/models/User';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import { SubjectDropdown } from './dropdowns/dropdown.subject';
import { ClassDropdown } from './dropdowns/dropdown.class';
import { Class } from 'app/models/class';
import { Subject } from 'app/models/subject';
import { SelectItem } from 'primeng/primeng';
import { SearchAttendance } from 'app/models/searchAttendance';
import { AttendanceDetails } from 'app/models/attendanceDetails';
import { Attendance } from 'app/models/attendance';

@Component({ 
  selector: 'app-search-admin-attendance',
  templateUrl: '../pages/searchAdminAttendance.html',
  providers: [CourseService, SchoolYearDropdown, TermDropdown,SubjectDropdown,ClassDropdown,Constants]
})
export class SearchAdminAttendance implements OnInit {


  theTerm: Term;
  theSchoolYear: SchoolYear;
  theClasse : Class;
  theSubject : Subject;
  public cols: any[];
  public attendanceDetails: AttendanceDetails[]=[];
  public attendanceDetail: AttendanceDetails;
  public termDropdown: TermDropdown;
  public classDropdown: ClassDropdown;
  public schoolYearDropdown: SchoolYearDropdown;
  public subjectDropdown: SubjectDropdown;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;
  TERM: string = Constants.TERM;
  public user: User;
  attendance : Attendance;
  searchAttendance : SearchAttendance = new SearchAttendance();
  theBeginDate : Date;
  theEndDate : Date;
  status: string = 'Absent'; 
  etats: SelectItem[] = [];



  constructor
  (
  private courseService: CourseService,
  private tmDropdown: TermDropdown,
  private schYearDropdown: SchoolYearDropdown,
  private changeDetectorRef: ChangeDetectorRef,
  private sbjDropdon: SubjectDropdown,
  private clsDropdown: ClassDropdown
  ) {
  this.schoolYearDropdown = schYearDropdown;
  this.termDropdown = tmDropdown;
  this.classDropdown = clsDropdown;
  this.subjectDropdown = sbjDropdon;
  this.etats =  [{ label: 'Présent', value: 1 },
  { label: 'Absent', value: 0 }]
  this.searchAttendance.status = 0;
}

    ngOnInit() { 

      this.user = JSON.parse(atob(Cookie.get('user')));
      if (this.user == null) {
        this.user = new User();
      }
      
   }

   search() {
    this.courseService.getSearchAttendanceDetails(this.searchAttendance)
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
      // console.log(this.attendanceDetails);
    },
    error => console.log(error),
    () => console.log('get expense complete')); 
    // console.log(this.searchAttendance);
}

  
}
