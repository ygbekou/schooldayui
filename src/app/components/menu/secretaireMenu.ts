import { User } from '../../models/User';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-secretaire-menu',
  templateUrl: '../../pages/menu/secretaireMenu.html'
})
export class SecretaireMenu implements OnInit {

  public information: string;
  public course: string;
  public schedule: string;
  public studentProject: string;
  public secretaireApproval: string;
  public secretaireProfile: string;
  public loggedInUser: User;

  constructor(
    private route: ActivatedRoute
  ) {
    this.loggedInUser = JSON.parse(atob(Cookie.get('user')));
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.information = params['information'];
        this.course = params['course'];
        this.schedule = params['schedule'];
        this.studentProject = params['studentProject'];
        this.secretaireApproval = params['secretaireApproval'];
        this.secretaireProfile = params['secretaireProfile'];
      })
  }

}
