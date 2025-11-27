import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {User} from '../models/User';
import {Student} from '../models/student';
import {PrerequisitWaiver} from '../models/prerequisitWaiver';
import {StudentService} from '../services/student.service';
import {Constants} from '../app.constants';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {SubjectDropdown} from './dropdowns/dropdown.subject';
import {SchoolYearDropdown} from './dropdowns/dropdown.schoolYear';
import {DataTableModule, DialogModule} from 'primeng/primeng';

@Component({
  selector: 'app-admin-prerequisitwaiver',
  templateUrl: '../pages/adminPrerequisitWaiver.html',
  providers: [Constants, SubjectDropdown, SchoolYearDropdown]
})

export class AdminPrerequisitWaiver implements OnInit, OnDestroy {

  public prerequisitWaivers: PrerequisitWaiver[];
  public error: String = '';
  public selectedPrerequisitWaiver: PrerequisitWaiver;
  displayDialog: boolean;
  prerequisitWaiver: PrerequisitWaiver = new PrerequisitWaiver();
  newPrerequisitWaiver: boolean;
  cols: any[];
  public user: User;
  public student: Student;
  public subjectDropdown: SubjectDropdown;
  public schoolYearDropdown: SchoolYearDropdown;
  public searchText: string;
  public msg: string;
  public reportName: string;
  DETAIL: string = Constants.DETAIL;
  SUBJECT: string = Constants.SUBJECT;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  constructor
    (
    private studentService: StudentService,
    private sbjDropdon: SubjectDropdown,
    private schYearDropdown: SchoolYearDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.subjectDropdown = sbjDropdon;
    this.schoolYearDropdown = schYearDropdown;
  }
  
  ngOnDestroy() {
    this.prerequisitWaivers = null;
    this.error = null;
    this.selectedPrerequisitWaiver = null;
    this.prerequisitWaiver = null;
    this.cols = null;
  }
  getAll(){}
  ngOnInit() {
    this.prerequisitWaivers = [];
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }
    
      this.cols = [
        {field: 'subject.name', header: Constants.SUBJECT, sortable: 'true', style: {'width': '30%', 'overflow': 'visible'}},
        {field: 'waiver.name', header: Constants.AUTHORIZED_BY, sortable: 'true', style: {'width': '30%','overflow': 'visible'}},
        {field: 'comments', header: Constants.RAISON, style: {'width': '40%','overflow': 'visible'}}
      ];
  }

  public getWaiverByStudent(): void {
    this.prerequisitWaivers = [];
    this.studentService.getPrerequisitWaivers(this.student)
      .subscribe((data: PrerequisitWaiver[]) => {
        this.prerequisitWaivers = data
        //console.info("Courses: " + this.courses);
      },
      error => console.log(error),
      () => console.log('Get all waivers complete'));
  }

  showDialogToAdd() {
    if (this.user != null && this.user.role == 1) {
      this.newPrerequisitWaiver = true;
      this.prerequisitWaiver = new PrerequisitWaiver();
      this.displayDialog = true;
    }
  }

  save() {
    try {
      this.error = '';
      if (this.prerequisitWaiver.subject == null ) {
        this.error = Constants.REQUIRED_FIELD_MISSING;
      } else {
        this.prerequisitWaiver.student = this.student;
        this.prerequisitWaiver.waiver = this.user;
        this.studentService.savePrerequisitWaiver(this.prerequisitWaiver)
          .subscribe(result => {
            if (result.id > 0) {
              this.prerequisitWaiver = result;
              this.putInTable();
            }
            else {
              this.error = Constants.saveFailed;
              this.displayDialog = true;
            }
          })
      }
    }
    catch (e) {
      console.log(e);
    }


  }

  delete() {
    try {
      this.error = '';
      this.studentService.deletePrerequisitWaiver(this.prerequisitWaiver)
        .subscribe(result => {
          if (result) {
            this.removeFromTable();
          }
          else {
            this.error = Constants.deleteFailed;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  putInTable() {
    if (this.newPrerequisitWaiver)
      this.prerequisitWaivers.push(this.prerequisitWaiver);
    else
      this.prerequisitWaivers[this.findSelectedIndex()] = this.prerequisitWaiver;

    var onTheFly: PrerequisitWaiver[] = [];
    onTheFly.push(...this.prerequisitWaivers);
    this.prerequisitWaivers = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.prerequisitWaivers.splice(this.findSelectedIndex(), 1);
    var onTheFly: PrerequisitWaiver[] = [];
    onTheFly.push(...this.prerequisitWaivers);
    this.prerequisitWaivers = onTheFly;
    this.resetData();
  }

  resetData() {
    this.prerequisitWaiver = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    if (this.user != null && this.user.role == 1) {
      this.newPrerequisitWaiver = false;
      this.prerequisitWaiver = this.clone(evt.data);
      this.displayDialog = true;
    }
  }

  clone(e: PrerequisitWaiver): PrerequisitWaiver {
    let aPrerequisitWaiver = new PrerequisitWaiver();
    for (let prop in e) {
      aPrerequisitWaiver[prop] = e[prop];
    }
    return aPrerequisitWaiver;
  }

  findSelectedIndex(): number {
    return this.prerequisitWaivers.indexOf(this.selectedPrerequisitWaiver);
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
