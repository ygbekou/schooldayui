import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { Constants } from '../app.constants';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { FileUploader } from './fileUploader';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: '../pages/adminUserList.html',
  providers: [UserService, Constants]
})
export class AdminUserList implements OnInit, OnDestroy {

  public users: User[];
  public selectedUser: User;
  public user: User;
  public loggedInUser: User;

  public searchText: string;
  @Input() role: string;
  aRole: string;
  displayDialog: boolean;
  public error: string;
  cols: any[];
  @Output() onUserSelected = new EventEmitter<User>();

  @ViewChild(FileUploader) fileUploader: FileUploader;
  roles: any[] = [];
  USER_SEARCH_PARTS: string = Constants.USER_SEARCH_PARTS;
  UPLOAD_STUDENTS: string = Constants.UPLOAD_STUDENTS;
  UPLOAD_TEACHERS: string = Constants.UPLOAD_TEACHERS;
  PAGE_ROLE: string;

  constructor
    (
      private userService: UserService,
      private changeDetectorRef: ChangeDetectorRef
    ) {

  }

  ngOnDestroy() {
    this.users = null;
    this.selectedUser = null;
    this.user = null;
    this.cols = null;
  }

  /*
  public search() {
    this.error = null;
    if (this.searchText != null) {
      if (this.aRole != null) {
        this.userService.search(this.aRole + "|" + this.searchText).subscribe((data: User[]) => {
          this.users = data;

          if (this.users == null || this.users.length <= 0) {
            this.error = Constants.NO_USER_FOUND;
          }
        },
          error => console.log(error),
          () => console.log('Find users with name like ' + this.searchText));
      } else {
        this.userService.search(this.searchText).subscribe((data: User[]) => {
          this.users = data;
          if (this.users == null || this.users.length <= 0) {
            this.error = Constants.NO_USER_FOUND;
          }
        },
          error => console.log(error),
          () => console.log('Find users with name like ' + this.searchText));
      }
    }
  }
    */

  public search() {
    this.error = null;
    if (this.searchText != null) {
      if (this.aRole != null) {
        this.userService.search(this.aRole + "|" + this.searchText).subscribe((data: User[]) => {
          this.users = data.filter(user => user.id !== 1);

          if (this.users == null || this.users.length <= 0) {
            this.error = Constants.NO_USER_FOUND;
          }
        },
          error => console.log(error),
          () => console.log('Find users with name like ' + this.searchText));
      } else {
        this.userService.search(this.searchText).subscribe((data: User[]) => {
          this.users = data.filter(user => user.id !== 1);
          
          if (this.users == null || this.users.length <= 0) {
            this.error = Constants.NO_USER_FOUND;
          }
        },
          error => console.log(error),
          () => console.log('Find users with name like ' + this.searchText));
      }
    }
  }

   public searchUsers() {
    this.error = null;
    if (this.searchText != null) {
    
        this.userService.searchUsers(this.searchText).subscribe((data: User[]) => {
          this.users = data;
        },
          error => console.log(error),
          () => console.log('Find users with name like ' + this.searchText));
      }
    }
  

  ngOnInit() {
    this.aRole = this.role;
    this.loggedInUser = JSON.parse(atob(Cookie.get('user')));

    this.roles = [];

    console.log(this.role);

    //if (this.loggedInUser.role === 1)
    if (this.loggedInUser.role !== 10) //Si ce n'est pas un GRH
    {
      if (this.loggedInUser.role === 1) { //Si c'est un admin
          this.roles.push({ label: 'Tout le monde', value: 0 });
          this.roles.push({ label: 'Administrateur', value: 1 });
          this.roles.push({ label: 'Personnel', value: 15 });
          this.roles.push({ label: 'Enseignant', value: 2 });
      }  
      this.roles.push({ label: 'Kiosk', value: 6 });
      this.roles.push({ label: 'Visiteur', value: 7 });
      this.roles.push({ label: 'Eleve', value: 3 });
      this.roles.push({ label: 'Parent', value: 4 });
    }
    if (this.loggedInUser.role === 10){
        this.roles.push({ label: 'Personnel', value: 15 });
        this.roles.push({ label: 'Enseignant', value: 2 });
        this.roles.push({ label: 'Dcmc', value: 9 });
        this.roles.push({ label: 'DEP', value: 8 });
        this.roles.push({ label: 'Secretaire', value: 11 });
        this.roles.push({ label: 'Administrateur', value: 1 });
        this.roles.push({ label: 'Eleve', value: 3 }); // 04/08/2022
    }
   

    this.cols = [
      { field: 'lastName', header: Constants.NAME, sortable: 'true', filter: 'true' },
      { field: 'firstName', header: Constants.PRENOM, sortable: 'true', filter: 'true' },
      { field: 'sex', header: Constants.SEX, sortable: 'false', filter: 'false' },
      { field: 'email', header: Constants.EMAIL, sortable: 'false', filter: 'false' },
      { field: 'cellPhone', header: Constants.PHONE, sortable: 'true', filter: 'true' }
    ];
  }

  public getAll(role: number): void {
    this.users = [];
  }

  public getStudentUsersByParent(parentId: number): void {
    this.users = [];
    this.userService.getUsersByParent(parentId)
      .subscribe((data: User[]) => this.users = data,
        error => console.log(error),
        () => console.log('Get all Students by parent complete'));
  }


  onRowSelect(evt) {
    //this.newUser = false;
    this.user = this.clone(evt.data);
    this.displayDialog = true;
    this.onUserSelected.emit(this.user);
  }

  clone(e: User): User {
    let aUser = new User();
    for (let prop in e) {
      aUser[prop] = e[prop];
    }
    return aUser;
  }

  findSelectedIndex(): number {
    return this.users.indexOf(this.selectedUser);
  }

  showDialogToUploadStudentFile() {
    this.fileUploader.errorMessage = "";
    this.fileUploader.uploadedFiles = [];
    this.fileUploader.uploadFile("student");
  }

  showDialogToUploadTeacherFile() {
    this.fileUploader.errorMessage = "";
    this.fileUploader.uploadedFiles = [];
    this.fileUploader.uploadFile("teacher");
  }

}
