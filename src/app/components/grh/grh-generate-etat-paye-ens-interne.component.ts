import { Component, Input, OnInit } from '@angular/core';
import { Constants } from 'app';
import { SchoolYear } from 'app/models/schoolYear';
import { User } from 'app/models/User';
import { EmployeeService } from 'app/services/grh/employee.service';
import { SchoolYearDropdown } from '../dropdowns/dropdown.schoolYear';

@Component({
  selector: 'app-grh-generate-etat-paye-ens-interne',
  templateUrl: '../../pages/grh/grh-generate-etat-paye-ens-interne.component.html',
  providers: [EmployeeService,SchoolYearDropdown]
})
export class GrhGenerateEtatPayeEnsInterneComponent implements OnInit {
  selectedMonth=0
  @Input() reportSourceName: string;

  
  public schoolYearDropdown: SchoolYearDropdown;
  public reportName: string;
  public printLabel:string= 'Générer l\'état';

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

  ngOnInit() {
  }

  // public printEtatHonoraieMensuelTeacher() {
  //   this.reportName=null;
  //   //this.paySlip.employee = this.employee;
  //   this.printLabel=Constants.GENERATION_ETAT;

  //   this.employeeService.printEtatHonoraieMensuelTeacher({
  //     "yearId":this.schoolYear.id,
  //     "monthId":this.selectedMonth,
  //     "reportName":this.reportSourceName
  //   })
  //   .subscribe((data: string) => {
  //     this.reportName = data;
  //     this.printLabel=Constants.GENERER_ETAT;
  //   },
  //   error => console.log(error),
  //   () => console.log('Get print EtatHonoraiePeriodTeacher'));
  // }

  public printEtatHonoraieMensuelTeacher (){}

}
