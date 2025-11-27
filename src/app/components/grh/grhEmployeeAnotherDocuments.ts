import {Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {Constants} from '../../app.constants';
import {DataTableModule, DialogModule, InputTextareaModule} from 'primeng/primeng';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/User';
import { Employee } from '../../models/grh/employee';
import { EmployeeDocument } from '../../models/grh/employeeDocument';
import {UIChart} from 'primeng/primeng';
import {FileUploader} from '../fileUploader';
import {EmployeeService} from '../../services/grh/employee.service';

@Component({
  selector: 'app-grh-employee-another-documents',
  templateUrl: '../../pages/grh/grhEmployeeAnotherDocuments.html',
  providers: [EmployeeService]
})
export class GrhEmployeeAnotherDocuments implements OnInit, OnDestroy {
  error: string = '';
  success: string = '';
  cols: any[];
  employeeDocuments: EmployeeDocument[];
  displayDialog: boolean = false;
  //public user: User;
  @Input() user: User;
  public employee: Employee;
  public role: string;
  @ViewChild(FileUploader) fileUploader: FileUploader;
  DOWNLOAD: string = Constants.DOWNLOAD;
  UPLOAD: string = Constants.UPLOAD;
  DELETE: string = Constants.DELETE_LABEL;

  data: any;
  data1: any;
  data2: any;

  constructor (
    private employeeService: EmployeeService,
    private changeDetectorRef: ChangeDetectorRef
  )
  {

  }

  ngOnDestroy() {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(atob(Cookie.get('user')));
    }
    console.log(this.user);

  }

  setEmployee(user: User) {
    this.employeeService.getByUser(user)
      .subscribe((data: Employee) => {

        this.employee = data;

        console.log(this.employee);

        if(this.employee != null) {
            this.getEmployeeDocuments();
        }
      },
        error => console.log(error),
        () => console.log('Get employee complete'));

  }

  getEmployeeDocuments() {
      console.log('get employeeDocuments : ' + this.employee);
      this.employeeService.getEmployeeAnotherDocuments(this.employee.id)
        .subscribe(result => {
          this.employeeDocuments = result;
        });

  }

  showDialog() {
    this.displayDialog = true;
  }

  public setStudent(user: User) {
    this.user = user;
    this.role = "student";
  }

  showDialogToUploadImage(employeeDocument: EmployeeDocument) {
    //employeeDocument.employee = this.employee;
    console.log(employeeDocument);
    employeeDocument.anotherDocument = 0;
    this.fileUploader.showDialogToUploadImage("employeeDocument", employeeDocument);
  }

  deleteDoc(employeeDocument: EmployeeDocument) {
    console.log('delete for employee : ' + employeeDocument);
    this.employeeService.deleteDoc(employeeDocument)
      .subscribe(result => {
        this.getEmployeeDocuments();
      });
  }


  selectData(event) {
    console.log(event);
  }
}
