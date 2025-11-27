import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {User} from '../models/User';
import {Student} from '../models/student';
import {StudentService} from '../services/student.service';
import {AdminUserList} from './adminUserList';
import {AdminSchooling} from './adminSchooling';
import {CourseResults} from './courseResults';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {StudentCharts} from './studentCharts';
import {StudentResults} from './studentResults';
import {Constants} from '../app.constants';

@Component({
  selector: 'app-teacher-comm',
  templateUrl: '../pages/teacherComm.html'
})
export class TeacherComm implements OnInit {
  EMAIL: string = Constants.EMAIL;
  public user: User = JSON.parse(atob(Cookie.get('user')));
  public activeTab = 0;
  constructor(private studentService: StudentService,
    private changeDetectorRef: ChangeDetectorRef) { 
  }
  ngOnInit() {
  }

  onTabChange(evt) {
    this.activeTab = evt.index;
    if (evt.index == 0) {

    } else if (evt.index == 1) {

    }
  }
}
