import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {UserService} from '../../services/user.service';
import {BaseService} from '../../services/base.service';
import {Constants} from '../../app.constants';
import {User} from '../../models/User';
import {Country} from '../../models/country';
import {GlobalEventsManager} from "../../services/globalEventsManager";
import {
  MenuItem,
  Message
} from 'primeng/primeng';

@Component({
  selector: 'grh-ajout-personnel',
  templateUrl: '../../pages/grh/grhAjoutPersonnel.html',
  providers: [UserService, Constants, BaseService]
})

export class GrhAjoutPersonnel implements OnInit {
  submitted = false;
  error = '';
  msg = '';
  passwordSent = '';
  button = '';
  user: User;
  public success: String = '';
  countries: Country[];
  filteredCountries: Country[];
  country: Country;
  items: MenuItem[];
  activeIndex: number = 0;
  msgs: Message[] = [];
  buttonNbr: number = 1;
  navigationLabel: string = Constants.STEP2;
  nextRoute: string;
  
  roles: any[]= [];

  
  currentUser: User = JSON.parse(atob(Cookie.get('user')));

  I_AM_MEMBER: string = Constants.I_AM_MEMBER;
  SEND_ME_MY_PASSWORD: string = Constants.SEND_ME_MY_PASSWORD;
  I_AM_SUBSCRIBE: string = Constants.I_AM_SUBSCRIBE;
  MALE: string = Constants.MALE;
  FEMALE: string = Constants.FEMALE;
  STUDENT: string = Constants.STUDENT;
  PARENT: string = Constants.PARENT;
  TEACHER: string = Constants.TEACHER;
  DEP: string = Constants.DEP;
  DCMC: string = Constants.DCMC;
  COUNTRY_RESIDENCE: string = Constants.COUNTRY_RESIDENCE;
  LEVEL: string = Constants.LEVELS;
  SCHOOL_YEAR: string = Constants.SCHOOL_YEAR;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  COUNTRY_ORIGIN: string = Constants.COUNTRY_ORIGIN;

  constructor(
    private router: Router,
    private userService: UserService,
    private baseService: BaseService,
    private globalEventsManager: GlobalEventsManager,
    private route: ActivatedRoute) {
    this.user = new User();

    this.route.queryParams.subscribe(params => {
      this.nextRoute = params["nextRoute"];
      this.user.role = 3;
    });

    // Adébayor 27/07/2022
    this.roles = [];
    this.roles.push({label: 'Enseignant', value: 2});
    this.roles.push({label: 'Personnel', value: 15});
    this.roles.push({ label: 'DEP', value: 8 });
    this.roles.push({ label: 'DCMC', value: 9 });
    //this.roles.push({ label: 'GRH', value: 10 });
    this.roles.push({ label: 'Secretaire', value: 11 });
    this.roles.push({ label: 'Surveillant Evaluations', value: 12 });
    this.roles.push({ label: 'Stagiaire', value: 13 });
    this.roles.push({ label: 'CPE', value: 14 });
  }

  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }

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
    /*
    {
      label: Constants.CHOIX_FILIERE,
      command: (event: any) => {
        this.activeIndex = 2;
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: Constants.CHOIX_FILIERE, detail: event.item.label});
      }
    },
    */
    {
      label: Constants.CONFIRMATION,
      command: (event: any) => {
        this.activeIndex = 3;
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: Constants.CONFIRMATION, detail: event.item.label});
      }
    }
    ];

  }

  onSubmit() {

    if (this.activeIndex === 2) {
      this.submitted = true;
    }
  }

  private getAllCountries(): void {
    this.baseService.getAllCountries()
      .subscribe((data: Country[]) => this.countries = data,
      error => console.log(error),
      () => console.log('Get All Countries Complete'));
  }

  public saveUser() {
    this.error = '';
    this.msg = '';
    if (this.activeIndex === 0) {
      if (this.user.firstName == null || this.user.lastName == null ||
        this.user.password == null || this.user.email == null) {
        this.error = Constants.REQUIRED_FIELD_MISSING;
      } else if (this.user.role == null) {
        this.error = Constants.SELECT_ROLE;
      } else if (this.user.sex != null) {
        this.navigationLabel = Constants.STEP3;
        this.activeIndex = 1;
      } else {
        this.error = Constants.SELECT_SEX;
      }
    } else if (this.activeIndex === 1) {
      console.log(this.user);
      if (this.user.address == null || this.user.cityResidence == null ||
        this.user.countryResidence == null || this.user.phone == null) {
        this.error = Constants.REQUIRED_FIELD_MISSING;
      } else {
        //if (this.user.role === 3) { ça ne marche pas si on choisit un étudiant (role=3)
        if (this.user.role == 3) {
          this.navigationLabel = Constants.STEP4;
          this.activeIndex = 2;
        } else {
          this.navigationLabel = Constants.STEP1;
          this.activeIndex = 3;
        }
      }
    }
    else if (this.activeIndex === 3) {
      console.log(this.user);
      if (this.buttonNbr === 1) {
        this.activeIndex = 0;
        this.navigationLabel = Constants.STEP2;
    }
    else {
        try {
          if (this.user.role == null) {
            this.user.role = 15; //Employé simple
          }
          
          console.log(this.user);

          this.user.fromAdmin = true;

          this.userService.registerOnline(this.user)
            .subscribe(result => {
              if (result === true) {
                  this.msg = Constants.USER_ADDED;
                  this.activeIndex = 0;
                  this.user = new User();
              } else {
                  this.error = Constants.EMAIL_USED;
              }
            })
        }
        catch (e) {
          this.error = Constants.ERROR_OCCURRED;
        }
      }
    }
  }

  cancel() {
    this.router.navigate(['/systemeEnseignementInnovant']);
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

  handleDropdownClick() {
   // this.filteredCountries = [];
    setTimeout(() => {
      this.filteredCountries = this.countries;
    }, 100)
  }

}
