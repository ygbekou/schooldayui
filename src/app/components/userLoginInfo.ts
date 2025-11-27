import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {Constants} from '../app.constants';
import {User} from '../models/User';

@Component({
  selector: 'app-user-loginInfo',
  templateUrl: '../pages/userLoginInfo.html',
  providers: [UserService]
})

export class UserLoginInfo implements OnInit {
  error = '';
  success = '';
  @Input() user: User;


  SAVE_LABEL: string = Constants.SAVE_LABEL;

  constructor(
    private router: Router,
    private userService: UserService) {
    
  }

  ngOnInit() {
    //this.user = new User(); 
  }
  ngOnDestroy() {
   this.success = null;
   this.error = null;
  }


  public saveUser() {
    try {
      this.userService.saveUser(this.user)
        .subscribe(result => {
          if (result == "Success") {
            this.success = Constants.saveSuccess;
          }
          else {
             this.error = Constants.saveNotSuccess +", "+ result;
          }
        })
    }
    catch (e) {
      this.error = Constants.ERROR_OCCURRED;
    }

  }

}
