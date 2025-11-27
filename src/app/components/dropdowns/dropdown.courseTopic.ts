import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
import { CourseTopicService } from '../../services/courseTopic.service';
import { CourseTopic } from '../../models/courseTopic';
 
@Injectable()
export class CourseTopicDropdown {
  
  filteredCourseTopics : CourseTopic[];
  courseTopics : CourseTopic[] = []; 
  oldSubjectId: string;
  oldLevelId: string;
  
  constructor(
    private baseService: BaseService,
    private courseTopicService: CourseTopicService) 
  {
    //this.getAllTuitionTypes();
  }
  
  filter(event) {
    this.filteredCourseTopics = DropdownUtil.filter(event, this.courseTopics);
  }
  
  handleDropdownClick(event, subjectId: string, levelId:  string) {
   // this.filteredCourseTopics = [];
    setTimeout(() => {
      if (this.oldSubjectId != subjectId || this.oldLevelId != levelId) {
        this.getCourseTopics(subjectId, levelId);
      } else {
        this.filteredCourseTopics = this.courseTopics;
      }
    }, 10)
  }
  
  private getCourseTopics(subjectId: string, levelId:  string): void {
    this.courseTopicService.getCourseTopics(subjectId, levelId)
      .subscribe((data: CourseTopic[]) => {
        this.courseTopics = data
        this.filteredCourseTopics = data;
      },
      error => console.log(error),
      () => console.log('Get All CourseTopics Complete'));
  }
}