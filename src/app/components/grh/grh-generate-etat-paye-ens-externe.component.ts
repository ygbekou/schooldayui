import { Component, Input, OnInit } from '@angular/core';
import { Constants } from 'app';
import { SchoolYear } from 'app/models/schoolYear';
import { User } from 'app/models/User';
import { EmployeeService } from 'app/services/grh/employee.service';
import { SchoolYearDropdown } from '../dropdowns/dropdown.schoolYear';
import { PaySlip } from 'app/models/grh/paySlip';
import { Periode } from 'app/models/grh/periode';
import { Employee } from 'app/models/grh/employee';

@Component({
  selector: 'app-grh-generate-etat-paye-ens-externe',
  templateUrl: '../../pages/grh/grh-generate-etat-paye-ens-externe.component.html',
  providers: [EmployeeService,SchoolYearDropdown]
})
export class GrhGenerateEtatPayeEnsExterneComponent implements OnInit {
  
  public paySlip: PaySlip = new PaySlip();

  @Input() reportSourceName: string;
  selectedMonth=1
  selectedType=1
  matricule=""
  isLoading: boolean = false;
  
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

     ngOnDestroy() {
      this.error = null;
      this.paySlip = null;
      this.cols = null;
    }

  ngOnInit() {
    this.paySlip.periode = new Periode();
    this.paySlip.employee = new Employee();
    this.isLoading = false;

  }

  // public printEtatHonoraieMensuelTeacher() {
  //   //alert(this.matricule)
  //   this.reportName="etatPayeMensuel";
  //   //this.paySlip.employee = this.employee;
  //   this.printLabel=Constants.GENERATION_ETAT;
  //   if(this.reportSourceName=="etatPayeMensuel"){
  //     if(this.selectedType==2){
  //       this.reportName="etatPayeMensuelEnsInterne"
  //     }
  //   }else if(this.reportSourceName=="etatPayeMensuelBank"){
  //     this.reportName="etatPayeMensuelBank"
  //     if(this.selectedType==2){
  //       this.reportName="etatPayeMensuelEnsInterneBank"
  //     }
  //   }
  //   else if(this.reportSourceName=="etatIndividuelPaieHonoraireEnseignant"){
  //     if(this.selectedType==2){
  //       if(this.matricule!=""){
  //         //alert(this.matricule)
  //         this.reportName="etatIndividuelPaieHonoraireEnseignantInterneUnique"
  //       }
  //       else
  //         this.reportName="etatIndividuelPaieHonoraireEnseignantInterne"
  //     }
  //     else
  //       if(this.matricule!=""){
  //         //alert(this.matricule)
  //         this.reportName="etatIndividuelPaieHonoraireEnseignantUnique"
  //       }
  //       else
  //         this.reportName=this.reportSourceName
  //   }
  //   else{
  //     if(this.selectedType==1)
  //       this.reportName="etatGlobalPaieExterne"
  //     else if(this.selectedType==2)
  //       this.reportName="etatGlobalPaieInterne"
  //     else
  //       this.reportName="etatGlobalPaieTous"

  //   }
    
  //   this.isLoading = false;
  //   this.employeeService.printEtatHonoraieMensuelTeacher({
  //     "yearId":this.schoolYear.id,
  //     "monthId":this.selectedMonth,
  //     "reportName":this.reportName,
  //     "matricule":this.matricule,
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

    if(this.reportSourceName=="etatPayeMensuel"){
       this.paySlip.reportName="etatPayeMensuel"
      if(this.selectedType==2){
        this.paySlip.reportName="etatPayeMensuelEnsInterne"
      }
    }else if(this.reportSourceName=="etatPayeMensuelBank"){
      this.paySlip.reportName="etatPayeMensuelBank"
      if(this.selectedType==2){
        this.paySlip.reportName ="etatPayeMensuelEnsInterneBank"
      }
    }

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
