import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PaySlip } from '../../models/grh/paySlip';
import { Periode } from '../../models/grh/periode';
import { Employee } from '../../models/grh/employee';
import { User } from '../../models/User';
import { Report } from '../../models/report';
import {EmployeeService } from '../../services/grh/employee.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-grh-generate-report-honoraire-recapitulatif-teacher-types',
  templateUrl: '../../pages/grh/grhGenerateReportHonoraireRecapitulatifTeacherTypes.html',
  providers: [EmployeeService, Constants]
})

export class GrhGenerateReportHonoraireRecapitulatifTeacherTypes implements OnInit, OnDestroy {

  public paySlip: PaySlip = new PaySlip();
  public selectedPaySlip: PaySlip;
  public employee: Employee;

  teacherTypes : any[];
  teacherType: any;

  public reportName: string;
  public reports: Report[];
  public codeAndReportsName: any;
  public printLabel:string= 'Effectuer la paie';

  public error: String = '';
  public user: User;

  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;

  constructor
    (
    private employeeService: EmployeeService,
    private changeDetectorRef: ChangeDetectorRef
    ) {
  }
  ngOnDestroy() {
    this.error = null;
    this.selectedPaySlip = null;
    this.paySlip = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));

    if (this.user == null) {
      this.user = new User();
    }

    this.paySlip.periode = new Periode();
    this.paySlip.employee = new Employee();

    this.teacherTypes = [
      {code: "Interne", value: "INTERNE"},
      {code: "Externe", value: "EXTERNE"}
    ]
  }

  public initParameters() {
    this.paySlip = new PaySlip();
    this.paySlip.periode = new Periode();
    this.paySlip.employee = new Employee();
    this.teacherType = null;

    this.reportName=null;
    this.printLabel=Constants.GENERER_ETAT;
  }

  public printEtatHonoraireRecapitulatifPeriodTypeTeachers() {
    this.reportName=null;
    this.printLabel=Constants.GENERATION_ETAT;

    this.paySlip.employee.matricule = this.teacherType.value;
    console.log(this.teacherType);
    console.log(this.paySlip);

    this.employeeService.printEtatHonoraireRecapitulatifPeriodTypeTeachers(this.paySlip)
    .subscribe((data: string) => {
      this.reportName = data;
      this.printLabel=Constants.GENERER_ETAT;
    },
    error => console.log(error),
    () => console.log('Print EtatHonoraireRecapitulatifPeriodAllTeachers complete'));
  }

}
