import {Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {Constants} from '../../app.constants';
import {DataTableModule, DialogModule, InputTextareaModule} from 'primeng/primeng';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/User';
import { Employee } from '../../models/grh/employee';
import { EmployeeDocument } from '../../models/grh/employeeDocument';
import {GetConge} from '../../models/grh/getConge';
import {UIChart} from 'primeng/primeng';
import {FileUploader} from '../fileUploader';
import {EmployeeService} from '../../services/grh/employee.service';
import {CongeService} from '../../services/grh/conge.service';
import {CongeHistory} from '../../models/grh/congeHistory';

@Component({
  selector: 'app-admin-get-conge',
  templateUrl: '../../pages/grh/adminGetConge.html',
  providers: [EmployeeService, CongeService]
})
export class AdminGetConge implements OnInit, OnDestroy {
  error: string = '';
  success: string = '';
  cols: any[];
  getConges: GetConge[];
  congeHistories: CongeHistory[];
  getConge: GetConge = new GetConge();
  selectedConge: GetConge;
  newConge: boolean;
  congeHistory: CongeHistory = new CongeHistory();
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
  SAVE_LABEL: string = Constants.SAVE_LABEL; 

  data: any;
  data1: any;
  data2: any;

  constructor (
    private employeeService: EmployeeService,
    private changeDetectorRef: ChangeDetectorRef,
    private congeService: CongeService
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
     this.cols = [
        { field: 'numberOfDay', header: 'Nbre Jour Dem.', sortable: 'true', filter: 'true', style:  {'width':'20%'}  },
        { field: 'numberOfDayEffective', header: 'Nbre Jour Joui', type: 'String',sortable: 'false', filter: 'true',  style:  {'width':'20%'}  },
        { field: 'startDate', header: 'Date de début', type: 'Date',sortable: 'false', filter: 'true',  style:  {'width':'25%'}  },
        { field: 'endDate', header: 'Date de fin', type: 'Date',sortable: 'false', filter: 'true',  style:  {'width':'25%'}  }
      ];
  }

  setEmployee(user: User) {
    this.employeeService.getByUser(user)
      .subscribe((data: Employee) => {

        this.employee = data;

        console.log(this.employee);

        if(this.employee != null) {
            this.getEmployeeAllConge();
            
        }
      },
        error => console.log(error),
        () => console.log('Get employee complete'));

  }

  getEmployeeAllConge() {
      console.log('get employee conge : ' + this.employee);
      this.congeService.getAllEmployeeConge(this.employee.id)
        .subscribe(result => {
          this.getConges = result;
         
        });

  }


  saveEmployeeGetConge() {
    this.getConge.employee = this.employee;
    console.log(this.getConge.startDate);
    this.congeService.saveGetConge(this.getConge)
    .subscribe(result => {
      if(result.id>0){
        this.getConge = result;
        this.getConge.startDate = new Date(this.getConge.startDate);
          this.getConge.endDate = new Date(this.getConge.endDate);
          this.displayDialog = false;
         this.getEmployeeAllConge();
      } else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
      
    })
  }
  // id: number;
  //   numberOfDay: number;
  //   startDate: Date;
  //   endDate: Date;
  //   employee: Employee;
  //   statuDescription: string;
  //   status: number;
  //   commentaire: string;
  //   empId: number;
  getCongeRow(evt){
    
    this.congeService.getCongeById(evt.data.id).subscribe(
      result =>{
        if(result.id >0){
          this.getConge = result;
          this.getConge.startDate = new Date(this.getConge.startDate);
          this.getConge.endDate = new Date(this.getConge.endDate);
          console.log(this.getConge);
        }else{
          //
        }
      }
    )
    // this.getConge.numberOfDay = evt.data.numberOfDay;
    //  this.getConge.startDate = new Date(evt.data.startDate);
    //  this.getConge.endDate = new Date(evt.data.endDate);
    //  this.getConge.statuDescription = evt.data.statuDescription;
    //  this.getConge.status = evt.data.status;
    // this.getConge.commentaire = evt.data.commentaire;
    // this.getConge.empId = evt.data.empId;
  }
  accepte(){
    console.log(this.getConge);
    this.congeService.accepte(this.getConge).subscribe(
      result => {
        this.getConge = result;
        this.getConge.startDate = new Date(this.getConge.startDate);
        this.getConge.endDate = new Date(this.getConge.endDate);
        this.getEmployeeAllConge();

      }
    )
  }


   refuse(){
    console.log(this.getConge);
    this.congeService.refuse(this.getConge).subscribe(
      result => {
        this.getConge = result;
        this.getConge.startDate = new Date(this.getConge.startDate);
        this.getConge.endDate = new Date(this.getConge.endDate);
        this.getEmployeeAllConge();

      }
    )
  }
    close(){
    console.log(this.getConge);
    this.congeService.close(this.getConge).subscribe(
      result => {
        this.getConge = result;
        this.getConge.startDate = new Date(this.getConge.startDate);
        this.getConge.endDate = new Date(this.getConge.endDate);
        this.getEmployeeAllConge();

      }
    )
  }
  showDialogToAdd() {
    if (this.employee != null ) {
      this.newConge = true;
      this.getConge = new GetConge();
      this.displayDialog = true;
    }
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

  // deleteDoc(employeeDocument: EmployeeDocument) {
  //   console.log('delete for employee : ' + employeeDocument);
  //   this.employeeService.deleteDoc(employeeDocument)
  //     .subscribe(result => {
  //       this.getEmployeeDocuments();
  //     });
  // }

  putInTable() {
    if (this.newConge)
       this.getConges.push(this.getConge);
    else
      this.getConges[this.findSelectedIndex()] = this.getConge;

    var onTheFly: GetConge[] = [];
    onTheFly.push(...this.getConges);
    this.getConges = onTheFly;

    this.resetData();
  }
   removeFromTable() {
    this.getConges.splice(this.findSelectedIndex(), 1);
    var onTheFly: GetConge[] = [];
    onTheFly.push(...this.getConges);
    this.getConges = onTheFly;
    this.resetData();
  }

  resetData() {
    this.getConge = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }
 onRowSelect(evt) {
    this.newConge = false;
    this.getConge = this.clone(evt.data);
    this.displayDialog = true;
    if(this.getConge.startDate != null){
       this.getConge.startDate = new Date( this.getConge.startDate);
    }
     if(this.getConge.endDate != null){
      this.getConge.endDate = new Date(this.getConge.endDate);
    }
  }
    clone(e: GetConge): GetConge {
    let aGetConge = new GetConge();
    for (let prop in e) {
      aGetConge[prop] = e[prop];
    }
    return aGetConge;
  }

   findSelectedIndex(): number {
    return this.getConges.indexOf(this.selectedConge);
  }

  selectData(event) {
    console.log(event);
  }
}
