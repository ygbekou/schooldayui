import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Country } from '../models/country';
import { College } from '../models/college';
import { SchoolYear } from '../models/schoolYear';
import { UserService } from '../services/user.service';
import { BaseService } from '../services/base.service';
import { Constants } from '../app.constants';
import { User } from '../models/User';
import { CollegeService } from '../services/college.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { LevelDropdown } from './dropdowns/dropdown.level';
import { MessagesModule, Message } from 'primeng/primeng';
import { GlobalEventsManager } from "../services/globalEventsManager";
import { PasswordModule, AutoCompleteModule, InputTextModule, CalendarModule, DropdownModule, StepsModule, MenuItem } from 'primeng/primeng';
import { School } from 'app/models/school';
import { SchoolService } from 'app/services/school.service';

@Component({
  selector: 'add-school-form',
  templateUrl: '../pages/addSchool.html',
  providers: [UserService, CollegeService, Constants, LevelDropdown, BaseService]
})

export class AddSchool implements OnInit {
  submitted = false;
  error = '';
  event: string = 'AJOUT D\'UN ETABLISSEMENT';
  school: School;
  countries: Country[];
  filteredCountries: Country[];
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
    private schoolService: SchoolService,
    private lvlDropdown: LevelDropdown,
    private route: ActivatedRoute,
    private router: Router,
    private globalEventsManager: GlobalEventsManager,
    private baseService: BaseService) {
    this.school = new School();
    this.levelDropdown = lvlDropdown;
  }

  ngOnInit() {

    console.log('Add School');

    this.school = new School();
    this.getAllCountries();
    this.items = [{
      label: Constants.CONTACT_DETAILS,
      command: (event: any) => {
        this.activeIndex = 0;
        this.msgs.length = 0;
        this.msgs.push({ severity: 'info', summary: Constants.CONTACT_DETAILS, detail: event.item.label });
      }
    },
    {
      label: Constants.SETTINGS,
      command: (event: any) => {
        this.activeIndex = 1;
        this.msgs.length = 0;
        this.msgs.push({ severity: 'info', summary: Constants.SETTINGS, detail: event.item.label });
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
      if (this.school.name == null || this.school.shortName == null ||
        this.school.address == null || this.school.city == null) {
        this.error = Constants.REQUIRED_FIELD_MISSING;
      } else {
        this.navigationLabel = Constants.STEP2;
        this.activeIndex = 1;
      }
    } else if (this.activeIndex == 1) {
      this.navigationLabel = Constants.STEP3;
      this.activeIndex = 2;
    } else if (this.activeIndex == 2) {
      if (this.button == 1) {
        this.activeIndex = 0;
        this.navigationLabel = Constants.STEP2;
      } else {
        try {
          this.schoolService.save(this.school)
            .subscribe(result => {
              if (result) {
                console.log(result);
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

}
