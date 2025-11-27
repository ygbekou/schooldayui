import { StudentProjectCategoryView } from '../models/studentProjectCategoryView';
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
import { StudentProjectCategory } from 'app/models/studentProjectCategory';

@Component({
    moduleId: 'module.id',
    selector: 'app-projets-marketing-dig',
    templateUrl:'../pages/projetsProMarketingDigital.html',
    providers: [StudentProjectService]
})

export class ProjetsProMarketingDigital implements OnInit, AfterViewInit{

    //user: User = new User();
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

    themes : StudentProjectCategory[];

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
            this.getMarketingDigitalProject();
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

    public getMarketingDigitalProject() {
        this.studentProjectService.getMarketingDigitalProject().subscribe((data: StudentProjectCategory[]) => {
                this.themes = data;
            },
            error => console.log(error),
            () => console.log('Get themes and projects'));
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
