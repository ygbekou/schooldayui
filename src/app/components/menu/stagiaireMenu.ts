import { User } from '../../models/User';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-stagiaire-menu',
  templateUrl: '../../pages/menu/stagiaireMenu.html'
})
export class StagiaireMenu implements OnInit {

  public stagiaireDemand: string;
  public stagiaireProfile : string;

  public loggedInUser: User;

  constructor(
    private route: ActivatedRoute
  ) {
    //this.loggedInUser = JSON.parse(atob(Cookie.get('user')));
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.stagiaireDemand = params['stagiaireDemand'];
        this.stagiaireProfile  = params['stagiaireProfile'];
      })
  }

}
