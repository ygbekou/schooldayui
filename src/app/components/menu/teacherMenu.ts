import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-teacher-menu',
  templateUrl: '../../pages/menu/teacherMenu.html'
})
export class TeacherMenu implements OnInit {

  public teacherMain: string;
  public teacherProfile: string;
  public teacherLibrary: string;
  
  public teacherCalendar: string;
  public teacherStudent: string;
  public teacherGrade: string;
  public teacherComm: string;

  constructor(
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {

    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.teacherMain = params['teacherMain'];
        this.teacherProfile = params['teacherProfile'];
        this.teacherStudent = params['teacherStudent'];
        this.teacherGrade = params['teacherGrade'];
        this.teacherCalendar = params['teacherCalendar'];
        this.teacherComm = params['teacherComm'];
        this.teacherLibrary = params['teacherLibrary'];
      })
  }


}
