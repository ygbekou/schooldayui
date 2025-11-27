import { Component, OnInit } from '@angular/core';
import { Constants } from 'app';
import { Employee } from 'app/models/grh/employee';
import { PaySlip } from 'app/models/grh/paySlip';
import { Periode } from 'app/models/grh/periode';
import { SchoolYear } from 'app/models/schoolYear';
import { User } from 'app/models/User';
import { EmployeeService } from 'app/services/grh/employee.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SchoolYearDropdown } from './dropdowns/dropdown.schoolYear';

@Component({
  selector: 'app-grh-generate-report-honoraire-detaille-all-teachers',
  templateUrl: '../pages/grh/grh-generate-report-honoraire-detaille-all-teachers.component.html',
  providers: [EmployeeService,SchoolYearDropdown]
})
export class GrhGenerateReportHonoraireDetailleAllTeachersComponent implements OnInit {
  public paySlip: PaySlip = new PaySlip();
  public paySlips: PaySlip[];
  public selectedPaySlip: PaySlip;
  public employee: Employee;
  selectedMonth=0
  isLoading: boolean = false;
  
  public schoolYearDropdown: SchoolYearDropdown;

  public reportName: string;
  public printLabel:string= 'Générer l\'état';
  public selectedType: number = 0;

  public error: String = '';
  displayDialog: boolean;
  newPaySlip: boolean;
  cols: any[];
  public user: User;

  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  public schoolYear:SchoolYear;
  months=[
    {
      "code":1,
      "value":"JANVIER"
    },
    {
      "code":2,
      "value":"FEVRIER"
    },
    {
      "code":3,
      "value":"MARS"
    },
    {
      "code":4,
      "value":"Avril"
    },
    {
      "code":5,
      "value":"Mai"
    },
    {
      "code":6,
      "value":"Juin"
    },
    {
      "code":7,
      "value":"Juillet"
    },
    {
      "code":8,
      "value":"Aout"
    },
    {
      "code":9,
      "value":"Septembre"
    },
    {
      "code":10,
      "value":"Octobre"
    },
    {
      "code":11,
      "value":"Novembre"
    },
    {
      "code":12,
      "value":"Decembre"
    },
  ]

  constructor(private employeeService: EmployeeService,
    private schYearDropdown: SchoolYearDropdown) { 
      this.schoolYearDropdown = schYearDropdown;
      this.schoolYear=new SchoolYear()
    }

  ngOnDestroy() {
    this.paySlips = null;
    this.error = null;
    this.selectedPaySlip = null;
    this.paySlip = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));

    if (this.user == null) {
      this.user = new User();
    }

    this.paySlip.periode = new Periode();
    this.paySlip.employee = new Employee();
    this.isLoading = false;

  }

  // public printEtatHonoraieMensuelTeacher() {
  //   this.reportName=null;
  //   //this.paySlip.employee = this.employee;
  //   this.printLabel=Constants.GENERATION_ETAT;
  //   this.isLoading = false;
  //   let file = "etatHeuresEffectueesTousEnseignant";
  //   if(this.selectedType == 1){
  //     file = "etatHeuresEffectueesTousEnseignantExterne";
  //   }else if(this.selectedType == 2){
  //     file = "etatHeuresEffectueesTousEnseignantInterne";
  //   }

  //   this.employeeService.printEtatHonoraieMensuelTeacher({
  //     "yearId":this.schoolYear.id,
  //     "monthId":this.selectedMonth,
  //     "reportName":file
  //   })
  //   .subscribe((data: string) => {
  //     this.reportName = data;
  //     this.printLabel=Constants.GENERER_ETAT;
  //     this.isLoading = true;
  //   },
  //   error => console.log(error),
  //   () => console.log('Get print EtatHonoraiePeriodTeacher'));
  // }

  public printEtatHonoraieMensuelTeacher() {
    this.reportName=null;
    this.printLabel=Constants.GENERATION_ETAT;
    this.paySlip.reportName = "etatHeuresEffectueesTousEnseignantExterne";

    this.employeeService.printEtatHonoraieMensuelTeacher(this.paySlip)
    .subscribe((data: string) => {
      this.reportName = data;
      this.printLabel=Constants.GENERER_ETAT;
      this.isLoading = true;
    },
    error => console.log(error),
    () => console.log('Get print EtatHonoraiePeriodTeacher'));
  }

}
