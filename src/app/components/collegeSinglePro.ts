import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Level } from '../models/level';
import { CourseView } from '../models/courseView';
import {College} from '../models/college';
import {Prospectus} from './prospectus';
import { LevelService } from '../services/level.service';
import { CourseRegistrationService } from '../services/courseRegistration.service';
import { Constants } from '../app.constants';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Contact } from '../models/contact';
import { Course } from '../models/course';
import { CourseRegistration } from '../models/courseRegistration'
import { BaseService } from '../services/base.service';

@Component({
  selector: 'app-level-single',
  templateUrl: '../pages/collegeSinglePro.html',
  providers: []
})
export class CollegeSinglePro implements OnInit, OnDestroy {

  level: Level = new Level();
  public levels: Level[];
  public courses: CourseView[];
  public futureCourses: Course[];
  college: College = new College();
  public colleges: College[];
  collegeId: string;
  @ViewChild(Prospectus) prospectus: Prospectus;
  levelId: string;
  public selectedCourse: CourseView = new CourseView();
  contact: Contact = new Contact();
  error: string = '';
  success: string = '';
  cols: any[];
  futureCols: any[];
  display: boolean = false;
  button:number;

  constructor
    (
    private levelService: LevelService,
    private courseRegistrationService: CourseRegistrationService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private baseService: BaseService
    ) {

  }

  ngOnDestroy() {
    this.levels = null;
    this.courses = null;
    this.level = null;
    this.levelId = null;
    this.collegeId = null;
  }
  ngOnInit() {
    this.levels = [];
    this.levelService.getAll()
      .subscribe((data: Level[]) => this.levels = data,
      error => console.log(error),
      () => console.log('Get all levels complete'));


    this.cols = [
      { field: 'subject.name', header: 'Matiere', sortable: 'false', filter: 'false' },
      { field: 'teacher.name', header: 'Enseignant', sortable: 'false', filter: 'false' },
      { field: 'beginDate', header: 'Debut', type: 'Date', sortable: 'true' },
      { field: 'endDate', header: 'Fin', type: 'Date', sortable: 'true' },
      { field: 'cost', header: 'Cout',type: 'money' ,sortable: 'true', filter: 'true' },
      { field: 'duration', header: 'Duree(jours)', sortable: 'true', filter: 'true' }

    ];

    this.futureCols = [
      { field: 'selected', header: '' },
      { field: 'subject.name', header: 'Matiere', sortable: 'false', filter: 'false' },
      { field: 'teacher.name', header: 'Enseignant', sortable: 'false', filter: 'false' },
      { field: 'beginDate', header: 'Debut', type: 'Date', sortable: 'true' },
      { field: 'endDate', header: 'Fin', type: 'Date', sortable: 'true' },
      { field: 'cost', header: 'Cout',type: 'money' , sortable: 'true', filter: 'true' },
      { field: 'duration', header: 'Duree(jours)', sortable: 'true', filter: 'true' }

    ];
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.collegeId = params['id'];
        this.prospectus.flyer = 'flyer_'+this.collegeId;
        this.levelId = params['id'];

        this.levelService.getLevel(this.levelId)
          .subscribe(result => {
            if (result.id > 0) {
              this.level = result;
            }
          });

        this.futureCourses = [];
        this.levelService.getByLevel(this.levelId)
          .subscribe((data: Course[]) => {
            this.futureCourses = data
            console.info("Courses: " + this.futureCourses);
          },
          error => console.log(error),
          () => console.log('Get Courses for level complete'));


        // this.levelService.getCourses(this.levelId)
        //   .subscribe(result => {
        //     this.courses = result;
        //   });
        this.levelService.getCoursesPro(this.levelId)
          .subscribe(result => {
            this.courses = result;
          });
        console.log('Query param page: ', this.levelId);
      });
  }


  setCurrentlevel(alevel) {
    this.level = alevel;
    this.levelService.getCourses(this.level.id.toString())
      .subscribe(result => {
        this.courses = result;
      });
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(event) {
    this.selectedCourse = event.data;
    this.display = true;
  }

  registerCourses() {
    this.courseRegistrationService.courseRegistrations = [];
    this.courseRegistrationService.courseTotalCost = 0;
    this.courseRegistrationService.courseTotalDuration = 0;

    for (var c of this.futureCourses) {
      var ci = new CourseRegistration();

      if (c.selected) {
        ci.course = c;
        this.courseRegistrationService.courseRegistrations.push(ci);
        this.courseRegistrationService.courseTotalCost += c.cost;
        this.courseRegistrationService.courseTotalDuration += c.duration;
      }
    }

    if (this.courseRegistrationService.courseRegistrations.length > 0) {
      var loginUser = JSON.parse(atob(Cookie.get('user')));
      if (loginUser != null) {
        this.router.navigate(["/registerCourse"]);
      }
      else {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "nextRoute": "/registerCourse",
          }
        };
        this.router.navigate(["/login"], navigationExtras);
      }
    }
  }

  findSelectedCourseIndex(): number {
    return this.courses.indexOf(this.selectedCourse);
  }

  sendMessage() {
    try {

      this.error = '';
      this.success = '';

      if (this.contact.message != null) {
        this.contact.program = this.level.name;
        this.baseService.sendMail(this.contact)
          .subscribe(result => {
            if (result == true) {
              this.success = "Merci de votre message. Nous vous contacterons au besoins";
            } else {
              this.error = "Une erreur s'est produite lors de l'envois. Revoyez votre e-mail et Reessayez";
            }
          })
      } else {
        this.error = "Saisissez votre message";
      }
    }
    catch (e) {
      this.error = "Une erreur systeme s'est produite. Reessayez";
    }


  }
}
