import {Component, OnInit, Output, EventEmitter, NgZone} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Country} from '../models/country';
import {College} from '../models/college';
import {SchoolYear} from '../models/schoolYear';
import {UserService} from '../services/user.service';
import {BaseService} from '../services/base.service';
import {Constants} from '../app.constants';
import {User} from '../models/User';
import {CollegeService} from '../services/college.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {LevelDropdown} from './dropdowns/dropdown.level';
import {MessagesModule, Message} from 'primeng/primeng';
import {GlobalEventsManager} from "../services/globalEventsManager";
import {PasswordModule, AutoCompleteModule, InputTextModule, CalendarModule, DropdownModule, StepsModule, MenuItem} from 'primeng/primeng';

@Component({
  selector: 'online-registration-form',
  templateUrl: '../pages/onlineRegistration.html',
  providers: [UserService, CollegeService, Constants, LevelDropdown, BaseService]
})

export class OnlineRegistration implements OnInit {
  submitted = false;
  error = '';
  event: string = 'INSCRIPTION EN LIGNE';
  user: User;
  countries: Country[];
  filteredCountries: Country[];
  filteredColleges: College[];
  colleges: College[] = [];
  schoolYears: SchoolYear[] = [];
  filteredSchoolYears: SchoolYear[] = [];
  country: Country;
  items: MenuItem[];
  activeIndex: number = 0;
  msgs: Message[] = [];
  button: number = 1;
  public levelDropdown: LevelDropdown;
  navigationLabel: string = Constants.STEP2;
  COUNTRY_ORIGIN: string = Constants.COUNTRY_ORIGIN;
  COUNTRY_RESIDENCE: string = Constants.COUNTRY_RESIDENCE;
  LEVEL: string = Constants.NIVEAU;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;

  constructor(
    private collegeService: CollegeService,
    private userService: UserService,
    private lvlDropdown: LevelDropdown,
    private route: ActivatedRoute,
    private router: Router,
    private globalEventsManager: GlobalEventsManager,
    private baseService: BaseService) {
    this.user = new User();
    this.levelDropdown = lvlDropdown;
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.event = params['event'];
        console.log('Query param page: ', this.event);
        if(this.router.url.toLocaleLowerCase() == '/concours')
          this.router.navigateByUrl('onlineRegistration?event=CONCOURS')
      });
    this.user = new User();
    this.getAllCountries();
    this.items = [{
      label: Constants.INFO_PERSONNELLE,
      command: (event: any) => {
        this.activeIndex = 0;
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: Constants.INFO_PERSONNELLE, detail: event.item.label});
      }
    },
    {
      label: Constants.CONTACT,
      command: (event: any) => {
        this.activeIndex = 1;
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: Constants.CONTACT, detail: event.item.label});
      }
    },
    {
      label: Constants.CHOIX_FILIERE,
      command: (event: any) => {
        this.activeIndex = 2;
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: Constants.CHOIX_FILIERE, detail: event.item.label});
      }
    },
    {
      label: Constants.CONFIRMATION,
      command: (event: any) => {
        this.activeIndex = 3;
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: Constants.CONFIRMATION, detail: event.item.label});
      }
    }
    ];


    this.collegeService.getAll()
      .subscribe((data: College[]) => this.colleges = data,
      error => console.log(error),
      () => console.log('Get all Colleges complete'));

    this.baseService.getAllSchoolYears()
      .subscribe((data: SchoolYear[]) => this.schoolYears = data,
      error => console.log(error),
      () => console.log('Get all SchoolYears complete'));

  }

  filterCountry(event) {
    let query = event.query;
    this.filteredCountries = [];
    for (let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.filteredCountries.push(country);
      }
    }
  }

  handleDropdownClick() {
    //this.filteredCountries = [];
    setTimeout(() => {
      this.filteredCountries = this.countries;
    }, 100)
  }

  private getAllCountries(): void {
    this.baseService.getAllCountries()
      .subscribe((data: Country[]) => this.countries = data,
      error => console.log(error),
      () => console.log('Get All Countries Complete'));
  }

  onSubmit() {

    if (this.activeIndex == 3)
      this.submitted = true;
  }
  public saveUser() {
    this.error = '';
    if (this.activeIndex == 0) {
      if (this.user.firstName == null || this.user.lastName == null ||
        this.user.password == null || this.user.email == null) {
        this.error = Constants.REQUIRED_FIELD_MISSING;
      } else if (this.user.sex != null) {
        this.navigationLabel = Constants.STEP3;
        this.activeIndex = 1;
      } else {
        this.error = Constants.SELECT_SEX;
      }
    } else if (this.activeIndex == 1) {
      if (this.user.address == null || this.user.cityResidence == null ||
        this.user.countryResidence == null || this.user.phone == null) {
        this.error = Constants.REQUIRED_FIELD_MISSING;
      } else {
        this.navigationLabel = Constants.STEP4;
        this.activeIndex = 2;
      }
    } else if (this.activeIndex == 2) {
      if (this.user.currentDiploma == null || (this.user.level == null && this.event != "INSCRIPTION_ENSEIGNANT") ||
        this.user.schoolYear == null) {
        this.error = Constants.REQUIRED_FIELD_MISSING;
      } else {
        this.navigationLabel = Constants.STEP1;
        this.activeIndex = 3;
      }
    } else if (this.activeIndex == 3) {
      if (this.button == 1) {
        this.activeIndex = 0;
        this.navigationLabel = Constants.STEP2;
      } else {
        try {

          if(this.event == "INSCRIPTION_ENSEIGNANT"){

            this.user.role = 2; //this is a teacher

            this.user.event = this.event;
            this.userService.registerOnline(this.user)
              .subscribe(result => {
                if (result) {
                 console.log(result);
                } else {
                  this.error = Constants.EMAIL_USED;
                }
              });

          }else{
              
            this.user.role = 3;//this is a student
            this.user.event = this.event;
            this.userService.registerOnline(this.user)
              .subscribe(result => {
                if (result) {
                  
                  if(this.event == 'BOURSE') { //21092020
                    this.user = new User();
                    this.activeIndex = 0;
                    this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Demande de bourse envoyée avec succès !'});
                  }
                  else {
                    this.globalEventsManager.showNavBar.emit(this.user);
                    this.user = JSON.parse(atob(Cookie.get('user')));
                    this.router.navigate(["/student/studentMain"]);
                  }
                  
                } else {
                  this.error = Constants.EMAIL_USED;
                }
              });

          }


        } catch (e) {
          this.error = Constants.ERROR_OCCURRED;
        }
      }
    }
  }


  filterCollege(event) {
    let query = event.query;
    this.filteredColleges = [];
    for (let i = 0; i < this.colleges.length; i++) {
      let college = this.colleges[i];
      if (college.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.filteredColleges.push(college);
      }
    }
  }

  handleCollegeDropdownClick() {
    //this.filteredColleges = [];
    setTimeout(() => {
      this.filteredColleges = this.colleges;
    }, 100)
  }

  filterSchoolYear(event) {
    let query = event.query;
    this.filteredSchoolYears = [];
    for (let i = 0; i < this.schoolYears.length; i++) {
      let sy = this.schoolYears[i];
      if (sy.year.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.filteredSchoolYears.push(sy);
      }
    }
  }

  handleSchoolYearDropdownClick() {
    //this.filteredSchoolYears = [];
    setTimeout(() => {
      this.filteredSchoolYears = this.schoolYears;
    }, 100)
  }

}
