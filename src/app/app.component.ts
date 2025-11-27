import { NewsLetter } from "./models/newsLetter";
import { Level } from "./models/level";
import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "./models/User";
import { Cycle } from "./models/cycle";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { College } from "./models/college";
import { CycleService } from "./services/cycle.service";
import { CollegeService } from "./services/college.service";
import { GlobalEventsManager } from "./services/globalEventsManager";
import { Constants } from "./app.constants";
import { BaseService } from "./services/base.service";
import { School } from "./models/school";
import { UserService } from "./services";
import { SchoolService } from "./services/school.service";

@Component({
  moduleId: "module.id",
  selector: "app-root",
  templateUrl: "./app.component.html",
  providers: [CollegeService, Constants, CycleService, BaseService],
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  user: User;
  userS: User;
  message: string;
  mailError: boolean;
  currentUserCookie: string;
  public cycles: Cycle[];
  public cyclesLm: Cycle[];
  public cyclesFm: Cycle[];
  newsLetter: NewsLetter = new NewsLetter();
  SEARCH_WEBSITE: string = Constants.SEARCH_WEBSITE;
  LOGOUT: string = Constants.LOGOUT;
  public colleges: College[];
  displayDialog: boolean;
  error: string;
  nextRoute: string;
  route: string;

  private previousUserCookie: string = null;
  private cookieCheckInterval: any;

  constructor(
    private router: Router,
    private cycleService: CycleService,
    private collegeService: CollegeService,
    private baseService: BaseService,
    private globalEventsManager: GlobalEventsManager,
    private userService: UserService,
    private schoolService: SchoolService,
    private route1: ActivatedRoute
  ) { }

  ngOnInit() {
    //console.log('in AppComponent init');
    /*if(window.location.href.includes('concours'))
      this.router.navigateByUrl('onlineRegistration?event=CONCOURS')*/

    this.loadUserFromCookie();

    this.startUserCookieWatcher();

    let currentUrl = window.location.href;

    let schoolName = this.route1.snapshot.paramMap.get('schoolName');

    this.route1.paramMap.subscribe((params) => {
      let schoolName = params["schoolName"];

      this.schoolService.getByNamePath(schoolName).subscribe(
      (data: School) => {
        console.log('School: ' + JSON.stringify(data))
        Cookie.set("school", btoa(JSON.stringify(JSON.stringify(data))));
      },
      (error) => console.log(error),
      () => console.log("Get School complete")
    );

    });

    

    this.cycles = [];
    this.cycleService.getAllWithCollge().subscribe(
      (data: Cycle[]) => {
        this.cycles = data;
        this.cyclesLm = this.cycles.filter((s) => s.cycleType == 1);
        this.cyclesFm = this.cycles.filter((s) => s.cycleType == 2);

        // console.log(this.cyclesLm);
      },
      (error) => console.log(error),
      () => console.log("Get all Cycles complete")
    );

    this.baseService.getSchool().subscribe(
      (data: School) => {
        Cookie.set("lmd", data.lmdUsed ? "1" : "0");
      },
      (error) => console.log(error),
      () => console.log("Get school complete")
    );

    this.colleges = [];
    this.collegeService.getAllWithLevel().subscribe(
      (data: College[]) => {
        this.colleges = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].collegeType === 1) {
            this.colleges.push(data[i]);
          }
        }
        // this.colleges.reverse();
        // console.log(this.colleges);
      },
      (error) => console.log(error),
      () => console.log("Get all Colleges complete")
    );

    this.globalEventsManager.showNavBar.subscribe(
      (data: boolean) => {
        console.log("reached");
        this.user = JSON.parse(atob(Cookie.get("user")));
      },
      (error) => console.log(error)
    );
  }

  ngOnDestroy() {
    if (this.cookieCheckInterval) {
      clearInterval(this.cookieCheckInterval);
    }
  }

  public logout() {
    this.deconnexion(this.user);
    Cookie.deleteAll();
    this.user = new User();
    this.router.navigate(["/"]);
  }

  public updateUser(aUser) {
    this.user = aUser;
  }
  public refreshUser() {
    this.user = JSON.parse(atob(Cookie.get("user")));
    if (this.user == null) {
      this.user = new User();
    }
  }

  setCurrentCollege(college) {
    Cookie.set("collegeId", college.id);
  }

  onActivate(event) {
    // window.scroll(0,0);

    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    //document.body.scrollTop = 0;
    //document.querySelector('body').scrollTo(0,0)
  }

  saveEmail() {
    this.message = "";
    if (!this.newsLetter.email) {
      this.message = "🛑 Renseignez votre email !!";
    } else if (
      !/^[a-z0-9.-]+@[a-z0-9.-]+\.[a-z]+$/.test(this.newsLetter.email)
    ) {
      this.message = "❌ Adresse e-mail invalide !";
    } else {
      this.userService.saveNewsLetter(this.newsLetter).subscribe((result) => {
        if (result == 0) {
          this.message = "❌ Cet email a été déjà enregistré !!";
        } else if (result == 1) {
          this.message = "✅ Votre e-mail a été enregistré avec succès !";
        }
      });
    }
  }

  showLoginForm2() {
    if (this.user.id > 0) {
      this.router.navigate(["/Projets_new"]);
    } else {
      this.route = "/Projets_new";
      this.displayDialog = true;
    }
  }

  showLoginForm() {
    if (this.user.id > 0) {
      this.router.navigate(["/Projets_interFilieres"]);
    } else {
      this.route = "/Projets_interFilieres";
      this.displayDialog = true;
    }
  }
  showLoginForm3() {
    if (this.user.id > 0) {
      this.router.navigate(["/Projets_Marketing_Digital"]);
    } else {
      this.route = "/Projets_Marketing_Digital";
      this.displayDialog = true;
    }
  }

  showLoginForm4() {
    if (this.user.id > 0) {
      this.router.navigate(["/Projets_Support_IT_Dig"]);
    } else {
      this.route = "/Projets_Support_IT_Dig";
      this.displayDialog = true;
    }
  }

  public login() {
    try {
      this.userService.login(this.user).subscribe((result) => {
        if (result == true) {
          this.globalEventsManager.showNavBar.emit(this.user);

          if (this.nextRoute != null) {
            this.router.navigate([this.nextRoute]);
          }

          this.displayDialog = false;
          this.router.navigate([this.route]);
        } else {
          this.error = "Nom d'utilisateur et/ou mot de passe invalide";
        }
      });
    } catch (e) {
      this.error = "Une erreur systeme s'est produite";
    }
  }

  closeDialog() {
    this.error = "";
    this.displayDialog = false;
  }

  private loadUserFromCookie(): void {
    const encodedUser = Cookie.get("user");

    if (!encodedUser) {
      this.initGuestUser();
      return;
    }

    try {
      const decoded = atob(encodedUser);
      this.user = JSON.parse(decoded);

      try {
        this.userService.getById(JSON.parse(decoded)).subscribe((result) => {
          this.user = result;


          if (!this.user || !this.user.allowedToConnect) {
            this.logoutAndRedirect();
            return;
          }
        });
      } catch (e) {
        this.error = "Une erreur systeme s'est produite";
      }


    } catch (error) {
      console.error("Erreur de décodage du cookie utilisateur :", error);
      this.logoutAndRedirect();
    }
  }

  private logoutAndRedirect(): void {
    this.deconnexion(this.user);
    Cookie.deleteAll();
    this.user = new User();
    this.router.navigate(["/login"]);
  }

  private initGuestUser(): void {
    this.user = new User();
    this.user.id = 0;
    this.user.firstName = "";
    this.user.lastName = "";
  }

  private startUserCookieWatcher(): void {
    this.cookieCheckInterval = setInterval(() => {
      const currentUserCookie = Cookie.get("user");

      if (currentUserCookie !== this.previousUserCookie) {
        this.previousUserCookie = currentUserCookie;
        this.loadUserFromCookie();
      } else {
        // console.log("c'est bon");
      }
    }, 2000); // toutes les 2 secondes
  }

  deconnexion(user: User) {

    try {
      this.userService.deconnexion(user).subscribe((result) => {
        console.log("deconnecté");
      });
    } catch (e) {
      this.error = "Une erreur systeme s'est produite";
    }


  }


}
