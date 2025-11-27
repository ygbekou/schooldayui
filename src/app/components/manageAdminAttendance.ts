import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { TimeSheetEntry } from '../models/timeSheetEntry';
import { TimeSheetEntryDetail } from '../models/timeSheetEntryDetail';
import { TimeSheetHourType } from '../models/timeSheetHourType';
import { TimeSheetEntryType } from '../models/timeSheetEntryType';
import { User } from '../models/User';
import { Teacher } from '../models/teacher';
import { Attendance } from '../models/attendance';
import { LookUpTable } from '../models/lookUpTable';
import { TimeSheetService } from '../services/timeSheet.service';
import { CourseService } from '../services/course.service';
import { LookUpTableService } from '../services/lookUpTable.service';
import { SubjectService } from '../services/subject.service';
import { TeacherService } from '../services/teacher.service';
import { Constants } from '../app.constants';
import { TimeSheetEntryGroup } from "../models/timeSheetEntryGroup";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, Message } from 'primeng/primeng';
import { StudentView } from 'app/models/studentView';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { AttendanceDetails } from 'app/models/attendanceDetails';
@Component({
  selector: 'app-manage-admin-attendance',
  templateUrl: '../pages/manageAdminAttendance.html',
  providers: [TimeSheetService, SubjectService, LookUpTableService, Constants,CourseService]
})

export class ManageAdminAttendance implements OnInit, OnDestroy {

  msgs: Message[] = [];

  public user: User;
  public teacher: Teacher;
  public headers: string[];
  public timeSheetEntryGroups: TimeSheetEntryGroup[] = [];
  public cols: any[];
  public timeSheetEntries: TimeSheetEntry[] = [];
  public timeSheetEntryDetails: TimeSheetEntryDetail[] = [];
  public attendances: Attendance[] = [];
  public studentViews: StudentView[] = [];
  public attendanceDetails: AttendanceDetails[]=[];
  public attendanceDetail: AttendanceDetails;
  public timeSheetEntry: TimeSheetEntry;
  public timeSheetEntryGroup: TimeSheetEntryGroup;
  public attendance: Attendance;
  present = false;
  saving = false;
  retVal: string;

  SAVE_LABEL: string = Constants.SAVE_LABEL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  APPROVE_LABEL: string = Constants.APPROVE_LABEL;
  REJECT_LABEL: string = Constants.REJECT_LABEL;

  constructor
    (
    private teacherService: TeacherService,
    private timeTrackingService: TimeSheetService,
    private courseService: CourseService,
    private lookUpTableService: LookUpTableService,
    private changeDetectorRef: ChangeDetectorRef
    ) {

  }

  ngOnDestroy() {

  }

  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }

    this.cols = [
      {field: 'descCreateDate', header: "Date", sortable: 'true', filter: 'true', style: {'width': '5%'}},
      {field: 'descBeginHour', header: "Debut", sortable: 'false', filter: 'true', style: {'width': '5%'}},
      {field: 'descEndHour', header: "Fin", sortable: 'false', filter: 'true', style: {'width': '5%'}},
      {field: 'lastName', header: "Nom", sortable: 'true', filter: 'true', style: {'width': '15%'}},
      {field: 'subjectName', header: "Cours", sortable: 'true', filter: 'true', style: {'width': '15%'}}
    ];
  }
  doAttendance(){
    console.log(this.attendance);
    this.courseService.doAttendance(this.attendance.id)
    .subscribe((data: string)=>{
      this.retVal = data;
    }),
    error => console.log(this.retVal);
    () => console.log(this.retVal);
  }
  saveAttendanceDetail(at){
   this.attendanceDetail = at;
   if(at.isPresent==true){
    this.attendanceDetail.estPresent = 1;
   }else{
    this.attendanceDetail.estPresent = 0;
   }
    this.courseService.saveAttendanceDetail( this.attendanceDetail)
    .subscribe((data: AttendanceDetails) =>{
      this.attendanceDetail = data;
    }),
    error => console.log(error),
    () => console.log('get expense complete');
  }
  getAllAttendances(){
    this.courseService.getAllAttendances()
            .subscribe((data2: Attendance[]) => {
              this.attendances = data2;
            },
              error => console.log(error),
              () => console.log('Get all time sheets complete'));
  }
  setTeacher(user: User) {
    this.teacherService.getByUser(user)
      .subscribe((data: Teacher) => {
        this.teacher = data;
        if (this.teacher.id != null) {
          this.courseService.getAttendanceByTeacher(this.teacher.id)
            .subscribe((data2: Attendance[]) => {
              this.attendances = data2;
              console.log(this.attendances);
            },
              error => console.log(error),
              () => console.log('Get all time sheets complete'));
        }
      },
        error => console.log(error),
        () => console.log('Get teacher complete'));
  }
  public getAttendanceDetailsByAttendanceId(evt) {
    this.attendance = evt.data;
    console.log("attendance id " + this.attendance.id)
   // this.timeSheetEntryGroup.timeSheetEntries = [];
    this.courseService.getAttendanceDetailsByAttendanceId(this.attendance)
      .subscribe(result => {
        this.attendanceDetails = result;
        this.attendanceDetails.forEach(function(at){
          if(at.estPresent==1){
            at.isPresent = true;
          }else{
            at.isPresent = false;
          }
        });
        console.log(this.attendanceDetails);
      }),
      error => console.log(error),
      () => console.log('get expense complete');
  }

  private getTimeSheetEntryDetail(timeSheetHourType: TimeSheetHourType) {
    let timeSheetEntryDetail: TimeSheetEntryDetail = new TimeSheetEntryDetail();
    timeSheetEntryDetail.timeSheetHourType = timeSheetHourType;
    return timeSheetEntryDetail;
  }

  calculateTotalHours(data) {
    data.totalHours = +this.getNumber(data.detail1.hours) + +this.getNumber(data.detail2.hours)
      + +this.getNumber(data.detail3.hours) + +this.getNumber(data.detail4.hours)
      + +this.getNumber(data.detail5.hours) + +this.getNumber(data.detail6.hours)
      + +this.getNumber(data.detail7.hours)

    return data.totalHours;

  }

  calculateAllTotalHours() {
    this.timeSheetEntryGroup.hours = 0;
    for (let i in this.timeSheetEntryGroup.timeSheetEntries) {
      this.timeSheetEntryGroup.hours += this.calculateTotalHours(this.timeSheetEntryGroup.timeSheetEntries[i]);
    }
  }

  private getNumber(value: number): number {
    return value != undefined ? value : 0;
  }

  public getTimeSheetEntryDetails(evt) {
    //this.error = '';
    //this.msg = '';
    this.timeSheetEntryGroup = evt.data;

    this.timeSheetEntryGroup.timeSheetEntries = [];
    this.timeTrackingService.getTimeSheetEntryDetailsDto(this.timeSheetEntryGroup)
      .subscribe(result => {
        this.timeSheetEntryGroup.timeSheetEntries = result;
        this.timeSheetEntryGroup.cols = [];
        for (var i = 1; i <= 7; i++) {
          let myDate = this.addDays(new Date(this.timeSheetEntryGroup.timeSheetPeriod.startDate), i - 1);
          this.timeSheetEntryGroup.cols.push({ field: 'detail' + i, header: myDate, style: { 'width': '15%' } });
        }
        this.calculateAllTotalHours();

      }),
      error => console.log(error),
      () => console.log('get expense complete');
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  save(timeSheetEntryGroup) {
    this.msgs = [];
    this.saving = true;
    try {

      //alert(timeSheetEntryGroup.comments)
      this.timeTrackingService.save(timeSheetEntryGroup)
        .subscribe(result => {
          if (result.id > 0) {
            this.timeSheetEntryGroup = result;
            this.putInTable();
            this.msgs.push({ severity: 'success', summary: 'Success', detail: Constants.saveSuccess });
          }
          else {
            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: Constants.saveFailed });
          }

          this.saving = false;
        })
    }
    catch (e) {
      console.log(e);
      this.saving = false;
    }
  }


  findSelectedIndex(): number {
    return this.timeSheetEntryGroups.indexOf(this.timeSheetEntryGroup);
  }

  putInTable() {

    for (let i in this.timeSheetEntryGroups) {
      if (this.timeSheetEntryGroups[i].timeSheetPeriod.startDate == this.timeSheetEntryGroup.timeSheetPeriod.startDate
        && this.timeSheetEntryGroups[i].timeSheetPeriod.endDate == this.timeSheetEntryGroup.timeSheetPeriod.endDate) {
        this.timeSheetEntryGroups.pop();
        break;
      }
    }

    this.timeSheetEntryGroups.push(this.timeSheetEntryGroup);

    var onTheFly: TimeSheetEntryGroup[] = [];
    onTheFly.push(...this.timeSheetEntryGroups);
    this.timeSheetEntryGroups = onTheFly;
  }

  delete(timeSheetEntryGroup) {
    try {
      this.msgs = [];
      this.timeTrackingService.deleteTimeSheetEntry(timeSheetEntryGroup.id)
        .subscribe(result => {
          if (result.timeSheetPeriod) {
            this.timeSheetEntryGroup = result;
            this.putInTable();
            this.msgs.push({ severity: 'success', summary: 'Success', detail: Constants.deleteSuccess });
          }
          else {
            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: Constants.deleteFailed });
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  approve(timeSheetEntryGroup) {
    try {
      this.msgs = [];
      timeSheetEntryGroup.approver = this.user;
      this.timeTrackingService.approve(timeSheetEntryGroup)
        .subscribe(result => {
          if (result.id > 0) {
            this.timeSheetEntryGroup = result;
            this.putInTable();
            this.msgs.push({ severity: 'success', summary: 'Success', detail: Constants.saveSuccess });
          }
          else {
            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: Constants.saveFailed });
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  reject(timeSheetEntryGroup) {
    try {
      this.msgs = [];
      timeSheetEntryGroup.approver = this.user;
      this.timeTrackingService.reject(timeSheetEntryGroup)
        .subscribe(result => {
          if (result.id > 0) {
            this.timeSheetEntryGroup = result;
            this.putInTable();
            this.msgs.push({ severity: 'success', summary: 'Success', detail: Constants.saveSuccess });
          }
          else {
            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: Constants.saveFailed });
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }
}
