import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-student-menu',
  templateUrl: '../../pages/menu/studentMenu.html'
})
export class StudentMenu implements OnInit {

  public studentMain: string;
  public studentCalendar: string;
  public studentTuition: string;
  public studentDemandFormation: string;
  public studentFeedback: string;
  public studentProfile: string;
  public studentLibrary: string;
  
  constructor(
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {

    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.studentMain = params['studentMain'];
        this.studentCalendar = params['studentCalendar'];
        this.studentTuition = params['studentTuition'];
        this.studentDemandFormation = params['studentDemandFormation'];
        this.studentFeedback = params['studentFeedback'];
        this.studentProfile = params['studentProfile'];
        this.studentLibrary = params['studentLibrary'];
       
      })
  }


}
