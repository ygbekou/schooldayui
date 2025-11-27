import {Component, Input, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {AssignmentResponse} from '../models/assignmentResponse';
import {User} from '../models/User';
import {AssignmentService} from '../services/assignment.service';
import {BaseService} from '../services/base.service';
import {Doc} from '../models/doc';
import {Constants} from '../app.constants';
import {Ioconstants} from '../app.ioconstants';
import {FileUploader} from './fileUploader';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {DataTableModule, DialogModule, InputTextareaModule, SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-admin-assignment-response',
  templateUrl: '../pages/adminAssignmentResponse.html',
  providers: []
})
export class AdminAssignResp implements OnInit {

 // @Input() assignmentResponseId: number;
 // @Input() assignmentId: number;
  assignmentResponseId: number;
  assignmentId: number;
  public error: String = '';
  public assignmentResponse: AssignmentResponse = new AssignmentResponse();
  displayDialog: boolean;
  cols: any[];
  private user: User;
  currentUser: User = JSON.parse(atob(Cookie.get('user')));
  @ViewChild(FileUploader) fileUploader: FileUploader;
  
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
    private baseService: BaseService,
    private changeDetectorRef: ChangeDetectorRef
    ) {
   
  }

  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }

   // this.getAssignmentResponse(this.assignmentResponseId);
    this.cols = [ 
      {field: 'startDate', header: Constants.DATE, type: 'Date'},
      {field: 'dueDate', header: Constants.DATE_ECHEANCE, type: 'Date'},
      {field: 'name', header: Constants.NAME}
    ];
    
    
  }

  public getAssignmentResponse(assignmentResponseId: number) {
    this.assignmentResponse = new AssignmentResponse();
    this.assignmentService.getResponseById(assignmentResponseId)
      .subscribe((data: AssignmentResponse) => {
        this.assignmentResponse = data;
      },
      error => console.log(error),
      () => console.log('Get Assignment response complete'));
  }

  showDialogToAdd() {
      this.assignmentResponse = new AssignmentResponse();
      this.displayDialog = true;
  }

  save() {
    try {
      this.error = '';
      this.assignmentResponse.assignmentId = this.assignmentId;
      this.assignmentService.saveResponse(this.assignmentResponse)
        .subscribe(result => {
          if (result.id > 0) {
            this.assignmentResponse = result;
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

  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage(Ioconstants.COURSE_ASSIGNMENT_RESP_FOLDER, data);
  }
  
  public getAssignmentResponseFiles() {
  
    this.baseService.getFiles(Ioconstants.COURSE_ASSIGNMENT_RESP_FOLDER, 
      this.assignmentResponse.id).subscribe(
      (data: Doc[]) => { this.assignmentResponse.files = data;},
    error => console.log(error),
    () => console.log('Get assignment response files'));
  }
  
  
  deleteDoc(data) {
     this.assignmentResponse.id = data.parentId;
      this.baseService.deleteFile(data, Ioconstants.COURSE_ASSIGNMENT_RESP_FOLDER, data.parentId)
      .subscribe(result => {
        this.getAssignmentResponseFiles();
      });
  }
  
    getAll(){
  
  }
}
