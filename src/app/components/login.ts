import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { College } from "../models/college";
import { SchoolYear } from "../models/schoolYear";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { UserService } from "../services/user.service";
import { CollegeService } from "../services/college.service";
import { BaseService } from "../services/base.service";
import { Constants } from "../app.constants";
import { User } from "../models/User";
import { LevelDropdown } from "./dropdowns/dropdown.level";
import { Country } from "../models/country";
import { GlobalEventsManager } from "../services/globalEventsManager";
import { StudentService } from "../services/student.service";
import { MenuItem, Message } from "primeng/primeng";
import { Student } from "app/models/student";
import { UserJpope } from "app/models/UserJpope";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "user-login-form",
  templateUrl: "../pages/login.html",
  providers: [
    UserService,
    CollegeService,
    LevelDropdown,
    Constants,
    BaseService,
  ],
  styleUrls: ["../css/login.css"],
})
export class Login implements OnInit {
  submitted = false;
  error = "";
  passwordSent = "";
  button = "";
  user: User;
  public success: String = "";
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
  buttonNbr: number = 1;
  navigationLabel: string = Constants.STEP2;
  nextRoute: string;
  public levelDropdown: LevelDropdown;
  public student: Student = new Student();
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
  constructor(
    private router: Router,
    private collegeService: CollegeService,
    private userService: UserService,
    private baseService: BaseService,
    private lvlDropdown: LevelDropdown,
    private globalEventsManager: GlobalEventsManager,
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {
    this.user = new User();

    this.levelDropdown = lvlDropdown;
    this.route.queryParams.subscribe((params) => {
      this.nextRoute = params["nextRoute"];
      this.user.role = 3;
    });
  }

  ngOnInit() {
    this.user = new User();
    this.getAllCountries();
    this.items = [
      {
        label: Constants.INFO_PERSONNELLE,
        command: (event: any) => {
          this.activeIndex = 0;
          this.msgs.length = 0;
          this.msgs.push({
            severity: "info",
            summary: Constants.INFO_PERSONNELLE,
            detail: event.item.label,
          });
        },
      },
      {
        label: Constants.CONTACT,
        command: (event: any) => {
          this.activeIndex = 1;
          this.msgs.length = 0;
          this.msgs.push({
            severity: "info",
            summary: Constants.CONTACT,
            detail: event.item.label,
          });
        },
      },
      {
        label: Constants.CHOIX_FILIERE,
        command: (event: any) => {
          this.activeIndex = 2;
          this.msgs.length = 0;
          this.msgs.push({
            severity: "info",
            summary: Constants.CHOIX_FILIERE,
            detail: event.item.label,
          });
        },
      },
      {
        label: Constants.CONFIRMATION,
        command: (event: any) => {
          this.activeIndex = 3;
          this.msgs.length = 0;
          this.msgs.push({
            severity: "info",
            summary: Constants.CONFIRMATION,
            detail: event.item.label,
          });
        },
      },
    ];

    this.collegeService.getAll().subscribe(
      (data: College[]) => (this.colleges = data),
      (error) => console.log(error),
      () => console.log("Get all Colleges complete")
    );

    this.baseService.getAllSchoolYears().subscribe(
      (data: SchoolYear[]) => (this.schoolYears = data),
      (error) => console.log(error),
      () => console.log("Get all SchoolYears complete")
    );
  }

  saveUserJpope() {
    this.baseService.saveJpope(this.userJpope).subscribe((resp) => {
      this.registered = resp;
      if (this.registered === true) {
        this.msgs.push({
          severity: "success",
          summary: "Success",
          detail: "Vous êtes inscrit avec succés",
        });
        setTimeout(() => {
          this.router.navigate(["/"]);
        }, 2000);
      } else {
        this.error = "Veuillez remplir tous les champs";
      }
    });
  }

  public login() {
    try {
      if (this.button == "password") {
        this.sendPassword();
      } else {
        this.userService.login(this.user).subscribe((result) => {
          if (result == true) {
            this.globalEventsManager.showNavBar.emit(this.user);

            if (this.nextRoute != null) {
              this.router.navigate([this.nextRoute]);
            } else {
              this.user = JSON.parse(atob(Cookie.get("user")));

              // this.user.isAllowedToConnect = true;
              // this.user.isCurrentlyConnected = true;
              // this.user.lastLoginDate = new Date();

              // this.userService.saveUser(this.user).subscribe((result) => {
              //   if (result == "Success") {
              //     // this.success = Constants.saveSuccess;
              //   } else {
              //     // this.error = Constants.saveNotSuccess +", "+ result;
              //   }
              // });


              if (this.user.role === 3) {
                //student
                this.router.navigate(["/student/studentMain"]);
              } else if (this.user.role === 2) {
                //teacher
                this.router.navigate(["/teacher/teacherMain"]);
                // } else if (this.user.role === 1 || this.user.role === 5) {//admin
              } else if (this.user.role === 1) {
                //admin
                this.router.navigate(["/admin/adminDemand"]);
              } else if (this.user.role === 4) {
                //parent
                this.router.navigate(["/parent/parentMain"]);
              } else if (this.user.role === 6) {
                //Kiosk
                this.router.navigate(["/kiosk/kioskMain"]);
              } else if (this.user.role === 8) {
                //DEP
                this.router.navigate(["/dep/depMain"]);
              } else if (this.user.role === 9) {
                //DCMC
                this.router.navigate(["/dcmc/dcmcMain"]);
              } else if (this.user.role === 10) {
                //GRH
                this.router.navigate(["/grh/grhMain"]);
              } else if (this.user.role === 11) {
                //NOUVEAU SECRETAIRE 09062020
                this.router.navigate(["/secretaire/information"]);
              } else if (this.user.role === 13) {
                //Stagiaire
                this.router.navigate(["/stagiaire/stagiaireDemand"]);
              } else if (this.user.role === 14) {
                //CPE
                this.router.navigate(["/cpe/cpeDashboard"]);
              } else if (this.user.role === 15) {
                //PERSONNEL
                this.router.navigate(["/"]);
              } else {
                this.router.navigate(["/"]);
              }
            }
          } else {
            this.error = Constants.INVALID_USER_PASS;
          }
        });
      }
    } catch (e) {
      this.error = Constants.ERROR_OCCURRED;
    }
  }

  // public login() {
  //   try {
  //     if (this.button === "password") {
  //       this.sendPassword();
  //     } else {
  //       this.userService.login(this.user).subscribe({
  //         next: (result) => {
  //           if (result === true) {
  //             this.globalEventsManager.showNavBar.emit(this.user);

  //             let parsedUser: User | null = null;
  //             const cookieValue = Cookie.get("user");

  //             if (cookieValue) {
  //               try {
  //                 parsedUser = Object.assign(
  //                   new User(),
  //                   JSON.parse(atob(cookieValue))
  //                 );
  //               } catch (e) {
  //                 console.error(
  //                   "Erreur de décodage du cookie utilisateur :",
  //                   e
  //                 );
  //               }
  //             }

  //             console.log(parsedUser, "+++++++++++++++++++++++");

  //             if (parsedUser) {
  //               this.user = parsedUser;
  //               this.user.isAllowedToConnect = true;
  //               this.user.isCurrentlyConnected = true;
  //               this.user.lastLoginDate = new Date();
  //             }

  //             // Redirection en fonction du rôle
  //             const routeMap: { [key: number]: string } = {
  //               3: "/student/studentMain",
  //               2: "/teacher/teacherMain",
  //               1: "/admin/adminDemand",
  //               4: "/parent/parentMain",
  //               6: "/kiosk/kioskMain",
  //               8: "/dep/depMain",
  //               9: "/dcmc/dcmcMain",
  //               10: "/grh/grhMain",
  //               11: "/secretaire/information",
  //               13: "/stagiaire/stagiaireDemand",
  //               14: "/cpe/cpeDashboard",
  //               15: "/",
  //             };

  //             if (this.nextRoute != null) {
  //               this.router.navigate([this.nextRoute]);
  //             } else if (this.user && routeMap[this.user.role]) {
  //               this.router.navigate([routeMap[this.user.role]]);
  //             } else {
  //               this.router.navigate(["/"]);
  //             }
  //           } else {
  //             this.error = Constants.INVALID_USER_PASS;
  //           }
  //         },
  //         error: (err) => {
  //           console.error("Erreur lors de l'appel à login :", err);
  //           this.error = Constants.ERROR_OCCURRED;
  //         },
  //       });
  //     }
  //   } catch (e) {
  //     console.error("Erreur inattendue :", e);
  //     this.error = Constants.ERROR_OCCURRED;
  //   }
  // }

  public sendPassword() {
    try {
      this.userService.sendPassword(this.user).subscribe((result) => {
        if (result === true) {
          this.passwordSent = Constants.PASSWORD_SENT + this.user.email;
        } else {
          this.error = Constants.PASSWORD_NOT_SENT;
        }
      });
    } catch (e) {
      this.error = Constants.ERROR_OCCURRED;
    }
  }

  private getAllCountries(): void {
    this.baseService.getAllCountries().subscribe(
      (data: Country[]) => (this.countries = data),
      (error) => console.log(error),
      () => console.log("Get All Countries Complete")
    );
  }
  onSubmit() {
    if (this.activeIndex === 2) {
      this.submitted = true;
    }
  }
  public saveUser() {
    this.error = "";
    if (this.activeIndex === 0) {
      if (
        this.user.firstName == null ||
        this.user.lastName == null ||
        this.user.password == null ||
        this.user.email == null
      ) {
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
      if (
        this.user.address == null ||
        this.user.cityResidence == null ||
        this.user.countryResidence == null ||
        this.user.phone == null
      ) {
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
    } else if (this.activeIndex === 2) {
      if (
        this.user.currentDiploma == null ||
        this.user.level == null ||
        this.user.schoolYear == null ||
        this.user.typeFormation == null
      ) {
        this.error = Constants.REQUIRED_FIELD_MISSING;
      } else {
        this.navigationLabel = Constants.STEP1;
        this.activeIndex = 3;
      }
    } else if (this.activeIndex === 3) {
      if (this.buttonNbr === 1) {
        this.activeIndex = 0;
        this.navigationLabel = Constants.STEP2;
      } else {
        try {
          if (this.user.role == null) {
            this.user.role = 3; //this is a student
          }
          this.user.event = "INSCRIPTION"; //Evénement INSCRIPTION
          console.log(this.user);
          this.userService.registerOnline(this.user).subscribe((result) => {
            if (result === true) {
              if (this.nextRoute != null) {
                console.log("With route" + this.nextRoute);
                this.router.navigate([this.nextRoute]);
              } else {
                this.user = JSON.parse(atob(Cookie.get("user")));
                console.log("No route" + this.user);
                if (this.user.role === 3) {
                  //student
                  this.router.navigate(["/student/studentMain"]);
                } else if (this.user.role === 2) {
                  //teacher
                  this.router.navigate(["/teacher/teacherMain"]);
                } else if (this.user.role === 1) {
                  //admin
                  this.router.navigate(["/admin/adminMain"]);
                } else if (this.user.role === 4) {
                  //parent
                  this.router.navigate(["/parent/parentMain"]);
                } else {
                  this.router.navigate(["/"]);
                }
                // window.location.reload();
              }
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

  //enr�gistrement d'un enseignant pour la formation
  public saveUserOnline() {
    this.user.password = "secretFormation2019";
    this.user.address = "Formation des enseignants du Togo";
    this.user.cityResidence = "1";
    this.user.countryResidence1 = 215;
    this.user.level1 = 136;
    this.user.role = 3;

    this.user.birthDate = new Date();

    try {
      this.userService.saveUserOnline(this.user).subscribe((result) => {
        if (result === true) {
          this.router.navigate(["/"]);
        } else {
          this.error = "Veuillez remplir tous les champs";
        }
      });
    } catch (e) {
      this.error = Constants.ERROR_OCCURRED;
    }
  }

  setStudent(user: User) {
    this.studentService.getByUser(user).subscribe(
      (data: Student) => {
        this.student = data;
        if (
          this.student &&
          this.student !== undefined &&
          this.student.registrationDate !== null
        ) {
          this.student.registrationDate = new Date(
            this.student.registrationDate
          );
        }
        this.student.user = user;
      },
      (error) => console.log(error),
      () => console.log("Get student complete")
    );
  }

  save() {
    try {
      this.error = "";
      this.success = "";
      this.studentService.save(this.student).subscribe((result) => {
        if (result.id > 0) {
          this.student = result;
          this.student.registrationDate = new Date(
            this.student.registrationDate
          );
          this.success = Constants.saveSuccess;
        } else {
          this.error = Constants.saveFailed;
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  cancel() {
    this.router.navigate(["/systemeEnseignementInnovant"]);
  }

  cancelJpope() {
    this.router.navigate(["/"]);
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
    }, 100);
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
    }, 100);
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
    }, 100);
  }
}
