import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {College} from '../models/college';
import {SchoolYear} from '../models/schoolYear';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {UserService} from '../services/user.service';
import {CollegeService} from '../services/college.service';
import {BaseService} from '../services/base.service';
import {Constants} from '../app.constants';
import {User} from '../models/User';
import {LevelDropdown} from './dropdowns/dropdown.level';
import {Country} from '../models/country';
import {GlobalEventsManager} from "../services/globalEventsManager";
import { StudentService } from '../services/student.service';
import {
  MenuItem,
  Message
} from 'primeng/primeng';
import { Student } from 'app/models/student';
import { UserJpope } from 'app/models/UserJpope';
import { LevelService } from 'app/services';
import { Level } from 'app/models/level';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bourse-online',
  templateUrl: '../pages/bourseOnline.html',
  providers: [UserService, CollegeService, LevelDropdown, Constants, BaseService]
})

export class BourseOnline implements OnInit {
  submitted = false;
  error = '';
  passwordSent = '';
  button = '';
  user: User;
  public success: String = '';
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
  levels : Level[] = []; 
  citizenship :Country;
  buttonNbr: number = 1;
  navigationLabel: string = Constants.STEP2;
  nextRoute: string;
  public levelDropdown: LevelDropdown;
  public student: Student  = new Student();
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
  userJpope: UserJpope = new UserJpope();
  registered: boolean;
  patience : boolean = false;
  bourse1: boolean = false;
  bourse2: boolean = false;
  constructor(
    private router: Router,
    private collegeService: CollegeService,
    private userService: UserService,
    private baseService: BaseService,
    private levelService: LevelService,
    private lvlDropdown: LevelDropdown,
    private globalEventsManager: GlobalEventsManager,
    private studentService: StudentService,
    private route: ActivatedRoute) {
    this.user = new User();
    

    this.levelDropdown = lvlDropdown;
    this.route.queryParams.subscribe(params => {
      this.nextRoute = params["nextRoute"];
      this.user.role = 3;
    });
  }

  ngOnInit() {

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
      label: "Inscription",
      command: (event: any) => {
        this.activeIndex = 1;
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: Constants.CONTACT, detail: event.item.label});
      }
    },
    {
      label: "Autres Informations",
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

  saveUserJpope(){
    this.baseService.saveJpope(this.userJpope).subscribe(
      resp => {
        this.registered = resp;
        if(this.registered === true){
          this.msgs.push({severity: 'success', summary: 'Success', detail: 'Vous �tes inscrit avec succ�s'});
          setTimeout(() => {
          this.router.navigate(['/']);
          }, 2000)
          
        }else{
           this.error = 'Veuillez remplir tous les champs';
        }
      }

    )
}

  public login() {
    try {
      if (this.button == 'password') {
        this.sendPassword();
      } else {
        this.userService.login(this.user)
          .subscribe(result => {
            if (result == true) {

              this.globalEventsManager.showNavBar.emit(this.user);

              if (this.nextRoute != null) {
                this.router.navigate([this.nextRoute]);
              }
              else {
                this.user = JSON.parse(atob(Cookie.get('user')));
                if (this.user.role === 3) {//student
                  this.router.navigate(["/student/studentMain"]);
                } else if (this.user.role === 2) {//teacher
                  this.router.navigate(["/teacher/teacherMain"]);
                } else if (this.user.role === 1 || this.user.role === 5) {//admin+ secretaire
                  this.router.navigate(["/admin/adminDemand"]);
                } else if (this.user.role === 4) {//parent
                  this.router.navigate(["/parent/parentMain"]);
                } else if (this.user.role === 6) {//Kiosk
                  this.router.navigate(["/kiosk/kioskMain"]);
                } else if (this.user.role === 8) {//DEP
                  this.router.navigate(["/dep/depMain"]);
                } else if (this.user.role === 9) {//DCMC
                  this.router.navigate(["/dcmc/dcmcMain"]);
                } else if (this.user.role === 10) {//GRH
                  this.router.navigate(["/grh/grhMain"]);
                } else if (this.user.role === 11) {//NOUVEAU SECRETAIRE 09062020
                  this.router.navigate(["/secretaire/information"]);
                } else if (this.user.role === 13) {//Stagiaire
                  this.router.navigate(["/stagiaire/stagiaireDemand"]);
                }  else if (this.user.role === 14) {//CPE
                  this.router.navigate(["/cpe/cpeDashboard"]);
                } else {
                  this.router.navigate(["/"]);
                }
              }

            }
            else {
              this.error = Constants.INVALID_USER_PASS;
            }
          })
      }
    }
    catch (e) {
      this.error = Constants.ERROR_OCCURRED;
    }


  }

  public sendPassword() {
    try {
      this.userService.sendPassword(this.user)
        .subscribe(result => {
          if (result === true) {
            this.passwordSent = Constants.PASSWORD_SENT + this.user.email;
          }
          else {
            this.error = Constants.PASSWORD_NOT_SENT;
          }
        })
    }
    catch (e) {
      this.error = Constants.ERROR_OCCURRED
    }

  }

  private getAllCountries(): void {
    this.baseService.getAllCountries()
      .subscribe((data: Country[]) => this.countries = data,
      error => console.log(error),
      () => console.log('Get All Countries Complete'));
  }
  onSubmit() {

    if (this.activeIndex === 2) {
      this.submitted = true;
    }
  }
  public saveUser() {
    try {
      if (this.user.role == null) {
        this.user.role = 3;//this is a student
      }
      this.user.event = "BOURSE"; //Evénement INSCRIPTION
      this.user.nationality = this.citizenship;
      console.log(this.user);
      this.patience = true;
      this.userService.registerOnline(this.user)
        .subscribe(result => {

          if (result === true) {

            if (this.nextRoute != null) {
              console.log('With route'+this.nextRoute);
              this.router.navigate([this.nextRoute]);
            }
            else {
              this.user = JSON.parse(atob(Cookie.get('user')));
              console.log('No route'+this.user);
              if (this.user.role === 3) {//student
                this.router.navigate(["/student/studentMain"]);
              } else if (this.user.role === 2) {//teacher
                this.router.navigate(["/teacher/teacherMain"]);
              } else if (this.user.role === 1) {//admin
                this.router.navigate(["/admin/adminMain"]);
              } else if (this.user.role === 4) {//parent
                this.router.navigate(["/parent/parentMain"]);
              } else {
                this.router.navigate(["/"]);
              }
            // window.location.reload();
            }
          } else {
            this.error = Constants.EMAIL_USED;
            this.patience = false;
          }
        })
    }
    catch (e) {
      this.error = Constants.ERROR_OCCURRED;
    }
  }

  //enr�gistrement d'un enseignant pour la formation
    public saveUserOnline() {
      this.user.password = 'secretFormation2019';
      this.user.address = 'Formation des enseignants du Togo';
      this.user.cityResidence = '1';
      this.user.countryResidence1 = 215;
      this.user.level1 = 136;
      this.user.role = 3;

      this.user.birthDate = new Date();

       try {
          this.userService.saveUserOnline(this.user)
            .subscribe(result => {
              if (result === true) {
                  this.router.navigate(['/']);
              } else {
                this.error = 'Veuillez remplir tous les champs';
              }
            })
        }
        catch (e) {
          this.error = Constants.ERROR_OCCURRED;
        }
  }

  setStudent(user: User) {
     this.studentService.getByUser(user)
      .subscribe((data: Student) => {

        this.student = data
        if (this.student && this.student !== undefined && this.student.registrationDate !== null) {
          this.student.registrationDate = new Date(this.student.registrationDate);
        }
        this.student.user = user;
      },
      error => console.log(error),
      () => console.log('Get student complete'));
  }

  save() {
    try {
        this.error = '';
        this.success = '';
        this.studentService.save(this.student)
        .subscribe(result => {
          if (result.id > 0) {
            this.student = result;
            this.student.registrationDate = new Date(this.student.registrationDate);
            this.success = Constants.saveSuccess;
          }
          else {
            this.error = Constants.saveFailed;
          }
        })
    }
    catch (e) {
      console.log(e);
    }


  }
  cancel() {
    this.router.navigate(['/systemeEnseignementInnovant']);
  }

  cancelJpope(){
    this.router.navigate(['/']);
  }


  //fin enr�gistrement simple des enseignants

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

  handleBourseSchoolYearDropdownClick() {
    //this.filteredSchoolYears = [];
    setTimeout(() => {
      this.filteredSchoolYears = this.schoolYears.filter((s)=>s.id >= 15);
    }, 100)
  }

  handleSchoolYearDropdownClick() {
    //this.filteredSchoolYears = [];
    setTimeout(() => {
      this.filteredSchoolYears = this.schoolYears;
    }, 100)
  }

  previousStep() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  nextStep() {

    if (this.activeIndex === 0) {
      if (this.user.firstName == null || this.user.lastName == null ||
        this.user.birthDate == null || this.user.cityOfBirth == null ||
        this.citizenship == null || this.user.address == null || 
      this.user.countryResidence == null || this.user.phone == null) {
        this.error = Constants.REQUIRED_FIELD_MISSING;
      } else if(this.user.sex == null){
        this.error = "Spécifiez votre sexe"

      } else {
        this.error="";
          this.activeIndex++;

        
      } 
    }else if(this.activeIndex === 1){

      if (this.user.lastDegree == null || this.user.schoolYear == null
       
        ) {
        this.error = Constants.REQUIRED_FIELD_MISSING;
      } else if(this.user.level == null){
        this.error = "Choisissez une filière pour la rentrée dans laquelle vous souhaitez vous inscrire"
      }
      else {
        this.error="";
          this.activeIndex++;
  
      }

    }else if(this.activeIndex === 2){
      this.error="";
      this.activeIndex++;

    }

    // if (this.activeIndex < 3) { 
    //   this.activeIndex++;
    // }
  }


  onBourseChange(isBourse1: boolean) {
    this.user.level=null;
    if (isBourse1) {
      this.bourse1 = true;
      this.bourse2 = false;
      this.user.bourseSifaW3 = 1;
    } else {
      this.bourse2 = true;
      this.bourse1 = false;
      this.user.bourseSifaW3 = 2;
    }
  }

  onChange(change : boolean){
    this.user.hasMedicalCertification = !this.user.hasMedicalCertification;
  }


}
