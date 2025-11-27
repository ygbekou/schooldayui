import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { College } from '../models/college';
import { CourseView } from '../models/courseView';
import { CollegeService } from '../services/college.service';
import { Constants } from '../app.constants';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: '../pages/courses.html',
  providers: [CollegeService]
})
export class Courses implements OnInit, OnDestroy {

  college: College = new College();
  public colleges: College[];
  public courses: CourseView[];
  public selectedCourse: CourseView = new CourseView();
  collegeId: string;
  display: boolean = false;
  
  CODE: string = Constants.CODE;
  NAME: string = Constants.NAME;
  CREDIT: string = Constants.CREDIT;

  groupedColleges: { [cycleName: string]: College[] } = {};
  groupedCollegesSorted: { id: number, name: string, colleges: College[] }[] = [];


  constructor
    (
    private collegeService: CollegeService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
    ) {

  }

  ngOnDestroy() {
    this.college = null;
    this.colleges = null;
    this.courses = null;
    this.collegeId = null;
  }
ngOnInit() {
  this.collegeService.getAll().subscribe(
    (data: College[]) => {
      this.colleges = data;
      this.groupCollegesByCycle(); 

      if (!this.college || !this.college.id) {
        if (this.colleges.length > 0) {
          this.college = this.colleges[0];
          this.collegeId = this.college.id.toString();
          this.collegeService.getCourses(this.collegeId)
            .subscribe(result => {
              this.courses = result;
            });
        }
      }
    },
    error => console.log(error),
    () => console.log('Get all Colleges complete')
  );

  this.route.queryParams.subscribe(params => {
    this.collegeId = params['id'];
    if (this.collegeId != null) {
      this.collegeService.getCollege(this.collegeId)
        .subscribe(result => {
          if (result.id > 0) {
            this.college = result;
          }
        });

      this.collegeService.getCourses(this.collegeId)
        .subscribe(result => {
          this.courses = result;
        });
      console.log('Query param page: ', this.collegeId);
    }
  });
}

groupCollegesByCycle() {
  const grouped = new Map<number, { name: string, colleges: any[] }>();

  for (const college of this.colleges) {
    if (college.cycle && college.cycle.name !== 'Autre') {
      const id = college.cycle.id;
      if (!grouped.has(id)) {
        grouped.set(id, { name: college.cycle.name, colleges: [] });
      }
      grouped.get(id)!.colleges.push(college);
    }
  }


  this.groupedColleges = {};
  Array.from(grouped.entries())
    .sort(([idA], [idB]) => idA - idB)
    .forEach(([_, { name, colleges }]) => {
      this.groupedColleges[name] = colleges;
    });
}


  onRowSelect(event) {
    this.selectedCourse = event.data;
    this.display = true;
  }
  showDialog() {
    this.display = true;
  }
  findSelectedCourseIndex(): number {
    return this.courses.indexOf(this.selectedCourse);
  }

  setCurrentCollege(aCollege) {
    this.college = aCollege;
    this.collegeService.getCourses(this.college.id.toString())
      .subscribe(result => {
        this.courses = result;
      });
    this.changeDetectorRef.detectChanges();
  }

}
