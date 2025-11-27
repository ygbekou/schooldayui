import {Component, LOCALE_ID, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {College} from '../models/college';
import {CourseView} from '../models/courseView';
import {CollegeService} from '../services/college.service';
import {Constants} from '../app.constants';
import {Prospectus} from './prospectus';
import {DataTableModule, DialogModule, InputTextareaModule} from 'primeng/primeng';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import { Cycle } from 'app/models/cycle';

@Component({
    selector: 'app-college-single',
    templateUrl: '../pages/collegeSingle.html',
    providers: [{provide: LOCALE_ID, useValue: "fr-FR"}, CollegeService]
})
export class CollegeSingle implements OnInit, OnDestroy {

    college: College = new College();
    public colleges: College[];
    currentUserCookie : string;
    public courses: CourseView[];
    collegeId: string;
    public id: string;
    public selectedCourse: CourseView = new CourseView();
    @ViewChild(Prospectus) prospectus: Prospectus;

    user: User;
    loginForm: boolean = false;
    error = '';

    display: boolean = false;

    constructor
    (
        private collegeService: CollegeService,
        private changeDetectorRef: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) {

    }

    ngOnDestroy() {
        this.colleges = null;
        this.courses = null;
        this.college = null;
        this.collegeId = null;
        this.id = null;
    }

    ngOnInit() {

        this.college.cycle = new Cycle();

        this.currentUserCookie = Cookie.get('user');

        if (this.user == null) {

            if(this.currentUserCookie !== null){
     
              this.user = JSON.parse(atob(Cookie.get('user')));
            
            }else{
             this.user = new User();
               this.user.id = 0;     
            }
          
        }

        this.route
            .queryParams
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                this.collegeId = params['id'];
                this.id = this.collegeId;
                this.prospectus.flyer = 'flyer_' + this.collegeId;
                this.collegeService.getCollege(this.collegeId)
                    .subscribe(result => {
                        if (result.id > 0) {
                            this.college = result;
                        }
                    });

                this.collegeService.getCourses(this.collegeId)
                    .subscribe(result => {
                        this.courses = result;
                        console.log(this.courses);
                    });
                console.log('Query param page: ', this.collegeId);
            });

        
        this.colleges = [];
        this.collegeService.getAllColleges()
            .subscribe((data: College[]) =>{
                this.colleges = data;
                // console.log(this.colleges,".........")
            },
                error => console.log(error),
                () => console.log('Get all Colleges complete'));
    }

    onDownloadClik()
    {
        this.error = null;

        if (this.user)
        {

            this.collegeService.checkStudentCollege(this.user.id, this.college.id)
                .subscribe(resultat => {
                    console.log("résultat " + this.user.id + " " + this.college.id + " " + resultat);
                    //if (resultat == 1) {
                        //this.router.navigate([]).then(result => {  window.open("assets/docs/syllabus/"+this.selectedCourse.syllabusName, '_blank'); });
                        window.open("assets/docs/syllabus/"+this.selectedCourse.syllabusName, "_blank");
                    /*}
                    else if (resultat == 0)
                    {
                        this.error = "Vous ne pouvez pas télécharger le syllabus de ce cours. Vous n'êtes inscrits dans cette filière !";
                    }
                    else
                    {
                        console.log(resultat);
                    }*/

                });

            //this.router.navigate([]).then(result => {  window.open("assets/docs/syllabus/IPNET SYLLABUS IT 240.pdf", '_blank'); });
            //this.router.navigate([]).then(result => {  window.open("assets/docs/syllabus/"+this.selectedCourse.syllabusName, '_blank'); });
        }
        else
        {
            //this.router.navigate("/login");
            this.router.navigate(["/login"]);
        }

    }

    public login() {
        try {
            /*if (this.button == 'password') {
                this.sendPassword();
            } else {*/
            this.userService.login(this.user)
                .subscribe(result => {
                    if (result == true) {

                        //this.globalEventsManager.showNavBar.emit(this.user);

                        /*if (this.nextRoute != null) {
                            this.router.navigate([this.nextRoute]);
                        }
                        else {*/
                        this.user = JSON.parse(atob(Cookie.get('user')));
                        /*if (this.user.role == 3) {//student
                            this.router.navigate(["/student/studentMain"]);
                        } else if (this.user.role == 2) {//teacher
                            this.router.navigate(["/teacher/teacherMain"]);
                        } else if (this.user.role == 1 || this.user.role == 5) {//admin+ secretaire
                            this.router.navigate(["/admin/adminDemand"]);
                        } else if (this.user.role === 4) {//parent
                            this.router.navigate(["/parent/parentMain"]);
                        } else {
                            this.router.navigate(["/"]);

                        }*/
                        //}

                    }
                    else {
                        this.error = Constants.INVALID_USER_PASS;
                    }
                })
            //}
        }
        catch (e) {
            this.error = Constants.ERROR_OCCURRED;
        }


    }

    setCurrentCollege(aCollege) {
        this.college = aCollege;
        this.collegeService.getCourses(this.college.id.toString())
            .subscribe(result => {
                this.courses = result;
            });
        this.changeDetectorRef.detectChanges();
    }

    onRowSelect(event) {
        this.error = null;
        this.selectedCourse = event.data;
        this.display = true;
    }

    showDialog() {
        this.display = true;
    }

    findSelectedCourseIndex(): number {
        return this.courses.indexOf(this.selectedCourse);
    }
}