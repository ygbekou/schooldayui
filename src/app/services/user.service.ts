import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { User } from "../models/User";
import { StudentView } from "../models/studentView";
import { Constants } from "../app.constants";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { StudentProjectCollege } from "../models/studentProjectCollege";
import { Subject } from "../models/subject";
import { UserSubject } from "../models/userSubject";
import { InvoiceContact } from "app/models/InvoiceContact";
import { SearchText } from "app/models/searchText";
import { Cico } from "app/models/cico";
import { UserLevelView } from "app/models/userLevelView";
import { UserOnlineRegistrationView } from "app/models/userOlineRegistrationView";
import { UserSubjectView } from "app/models/userSubjectView";
import { MonthlyHours } from "app/models/monthlyHours";
import { DailyHours } from "app/models/dailyHours";
import { HoursCourse } from "app/models/hoursCourse";
import { CalculHoursParams } from "app/models/calculHoursParams";
import { TeacherOnlineRegistration } from "app/models/teacherOnlineRegisteration";
import { NewsLetter } from "app/models/newsLetter";
import { Subscriber } from "app/models/subscriber";
import { FiliereStats } from "app/models/statistiques/filiereStats";
import { CountryStats } from "app/models/statistiques/countryStats";

@Injectable()
export class UserService {
  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Accept", "application/json");
  }

  public getById = (user: User): Observable<User> => {
    this.actionUrl = Constants.apiServer + "/service/user/user/" + user.id;

    return this.http
      .get(this.actionUrl)
      .map((response: Response) => <User>response.json())
      .catch(this.handleError);
  };

  public getAll = (): Observable<User[]> => {
    this.actionUrl = Constants.apiServer + "/service/user/getUsers";

    return this.http
      .get(this.actionUrl)
      .map((response: Response) => <User[]>response.json())
      .catch(this.handleError);
  };

  public loadAllBourseSifaUsers = (): Observable<User[]> => {
    this.actionUrl = Constants.apiServer + "/service/user/getBourseSifaUsers";

    return this.http
      .get(this.actionUrl)
      .map((response: Response) => <User[]>response.json())
      .catch(this.handleError);
  };

  public loadAllBourse1SifaUsers = (): Observable<User[]> => {
    this.actionUrl = Constants.apiServer + "/service/user/getBourse1SifaUsers";

    return this.http
      .get(this.actionUrl)
      .map((response: Response) => <User[]>response.json())
      .catch(this.handleError);
  };

  public loadAllBourse2SifaUsers = (): Observable<User[]> => {
    this.actionUrl = Constants.apiServer + "/service/user/getBourse2SifaUsers";

    return this.http
      .get(this.actionUrl)
      .map((response: Response) => <User[]>response.json())
      .catch(this.handleError);
  };

  public search = (searchText: string): Observable<User[]> => {
    const toAdd = JSON.stringify(searchText);
    const actionUrl = Constants.apiServer + "/service/user/findMembers";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <User[]>response.json();
      })
      .catch(this.handleError);
  };

  public searchUsers = (searchText: string): Observable<User[]> => {
    const toAdd = JSON.stringify(searchText);
    const actionUrl = Constants.apiServer + "/service/user/getNewUserAdd";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <User[]>response.json();
      })
      .catch(this.handleError);
  };

  public getStudentsByProject = (
    studentProjectCollege: StudentProjectCollege
  ): Observable<User[]> => {
    const toAdd = JSON.stringify(studentProjectCollege.id);
    const actionUrl =
      Constants.apiServer + "/service/user/getStudentsByProject";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <User[]>response.json();
      })
      .catch(this.handleError);
  };

  public getUsersForRole = (role: number): Observable<User[]> => {
    const toAdd = JSON.stringify(role);
    const actionUrl = Constants.apiServer + "/service/user/getUsersForRole";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <User[]>response.json();
      })
      .catch(this.handleError);
  };

  public getUsersByParent = (parentId: number): Observable<User[]> => {
    const toAdd = JSON.stringify(parentId);
    const actionUrl = Constants.apiServer + "/service/user/getUsersByParentId";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <User[]>response.json();
      })
      .catch(this.handleError);
  };

  public getStudentUsersByParent = (
    parentId: number
  ): Observable<StudentView[]> => {
    const toAdd = JSON.stringify(parentId);
    const actionUrl =
      Constants.apiServer + "/service/user/getStudentsByParentId";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <StudentView[]>response.json();
      })
      .catch(this.handleError);
  };

  public login = (user: User): Observable<Boolean> => {
    const toAdd = JSON.stringify(user);
    const actionUrl = Constants.apiServer + "/service/user/login";

    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        if (response && response.json()) {
          const token = response.json() && response.json().token;
          if (token) {
            Cookie.set("user", btoa(JSON.stringify(response.json())));
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  };

  public saveUser = (user: User): Observable<string> => {
    const toAdd = JSON.stringify(user);
    const actionUrl = Constants.apiServer + "/service/user/saveUser";

    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      })
      .catch(this.handleError);
  };

  public saveUserSubject = (
    userSubject: UserSubject
  ): Observable<UserSubject> => {
    const toAdd = JSON.stringify(userSubject);
    const actionUrl = Constants.apiServer + "/service/user/saveUserSubject";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  };

  public save = (user: User): Observable<Boolean> => {
    const toAdd = JSON.stringify(user);
    const actionUrl = Constants.apiServer + "/service/user/createUser";

    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json()) {
          const token = response.json() && response.json().token;
          if (token) {
            Cookie.set("user", btoa(JSON.stringify(response.json())));
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  };

  public registerOnline = (user: User): Observable<Boolean> => {
    const toAdd = JSON.stringify(user);
    const actionUrl = Constants.apiServer + "/service/user/registerOnline";

    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json()) {
          const token = response.json() && response.json().token;

          if (token) {
            if (!user.fromAdmin) {
              Cookie.set("user", btoa(JSON.stringify(response.json())));
            }
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  };
  // Enr�gistrement simple pour la formation des enseignants

  public saveUserOnline = (user: User): Observable<Boolean> => {
    const toAdd = JSON.stringify(user);
    const actionUrl =
      Constants.apiServer + "/service/user/registerOnlineEnseignant";

    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json()) {
          const token = response.json() && response.json().token;
          if (token) {
            if (!user.fromAdmin) {
              Cookie.set("user", btoa(JSON.stringify(response.json())));
            }
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  };

  //     public saveUserOnline = (user: User): Observable<Boolean> => {
  //     const toAdd = JSON.stringify(user);
  //     const actionUrl = Constants.apiServer + '/service/user/registerOnlineEnseignant';
  //     return this.http.post(actionUrl, toAdd, { headers: this.headers })
  //       .map((response: Response) => {
  //         return response.json();
  //       })
  //       .catch(this.handleError);
  //   }

  public sendPassword = (user: User): Observable<Boolean> => {
    const toAdd = JSON.stringify(user);
    const actionUrl = Constants.apiServer + "/service/user/sendPassword";

    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json() === "Success") {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  };

  public cico = (cico: Cico): Observable<User> => {
    const toAdd = JSON.stringify(cico);
    const actionUrl = Constants.apiServer + "/service/user/cico";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <User>response.json();
      })
      .catch(this.handleError);
  };

  public cicoWithEmployeeTableChecking = (cico: Cico): Observable<User> => {
    const toAdd = JSON.stringify(cico);
    const actionUrl =
      Constants.apiServer + "/service/user/cicoWithEmployeeTableChecking";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <User>response.json();
      })
      .catch(this.handleError);
  };

  public cicoWithTeacherTableCheckingManually = (
    cico: Cico
  ): Observable<User> => {
    const toAdd = JSON.stringify(cico);
    const actionUrl =
      Constants.apiServer + "/service/user/teacherCicoTableChecking";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <User>response.json();
      })
      .catch(this.handleError);
  };

  public cicoForTeacherTimeTableChecking = (cico: Cico): Observable<User> => {
    const toAdd = JSON.stringify(cico);
    const actionUrl =
      Constants.apiServer + "/service/user/cicoForTeacherTimeTableChecking";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <User>response.json();
      })
      .catch(this.handleError);
  };

  public cicoNew = (cico: Cico): Observable<User> => {
    const toAdd = JSON.stringify(cico);
    const actionUrl = Constants.apiServer + "/service/user/cicoNew";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <User>response.json();
      })
      .catch(this.handleError);
  };

  public searchInvoiceContact = (
    searchText: SearchText
  ): Observable<InvoiceContact[]> => {
    const toAdd = JSON.stringify(searchText);
    const actionUrl = Constants.apiServer + "/service/base/getInvoiceContacts";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <InvoiceContact[]>response.json();
      })
      .catch(this.handleError);
  };

  public searchUserLeve = (searchText: string): Observable<UserLevelView[]> => {
    const toAdd = JSON.stringify(searchText);
    const actionUrl = Constants.apiServer + "/service/user/searchLevelView";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <UserLevelView[]>response.json();
      })
      .catch(this.handleError);
  };

  public saveUserLevelOnlineRegistration = (
    user: UserLevelView
  ): Observable<UserLevelView[]> => {
    const toAdd = JSON.stringify(user);
    const actionUrl =
      Constants.apiServer + "/service/user/saveUserLevelOnlineRegistration";

    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <UserLevelView[]>response.json())
      .catch(this.handleError);
  };

  public getUserOnlineregistration = (
    id: number
  ): Observable<UserLevelView[]> => {
    this.actionUrl =
      Constants.apiServer + "/service/user/searchUserOnlineRegistration/" + id;

    return this.http
      .get(this.actionUrl)
      .map((response: Response) => <UserLevelView[]>response.json())
      .catch(this.handleError);
  };
  public deleteUserOlineregistration = (
    userlevelView: UserLevelView
  ): Observable<Boolean> => {
    let toAdd = JSON.stringify(userlevelView);
    let actionUrl =
      Constants.apiServer + "/service/user/deleteUserOnlineregistration";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json() == "Success") {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  };

  // public getOlineUserRegistrationVO = (searchText: SearchText): Observable<UserOnlineRegistrationView[]> => {
  //     this.actionUrl = Constants.apiServer + '/service/user/getOlineUserRegistrationVO';
  //     return this.http.get(this.actionUrl)
  //         .map((response: Response) => <UserOnlineRegistrationView[]>response.json())
  //         .catch(this.handleError);
  // }

  public getOlineUserRegistrationVO = (
    searchText: SearchText
  ): Observable<UserOnlineRegistrationView[]> => {
    const toAdd = JSON.stringify(searchText);
    const actionUrl =
      Constants.apiServer + "/service/user/getOlineUserRegistrationVO";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <UserOnlineRegistrationView[]>response.json();
      })
      .catch(this.handleError);
  };

  public getOlineRegistrationUsers = (
    searchText: SearchText
  ): Observable<UserSubjectView[]> => {
    const toAdd = JSON.stringify(searchText);
    const actionUrl =
      Constants.apiServer + "/service/user/getOlineRegistrationUsers";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <UserSubjectView[]>response.json();
      })
      .catch(this.handleError);
  };
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || "Server error");
  }

  public getMonthlyHoursByTeacherAndYear = (
    hoursParams: CalculHoursParams
  ): Observable<MonthlyHours[]> => {
    const toAdd = JSON.stringify(hoursParams);
    const actionUrl =
      Constants.apiServer + "/service/user/getMonthlyHoursByTeacherAndYear";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  };

  public getDailyHoursByTeacherAndMonth = (
    hoursParams: CalculHoursParams
  ): Observable<DailyHours[]> => {
    const toAdd = JSON.stringify(hoursParams);
    const actionUrl =
      Constants.apiServer + "/service/user/getDailyHoursByTeacherAndMonth";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  };

  public getCourseHoursByTeacherAndDay = (
    hoursParams: CalculHoursParams
  ): Observable<HoursCourse[]> => {
    const toAdd = JSON.stringify(hoursParams);
    const actionUrl =
      Constants.apiServer + "/service/user/getCourseHoursByTeacherAndDay";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  };

  public findTeacherOnlineRegistrationBySchoolYear = (
    schoolYearId: number
  ): Observable<TeacherOnlineRegistration[]> => {
    this.actionUrl =
      Constants.apiServer +
      "/service/user/findTeacherOnlineRegistrationBySchoolYear/" +
      schoolYearId;

    return this.http
      .get(this.actionUrl)
      .map((response: Response) => <TeacherOnlineRegistration[]>response.json())
      .catch(this.handleError);
  };

  public saveNewsLetter = (newsLetter: NewsLetter): Observable<number> => {
    let toAdd = JSON.stringify(newsLetter);
    let actionUrl = Constants.apiServer + "/service/user/saveNewsLetter";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  };

  public getAllNewsLetterEmail = (): Observable<NewsLetter[]> => {
    this.actionUrl = Constants.apiServer + "/service/user/allNewsLetterEmail";

    return this.http
      .get(this.actionUrl)
      .map((response: Response) => <NewsLetter[]>response.json())
      .catch(this.handleError);
  };

  public saveSubscriber = (subscriber: Subscriber): Observable<number> => {
    let toAdd = JSON.stringify(subscriber);
    let actionUrl = Constants.apiServer + "/service/user/saveSubscriber";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  };

  public tchekSubscriber = (subscriber: Subscriber): Observable<number> => {
    let toAdd = JSON.stringify(subscriber);
    let actionUrl = Constants.apiServer + "/service/user/tchekSubscriber";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  };

  public UpdateUserConnexionInfos = (user: User): Observable<User> => {
    const toAdd = JSON.stringify(user);
    const actionUrl =
      Constants.apiServer + "/service/user/UpdateUserConnexionInfos";

    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      })
      .catch(this.handleError);
  };

  public deconnexion = (user: User): Observable<string> => {
    const toAdd = JSON.stringify(user);
    const actionUrl = Constants.apiServer + "/service/user/deconnexion";

    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response) {
          return response.json();
        }
      });
  };

  public getFiliereStats = (schoolYearId: number): Observable<FiliereStats> => {
    this.actionUrl =
      Constants.apiServer + "/service/user/getFiliereStats/" + schoolYearId;

    return this.http
      .get(this.actionUrl)
      .map((response: Response) => <FiliereStats>response.json())
      .catch(this.handleError);
  };

  public getCountryStats = (schoolYearId: number): Observable<CountryStats> => {
    this.actionUrl =
      Constants.apiServer + "/service/user/getCountriesStat/" + schoolYearId;

    return this.http
      .get(this.actionUrl)
      .map((response: Response) => <CountryStats>response.json())
      .catch(this.handleError);
  };


    public getGlobalFilieresStat = (): Observable<FiliereStats> => {
    this.actionUrl =
      Constants.apiServer + "/service/user/getGlobalFilieresStat";

    return this.http
      .get(this.actionUrl)
      .map((response: Response) => <FiliereStats>response.json())
      .catch(this.handleError);
  };
}
