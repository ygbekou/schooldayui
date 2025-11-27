import { Component, Input, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Testimony } from '../models/testimony';
import { User } from '../models/User';
import { Teacher } from '../models/teacher';
import { TestimonyService } from '../services/testimony.service';
import { TeacherDropdown } from './dropdowns/dropdown.teacher';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';

@Component({
  selector: 'app-admin-testimony',
  templateUrl: '../pages/adminTestimony.html',
  providers: [TeacherDropdown]
})
export class AdminTestimony implements OnInit {

  public testimonies: Testimony[] = [];
  public error: String = '';
  public selectedTestimony: Testimony = new Testimony();
  displayDialog: boolean;
  testimony: Testimony = new Testimony();
  newTestimony: boolean;
  cols: any[];
  private user: User;
  private approvedBy: User;
  public teacherDropdown: TeacherDropdown;
  currentUser: User = JSON.parse(atob(Cookie.get('user')));
  private role: string;

  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;  
  SAVE_LABEL: string = Constants.SAVE_LABEL;  
  ADD_LABEL: string = Constants.ADD_LABEL;  
  PROF:string=Constants.PROF;
  
  constructor
    (
    private testimonyService: TestimonyService,
    private tchDropdown: TeacherDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.teacherDropdown = tchDropdown;
    this.approvedBy = JSON.parse(atob(Cookie.get('user')));
  }

  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }
    if (this.role == 'student') {
      this.cols = [
        { field: 'testimonyDate', header: Constants.DATE, type: 'Date', sortable: 'true' },
        //{ field: 'user.name', header: Constants.AUTEUR, sortable: 'false', filter: 'true' },
        { field: 'teacher.name', header: Constants.PROF, sortable: 'false', filter: 'true' }
      ];
    }
    else if (this.role === 'admin') {
      this.cols = [
        { field: 'testimonyDate', header: Constants.DATE, type: 'Date', sortable: 'true' },
        { field: 'user.name', header: Constants.AUTEUR, sortable: 'false', filter: 'true' },
        { field: 'teacher.name', header: Constants.PROF, sortable: 'false', filter: 'true' },
        { field: 'approvedBy.name', header: Constants.APPROVED_BY, sortable: 'false', filter: 'true' },
        { field: 'status', header:Constants.ACTIVE, sortable: 'true', filter: 'true' },
        { field: 'rank', header: Constants.RANK, sortable: 'true', filter: 'true' }
      ];
    }else if(this.currentUser.role===2){    
      this.cols = [
        { field: 'testimonyDate', header: Constants.DATE, type: 'Date', sortable: 'true' } 
        //{ field: 'user.name', header: Constants.AUTEUR, sortable: 'false', filter: 'true' } 
      ];
    }
  }

  public setStudent(user: User) {
    this.user = user;
    this.role = "student";
  }

  public setApprovedBy(user: User) {
    this.approvedBy = user;
    this.role = "admin";
  }

  public getAll(): void {
    this.testimonies = [];
    this.testimonyService.getAll()
      .subscribe((data: Testimony[]) => this.testimonies = data,
      error => console.log(error),
      () => console.log('Get all Testimonies complete'));
  }

  public getTestimonyByUser(user: User): void {
    this.testimonies = [];
    this.testimonyService.getByUser(user)
      .subscribe((data: Testimony[]) => {
        this.testimonies = data
        console.info("Testimonies: " + this.testimonies);
      },
      error => console.log(error),
      () => console.log('Get all Testimonies complete'));
  }

    public getTestimonyByTeacher(user: User): void {
    this.testimonies = [];
    this.testimonyService.getByTeacher(user)
      .subscribe((data: Testimony[]) => {
        this.testimonies = data
        console.info("Testimonies: " + this.testimonies);
      },
      error => console.log(error),
      () => console.log('Get all Testimonies complete'));
  }
  showDialogToAdd() {
    this.newTestimony = true;
    this.testimony = new Testimony();
    this.testimony.user = this.user;
    if(this.currentUser.role!==2){
      this.displayDialog = true;
    }
  }

  save() {
    try {
      this.error = '';
      if (this.role === 'student' ||this.testimony.testimonyDate===null) {
        this.testimony.testimonyDate = new Date();
        this.testimony.status = false;
      }

      this.testimonyService.save(this.testimony)
        .subscribe(result => {
          if (result.id > 0) {
            this.testimony = result;
            this.putInTable();
          }
          else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  delete() {
    try {
      this.error = '';
      this.testimonyService.delete(this.testimony)
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
    if (this.newTestimony)
      this.testimonies.push(this.testimony);
    else
      this.testimonies[this.findSelectedIndex()] = this.testimony;

    var onTheFly : Testimony [] = [];
    onTheFly.push(...this.testimonies);
    this.testimonies = onTheFly;
    
    this.resetData();
  }

  removeFromTable() {
    this.testimonies.splice(this.findSelectedIndex(), 1);
    var onTheFly : Testimony [] = [];
    onTheFly.push(...this.testimonies);
    this.testimonies = onTheFly;
    this.resetData();
  }

  resetData() {
    this.testimony = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newTestimony = false;
    this.testimony = this.clone(evt.data);
    this.testimony.testimonyDate = new Date(this.testimony.testimonyDate);
    if(this.currentUser.role!==2){
      this.displayDialog = true;
    }
    if ("admin" === this.role && this.testimony.approvedBy == null) {
      this.testimony.approvedBy = this.approvedBy;
    }
  }

  clone(e: Testimony): Testimony {
    let aTestimony = new Testimony();
    for (let prop in e) {
      aTestimony[prop] = e[prop];
    }
    return aTestimony;
  }

  findSelectedIndex(): number {
    return this.testimonies.indexOf(this.selectedTestimony);
  }
}
