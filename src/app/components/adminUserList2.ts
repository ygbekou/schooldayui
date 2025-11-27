import {Component, OnInit, OnDestroy, Input, ChangeDetectorRef, ViewChild, Output, EventEmitter} from '@angular/core';
import {User} from '../models/User';
import {StudentView} from '../models/studentView';
import {ParentAssignmentView} from '../models/parentAssignmentView';
import {UserService} from '../services/user.service';
import {StudentService} from '../services/student.service';
import {Constants} from '../app.constants';
import {DataTableModule, DialogModule, InputTextareaModule} from 'primeng/primeng';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-admin-user-list2',
  templateUrl: '../pages/adminUserList2.html',
  providers: [UserService, Constants]
})
export class AdminUserList2 implements OnInit, OnDestroy {

  public users: User[];
  public childUsers: StudentView[];
  public selectedUser: User;
  public selectedChild: StudentView;
  public user: User;
  public parentAssignmentView: ParentAssignmentView = new ParentAssignmentView();

  public searchText: string;
  @Input() role: string;
  displayDialog: boolean;
  public error: string;
  public success: string;
  cols: any[];
  childCols: any[];
  @Input() parentUser: User;

  DELETE_LABEL: string = Constants.DELETE_LABEL;
  ASSIGN_PARENTS: string = Constants.ASSIGN_PARENTS;
  MOTHER: string = Constants.MOTHER;
  FATHER: string = Constants.FATHER;
  TUTOR: string = Constants.TUTOR;
  ASSIGN: string = Constants.ASSIGN;
  ENTER_NAME: string = Constants.ENTER_NAME;

  currentUser: User = JSON.parse(atob(Cookie.get('user')));
  constructor
    (
    private userService: UserService,
    private studentService: StudentService,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.parentUser = new User();
  }


  ngOnDestroy() {
    this.users = null;
    this.selectedUser = null;
    this.user = null;
    this.cols = null;
  }

  public search() {
    this.error = null;
    let results: User[];
    if (this.searchText != null) {
      if (this.role != null) {
        this.userService.search(this.role + "|" + this.searchText).subscribe((data: User[]) => {
          this.users = data
          if (this.users == null || this.users.length <= 0) {
            this.error = Constants.NO_USER_FOUND;
          }
        },
          error => console.log(error),
          () => console.log('Find users with name like ' + this.searchText))
      } else {
        this.userService.search(this.searchText).subscribe((data: User[]) => {
          this.users = data;
          if (this.users == null || this.users.length <= 0) {
            this.error = Constants.NO_USER_FOUND;
          }
        },
          error => console.log(error),
          () => console.log('Find users with name like ' + this.searchText))
      }

      ;
    }
  }

  ngOnInit() {
    this.cols = [
      {field: 'lastName', header: Constants.NAME, sortable: 'true', filter: 'true'},
      {field: 'firstName', header: Constants.PRENOM, sortable: 'true', filter: 'true'},
      {field: 'sex', header: Constants.SEX, sortable: 'false', filter: 'false'},
      {field: 'email', header: Constants.EMAIL, sortable: 'false', filter: 'false'},
      {field: 'phone', header: Constants.PHONE, sortable: 'true', filter: 'true'}
    ];

    this.childCols = [
      {field: 'lastName', header: Constants.NAME, sortable: 'true'},
      {field: 'firstName', header: Constants.PRENOM, sortable: 'true'},
      {field: 'sex', header: Constants.SEX, sortable: 'false'},
      {field: 'email', header: Constants.EMAIL, sortable: 'false'},
      {field: 'phone', header: Constants.PHONE, sortable: 'true'},
      {field: 'parentType', header: Constants.TYPE}
    ];
  }

  public getAll(role: number): void {
    this.users = [];
  }

  public assignParent(): void {
    try {
      this.error = '';
      this.success = '';
      this.studentService.assignParent(this.parentAssignmentView)
        .subscribe(result => {
          if (result == "true") {
            this.success = Constants.saveSuccess;
            this.displayDialog = false;
            this.getStudentUsersByParent(this.parentAssignmentView.parentUserId);
          }
          else {
            this.error = Constants.saveFailed;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  public cancel(data): void {
    try {
      this.error = '';
      this.parentAssignmentView.studentUserId = data.userId;
      this.parentAssignmentView.parentUserId = null;
      this.parentAssignmentView.parentType = data.parentType;
      this.selectedChild = data;

      this.studentService.assignParent(this.parentAssignmentView)
        .subscribe(result => {
          if (result == "true") {
            this.success = Constants.saveSuccess;
            this.removeFromTable();
          }
          else {
            this.error = Constants.saveFailed;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  removeFromTable() {
    this.childUsers.splice(this.findSelectedIndex(), 1);
    var onTheFly: StudentView[] = [];
    onTheFly.push(...this.childUsers);
    this.childUsers = onTheFly;
  }

  public getStudentUsersByParent(parentId: number): void {
    this.childUsers = [];
    this.userService.getStudentUsersByParent(parentId)
      .subscribe((data: StudentView[]) => this.childUsers = data,
      error => console.log(error),
      () => console.log('Get all Students by parent complete'));
  }


  onRowSelect(evt) {
    //this.newUser = false;
    this.user = this.clone(evt.data);
    this.displayDialog = true;
    this.parentAssignmentView.studentUserId = this.user.id;
    this.parentAssignmentView.parentUserId = this.parentUser.id;
  }

  clone(e: User): User {
    let aUser = new User();
    for (let prop in e) {
      aUser[prop] = e[prop];
    }
    return aUser;
  }

  findSelectedIndex(): number {
    return this.childUsers.indexOf(this.selectedChild);
  }


}
