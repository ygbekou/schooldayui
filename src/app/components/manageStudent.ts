import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Student } from '../models/student';
import { User } from '../models/User';
import { StudentService } from '../services/student.service';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({ 
  selector: 'app-manage-student',
  templateUrl: '../pages/manageStudent.html',
  providers: []
})
export class ManageStudent implements OnInit{

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

  bulletinPdfName : string;
  degreePdfName : string;
  currentUser: User = JSON.parse(atob(Cookie.get("user")));

  res : string [];


  constructor ( private studentService: StudentService,
  private changeDetectorRef: ChangeDetectorRef) 
  {
    this.student = new Student();
    this.student.user = new User();
  }
  
  ngOnInit() {
   
  } 

  setStudent(user: User) {
     this.studentService.getByUser(user)
      .subscribe((data: Student) => {
        
        this.student = data
        if (this.student && this.student !== undefined && this.student.registrationDate !== null) {
          this.student.registrationDate = new Date(this.student.registrationDate);
          if(this.student.abandonmentDate !== null){
            this.student.abandonmentDate = new Date(this.student.abandonmentDate);
          }
        }
        this.student.user = user;
      },
      error => console.log(error),
      () => console.log('Get student complete'));
     
  }
  
  save() {
    console.log(this.student);
    try {
        this.error = '';
        this.success = '';
        this.studentService.save(this.student)
        .subscribe(result => {
          if (result.id > 0) {            
            this.student = result;
            this.student.registrationDate = new Date(this.student.registrationDate);
            this.student.abandonmentDate = new Date(this.student.abandonmentDate);
            this.afficherSucces(Constants.saveSuccess);
          }
          else {
            this.error = Constants.saveFailed;
            this.afficherErreur(Constants.saveFailed);
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
          this.studentService.delete(this.student).subscribe(result => {
          if (result) { 
             this.afficherSucces(Constants.deleteSuccess);
          }
          else {
             this.afficherErreur(Constants.deleteFailed);
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }
 
    public printCard() {
      this.reportName=null;
      this.PRINT_CARD = 'Impression en cours...';
      this.studentService.printCard(this.student.matricule).subscribe((data: string) => { 
        this.reportName = data; 
      },
      error => console.log(error),
      () => console.log('Get print card'));
      this.PRINT_CARD = Constants.PRINT_CARD;
  }


  getLastStudentBulletinAndDegree(){
      this.studentService.getLastStudentBulletinAndDegree(this.student)
        .subscribe(result => {
          this.res = result;
          this.degreePdfName = result[0];
          this.bulletinPdfName = result[1];
      },
      error => console.log(error),
      ()=>{}
    
    )
  }


    afficherErreur(message: string) {
    this.error = message;

    setTimeout(() => {
      this.error = null;
    }, 3000); 
  }

  afficherSucces(message: string) {
    this.success = message;

    setTimeout(() => {
      this.success = null;
    }, 3000); 
  }
}
