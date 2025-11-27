import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Country } from '../models/country';
import { College } from '../models/college';
import { SchoolYear } from '../models/schoolYear';
import { UserService } from '../services/user.service';
import { BaseService } from '../services/base.service';
import { Constants } from '../app.constants';
import { User } from '../models/User';
import { CollegeService } from '../services/college.service';
import { LevelDropdown } from './dropdowns/dropdown.level';
import { Message } from 'primeng/primeng';
import { GlobalEventsManager } from "../services/globalEventsManager";
import { MenuItem } from 'primeng/primeng';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'admin-studentRegistration',
  templateUrl: '../pages/studentRegistration.html',
  providers: [UserService, CollegeService, Constants, LevelDropdown, BaseService]
})

export class StudentRegistration implements OnInit {
  submitted = false;
  error = '';
  msg = '';
  event = 'SAISIE';
  user: User;
  countries: Country[];
  filteredCountries: Country[];
  filteredCountriesNationalities: Country[];
  filteredColleges: College[];
  colleges: College[] = [];
  schoolYears: SchoolYear[] = [];
  filteredSchoolYears: SchoolYear[] = [];
  country: Country;
  items: MenuItem[];
  activeIndex = 0;
  msgs: Message[] = [];
  button = 1;
  currentUser: User;
  roles: any[] = [];
  public levelDropdown: LevelDropdown;
  navigationLabel: string = Constants.STEP2;
  COUNTRY_ORIGIN: string = Constants.COUNTRY_ORIGIN;
  COUNTRY_RESIDENCE: string = Constants.COUNTRY_RESIDENCE;
  LEVEL: string = Constants.NIVEAU;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;
  NATIONALITY: string = Constants.NATIONALITY;

  constructor(
    private collegeService: CollegeService,
    private userService: UserService,
    lvlDropdown: LevelDropdown,
    private baseService: BaseService) {
    this.user = new User();
    this.levelDropdown = lvlDropdown;
  }

  ngOnInit() {
    this.user = new User();
    this.user.role = 0;
    this.user.sendMail = false;
    this.currentUser = JSON.parse(atob(Cookie.get('user')));
    this.roles = [];

    if (this.currentUser.role === 1) {
      this.roles.push({ label: 'Administrateur', value: 1 });
    }
    this.roles.push({ label: 'Enseignant', value: 2 });
    this.roles.push({ label: 'Eleve', value: 3 });
    this.roles.push({ label: 'Parent', value: 4 });
    this.roles.push({ label: 'Kiosk', value: 6 });
    this.roles.push({ label: 'Visiteur', value: 7 });
    this.roles.push({ label: 'Personnel', value: 15 });
    this.roles.push({ label: 'DEP', value: 8 });
    this.roles.push({ label: 'DCMC', value: 9 });
    this.roles.push({ label: 'GRH', value: 10 });
    this.roles.push({ label: 'Secretaire', value: 11 });

    this.getAllCountries();
    this.items = [{
      label: Constants.INFO_PERSONNELLE,
      command: (event: any) => {
        this.activeIndex = 0;
        this.msgs.length = 0;
        this.msgs.push({ severity: 'info', summary: Constants.INFO_PERSONNELLE, detail: event.item.label });
      }
    },
    {
      label: Constants.CONTACT,
      command: (event: any) => {
        this.activeIndex = 1;
        this.msgs.length = 0;
        this.msgs.push({ severity: 'info', summary: Constants.CONTACT, detail: event.item.label });
      }
    },
    {
      label: Constants.CHOIX_FILIERE,
      command: (event: any) => {
        this.activeIndex = 2;
        this.msgs.length = 0;
        this.msgs.push({ severity: 'info', summary: Constants.CHOIX_FILIERE, detail: event.item.label });
      }
    },
    {
      label: Constants.CONFIRMATION,
      command: (event: any) => {
        this.activeIndex = 3;
        this.msgs.length = 0;
        this.msgs.push({ severity: 'info', summary: Constants.CONFIRMATION, detail: event.item.label });
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
    const query = event.query;
    this.filteredCountries = [];
    for (let i = 0; i < this.countries.length; i++) {
      const country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        this.filteredCountries.push(country);
      }
    }
  }

  filterCountryNationality(event) {
    const query = event.query;
    this.filteredCountries = [];
    for (let i = 0; i < this.countries.length; i++) {
      const country = this.countries[i];
      if (country.nationality.toLowerCase().indexOf(query.toLowerCase()) === 0) {
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
    if (this.activeIndex === 3) {
      this.submitted = true;
    }
  }
  public saveUser() {
    this.error = '';
    this.msg = '';
    if (this.activeIndex === 0) {
      console.log(this.user.countryOrigin);
      if (this.user.firstName == null || this.user.lastName == null || this.user.role == null ||
        this.user.password == null || this.user.email == null ||this.user.countryOrigin==null) {
        this.error = Constants.REQUIRED_FIELD_MISSING;
      } else if (this.user.sex != null) {
        this.navigationLabel = Constants.STEP3;
        this.activeIndex = 1;

      } else {
        this.error = Constants.SELECT_SEX;
      }
    } else if (this.activeIndex === 1) {
      if (this.user.address == null || this.user.cityResidence == null ||
        this.user.countryResidence == null || this.user.phone == null) {
        this.error = Constants.REQUIRED_FIELD_MISSING;
      } else {
        if (this.user.role === 3) {
          this.navigationLabel = Constants.STEP4;
          this.activeIndex = 2;
        } else {
          this.navigationLabel = Constants.STEP1;
          this.activeIndex = 3;
        }
      }
    } else if (this.activeIndex === 2) {
      if (this.user.currentDiploma == null || this.user.level == null ||
        this.user.schoolYear == null) {
        this.error = Constants.REQUIRED_FIELD_MISSING;
      } else {
        this.navigationLabel = Constants.STEP1;
        this.activeIndex = 3;
      }
    } else if (this.activeIndex === 3) {
      if (this.button === 1) {
        this.activeIndex = 0;
        this.navigationLabel = Constants.STEP2;
      } else {
        try {
          //this.user.role = 3;//this is a student
          this.user.event = this.event;
          this.user.fromAdmin = true;
          this.userService.registerOnline(this.user)
            .subscribe(result => {
              if (result) {
                this.msg = Constants.USER_ADDED;
                setTimeout(() => {
                  console.log('after 3 sec');
                  this.activeIndex = 0;
                  this.user = new User();
                  this.msg = '';
                }, 3000);
              } else {
                this.error = Constants.EMAIL_USED;
              }
            });
        } catch (e) {
          this.error = Constants.ERROR_OCCURRED;
        }
      }
    }
  }


  filterCollege(event) {
    const query = event.query;
    this.filteredColleges = [];
    for (let i = 0; i < this.colleges.length; i++) {
      const college = this.colleges[i];
      if (college.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
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
    const query = event.query;
    this.filteredSchoolYears = [];
    for (let i = 0; i < this.schoolYears.length; i++) {
      const sy = this.schoolYears[i];
      if (sy.year.toLowerCase().indexOf(query.toLowerCase()) === 0) {
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
