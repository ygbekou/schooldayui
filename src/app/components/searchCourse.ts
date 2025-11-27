import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { CourseService } from '../services/course.service';
import { Constants } from '../app.constants';

@Component({ 
  selector: 'app-search-course',
  templateUrl: '../pages/searchCourse.html',
  providers: [CourseService, Constants]
})
export class SearchCourse implements OnInit {
    ngOnInit() { 
   }
  
}
