import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Student } from '../models/student';
import { StudentKiosk } from '../models/kiosk/studentKiosk';
import { User } from '../models/User';
import { StudentService } from '../services/student.service';
import { Constants } from '../app.constants';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';

@Component({
  selector: 'app-manage-student-kiosk-card',
  templateUrl: '../pages/manageStudentKioskCard.html',
  providers: []
})
export class ManageStudentKioskCard implements OnInit {

  public error: String = '';
  public success: String = '';
  public reportName: string;
  ACTIF: string = Constants.ACTIF;
  INACTIF: string = Constants.INACTIF;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;

  PRINT_CARD: string = Constants.PRINT_CARD;
  @Input() user: User;
  public student: Student;

  public studentKiosk: StudentKiosk;
  public studentKioskGetting: boolean = false;
  public generateLabel: string;

  constructor ( private studentService: StudentService,
  private changeDetectorRef: ChangeDetectorRef)
  {
    this.student = new Student();
    this.student.user = new User();

    this.studentKiosk = new StudentKiosk();
  }

  ngOnInit() {
    this.generateLabel = 'Désactivation + Génération d\'un nouveau numéro';
    this.studentKioskGetting = false;
  }

  setStudent(user: User) {

     this.studentKioskGetting = true;

     this.studentService.getByUser(user)
      .subscribe((data: Student) => {

        this.student = data
        console.log(this.student);

        this.student.user = user;

        if(this.student.id > 0) {
          this.getActiveStudentKiosk();
        }

      },
      error => console.log(error),
      () => console.log('Get active studentKiosk complete'));

  }

  public getActiveStudentKiosk() {
    this.error = '';
    this.success = '';
    try {
        this.studentService.getActiveStudentKiosk(this.student)
        .subscribe(result => {
          if (result) {
            this.studentKiosk = result;
            console.log(this.studentKiosk);
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  public desactivateAndGenerateNewStudentKioskCardNumber() {
    try {
        this.generateLabel = 'En cours...';
        this.error = '';
        this.success = '';
        this.studentService.desactivateAndGenerateNewStudentKioskCardNumber(this.student)
        .subscribe(result => {
          if (result.id > 0) {
            this.studentKiosk = result;
            this.success = 'Désactivation + génération du nouveau numéro effectuées avec succès !';
          }
          else {
            this.error = Constants.saveFailed;
          }

        })
    }
    catch (e) {
      console.log(e);
    }
    this.generateLabel = 'Désactivation + Génération d\'un nouveau numéro';
  }

  public printCard() {
      this.reportName=null;
    this.studentService.printCard(this.student.matricule).subscribe((data: string) => { this.reportName = data; },
      error => console.log(error),
      () => console.log('Get print card'));
  }
}
