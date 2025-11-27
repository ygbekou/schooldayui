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
import {UserJpope} from '../models/UserJpope';
import {GlobalEventsManager} from "../services/globalEventsManager";
import { StudentService } from '../services/student.service';
import {MultiSelectModule} from 'primeng/multiselect';
import {StudentProjectTopicDropdown} from './dropdowns/dropdown.studentProjectTopic';
import {StudentProject} from "../models/studentProject";
import { StudentProjectService } from '../services/studentProject.service';
import {SelectItem} from 'primeng/api';
import {
  MenuItem,
  Message
} from 'primeng/primeng';
import { Student } from 'app/models/student';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-jpope-registration',
  templateUrl: '../pages/UserJpopeRegistration.html',
  providers: [UserService, CollegeService, LevelDropdown, Constants, BaseService, StudentProjectTopicDropdown, StudentProjectService]
})
export class UserJpopeRegistration implements OnInit {
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
  studentProject: StudentProject[] = [];
  country: Country;
  items: MenuItem[];
  activeIndex: number = 0;
  msgs: Message[] = [];
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

  studentProjectTopicDropdown: StudentProjectTopicDropdown;
  userJpope: UserJpope = new UserJpope();
  registered: boolean;
  selectedProjects: StudentProject[];


  constructor(
    private router: Router,
    private collegeService: CollegeService,
    private userService: UserService,
    private baseService: BaseService,
    private lvlDropdown: LevelDropdown,
    private globalEventsManager: GlobalEventsManager,
    private sptDropdown: StudentProjectTopicDropdown,
    private studentProjectService: StudentProjectService,
    private studentService: StudentService,
    
    private route: ActivatedRoute) {
    this.user = new User();

    this.levelDropdown = lvlDropdown;
    this.studentProjectTopicDropdown = sptDropdown;
    this.route.queryParams.subscribe(params => {
      this.nextRoute = params["nextRoute"];
      this.user.role = 3;
    });
  }

  ngOnInit() {
    this.getAllStudentProjectTopics();
    this.user = new User();
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

   private getAllStudentProjectTopics(): void {
    this.studentProjectService.getAll()
      .subscribe((data: StudentProject[]) => this.studentProject = data,
      error => console.log(error),
      () => console.log('Get All StudentProjects Complete'));
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
 
cancel(){
  this.router.navigate(['/']);
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

  handleSchoolYearDropdownClick() {
    //this.filteredSchoolYears = [];
    setTimeout(() => {
      this.filteredSchoolYears = this.schoolYears;
    }, 100)
  }


}
