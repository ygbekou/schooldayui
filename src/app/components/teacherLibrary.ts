import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {User} from '../models/User';
import {Exam} from '../models/exam';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Constants} from '../app.constants';
import {Teacher} from '../models/teacher';
import {TeacherService} from '../services/teacher.service';

@Component({
  selector: 'app-teacher-library',
  templateUrl: '../pages/teacherLibrary.html',
  providers: [TeacherService]
})
export class TeacherLibrary implements OnInit {

  public activeTab = 0;

  currentUser: User;
  public teacher: Teacher = new Teacher();
  RENTALS: string = Constants.RENTALS;

  constructor(private teacherService: TeacherService,
    private changeDetectorRef: ChangeDetectorRef) {
  }
  ngOnInit() {
    this.currentUser = JSON.parse(atob(Cookie.get('user')));
    if (this.currentUser == null) {
      this.currentUser = new User();
    } else {
      this.setTeacher(this.currentUser);
    }
  }


  onTabChange(evt) {
    this.activeTab = evt.index;
    if (evt.index == 0) {

    } else if (evt.index == 1) {

    } else if (evt.index == 2) {

    }
  }

  public setTeacher(aUser: User) {
    if (aUser != null && aUser.id > 0) {
      this.teacherService.getByUser(aUser)
        .subscribe(result => {
          if (result) {
            this.teacher = result;
          }
        });
    }
  }

}
