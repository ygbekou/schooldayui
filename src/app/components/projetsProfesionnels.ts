import { StudentProjectCategoryView } from './../models/studentProjectCategoryView';
import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Cookie} from "ng2-cookies/ng2-cookies";
import {User} from "../models/User";
import {ActivatedRoute, Router} from "@angular/router";
import {Prospectus} from "./prospectus";
import {StudentProjectPhaseView} from "../models/studentProjectPhaseView";
import {StudentProjectService} from "../services/studentProject.service";
import {StudentProjectStudentView} from "../models/studentProjectStudentView";
import {StudentService} from "../services";
import {StudentProjectTopicStudentsPhasesView} from "../models/StudentProjectTopicStudentsPhasesView";
import { College } from 'app/models/college';

@Component({
    moduleId: 'module.id',
    selector: 'app-projets-profesionnels',
    templateUrl:'../pages/projetsProfesionnels.html',
    providers: [StudentProjectService]
})

export class ProjetsProfesionnels implements OnInit {

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

    labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    data1 = [65, 59, 80, 81, 56, 55, 40];

    data: any;

    myWidth: number = 0;
    myWidthIsKnown: boolean = false;
    //myWidthLabel = "width : " + 10 + "px;";
    //myWidthLabel = "width : " + this.myWidth + "%;";
    myWidthLabel = {'width': '30%'};

    colleges : College[];

    projetId : number;

    displayDialog: boolean;

    public spc : StudentProjectCategoryView = new StudentProjectCategoryView();

    activeTab: string = 'LP'; 


    constructor
    (
        private studentProjectService: StudentProjectService,
        private studentService: StudentService,
        private router: Router
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
        // this.prospectus.flyer = 'LES_PILIERS_DE_NOTRE_SYSTEME_D_ENSEIGNEMENT';

        // console.log(this.user);

        this.getProjectTopicsByCategory();
        this.getAllCollegeWithProjects();

        this.prospectus.flyer = 'iPNet_iXP';
    }

    public getProjectTopicsByCategory() {
        console.log("Project topic by category");
        //this.studentsProjectsPhases = null;
        //this.studentProject = this.studentProjectCollege.studentProject;
        //console.log(this.studentProject);
        this.studentProjectService.getProjectTopicsByCategory().subscribe((data: StudentProjectCategoryView[]) => {
                this.studentProjectsCategoriesView = data;
                //console.log(this.studentProjectsCategoriesView);
            },
            error => console.log(error),
            () => console.log('Get students projects colleges phases'));
    }


    public getAllCollegeWithProjects() {
        this.studentProjectService.getAllCollegeWithProjects().subscribe((data: College[]) => {
                this.colleges = data;

                // this.studentProjectsCategoriesView = this.colleges[0].projects;

                // console.log(this.colleges,"****************")
            },
            error => console.log(error),
            () => console.log('Get colleges and projects'));
    }

    public accordionClicked(studentProjectCategoryView: StudentProjectCategoryView, code: string)
    {
        this.myWidthIsKnown = false;

        //console.log(studentProjectsTopicStudentsPhasesView);
        this.studentProjectCategoryView = studentProjectCategoryView;
        this.activeTab = code;

        //this.getStudentsProject();

        //this.getProjectCollegePhases();

        this.codeCycle = code;

        //this.getProjectCollegeAllStudentsAndPhases();
        this.getProjectCollegeAllStudentsByProjectIdAndCodeCycle();
    }

    public getStudentsProject() {
        console.log("Students project");
        //console.log(this.studentProjectCategoryView);
        this.studentProjectStudentsView = null;
        this.studentProjectService.getStudentsProject(this.studentProjectCategoryView).subscribe((data: StudentProjectStudentView[]) => {
                this.studentProjectStudentsView = data;
                //console.log(this.studentProjectStudentsView);
            },
            error => console.log(error),
            () => console.log('Get students project'));
    }

    public getProjectCollegePhases() {
        console.log("College phases by project Id");
        this.studentsProjectsPhasesView = null;
        //this.studentProject = this.studentProjectCollege.studentProject;
        //console.log(this.studentProject);
        this.studentProjectService.getProjectCollegePhasesByTopicId(this.studentProjectCategoryView.projectId)
            .subscribe((data: StudentProjectPhaseView[]) => {
                    this.studentsProjectsPhasesView = data;
                    // console.log(this.studentsProjectsPhasesView);

                    this.calculTotalPercentageFinished();
                },
                error => console.log(error),
                () => console.log('Get students projects colleges phases by topic Id'));
    }

    public calculTotalPercentageFinished() {
        this.myWidth = 0;

        for (let i=0; i<this.studentsProjectsPhasesView.length; i++)
        {
            if (this.studentsProjectsPhasesView[i].studentProjectCollegePhaseStatus)
            {
                this.myWidth += this.studentsProjectsPhasesView[i].percentage;
            }
        }

        //this.myWidthLabel = "width : " + this.myWidth + "px;";

        this.myWidthIsKnown = true;
    }

    public getProjectCollegeAllStudentsAndPhases() {
        console.log("Get All project College Students and Phases");
        //this.studentProjectTopicStudentPhaseView.projectPhases;
        this.isLoading = true;
        this.studentProjectsTopicStudentsPhasesView = [];
        this.studentProjectService.getProjectCollegeAllStudentsAndPhases(this.studentProjectCategoryView).subscribe((data: StudentProjectTopicStudentsPhasesView[]) => {
                this.studentProjectsTopicStudentsPhasesView = data;
                console.log(this.studentProjectsTopicStudentsPhasesView);
                //console.log(this.studentProjectsTopicStudentsPhasesView[0].projectPhases);
                this.isLoading = false;
            },
            error => console.log(error),
            () => console.log('Get All project College Students and Phases finished'));
    }

    public getProjectCollegeAllStudentsByProjectIdAndCodeCycle() {
        console.log("Get All project College Students and Phases");
        this.isLoading = true;
        this.studentProjectsTopicStudentsPhasesView = [];
        this.studentProjectService.getProjectCollegeAllStudentsByProjectIdAndCodeCycle(this.studentProjectCategoryView.projectId, this.codeCycle).subscribe((data: StudentProjectTopicStudentsPhasesView[]) => {
                this.studentProjectsTopicStudentsPhasesView = data;
                console.log(this.studentProjectsTopicStudentsPhasesView);
                this.isLoading = false;
            },
            error => console.log(error),
            () => console.log('Get All project College Students and Phases finished'));
    }


    onDownloadClik(projectDescriptionDocument: string)
    {
        this.error = null;

        if (this.user)
        {
            /*
            //console.log(this.user)
            if (this.user.role == 1) //Si un membre de l'administration
            {
                window.open("assets/docs/Projets/"+projectDescriptionDocument, "_blank");
            }
            else if (this.user.role == 2 || this.user.role == 4) //Si c'est un enseignant ou un parent
            {
                this.error = "Vous ne pouvez pas télécharger la description du projet !";
            }
            else if (this.user.role==3) //Si c'est un étudiant
            {
                this.studentService.getByUser(this.user)
                    .subscribe(resultat => {
                        //console.log("résultat " + this.user.id +  " " + resultat);
                        //console.log(resultat);
                        if (resultat.id > 0) {
                            window.open("assets/docs/Projets/"+projectDescriptionDocument, "_blank");
                        }
                        else if (resultat.id == 0)
                        {
                            this.error = "Vous ne pouvez pas télécharger la description du projet !";
                        }
                        else
                        {
                            // console.log(resultat);
                        }

                    });
            }
            */

            // Si l'utilisateur a un compte actif
            if (this.user.role > 0) {
                window.open("assets/docs/Projets/"+projectDescriptionDocument, "_blank");
            }
            else
            {
                this.error = "Vous ne pouvez pas télécharger la description du projet !";
            }



        }
        else
        {
            this.router.navigate(["/login"]);
        }

    }

    
    public test1() {
        console.log("Test 1");
    }
    
    public test5() {
        console.log("Test 5");
    }


    showDialogToAdd( spc :StudentProjectCategoryView) {
        this.activeTab = 'LP';
        this.spc = new StudentProjectCategoryView();
        this.spc = spc;

        this.accordionClicked(this.spc, 'LP');
       
        this.displayDialog = true;
      }

      closeDialog() {
        this.displayDialog = false;
      }


     

}
