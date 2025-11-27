import {Component, LOCALE_ID, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, AfterViewInit} from '@angular/core';
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

@Component({
    selector: 'app-systeme-enseignement-innovant',
    templateUrl: '../pages/systemeEnseignementInnovant.html',
    providers: [{provide: LOCALE_ID, useValue: "fr-FR"}, CollegeService]
})
export class SystemeEnseignementInnovant implements OnInit, AfterViewInit, OnDestroy {

    college: College = new College();
    public colleges: College[];
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

     ngAfterViewInit() {
        if (this.prospectus) {
          this.prospectus.flyer = 'iPNet_iXP';
          this.changeDetectorRef.detectChanges();
        } else {
          console.warn('Le composant Prospectus n’est pas encore disponible.');
        }
      }

    ngOnInit() {

        this.user = JSON.parse(atob(Cookie.get('user')));
        this.prospectus.flyer = 'iPNet_iXP';

        this.colleges = [];
        this.collegeService.getAllColleges()
            .subscribe((data: College[]) => this.colleges = data,
                error => console.log(error),
                () => console.log('Get all Colleges complete'));
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
