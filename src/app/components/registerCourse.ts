import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';
import { CourseRegistration } from '../models/courseRegistration';
import { Course } from '../models/course';
import { CourseRegistrationService } from '../services/courseRegistration.service';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-register-course',
  templateUrl: '../pages/registerCourse.html',
  providers: []
})
export class RegisterCourse implements OnInit, OnDestroy {

  public courseRegistrations: CourseRegistration[];
  error: string = '';
  success: string = '';
  cols: any[];
  disabled: boolean = false;
  total: number;

  constructor(
    public courseRegistrationService: CourseRegistrationService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnDestroy() {
  }

  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      document.body.scrollTop = 0;
    });

    this.courseRegistrations = [];

    this.cols = [
      { field: 'course.subject.name', header: 'Matiere', sortable: 'false', filter: 'false' },
      { field: 'course.teacher.name', header: 'Enseignant', sortable: 'false', filter: 'false' },
      { field: 'course.beginDate', header: 'Debut', type: 'Date', sortable: 'true' },
      { field: 'course.endDate', header: 'Fin', type: 'Date', sortable: 'true' },
      { field: 'course.cost', header: 'Cout', type: 'money', sortable: 'true', filter: 'true' },
      { field: 'course.duration', header: 'Duree(jours)', sortable: 'true', filter: 'true' }

    ];

    this.courseRegistrations = this.courseRegistrationService.courseRegistrations;
  }

  confirm() {
    this.courseRegistrationService.courseRegistrations = [];

    for (var c of this.courseRegistrations) {
      var ci = new CourseRegistration();
      ci.course = new Course();
      ci.course.id = c.course.id;
      ci.user = JSON.parse(atob(Cookie.get('user')));
      this.courseRegistrationService.courseRegistrations.push(ci);

    }

    this.courseRegistrationService.register()
      .subscribe(result => {
        if (result == "Success") {
          this.success = "Votre inscription a ete enregistree avec succes. Nous vous contacterons tres bientot. ";
          this.disabled = true;
        }
        else {
          this.error = result;
        }
      });
  }

}
