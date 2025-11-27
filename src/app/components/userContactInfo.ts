import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {CountryDropdown} from './dropdowns/dropdown.country';
import {CompanyDropdown} from './dropdowns/dropdown.company';
import {UserDropdown} from './dropdowns/dropdown.user';
import {Constants} from '../app.constants';
import {User} from '../models/User';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-user-contactInfo',
  templateUrl: '../pages/userContactInfo.html',
  providers: [UserService, Constants,CompanyDropdown, CountryDropdown, UserDropdown]
})

export class UserContactInfo implements OnInit {
  error = '';
  success = '';
  @Input() user: User;
  public countryDropdown: CountryDropdown;
  public companyDropdown: CompanyDropdown;
  public userDropdown: UserDropdown;

  SAVE_LABEL: string = Constants.SAVE_LABEL;
  COUNTRY_ORIGIN: string = Constants.COUNTRY_ORIGIN;
  COUNTRY_RESIDENCE: string = Constants.COUNTRY_RESIDENCE;
  NATIONALITY: string = Constants.NATIONALITY;

  loggedInUser = JSON.parse(atob(Cookie.get('user')));

  constructor(
    private router: Router,
    private userService: UserService,
    private cpDropdown: CompanyDropdown,
    private ctryDropdown: CountryDropdown,
    private uDropdown: UserDropdown) {
    //this.user = new User();
    this.countryDropdown = ctryDropdown;
    this.companyDropdown=cpDropdown;
    this.userDropdown = uDropdown;
  }

  ngOnInit() {
    //this.user = new User(); 
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
