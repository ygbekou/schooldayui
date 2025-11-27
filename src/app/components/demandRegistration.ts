
import {Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {OnlineRegistration} from '../models/onlineRegistration';
import {Constants} from '../app.constants';
import {DataTableModule, DialogModule, InputTextareaModule, SelectItem} from 'primeng/primeng';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/User';
import {Level} from '../models/level';
import {Payment} from '../models/payment';
import {Cycle} from '../models/cycle';
import {Doc} from '../models/doc';
import {UIChart} from 'primeng/primeng';
import {FileUploader} from './fileUploader';
import {StudentService} from '../services/student.service';
import {CycleService} from '../services/cycle.service';

@Component({
  selector: 'app-demand-registration',
  templateUrl: '../pages/demandRegistration.html',
  providers: [StudentService, CycleService]
})
export class DemandRegistration implements OnInit, OnDestroy {
  public onlineRegistrations: OnlineRegistration[];
  public onlineRegistration: OnlineRegistration;
  error: string = '';
  success: string = '';
  cols: any[];
  documents: Doc[];
  displayDialog: boolean = false;
  public user: User;
  public role: string;
  @ViewChild(FileUploader) fileUploader: FileUploader;
  APPROVE_LABEL: string = Constants.APPROVE_LABEL;
  REJECT_LABEL: string = Constants.REJECT_LABEL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  DOWNLOAD: string = Constants.DOWNLOAD;
  UPLOAD: string = Constants.UPLOAD;
  DELETE: string = Constants.DELETE_LABEL;
  ADD_COMMENT_INTERNAL: string = Constants.ADD_COMMENT_INTERNAL;
  ADD_SEND_TO_STUDENT: string = Constants.ADD_SEND_TO_STUDENT;
  ARCHIVE: string = Constants.ARCHIVE;
  searchCriteria: string = "";
  cycles: SelectItem[] = [];
  cycle: Cycle;
  data: any;
  data1: any;
  data2: any;
  constructor
    (
    private studentService: StudentService,
    private cycleService: CycleService,
    private changeDetectorRef: ChangeDetectorRef
    ) {

  }

  ngOnDestroy() {
    this.onlineRegistrations = null;
  }
  ngOnInit() {
    this.cycles = [];
    this.cycle = new Cycle();
    this.cycle.id = 0;
    this.cycle.name = "Tous les cycles";
    this.cycles.push({label: this.cycle.name, value: this.cycle});
    this.cycleService.getAll()
      .subscribe((data: Cycle[]) => {
        for (let wd of data) {
          this.cycles.push({label: wd.name, value: wd});
        }
      },
      error => console.log(error),
      () => console.log('Get all Cycles complete'));

    this.onlineRegistrations = [];
    this.user = JSON.parse(atob(Cookie.get('user')));
    console.log(this.user);
    if (this.user.role == 3) {//student
      this.cols = [
        {field: 'level.name', header: Constants.NIVEAU, sortable: 'true'},
        {field: 'createDate', header: Constants.DATE, type: 'Date', sortable: 'true'},
        {field: 'schoolYear.year', header: Constants.SCHOOLYEAR, sortable: 'true', filter: 'true'},
        {field: 'statusString', header: Constants.ETAT, sortable: 'true', filter: 'false'}
      ];
      this.getRegistrationsByUser();
      this.getDocuments(null);
    } else {
      this.getInscriptionChart();
      this.getRegistrations(0);
      this.cols = [
        {field: 'createDate', header: Constants.DATE, type: 'Date', sortable: 'true'},
        {field: 'level.name', header: Constants.NIVEAU, sortable: 'true', filter: 'true', style: {'width': '15%'}},
        {field: 'user.firstName', header: Constants.PRENOM, sortable: 'true', style: {'width': '15%'}},
        {field: 'user.lastName', header: Constants.NAME, sortable: 'true', style: {'width': '15%'}},
        {field: 'user.phone', header: Constants.PHONE, sortable: 'true'},
        {field: 'user.countryResidence.name', header: Constants.COUNTRY, sortable: 'true', filter: 'true'},
        {field: 'schoolYear.year', header: Constants.SCHOOLYEAR, sortable: 'true', filter: 'true'},
        {field: 'event', header: Constants.EVENT, sortable: 'true', filter: 'false'},
        {field: 'typeFormation', header: Constants.TYPE_INFORMATION, type: 'Char', sortable: 'true', filter: 'false'}
      ];
    }


  }

  getInscriptionChart() {
    // console.log("***********",this.cycle,"********")
    this.onlineRegistrations = [];
    this.searchCriteria = '';
    this.error = "";
    try {
      this.studentService.getInscriptionChart(this.cycle.id).subscribe((result: any) => {
		this.data = result;
		console.log(this.data);
      },
        error => console.log(error),
        () => console.log('getInscriptionChart   Chart Complete'));
    }
    catch (e) {
      console.log(e);
    }

    try {
      this.studentService.getInscriptionCountryChart(this.cycle.id).subscribe((result: any) => {
        this.data1 = result;
		console.log(this.data1);
      },
        error => console.log(error),
        () => console.log('getInscriptionChart   Chart Complete'));
    }
    catch (e) {
      console.log(e);
    }

    try {
      this.studentService.getInscriptioLevelChart(this.cycle.id).subscribe((result: any) => {
        this.data2 = result;
		console.log(this.data2);
      },
        error => console.log(error),
        () => console.log('getInscriptionChart   Chart Complete'));
    }
    catch (e) {
      console.log(e);
    }
    // this.getRegistrations(this.cycle.id);
  }

  approve() {
    try {
      this.error = '';

      this.studentService.approve(this.onlineRegistration)
        .subscribe(result => {
          if (result == "Success") {
            this.removeFromTable();
          } else {
            this.error = result;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

   preInscription() {
    try {
      this.error = '';

      this.studentService.preInscription(this.onlineRegistration)
        .subscribe(result => {
          if (result == "Success") {
            this.removeFromTable();
          } else {
            this.error = result;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }


  sendToStudent() {
    this.onlineRegistration.send = true;
    this.addComment();
  }
  addComment() {
    try {
      this.error = '';
      if (this.onlineRegistration.tempComments != null && this.onlineRegistration.tempComments != " ") {
        if (this.onlineRegistration.comments == null) {
          this.onlineRegistration.comments = " ";
        }
        if (this.onlineRegistration.notes == null) {
          this.onlineRegistration.notes = " ";
        }
        const date: Date = new Date();

        if (this.onlineRegistration.send) {
          this.onlineRegistration.comments =
            "<p> <strong><font color=\"red\">[" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " , " + this.user.firstName + " " + this.user.lastName + " ] </font></strong> : " + this.onlineRegistration.tempComments + "</p>"
            + this.onlineRegistration.comments;
        } else {
          this.onlineRegistration.notes =
            "<p> <strong><font color=\"blue\">[" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " , " + this.user.firstName + " " + this.user.lastName + " ] </font></strong> : " + this.onlineRegistration.tempComments + "</p>"
            + this.onlineRegistration.notes;
        }
        this.onlineRegistration.tempComments = null;
      }
      this.studentService.addComment(this.onlineRegistration)
        .subscribe(result => {
          if (result == "Success") {
            this.displayDialog = false;
            this.onlineRegistration.send = false;
          } else {
            this.error = result;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  reject() {
    console.log(this.onlineRegistration);
    try {
      this.error = '';
      this.studentService.reject(this.onlineRegistration)
        .subscribe(result => {
          if (result == "Success") {
            this.removeFromTable();
          } else {
            this.error = result;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  archive() {
    try {
      this.error = '';
      this.studentService.archive(this.onlineRegistration)
        .subscribe(result => {
          if (result == "Success") {
            this.removeFromTable();
          } else {
            this.error = result;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  deleteRegistration() {
    try {
      this.error = '';
      this.studentService.deleteRegistration(this.onlineRegistration)
        .subscribe(result => {
          if (result == "Success") {
            this.removeFromTable();
          } else {
            this.error = result;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }
  getRegistrations(status: number) {
    // console.log('get registrations for status:' + status);
    this.studentService.getOnlineRegistrations(status)
      .subscribe(result => {
        this.onlineRegistrations = result;
        // console.log(this.onlineRegistrations,"list -----");
      });

  }

  getDocuments(event) {
    if (event != null) {
      console.log('get Docs:' + event.data);
      this.studentService.getDocuments(event.data.user)
        .subscribe(result => {
          this.documents = result;
        });
    } else {
      console.log('get getDocuments for user:' + this.user);
      this.studentService.getDocuments(this.user)
        .subscribe(result => {
          this.documents = result;
        });
    }
  }

  getRegistrationsByUser() {
    console.log('get pending registrations for user:' + this.user.id);
    this.studentService.getOnlineRegistrationsByUser(0, this.user)
      .subscribe(result => {
        this.onlineRegistrations = result;
        //console.log(this.onlineRegistrations);
      });

  }
  onRowSelect(event) {
    this.onlineRegistration = event.data;
    if (this.onlineRegistration.level == null) {
      this.onlineRegistration.level = new Level();
    }
    if (this.user.role == 1 || this.user.role == 5 || this.user.role == 8 || this.user.role == 9) {
      this.displayDialog = true;
    }
    console.log( this.onlineRegistration);
  }


  showDialog() {
    this.displayDialog = true;
  }
  findSelectedOnlineRegistrationIndex(): number {
    return this.onlineRegistrations.indexOf(this.onlineRegistration);
  }

  public setStudent(user: User) {
    this.user = user;
    this.role = "student";
  }

  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage("docs", data);
  }
  deleteDoc(data) {
    console.log('delete   for user:' + data);
    this.studentService.deleteDoc(data)
      .subscribe(result => {
        this.getDocuments(null);
      });
  }

  removeFromTable() {
    this.onlineRegistrations.splice(this.findSelectedOnlineRegistrationIndex(), 1);
    var onTheFly: OnlineRegistration[] = [];
    onTheFly.push(...this.onlineRegistrations);
    this.onlineRegistrations = onTheFly;
    this.resetData();
  }

  resetData() {
    this.onlineRegistration = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  selectDataByStatus(event) {
    this.onlineRegistrations = [];
    this.searchCriteria = Constants.ETAT + " = " + event.element._model.label;
    console.log('Getting online registration by Status: ' + event.element._model.label);
    this.studentService.getOnlineRegistrationsByType('status|' + event.element._model.label + "|" + (this.cycle == null ? 0 : this.cycle.id))
      .subscribe(result => {
        this.onlineRegistrations = result;
        // console.log(this.onlineRegistrations, "status result");
      });
  }

  selectDataByCountry(event) {
    this.onlineRegistrations = [];
    this.searchCriteria = Constants.COUNTRY + " = " + event.element._model.label;
    console.log('Getting online registration by Country: ' + event.element._model.label);
    this.studentService.getOnlineRegistrationsByType('country|' + event.element._model.label + "|" + (this.cycle == null ? 0 : this.cycle.id))
      .subscribe(result => {
        this.onlineRegistrations = result;
        // console.log(this.onlineRegistrations, "country result");
      });
  }

  selectDataByCollege(event) {
    this.onlineRegistrations = [];
    this.searchCriteria = Constants.FILIERE + " = " + event.element._model.label;
    console.log('Getting online registration by College: ' + event.element._model.label);
    this.studentService.getOnlineRegistrationsByType('college|' + event.element._model.label + "|" + (this.cycle == null ? 0 : this.cycle.id))
      .subscribe(result => {
        this.onlineRegistrations = result;
        // console.log(this.onlineRegistrations, "college result");
      });
  }
}
