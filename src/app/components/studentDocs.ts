
import {Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {OnlineRegistration} from '../models/onlineRegistration';
import {Constants} from '../app.constants';
import {DataTableModule, DialogModule, InputTextareaModule} from 'primeng/primeng';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/User';
import {Level} from '../models/level';
import {Payment} from '../models/payment';
import {Doc} from '../models/doc';
import {UIChart} from 'primeng/primeng';
import {FileUploader} from './fileUploader';
import {StudentService} from '../services/student.service';

@Component({
  selector: 'app-admin-studentdocs',
  templateUrl: '../pages/studentDocs.html',
  providers: [StudentService]
})
export class StudentDocs implements OnInit, OnDestroy {
  error: string = '';
  success: string = '';
  cols: any[];
  documents: Doc[];
  displayDialog: boolean = false;
  public user: User;
  public role: string;
  @ViewChild(FileUploader) fileUploader: FileUploader;
  DOWNLOAD: string = Constants.DOWNLOAD;
  UPLOAD: string = Constants.UPLOAD;
  DELETE: string = Constants.DELETE_LABEL;

  data: any;
  data1: any;
  data2: any;

  currentUser: User = JSON.parse(atob(Cookie.get("user")));

  constructor
    (
    private studentService: StudentService,
    private changeDetectorRef: ChangeDetectorRef
    ) {

  }

  ngOnDestroy() {
  }
  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(atob(Cookie.get('user')));
    }
    console.log(this.user);
    if (this.user.role == 3) {//student
      this.getDocuments(null);
    } else {

    }
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


  showDialog() {
    this.displayDialog = true;
  }

  public setStudent(user: User) {
    this.user = user;
    this.role = "student";
  }

  showDialogToUploadImage(data) {
    console.log(data);
    this.fileUploader.showDialogToUploadImage("docs", data);
  }
  deleteDoc(data) {
    console.log('delete   for user:' + data);
    this.studentService.deleteDoc(data)
      .subscribe(result => {
        this.getDocuments(null);
      });
  }


  selectData(event) {
    console.log(event);
  }
}
