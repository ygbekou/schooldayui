import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from '../models/User';
import { Constants } from '../app.constants';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dep-profile',
  templateUrl: '../pages/depProfile.html'
})
export class DepProfile implements OnInit {

  public user: User;
  currentUser: User = JSON.parse(atob(Cookie.get('user')));
  
  CONTACT: string = Constants.CONTACT;
  PERSONAL: string = Constants.PERSONAL;  
  
  constructor(private userService: UserService) {
    this.user = JSON.parse(atob(Cookie.get('user')));
    this.userService.getById(this.user)
      .subscribe((data: User) => {

        this.user = data
        this.user.birthDate = new Date(this.user.birthDate);
      },
      error => console.log(error),
      () => console.log('Get user complete'));
  }
  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }
  }
}
