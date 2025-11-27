import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from '../../models/User';
import { Constants } from '../../app.constants';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-secretaire-profile',
  templateUrl: '../../pages/secretaire/secretaireProfile.html'
})
export class SecretaireProfile implements OnInit {

  public user: User;
  PERSONAL:  string = Constants.PERSONAL;
  CONTACT:  string = Constants.CONTACT;

  constructor(private userService : UserService) {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }
     this.userService.getById(this.user)
      .subscribe((data: User) => {

        this.user = data
        this.user.birthDate = new Date(this.user.birthDate);
      },
      error => console.log(error),
      () => console.log('Get user complete'));
  }
  ngOnInit() {

  }
}
