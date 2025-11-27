import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {Subject} from '../models/subject';
import {CourseView} from '../models/courseView';
import {SubjectService} from '../services/subject.service';
//import {Syllabus} from './syllabus';
import {Constants} from '../app.constants';
import {DataTableModule, DialogModule, InputTextareaModule} from 'primeng/primeng';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-subject-details',
  templateUrl: '../pages/subjectDetails.html',
  providers: [SubjectService]
})
export class SubjectDetails implements OnInit, OnDestroy {

  subject: Subject = new Subject();
  public courses: CourseView[];
  subjectId: string;
  display: boolean = false;
  // @ViewChild(Syllabus) syllabus: Syllabus;

  constructor
    (
    private subjectService: SubjectService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
    ) {

  }

  ngOnDestroy() {
  }

  ngOnInit() {

    const user = JSON.parse(atob(Cookie.get('user')));
    if (user == null || user.status != 1) {
      this.router.navigate(["/login"]);
    } else {

      this.route
        .queryParams
        .subscribe(params => {
          // Defaults to 0 if no query param provided.
          this.subjectId = params['id'];
         // this.syllabus.syllabus = 'syllabus_'+this.subjectId;
          this.subjectService.getSubject(this.subjectId)
            .subscribe(result => {
              if (result.id > 0) {
                this.subject = result;
              }
            });

          this.subjectService.getCourses(this.subjectId)
            .subscribe(result => {
              this.courses = result;
            });
          console.log('Query param page: ', this.subjectId);
        });
    }
  }


  showDialog() {
    this.display = true;
  }
}
