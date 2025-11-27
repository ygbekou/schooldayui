import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-parent-menu',
  templateUrl: '../../pages/menu/parentMenu.html'
})
export class ParentMenu implements OnInit {

  public parentMain: string;
  public parentFeedback: string;
  public parentProfile: string;
  
  constructor(
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {

    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.parentMain = params['parentMain'];
        this.parentFeedback = params['parentFeedback'];
        this.parentProfile = params['parentProfile'];
      })
  }


}
