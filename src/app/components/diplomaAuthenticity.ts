import { Component } from '@angular/core';
import { Degree } from 'app/models/degree';
import { StudentService } from 'app/services';

@Component({
  selector: 'app-diploma-authenticity',
  templateUrl: '../pages/diplomaAuthenticity.html'
  })


export class DiplomaAuthenticity {

    degree : Degree = new Degree();
    mailError : boolean;
    message : String;

    constructor( private studentService : StudentService) {}

    ngOnInit() {
      this.mailError = true;
    }


    verifier(){
        if(this.degree.degreeNumber == null){ 
          this.message = "renseignez le numéro du diplôme !!"
          this.mailError = true;
        }else{  
          this.studentService.checkingDiplomaAuthenticity(this.degree)
            .subscribe(result => {
              this.message = result;
              if(this.message == "Le numéro de diplôme fourni n'est pas reconnu par iPnet Institute of Technology !"){
                this.mailError = true;
              }else{
                this.mailError = false;
              }
            //   console.log(result);         
            })        
    
        }
      
      }

}