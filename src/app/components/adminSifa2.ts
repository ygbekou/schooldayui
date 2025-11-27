import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';

import { Constants } from '../app.constants';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule, SelectItem, MenuItem } from 'primeng/primeng';
import { User } from '../models/User';  
import { SchoolYear } from 'app/models/schoolYear';
import { Country } from 'app/models/country';
import { BaseService, CollegeService, GlobalEventsManager, StudentService, UserService } from 'app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { College } from 'app/models/college';
import { LevelDropdown } from './dropdowns/dropdown.level';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-admin-sifa2',
  templateUrl: '../pages/adminSifa2.html',
  providers: [LevelDropdown]
})
export class AdminSifa2 implements OnInit, OnDestroy {

  @ViewChild('dt') dataTable: Table; 

  public users: User[];
  colleges : College[];
  filteredColleges: College[];
  public error: String = '';
  public selectedUser: User;
  public levelDropdown: LevelDropdown;
  displayDialog: boolean;
  user: User = new User();
  usercholarship: boolean;
  cols: any[];
  @ViewChild(FileUploader) fileUploader: FileUploader;
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  

 
  items: MenuItem[];
  schoolYears: SchoolYear[] = [];
  filteredSchoolYears: SchoolYear[] = [];
  activeIndex: number = 0;
  msgs: any;

  citizenship :Country;
  schoolYear1 : SchoolYear;
  residenceCountry : Country;
  maritalStatusOption: SelectItem;
  bacMention: SelectItem;

  bourse1: boolean = false;
  bourse2: boolean = false;


  MALE: string = Constants.MALE;
  FEMALE: string = Constants.FEMALE;
  STUDENT: string = Constants.STUDENT;
  PARENT: string = Constants.PARENT;
  TEACHER: string = Constants.TEACHER;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  navigationLabel: string = Constants.STEP2;
  COUNTRY_ORIGIN: string = Constants.COUNTRY_ORIGIN;


  filteredCountries: Country[];
  countries: Country[];
  nextRoute: string;
  buttonNbr: number = 1;

  changeView : boolean = true;
  
  constructor
    (
    private changeDetectorRef: ChangeDetectorRef,
    private baseService: BaseService,
    private router: Router,
    private collegeService: CollegeService,
    private userService: UserService,
    private globalEventsManager: GlobalEventsManager,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private lvlDropdown: LevelDropdown,
    ) {

      this.levelDropdown = lvlDropdown;
      this.route.queryParams.subscribe(params => {
        this.nextRoute = params["nextRoute"];
        this.user.role = 3;
      });
      
  }
  ngOnInit() {
    this.cols = [
      { field: 'lastName', header: "Nom", sortable: 'true', filter: 'true'},    
      { field: 'firstName', header: "Prenom", sortable: 'true', filter: 'true'},
      { field: 'birthDate', header: "Date", type: 'Date', sortable: 'true' },
      { field: 'email', header: "Email", sortable: 'true', filter: 'true' },
      { field: 'sex', header:"Sexe", sortable: 'true', filter: 'true' }
    ];


    this.getAllCountries();

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

  ngOnDestroy() {
    this.users = null;
    this.error = null;
    this.selectedUser= null;
    this.user = null;
    //this.cols=null;
  }

  public getAll(): void {
    this.users = [];
    this.userService.loadAllBourse2SifaUsers()
      .subscribe((data: User[]) => {
        this.users = data;
        this.users.forEach(user => {
          this.studentService.getOnlineRegistrationsByUser(0, user)
          .subscribe(result => {
          user.level = result[0].level;

      });
         
      });
      },
      error => console.log(error),
      () => console.log('Get all Bourse Sifa Users complete'));
  }


  showDialogToAdd() {
    this.usercholarship = true;
    this.user = new User();
    this.displayDialog = true;
  }

  delete(data) {

    console.log(data);
    // try {
    //   this.error = '';
    //   this.userService.deleteUserOlineregistration(data)
    //     .subscribe(result => {
    //       if (result) {
    //         this.removeFromTable();
    //       }
    //       else {
    //         this.error = Constants.deleteFailed;
    //         this.displayDialog = true;
    //       }
    //     })
    // }
    // catch (e) {
    //   console.log(e);
    // }
  }

  putInTable() {
    if (this.usercholarship)
      this.users.push(this.user);
    else
      this.users[this.findSelectedIndex()] = this.user;
    
    var onTheFly : User [] = [];
    onTheFly.push(...this.users);
    this.users = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.users.splice(this.findSelectedIndex(), 1);
     var onTheFly : User [] = [];
    onTheFly.push(...this.users);
    this.users = onTheFly;
    this.resetData();
  }

  resetData() {
    this.user = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.usercholarship = false;
    this.user = this.clone(evt.data);
    // this.user.userDate = new Date(this.user.userDate);
    this.displayDialog = true;
  }

  clone(e: User): User {
    let aUser = new User();
    for (let prop in e) {
      aUser[prop] = e[prop];
    }
    return aUser;
  }

  findSelectedIndex(): number {
    return this.users.indexOf(this.selectedUser);
  }



  setCurrentUser(aUser) {
    Cookie.set('userId', aUser.id);
  }





  public saveUser() {
    try {
      if (this.user.role == null) {
        this.user.role = 3;//this is a student
      }
      this.user.event = "BOURSE"; //Evénement INSCRIPTION
      this.user.nationality = this.citizenship;
      console.log(this.user);
      this.userService.registerOnline(this.user)
        .subscribe(result => {

          console.log(result);


          // if (result === true) {

          //   if (this.nextRoute != null) {
          //     console.log('With route'+this.nextRoute);
          //     this.router.navigate([this.nextRoute]);
          //   }
          //   else {
          //     this.user = JSON.parse(atob(Cookie.get('user')));
          //     console.log('No route'+this.user);
          //     if (this.user.role === 3) {//student
          //       this.router.navigate(["/student/studentMain"]);
          //     } else if (this.user.role === 2) {//teacher
          //       this.router.navigate(["/teacher/teacherMain"]);
          //     } else if (this.user.role === 1) {//admin
          //       this.router.navigate(["/admin/adminMain"]);
          //     } else if (this.user.role === 4) {//parent
          //       this.router.navigate(["/parent/parentMain"]);
          //     } else {
          //       this.router.navigate(["/"]);
          //     }
          //   // window.location.reload();
          //   }
          // } else {
          //   this.error = Constants.EMAIL_USED;
          // }
        })
    }
    catch (e) {
      this.error = Constants.ERROR_OCCURRED;
    }
  }


  previousStep() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  nextStep() {

    // if (this.activeIndex === 0) {
    //   if (this.user.firstName == null || this.user.lastName == null ||
    //     this.user.birthDate == null || this.user.sex == null || this.user.cityOfBirth == null ||
    //     this.citizenship == null || this.user.address == null || this.user.zipCode == null || 
    //   this.user.countryResidence == null || this.user.phone == null) {
    //     this.error = Constants.REQUIRED_FIELD_MISSING;
    //   } else {

       
    //       this.activeIndex++;

        
    //   } 
    // }else if(this.activeIndex === 1){

    //   if (this.user.lastDegree == null || this.user.schoolYear == null
       
    //     ) {
    //     this.error = Constants.REQUIRED_FIELD_MISSING;
    //   } else if(this.user.level == null){
    //     this.error = "Choisissez une filière pour la rentrée dans laquelle vous souhaitez vous inscrire"
    //   }
    //   else {
      
    //       this.activeIndex++;
  
    //   }

    // }else if(this.activeIndex === 2){

    //   this.activeIndex++;

    // }

    if (this.activeIndex < 3) { 
      this.activeIndex++;
    }
  }


  onBourseChange(isBourse1: boolean) {
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
  filterCountry(event) {
    const query = event.query;
    this.filteredCountries = [];
    for (let i = 0; i < this.countries.length ; i++) {
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

  handleSchoolYearDropdownClick() {
    //this.filteredSchoolYears = [];
    setTimeout(() => {
      this.filteredSchoolYears = this.schoolYears;
    }, 100)
  }

  private getAllCountries(): void {
    this.baseService.getAllCountries()
      .subscribe((data: Country[]) => this.countries = data,
      error => console.log(error),
      () => console.log('Get All Countries Complete'));
  }

  onChange(change : boolean){
    this.user.hasMedicalCertification = !this.user.hasMedicalCertification;
  }

}
