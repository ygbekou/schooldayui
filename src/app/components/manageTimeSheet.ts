import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { TimeSheetEntry } from '../models/timeSheetEntry';
import { TimeSheetEntryDetail } from '../models/timeSheetEntryDetail';
import { TimeSheetHourType } from '../models/timeSheetHourType';
import { TimeSheetEntryType } from '../models/timeSheetEntryType';
import { User } from '../models/User';
import { Teacher } from '../models/teacher';
import { LookUpTable } from '../models/lookUpTable';
import { TimeSheetService } from '../services/timeSheet.service';
import { LookUpTableService } from '../services/lookUpTable.service';
import { SubjectService } from '../services/subject.service';
import { TeacherService } from '../services/teacher.service';
import { Constants } from '../app.constants';
import { TimeSheetEntryGroup } from "../models/timeSheetEntryGroup";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, Message } from 'primeng/primeng';
@Component({
  selector: 'app-manage-time-sheet',
  templateUrl: '../pages/manageTimeSheet.html',
  providers: [TimeSheetService, SubjectService, LookUpTableService, Constants]
})

export class ManageTimeSheet implements OnInit, OnDestroy {

  msgs: Message[] = [];

  public user: User;
  public teacher: Teacher;
  public headers: string[];
  public timeSheetEntryGroups: TimeSheetEntryGroup[] = [];
  public cols: any[];
  public timeSheetEntries: TimeSheetEntry[] = [];
  public timeSheetEntryDetails: TimeSheetEntryDetail[] = [];
  public timeSheetEntry: TimeSheetEntry;
  public timeSheetEntryGroup: TimeSheetEntryGroup;

  saving = false;

  SAVE_LABEL: string = Constants.SAVE_LABEL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  APPROVE_LABEL: string = Constants.APPROVE_LABEL;
  REJECT_LABEL: string = Constants.REJECT_LABEL;

  constructor
    (
    private teacherService: TeacherService,
    private timeTrackingService: TimeSheetService,
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
  }

  setTeacher(user: User) {
    this.teacherService.getByUser(user)
      .subscribe((data: Teacher) => {
        this.teacher = data;
        if (this.teacher.id != null) {
          this.timeTrackingService.getTeacherTimeSheetEntries(this.teacher.id)
            .subscribe((data2: TimeSheetEntryGroup[]) => {
              this.timeSheetEntryGroups = data2;
            },
              error => console.log(error),
              () => console.log('Get all attendances complete'));
        }
      },
        error => console.log(error),
        () => console.log('Get teacher complete'));
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
