import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Student } from '../models/student';
import { Parentview } from '../models/parentview';
import {StudentKiosk} from '../models/kiosk/studentKiosk'
import { User } from '../models/User';
import { StudentService } from '../services/student.service';
import { Constants } from '../app.constants';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';

@Component({
  selector: 'app-manage-student-parent',
  templateUrl: '../pages/manageStudentParent.html',
  providers: []
})
export class ManageStudentParent implements OnInit {

  public error: String = '';
  public success: String = '';
  public reportName: string;
  ACTIF: string = Constants.ACTIF;
  INACTIF: string = Constants.INACTIF;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  parentCols: any[];

  @Input() user: User;
  public student: Student;

  public parentview: Parentview[] = [];

  constructor ( private studentService: StudentService,
  private changeDetectorRef: ChangeDetectorRef)
  {
    this.student = new Student();
    this.student.user = new User();
  }

  ngOnInit() {
      this.parentCols = [
      {field: 'lastName', header: Constants.NAME, sortable: 'true'},
      {field: 'firstName', header: Constants.PRENOM, sortable: 'true'},
      {field: 'eMail', header: Constants.EMAIL, sortable: 'false'},
      {field: 'sex', header: Constants.SEX, sortable: 'false'},
      {field: 'phone', header: Constants.PHONE, sortable: 'true'}
    ];
  }

  setStudent(user: User) {
     this.studentService.getByUser(user)
      .subscribe((data: Student) => {

        this.student = data
        console.log(this.student);

        this.student.user = user;

        if(this.student.id > 0) {
          console.log("exite");
          this.getStudentParent();
        }

      },
      error => console.log(error),
      () => console.log('Get parents complete'));

  }

  public getStudentParent() {
    this.error = '';
    this.success = '';
    try {
        this.studentService.getStudentParent(this.student.id)
        .subscribe(result => {
          if (result) {
            this.parentview = result;
            // console.log("cooooool");
            // console.log(this.parentview[0]);
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }
}
