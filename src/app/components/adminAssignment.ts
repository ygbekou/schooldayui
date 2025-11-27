import {Component, Input, OnInit, ChangeDetectorRef, ViewChild, ViewChildren} from '@angular/core';
import {Assignment} from '../models/assignment';
import {AssignmentResponse} from '../models/assignmentResponse';
import {User} from '../models/User';
import {Teacher} from '../models/teacher';
import {Student} from '../models/student';
import {EventType} from '../models/eventType';
import {AssignmentService} from '../services/assignment.service';
import {BaseService} from '../services/base.service';
import {StudentService} from '../services/student.service';
import {TeacherDropdown} from './dropdowns/dropdown.teacher';
import {EventTypeDropdown} from './dropdowns/dropdown.eventType';
import {SchoolYearDropdown} from './dropdowns/dropdown.schoolYear';
import {Doc} from '../models/doc';
import {Constants} from '../app.constants';
import {Ioconstants} from '../app.ioconstants';
import {FileUploader} from './fileUploader';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {DataTableModule, DialogModule, InputTextareaModule, SelectItem} from 'primeng/primeng';
import { Course } from 'app/models/course';

@Component({
  selector: 'app-admin-assignment',
  templateUrl: '../pages/adminAssignment.html',
  providers: [AssignmentService]
})
export class AdminAssignment implements OnInit {

  @Input() courseId: number;
  public assignments: Assignment[] = [];
  public error: String = '';
  public assignment: Assignment = new Assignment();
  public selectedStudent: Student = new Student();
  displayDialog: boolean;
  newAssignment: boolean;
  cols: any[];
  private user: User;
  currentUser: User = JSON.parse(atob(Cookie.get('user')));
  @ViewChild(FileUploader) fileUploader: FileUploader;
  public assignmentResponse: AssignmentResponse = new AssignmentResponse();
  displayResponseDialog: boolean;

  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  VIOLATION: string = Constants.VIOLATION;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;
  SEND_EMAIL: string = Constants.SEND_EMAIL;
  SEND_SMS: string = Constants.SEND_SMS;
  DOWNLOAD: string = Constants.DOWNLOAD;

  private role: string;

  constructor
    (
    private assignmentService: AssignmentService,
    private studentService: StudentService,
    private baseService: BaseService,
    private changeDetectorRef: ChangeDetectorRef
    ) {

  }

  getAll(){

  }
  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }

    this.getCourseAssignments(this.courseId);
    this.cols = [
      {field: 'startDate', header: Constants.DATE, type: 'Date'},
      {field: 'dueDate', header: Constants.DATE_ECHEANCE, type: 'Date'},
      {field: 'name', header: Constants.NAME}
    ];


  }

  public getCourseAssignments(courseId: number) {
    this.assignments = [];
    this.assignmentService.getByCourse(courseId)
      .subscribe((data: Assignment[]) => {
        this.assignments = data
        console.info("Assignments: " + this.assignments);
      },
      error => console.log(error),
      () => console.log('Get all Assignments complete'));
  }

  public setStudent(user: User) {
    this.user = user;
    this.role = "student";
  }

  showDialogToAdd() {

    if (this.currentUser.role <= 2 || this.currentUser.role == 5 || this.currentUser.role == 8 || this.currentUser.role == 11) {
      this.newAssignment = true;
      this.assignment = new Assignment();
      this.displayDialog = true;
    }
  }

  save() {
    try {
      this.error = '';
      this.assignment.course.id = this.courseId;
      this.assignmentService.save(this.assignment)
        .subscribe(result => {
          if (result.id > 0) {
            this.assignment = result;
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
      this.assignmentService.delete(this.assignment)
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
    if (this.newAssignment)
      this.assignments.push(this.assignment);
    else
      this.assignments[this.findSelectedIndex()] = this.assignment;

    var onTheFly: Assignment[] = [];
    onTheFly.push(...this.assignments);
    this.assignments = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.assignments.splice(this.findSelectedIndex(), 1);
    var onTheFly: Assignment[] = [];
    onTheFly.push(...this.assignments);
    this.assignments = onTheFly;
    this.resetData();
  }

  resetData() {
    this.assignment = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newAssignment = false;
    this.assignment = this.clone(evt.data);
    this.assignment.course= new Course();
    this.assignment.startDate = new Date(this.assignment.startDate);
    this.assignment.dueDate = new Date(this.assignment.dueDate);
    if (this.currentUser.role === 1 || this.currentUser.role === 2 ||
      this.currentUser.role === 5 || this.currentUser.role === 8 || this.currentUser.role === 11) {
      this.displayDialog = true;
    }
  }

  clone(e: Assignment): Assignment {
    let aAssignment = new Assignment();
    for (let prop in e) {
      aAssignment[prop] = e[prop];
    }
    return aAssignment;
  }

  findSelectedIndex(): number {
    return this.assignments.indexOf(this.assignment);
  }

  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage(Ioconstants.COURSE_ASSIGNMENT_FOLDER, data);
  }

  public getAssignmentFiles(evt) {

    if (evt != null) {
      this.assignment = evt.data;
    }
    this.baseService.getFiles(Ioconstants.COURSE_ASSIGNMENT_FOLDER,
      this.assignment.id).subscribe(
      (data: Doc[]) => { this.assignment.files = data;},
    error => console.log(error),
    () => console.log('Get assignment files'));
  }


  saveAssignmentResponse() {
    try {
      this.error = '';
      this.assignmentResponse.assignmentId = this.assignment.id;
      this.assignmentResponse.studentId = this.selectedStudent.id;
      this.assignmentService.saveResponse(this.assignmentResponse)
        .subscribe(result => {
          if (result.id > 0) {
            this.assignmentResponse = result;
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

  deleteAssignmentResponse() {
    try {
      this.error = '';
      this.assignmentService.deleteResponse(this.assignmentResponse)
        .subscribe(result => {
          if (result) {
            this.assignmentResponse = new AssignmentResponse();
          }
          else {
            this.error = Constants.deleteFailed;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }


  public getAssignmentResponses(evt) {

    if (evt != null) {
      this.assignment = evt.data;
    }
    this.assignmentService.getResponsesByAssignment(this.assignment.id).subscribe(
      (data: AssignmentResponse[]) => { this.assignment.assignmentResponses = data;},
    error => console.log(error),
    () => console.log('Get assignment responses'));
  }

  public getAssignmentResponse(assignmentResponseId: number) {
    this.assignmentResponse = new AssignmentResponse();
    this.assignmentService.getResponseById(assignmentResponseId)
      .subscribe((data: AssignmentResponse) => {
        this.assignmentResponse = data;
        this.getAssignmentResponseFiles(data.id);
      },
      error => console.log(error),
      () => console.log('Get Assignment response complete'));
  }


  public getAssignmentResponseFiles(assignmentResponseId: number) {

    this.baseService.getFiles(Ioconstants.COURSE_ASSIGNMENT_RESP_FOLDER,
      assignmentResponseId).subscribe(
      (data: Doc[]) => {
        this.assignmentResponse.files = data;

      },
    error => console.log(error),
    () => console.log('Get assignment response files'));
  }


  deleteDoc(data) {
     this.assignment.id = data.parentId;
      this.baseService.deleteFile(data, Ioconstants.COURSE_ASSIGNMENT_FOLDER, data.parentId)
      .subscribe(result => {
        this.getAssignmentFiles(null);
      });
  }

   onResponseRowSelect(evt) {

     this.selectedStudent.id = evt.data.studentId;
     this.getAssignmentResponse(evt.data.id);
     this.displayResponseDialog = true;
  }

  showResponseDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage(Ioconstants.COURSE_ASSIGNMENT_RESP_FOLDER, data);
  }

}
