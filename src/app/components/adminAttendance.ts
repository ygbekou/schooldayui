import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Constants } from '../app.constants';
import { CourseService, SubjectService, TeacherService, TimeSheetService } from 'app/services';
import { LookUpTableService } from 'app/services/lookUpTable.service';
import { ConfirmationService, Message, MessageService } from 'primeng/primeng';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from 'app/models/User';
import { Teacher } from 'app/models/teacher';
import { TimeSheetEntryGroup } from 'app/models/timeSheetEntryGroup';
import { TimeSheetEntry } from 'app/models/timeSheetEntry';
import { TimeSheetEntryDetail } from 'app/models/timeSheetEntryDetail';
import { Attendance } from 'app/models/attendance';
import { StudentView } from 'app/models/studentView';
import { AttendanceDetails } from 'app/models/attendanceDetails';
import { TimeSheetHourType } from 'app/models/timeSheetHourType';

@Component({ 
  selector: 'app-admin-attendance',
  templateUrl: '../pages/adminAttendance.html',
  providers: [TimeSheetService, SubjectService, LookUpTableService, Constants,CourseService,MessageService]
})

export class AdminAttendance  implements OnInit, OnDestroy {
  
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
      private changeDetectorRef: ChangeDetectorRef,
      private messageService: MessageService,
      private confirmationService: ConfirmationService 
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
    addSingle() {
      this.messageService.add({severity:'success', summary:'Envoyé', detail:'Messages envoyés avec succès'});
  }

  sendAttendanceSms(){
    this.courseService.sendAttendanceSms().subscribe((res) => {
      console.log("sms envoyés")
    })
    
  }

  sendAttendanceSmCs(){
    this.courseService.sendAttendanceSmsCs().subscribe((res) => {
      console.log("sms envoyés")
    })
    
  }

  confirm() {
    this.confirmationService.confirm({
        header: 'Veuillez confirmer l\'envoi',
        message: 'Êtes-vous sûr(e) de vouloir envoyer les SMS ? Si vous confirmez, un message sera envoyé aux parents de chaque étudiant leurs indiquant le ou les cours dans lequel ou lesquels ce dernier est absent aucours de cette journée',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.sendAttendanceSms();
          this.addSingle();
            // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}


  confirmCs() {
    this.confirmationService.confirm({
        header: 'Veuillez confirmer l\'envoi',
        message: 'Êtes-vous sûr(e) de vouloir envoyer les SMS ? Si vous confirmez, un message sera envoyé aux parents de chaque étudiant leurs indiquant le ou les cours dans lequel ou lesquels ce dernier est absent aucours de cette journée',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.sendAttendanceSmCs();
          this.addSingle();
            // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
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
  