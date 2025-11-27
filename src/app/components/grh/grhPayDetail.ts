import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Employee } from '../../models/grh/employee';
import { User } from '../../models/User';
import { PayDetail } from '../../models/grh/payDetail';
import { EmployeeService } from '../../services/grh/employee.service';
import { PayDetailService } from '../../services/grh/payDetail.service';
import { Constants } from '../../app.constants';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-pay-detail',
  templateUrl: '../../pages/grh/grhPayDetail.html',
  providers: [EmployeeService, PayDetailService]
})
export class GrhPayDetail implements OnInit {

  public error: String = '';
  public success: String = '';
  @Input() user: User;
  public employee: Employee;
  public payDetail : PayDetail;
  public listePayDetail: PayDetail[];
  public selectedPayDetail: PayDetail;
  cols: any[];
  displayDialog: boolean;
  newPayDetail: boolean;

  SAVE_LABEL: string = Constants.SAVE_LABEL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  CONTRACT_TYPE: string = Constants.CONTRACT_TYPE;

  constructor(private employeeService: EmployeeService,
    private payDetailService: PayDetailService,
    private changeDetectorRef: ChangeDetectorRef) {
    this.employee = new Employee();
    this.employee.user = new User();
    this.payDetail = new PayDetail();
  }

  ngOnInit() {
    console.log(this.employee);

    this.cols = [
      { field: 'baseSalary', header: 'Salaire de base', sortable: 'false', filter: 'false', style:  {'width':'20%'}  },
      { field: 'extraPay', header: 'Sursalaire', sortable: 'false', filter: 'false', style:  {'width':'20%'}  },
      { field: 'nbPersonInCharge', header: 'Nb. de pers. en charge', sortable: 'false', filter: 'false',  style:  {'width':'20%'}  },
      { field: 'amountOfSupport', header: 'Coût par personne', sortable: 'false', filter: 'false',  style:  {'width':'20%'}  }
    ];
  }

  showDialogToAdd() {
    //if (this.user != null && this.user.role == 10) {
      this.newPayDetail = true;
      this.payDetail = new PayDetail();
      this.displayDialog = true;
    //}
  }

  public getAll(): void {
    this.listePayDetail = [];
    this.payDetailService.getAll()
      .subscribe((data: PayDetail[]) => this.listePayDetail = data,
      error => console.log(error),
      () => console.log('Get all PayDetail complete'));
  }

  setEmployee(user: User) {
    this.employeeService.getByUser(user)
      .subscribe((data: Employee) => {

        this.employee = data;
        //this.employee.user = user;

        console.log(this.employee);

        if(this.employee != null) {
            //this.getPayDetailByEmployee();
            this.getListPayDetailByEmployee();
        }
      },
        error => console.log(error),
        () => console.log('Get employee complete'));

  }

  public getPayDetailByEmployee() {
    this.payDetailService.getByEmployee(this.employee)
      .subscribe((data: PayDetail) => {

        this.payDetail = data

      },
        error => console.log(error),
        () => console.log('Get payDetail complete'));
  }

  public getListPayDetailByEmployee() {
    this.payDetailService.getListByEmployee(this.employee)
      .subscribe((data: PayDetail[]) => {

        this.listePayDetail = data

      },
        error => console.log(error),
        () => console.log('Get listPayDetail complete'));
  }

  save() {
    try {
      this.error = '';
      this.success = '';

      /* Si on ne convertit pas le status en number, le backend n'est pas appelé */
      if(this.payDetail.status) {
        this.payDetail.status = 1;
      }
      else {
        this.payDetail.status = 0;
      }

      this.payDetail.employee = this.employee;

      this.payDetailService.save(this.payDetail)
        .subscribe(result => {
          if (result.id > 0 && result.status != 2) {
            this.payDetail = result;

            this.success = Constants.saveSuccess;

            //this.putInTable();
            this.getListPayDetailByEmployee();
            this.resetData();
          }
          else if(result.id > 0 && result.status == 2) {
            this.error = 'Vous ne pouvez plus modifier les détails. Ils sont déjà utilisez pour une paie !';
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

  delete() {
    try {
      this.error = '';
      this.success = '';
      this.payDetailService.delete(this.payDetail).subscribe(result => {
        if (result) {
          this.success = Constants.deleteSuccess;
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

  putInTable() {
    if (this.newPayDetail)
      this.listePayDetail.push(this.payDetail);
    else
      this.listePayDetail[this.findSelectedIndex()] = this.payDetail;

    var onTheFly: PayDetail[] = [];
    onTheFly.push(...this.listePayDetail);
    this.listePayDetail = onTheFly;

    this.resetData();
  }

  resetData() {
    this.payDetail = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newPayDetail = false;
    this.payDetail = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: PayDetail): PayDetail {
    let aPayDetail = new PayDetail();
    for (let prop in e) {
      aPayDetail[prop] = e[prop];
    }
    return aPayDetail;
  }

  findSelectedIndex(): number {
    return this.listePayDetail.indexOf(this.selectedPayDetail);
  }

}
