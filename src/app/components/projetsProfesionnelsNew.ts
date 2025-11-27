import { StudentProjectCategoryView } from './../models/studentProjectCategoryView';
import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Cookie} from "ng2-cookies/ng2-cookies";
import {User} from "../models/User";
import {ActivatedRoute, Router} from "@angular/router";
import {Prospectus} from "./prospectus";
import {StudentProjectPhaseView} from "../models/studentProjectPhaseView";
import {StudentProjectService} from "../services/studentProject.service";
import {StudentProjectStudentView} from "../models/studentProjectStudentView";
import {StudentService, UserService} from "../services";
import {StudentProjectTopicStudentsPhasesView} from "../models/StudentProjectTopicStudentsPhasesView";
import { College } from 'app/models/college';

@Component({
    moduleId: 'module.id',
    selector: 'app-projets-profesionnels-new',
    templateUrl:'../pages/projetsProfesionnelsNew.html',
    providers: [StudentProjectService]
})

export class ProjetsProfesionnelsNew implements OnInit,AfterViewInit {

    
    @ViewChild(Prospectus) prospectus: Prospectus;

    studentProjectCategoryView: StudentProjectCategoryView;
    studentProjectsCategoriesView: StudentProjectCategoryView[];
    studentProjectStudentsView: StudentProjectStudentView[];
    studentsProjectsPhasesView: StudentProjectPhaseView[];
    studentProjectsTopicStudentsPhasesView: StudentProjectTopicStudentsPhasesView[] = [];
    studentProjectTopicStudentPhaseView: StudentProjectTopicStudentsPhasesView;

    codeCycle: string;
    isLoading: boolean;
    currentUserCookie : string;

    error: string;
    user: User;

    colleges : College[];

    projetId : number;

    displayDialog: boolean;
 

    public spc : StudentProjectCategoryView = new StudentProjectCategoryView();
    constructor
    (
        private studentProjectService: StudentProjectService,
        private studentService: StudentService,
        private router: Router,
         private userService: UserService,
         private cdRef: ChangeDetectorRef
    ) {
        

    }

    ngOnInit() {

        this.currentUserCookie = Cookie.get('user');

        if (this.user == null) {

            if(this.currentUserCookie !== null){
     
              this.user = JSON.parse(atob(Cookie.get('user')));
            
            }else{
             this.user = new User();
               this.user.id = 0;     
            }
          
        }

        if(this.user.id > 0){
            this.getAllCollegeWithProjects();
        }else{
            this.router.navigate(["/login"]);
        }

        
  
    }

    ngAfterViewInit() {
        if (this.prospectus) {
          this.prospectus.flyer = 'iPNet_iXP';
          this.cdRef.detectChanges();
        } else {
          console.warn('Le composant Prospectus n’est pas encore disponible.');
        }
      }

    public getAllCollegeWithProjects() {
        this.studentProjectService.getAllCollegeWithNewProjects().subscribe((data: College[]) => {
                this.colleges = data;
            },
            error => console.log(error),
            () => console.log('Get colleges and projects'));
    }


    showDialogToAdd( spc :StudentProjectCategoryView) {
      
        this.spc = new StudentProjectCategoryView();
        this.spc = spc;

        // this.accordionClicked(this.spc, 'LP');
       
        this.displayDialog = true;
      }

      closeDialog() {
        this.displayDialog = false;
      }


     
}
