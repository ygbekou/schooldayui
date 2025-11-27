import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from '../dropdown.util';
import { TeacherTypeNewService } from '../../../services/grh/teacherTypeNew.service';
import { TeacherTypeNew } from 'app/models/grh/teacherTypeNew';

@Injectable()
export class TeacherTypeNewDropdown {

  filteredTeacherTypeNews: TeacherTypeNew[];
  teacherTypeNews: TeacherTypeNew[] = [];

  constructor(
    private teacherTypeNewService: TeacherTypeNewService) {
    this.getAllPayParameters();
  }

  filter(event) {
    this.filteredTeacherTypeNews = this.find(event);
  }

  handleDropdownClick(event) {
    console.info(this.teacherTypeNews);
    setTimeout(() => {
      this.filteredTeacherTypeNews = this.teacherTypeNews;
    }, 10)
  }

  public find(event) {
      let query = event.query;
      let filteredPTypes = [];
      for(let i = 0; i < this.teacherTypeNews.length; i++) {
          let payParameter = this.teacherTypeNews[i];
          if(payParameter.wording.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredPTypes.push(payParameter);
          }
      }

    return filteredPTypes;
  }

  private getAllPayParameters(): void {
    this.teacherTypeNewService.getAll()
      .subscribe((data: TeacherTypeNew[]) => {
      this.teacherTypeNews = data;
      },
        error => console.log(error),
        () => console.log('Get All TeacherTypeNews Complete'));
  }

}
