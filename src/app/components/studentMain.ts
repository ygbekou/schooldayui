import {Component, OnInit, ViewChild} from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Course} from '../models/course';
import {User} from '../models/User';
import {StudentService} from '../services/student.service';
import {Constants} from '../app.constants';
import {CourseResults} from './courseResults';
import {AdminSchooling} from './adminSchooling';
import {AdminSyllabus} from './adminSyllabus';
import {Student} from '../models/student';
import {FileUploader} from './fileUploader';
import {Doc} from '../models/doc';
import {Router, ActivatedRoute} from '@angular/router';
import {ScheduleEvent} from '../models/scheduleEvent';
import {TimeTableService} from '../services/timeTable.service';
import { AdminPresence } from './adminPresence';

@Component({
  selector: 'app-admin-student',
  templateUrl: '../pages/studentMain.html',
  providers: [StudentService, Constants, TimeTableService]
})

export class StudentMain implements OnInit {

  @ViewChild(CourseResults) courseResults: CourseResults;
  @ViewChild(AdminSchooling) adminSchooling: AdminSchooling;
  @ViewChild(AdminSyllabus) adminSyllabus: AdminSyllabus;
  @ViewChild(AdminPresence) adminPresence: AdminPresence;
  PROGRESSION: string = Constants.PROGRESSION;
  TIME_TABLE: string = Constants.TIME_TABLE;
  INSCRIPTION_PAYMENT: string = Constants.INSCRIPTION_PAYMENT;
  SCHOOL_RESULTS: string = Constants.SCHOOL_RESULTS;
  ABSENCES: string = Constants.ABSENCES;
  DOWNLOAD: string = Constants.DOWNLOAD;
  UPLOAD: string = Constants.UPLOAD;
  DELETE: string = Constants.DELETE_LABEL;
  SYLLABUS: string = Constants.SYLLABUS;
  PRESENCE: string = Constants.PRESENCE;
  documents: Doc[];
  public student: Student = new Student();
  @ViewChild(FileUploader) fileUploader: FileUploader;
  public user: User;
  events: any[];
  
  constructor(private studentService: StudentService,
    private timeTableService: TimeTableService,
    private route: ActivatedRoute) {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    } else {
      this.setStudent(this.user);
      this.getDocuments();
    }
  }
  ngOnInit() {
    if (this.courseResults) {
      this.courseResults.getUserCourses(this.user);
    }
    if (this.adminSchooling) {
      this.adminSchooling.getUserSchoolings(this.user);
    }

    //From Paypal site
    this.route
      .queryParams
      .subscribe(params => {
        //paymentId=PAY-0TR3831618395802RLGVZNDQ&token=EC-90D15469GV506001R&PayerID=XQ6KAQ8EW6L9E
        const paymentId: string = params['paymentId'];
        console.log('paymentId: ', paymentId);
        if (paymentId != null) {

          //Get other stuff
          let token = "";
          let PayerID = "";
          let stTuitionId = "";
          let lidye = "";
          this.route
            .queryParams
            .subscribe(params => {
              token = params['token'];
              console.log('token: ', token);
            });

          this.route
            .queryParams
            .subscribe(params => {
              PayerID = params['PayerID'];
              console.log('PayerID: ', PayerID);
            });

          this.route
            .queryParams
            .subscribe(params => {
              stTuitionId = params['stTuitionId'];
              console.log('stTuitionId: ', stTuitionId);
            });

          this.route
            .queryParams
            .subscribe(params => {
              lidye = params['lidye'];
              console.log('lidye: ', lidye);
            });

          this.studentService.makePayment(token + "|" + paymentId + "|" + PayerID + "|" + this.user.id + "|" + stTuitionId + "|" + lidye)
            .subscribe(result => {
              if (result) {
                console.log(result);
              }
            });

        }

      });

  }

  onTabChange(evt) {
    if (evt.index === 1) {
      this.timeTableService.getFullStudentScheduleEvents(this.user.id + '')
        .subscribe((data: ScheduleEvent[]) => {
          this.events = data
        },
        error => console.log(error),
        () => console.log('Get schedule events complete'));
    } else if (evt.index === 1) {

    } else if (evt.index === 2) {

    } else if (evt.index === 3) {

    } else if (evt.index === 4) {
      //syllabus
      this.adminSyllabus.getCourseByStudent(this.user);
    } else if (evt.index === 5) {
      this.adminPresence.getUserCico(this.user);
    }
  }

  selectData(event) {

  }
  
  getDocuments() {
    // console.log('get getDocuments for user:' + this.user.firstName);
    this.studentService.getDocuments(this.user)
      .subscribe(result => {
        this.documents = result;
        // console.log('Docs'+this.documents);
      });
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

  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage("docs", data);
  }

  deleteDoc(data) {
    console.log('delete   for user:' + data);
    this.studentService.deleteDoc(data)
      .subscribe(result => {
        this.getDocuments();
      });
  }
}
