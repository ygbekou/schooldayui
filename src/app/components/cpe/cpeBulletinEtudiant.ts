import { Component, Input, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from '../../models/User';
import { Constants } from '../../app.constants';
import { CycleDropdown } from '../dropdowns/dropdown.cycle';
import { Cycle } from 'app/models/cycle';
import { TermDropdown } from '../dropdowns/dropdown.term';
import { Term } from 'app/models/term';
import { Student } from 'app/models/student';
import { ReportService, StudentService } from 'app/services';
import { ReportView } from 'app/models/reportView';
import { Parameter } from 'app/models/parameter';

@Component({
  selector: 'app-cpe-bulletin-etudiant',
  templateUrl: '../../pages/cpe/cpeBulletinEtudiant.html',
  providers : [CycleDropdown,TermDropdown,ReportService]
})
export class CpeBulletinEtudiant implements OnInit {

    public cycleDropdown : CycleDropdown;
    public termDropdown: TermDropdown;
    termSelected : number;
    student : Student;
    report : ReportView = new ReportView();
    p1 : Parameter = new Parameter();
    p2 : Parameter = new Parameter();
    p3 : Parameter = new Parameter();

    parameters : Parameter[];
    reportName : string;

  @Input() user: User;
  currentUser: User = JSON.parse(atob(Cookie.get('user')));

   cycleSelected : Cycle;
  
  CONTACT: string = Constants.CONTACT;
  PERSONAL: string = Constants.PERSONAL;  

  terms = [
    { label: 'Trimestre 1', value: 1 },
    { label: 'Trimestre 2', value: 2 },
    { label: 'Trimestre 3', value: 3 },
    { label: 'Trimestre 4', value: 4 },
    { label: 'Trimestre 5', value: 5 },
    { label: 'Trimestre 6', value: 6 }
  ];
  
  
  constructor(private cyclDropdown : CycleDropdown, private tmDropdown : TermDropdown,
    private studentService : StudentService, private reportService : ReportService
  ) {
      this.cycleDropdown = cyclDropdown;
      this.termDropdown = tmDropdown;
  }
  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }
  }

  setStudent(user: User) {
    this.studentService.getByUser(user)
     .subscribe((data: Student) => {
       this.student = data
       this.student.user = user;
     },
     error => console.log(error),
     () => console.log('get student by user'));
 }

 run() {

  //  this.report = new ReportView();

    this.parameters = [];

    if (!this.student || !this.cycleSelected || !this.termSelected) {
      console.error("Données manquantes : student, cycleSelected ou termSelected sont undefined.");
      return;
    }
  
    this.p1.name = "matricule";
    this.p2.name = "termIdQS";
    this.p3.name = "cycleId";
   
  
    this.p1.value = this.student.matricule;
    this.p1.id = 1;
    this.p2.value = String(this.termSelected);
    this.p2.id = 11;
    this.p3.value = String(this.cycleSelected.id);
    this.p3.id = 19;
  
    this.parameters.push(this.p1);
    this.parameters.push(this.p2);
    this.parameters.push(this.p3);

    this.report.reportId = 62;
    this.report.parameters = this.parameters;
  
    try {

        this.reportService.runReport(this.report)
          .subscribe(result => {
            this.reportName = result.reportName;
          
          })
      }
      catch (e) {
        console.log(e);    
      }
  }
  
}
