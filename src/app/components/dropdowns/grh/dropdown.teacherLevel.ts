import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from '../dropdown.util';
import { TeacherLevelNewService } from '../../../services/grh/teacherLevelNew.service';
import { TeacherLevelNew } from 'app/models/grh/teacherLevelNew';

@Injectable()
export class TeacherLevelNewDropdown {

  filteredTeacherLevelNews: TeacherLevelNew[];
  teacherLevelNews: TeacherLevelNew[] = [];

  constructor(
    private teacherLevelNewService: TeacherLevelNewService) {
    this.getAllPayParameters();
  }

  filter(event) {
    this.filteredTeacherLevelNews = this.find(event);
  }

  handleDropdownClick(event) {
    console.info(this.teacherLevelNews);
    setTimeout(() => {
      this.filteredTeacherLevelNews = this.teacherLevelNews;
    }, 10)
  }

  public find(event) {
      let query = event.query;
      let filteredPTypes = [];
      for(let i = 0; i < this.teacherLevelNews.length; i++) {
          let payParameter = this.teacherLevelNews[i];
          if(payParameter.wording.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredPTypes.push(payParameter);
          }
      }

    return filteredPTypes;
  }

  private getAllPayParameters(): void {
    this.teacherLevelNewService.getAll()
      .subscribe((data: TeacherLevelNew[]) => {
      this.teacherLevelNews = data;
      },
        error => console.log(error),
        () => console.log('Get All TeacherLevelNews Complete'));
  }

}
