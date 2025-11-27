import { Component, OnInit } from "@angular/core";
import { StudentCourseGlobalResult } from "app/models/studentCourseGlobalResult";
import { StudentGlobalResultRequest } from "app/models/studentGlobalResultRequest";
import { CourseService } from "app/services";
import { SchoolYearDropdown } from "./dropdowns/dropdown.schoolYear";
import { ClassDropdown } from "./dropdowns/dropdown.class";
import { CourseView } from "app/models/courseView";

@Component({
  selector: "app-admin-stCourse-result",
  templateUrl: "../pages/adminStudentCourseGlobalResult.html",
  providers: [CourseService, SchoolYearDropdown,ClassDropdown],
})
export class AdminStudentCourseGlobalResult implements OnInit {

  public cols: any[];
  stGlResults: StudentCourseGlobalResult[] = [];
  request: StudentGlobalResultRequest = new StudentGlobalResultRequest();
  coursesNv : CourseView[] = [];

  stGlResult: StudentCourseGlobalResult = new StudentCourseGlobalResult();

    
    public classDropdown: ClassDropdown;
    public schoolYearDropdown: SchoolYearDropdown;


  constructor(private courseService: CourseService, private schYearDropdown: SchoolYearDropdown,
    private clsDropdown: ClassDropdown
    ) {
    this.schoolYearDropdown = schYearDropdown;
    this.classDropdown = clsDropdown;
}

  ngOnInit(): void {

      this.cols = [
        {field: 'matricule', header: "Matricule", sortable: 'true', filter: 'true', style: {'width': '5%'}},
        {field: 'lastName', header: "Nom", sortable: 'false', filter: 'true', style: {'width': '5%'}},
        {field: 'firstName', header: "Prenom", sortable: 'false', filter: 'true', style: {'width': '10%'}}
        // {field: 'etat', header: "Etat", sortable: 'true', filter: 'true', style: {'width': '10%'}}
      ];
  }

  getStudentCourseGlobalResult() {
    console.log(this.request);
    this.courseService.getStudentCourseGlobalResult(this.request).subscribe(
      (data: StudentCourseGlobalResult[]) => {
        this.stGlResults = data;
      },
      (error) => console.log(error),
      () => console.log("getStudentCourseGlobalResult complete")
    );
  }

  getCoursesNv(evt){
    // console.log(evt.data);
    this.coursesNv = evt.data.listCoursNv;

    // console.log(this.coursesNv);
  }
}
