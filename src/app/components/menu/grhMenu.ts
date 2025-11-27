import { User } from '../../models/User';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-grh-menu',
  templateUrl: '../../pages/menu/grhMenu.html'
})
export class GrhMenu implements OnInit {
  public grhMain: string;
  public grhPayParameter: string;
  public grhTransferLetter: string;
  public grhPersonnelMenu: string;
  public grhAjoutPersonnel: string;
  public grhPayManagement: string;
  public grhPersonnelEnseignantMenu: string;
  public grhGenerateEmployeesReportsMenu: string;
  public grhSurveillantManagementMenu: string;
  public grhPersonnelParameter: string;

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
        this.grhMain = params['grhMain'];
        this.grhPayParameter = params['grhPayParameter'];
        this.grhTransferLetter = params['grhTransferLetter'];
        this.grhPersonnelMenu = params['grhPersonnelMenu'];
        this.grhAjoutPersonnel = params['grhAjoutPersonnel'];
        this.grhPayManagement = params['grhPayManagement'];
        this.grhPersonnelEnseignantMenu = params['grhPersonnelEnseignantMenu'];
        this.grhGenerateEmployeesReportsMenu = params['grhGenerateEmployeesReportsMenu'];
        this.grhSurveillantManagementMenu = params['grhSurveillantManagementMenu'];
        this.grhPersonnelParameter = params['grhPersonnelParameter'];
      })
  }


}
