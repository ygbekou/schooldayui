import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SchoolYearDropdown } from './dropdowns/dropdown.schoolYear';
import { SchoolYear } from 'app/models/schoolYear';
import { MonthlyHours } from 'app/models/monthlyHours';
import { DailyHours } from 'app/models/dailyHours';
import { HoursCourse } from 'app/models/hoursCourse';
import { TeacherService, UserService } from 'app/services';
import { CalculHoursParams } from 'app/models/CalculHoursParams';
import { User } from 'app/models/User';
import { Teacher } from 'app/models/teacher';

@Component({
  selector: 'app-calcul-course-hours',
  templateUrl: '../pages/calculCourseHours.html',
  providers: [SchoolYearDropdown,UserService,TeacherService]
})
export class CalculCourseHours implements OnInit {

    public schoolYearDropdown: SchoolYearDropdown;
    theSchoolYear: SchoolYear;
    hoursParams: CalculHoursParams = new CalculHoursParams();

    monthlyHours : MonthlyHours;
    dailyHours : DailyHours;
    hoursCourse : HoursCourse;
    teacher : Teacher;

    mHours : MonthlyHours[] = [];
    dHours : DailyHours[] = [];
    cHours : HoursCourse[] = [];

    public cols: any[];
    public colsD: any[];

  constructor(private schYearDropdown: SchoolYearDropdown,
    private userService: UserService,
    private teacherService : TeacherService) {

    this.schoolYearDropdown = schYearDropdown;  
  }

  ngOnDestroy() {
   
  }
  ngOnInit() {

    this.cols = [
        {field: 'year', header: "Année", sortable: 'true', filter: 'true', style: {'width': '25%'}},
        {field: 'monthName', header: "Mois", sortable: 'false', filter: 'true', style: {'width': '50%'}},
        {field: 'hours', header: "Nombre d'heures (H)", sortable: 'false', filter: 'true', style: {'width': '50%'}},
      ];
      // this.colsD = [
      //   {field: 'date', header: "Date", sortable: 'true', filter: 'true', style: {'width': '50%'}},
      //   {field: 'hours', header: "Nombre d'heures (H)", sortable: 'false', filter: 'true', style: {'width': '50%'}},
      // ];
   
  }


  getMonthlyHours(){
    this.userService.getMonthlyHoursByTeacherAndYear(this.hoursParams)
            .subscribe((res: MonthlyHours[]) => {
              this.mHours = res;
            },
            error => console.log(error),
            () => console.log(''));
  }

  getDailyHours(){
    this.userService.getDailyHoursByTeacherAndMonth(this.hoursParams)
            .subscribe((res: DailyHours[]) => {
              this.dHours = res;
            },
            error => console.log(error),
            () => console.log(''));
  }

  getHoursCourse(){
    this.userService.getCourseHoursByTeacherAndDay(this.hoursParams)
            .subscribe((res: HoursCourse[]) => {
              this.cHours = res;
            },
            error => console.log(error),
            () => console.log(''));
  }


  search(){
    this.hoursParams.schoolYearId = this.theSchoolYear.id;
    this. getMonthlyHours();
  }


  setTeacher(user: User) {
    this.teacherService.getByUser(user)
      .subscribe((data: Teacher) => {
        this.teacher = data;
        if (this.teacher.id != null) {
            this.hoursParams.teacherId = this.teacher.id;
            this.hoursParams.schoolYearId = 15;
            this. getMonthlyHours();
        
        }
      },
        error => console.log(error),
        () => console.log(''));
  }



  public getDailyHoursByMonth(evt) {
   this.monthlyHours = evt.data;
   this.hoursParams.month = this.monthlyHours.month;
   this.getDailyHours();
}

  public gethoursCourseByDay(evt) {
    this.dailyHours = evt.data;
    this.hoursParams.day = this.dailyHours.day;
    this.getHoursCourse();
 }
    

 
}
