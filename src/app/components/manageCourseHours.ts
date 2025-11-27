import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { TeacherDropdown } from './dropdowns/dropdown.teacher';
import { MessagesModule, SelectItem } from 'primeng/primeng';
import { Teacher } from 'app/models/teacher';
import { Cico } from 'app/models/cico';
import { UserService } from 'app/services';
import { User } from 'app/models/User';

@Component({ 
  selector: 'app-manage-course-hours',
  templateUrl: '../pages/manageCourseHours.html',
  providers: [TeacherDropdown]
})
export class ManageCourseHours implements OnInit {

    public teacherDropdown: TeacherDropdown;
    theEndDate : Date;
    startHours : number;
    startMinutes : number;
    endHours : number;
    endMinutes : number;
    selectedTeacher : Teacher ;
    dateSendBegin : Date;
    dateSendEnd : Date;

    message : String="";

    msgError : boolean = true;

    aUser: User = new User();
    aUserFirst: User = new User();
    cico: Cico = new Cico();

    cicoBegin: Cico = new Cico();
    cicoEnd: Cico = new Cico();
    
  public hours: SelectItem[];
  public minutes: SelectItem[];

  constructor (private tchDropdown: TeacherDropdown,private userService: UserService) 
  {
    this.teacherDropdown = tchDropdown;
  }
  
  ngOnInit() {

    this.hoursMinutesConfiguration();
    console.log(new Date(),"new date")
  } 


  envoyer(){
    
    if(this.selectedTeacher == null || this.theEndDate == null){

        this.message = "Veuillez renseigner tous les champs obligatoires...";

    }else{
        const year = this.theEndDate.getFullYear();
        const month = this.theEndDate.getMonth(); 
        const day = this.theEndDate.getDate();
        this.msgError = true;

        this.cico.matricule = this.selectedTeacher.matricule;

        if(this.startHours != null && this.startMinutes != null 
            && this.endHours != null && this.endMinutes != null){
                
            this.message = "Soumettez l'heure d'arrivée avant de soumettre ensuite l'heure de départ. Évitez de soumettre les deux heures simultanément.";


            }else if (this.startHours == null && this.startMinutes ==null && this.endHours !=null && this.endMinutes
                !=null
            ){

                this.dateSendEnd = new Date(year, month, day, this.endHours, this.endMinutes, 0);

                if(this.dateSendEnd <= new Date()){

                    this.cicoEnd.matricule = this.selectedTeacher.matricule;
                    this.cicoEnd.ci = this.dateSendEnd;
                    this.cicoEnd.type = 1;
    
                    try {
                        this.userService.cicoWithTeacherTableCheckingManually(this.cicoEnd)
                          .subscribe(result => {

                            if(result.cicoStatus != 100 && result.cicoStatus != 102 && result.cicoStatus != 104){
                              this.aUser = result;
                              console.log("cico user");
                              console.log(this.aUser);
                              this.setMsg(this.aUser);
                            }else if(result.cicoStatus == 100){
                              this.message = "L'heure d'arrivée du professeur dépasse l'heure de départ renseignée, ce qui est anormal !";

                            }else if(result.cicoStatus == 102){
                              this.message = "Il n'y a pas d'heure d'arrivée, vous ne pouvez pas saisir une heure de départ.";
                            }else if(result.cicoStatus == 104){
                              this.message = "L'heure de départ que vous venez de renseigner chevauche un intervalle d'heures déjà pris en compte par le système.";
                            }
                                             
                          })
                      }
                      catch (e) {
                        this.message = "une erreur est survenue dans le processus...";
                      }

                }else{

                     this.message = "l'Instant de départ du prof ne doit pas dépasser l'instant présent ..";
                }
               

            }else if(this.startHours != null && this.startMinutes != null && this.endHours == null && this.endMinutes
                == null){

                this.dateSendBegin = new Date(year, month, day, this.startHours, this.startMinutes, 0);
      
                if(this.dateSendBegin <= new Date()){

                    this.cicoBegin.matricule = this.selectedTeacher.matricule;
                    this.cicoBegin.ci = this.dateSendBegin;
                    this.cicoBegin.type = 0;

                    try {
                        this.userService.cicoWithTeacherTableCheckingManually(this.cicoBegin)
                          .subscribe(result => {

                              if(result.cicoStatus != 101){

                                if(result.cicoStatus != 103){
                                  this.aUser = result;
                                  console.log("cico user");
                                  console.log(this.aUser);
                                  this.setMsg(this.aUser);
                                  this.startHours = null;
                                  this.startMinutes = null;
                                }else{
                                   this.message = "L'heure d'entrée est déjà située dans l'intervalle d'heures que le système a pris en compte.";
                                }
                                
                              }else{
                                 this.msgError = true;
                                    this.message = "Une heure d'entrée est déjà enregistrée, saisissez d'abord son heure de sortie avant de saisir une autre heure d'entrée"
                              }                                                                      
                          })
                      }
                      catch (e) {
                        this.message = "une erreur est survenue dans le processus..."
                      }

                }else{
                    this.message = "l'Instant d'arrivé du prof ne doit pas dépasser l'instant présent .."
                }

            }else{
                 this.message = "Choisissez bien les heures et les minutes .."
            }

    }
  }


  hoursMinutesConfiguration(){
    this.hours = [];
    this.minutes = [];
    for(var i=0; i < 24; i++){
      if(i < 10){
        this.hours.push({label: "0"+i, value: i});
      }else{
        this.hours.push({label: i+"", value: i});
      }
    }
    for(var i=0; i < 60; i++){
      if(i < 10){
        this.minutes.push({label: "0"+i, value: i});
      }else{
        this.minutes.push({label: i+"", value: i});
      }
    }
  }

  clean(){
    this.message = "";
    this.startHours = null;
    this.startMinutes = null;
    this.endHours = null;
    this.endMinutes = null;
    // this.theEndDate = null;
    // this.selectedTeacher = null;
  
  }

  setMsg(aUser: User) {

    if(aUser.message != null && (aUser.message.startsWith("Bienvenue") || aUser.message.startsWith("Interventions")
    || aUser.message.startsWith("Pas de") )){
      this.msgError = false;
    }else{
      this.msgError = true;
    }

    if(aUser.message){
        this.message = aUser.message;
      }

    if (aUser.cicoStatus === 0) {//not found
      
        if(aUser.message){
          this.message = aUser.message;
        }
      } else if (aUser.cicoStatus === 1) {
    
        if(aUser.message){
          this.message = this.getSex(aUser) + ' ' + aUser.name + " : " + aUser.message;
        }else{
          this.message = this.getSex(aUser) + ' ' + aUser.name + ", bienvenue à iPnet !";
        }
        
      }else if (aUser.cicoStatus === 5) {

        if(aUser.message){
          this.message = this.getSex(aUser) + ' ' + aUser.name + " : " + aUser.message;
        }else{
          this.message = this.getSex(aUser) + ' ' + aUser.name + ", aurevoir !";
        }
    }
  }

  getSex(user: User): string {
    if (user.sex === 'M') {
      return 'Monsieur';
    } else if (user.sex === 'I') {
      return '';
    } else {
      return 'Madame';
    }
  }

  
  
  
}
