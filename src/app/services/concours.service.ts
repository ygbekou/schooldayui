import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Concours } from "../models/concours";
import { Constants } from "../app.constants";
import { UserConcours } from "app/models/userConcours";
import { College } from "app/models/college";

@Injectable()
export class ConcoursService {
  private actionUrl: string;
  private headers: Headers;
  public concours: Concours[];

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Accept", "application/json");

    this.concours = [];
    this.getAll().subscribe(
      (data: Concours[]) => (this.concours = data),
      (error) => console.log(error),
      () => console.log("Get all concours complete")
    );
  }
  public getAll = (): Observable<Concours[]> => {
    this.actionUrl = Constants.apiServer + "/service/concours/getAll";

    return this.http
      .get(this.actionUrl)
      .map((response: Response) => <Concours[]>response.json())
      .catch(this.handleError);
  };

  public save = (concours: Concours): Observable<Concours> => {
    let toAdd = JSON.stringify(concours);
    let actionUrl = Constants.apiServer + "/service/concours/save";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  };

  public delete = (concours: Concours): Observable<Boolean> => {
    let toAdd = JSON.stringify(concours);
    let actionUrl = Constants.apiServer + "/service/concours/delete";
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

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || "Server error");
  }

  public saveUc = (userConcours: UserConcours): Observable<UserConcours> => {
    let toAdd = JSON.stringify(userConcours);
    let actionUrl = Constants.apiServer + "/service/concours/saveUC";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  };

  public getUCByConcours = (concours: Concours): Observable<UserConcours[]> => {
    let toAdd = JSON.stringify(concours);
    let actionUrl = Constants.apiServer + "/service/concours/getUCByConcours";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  };

  public deleteUC = (userConcours: UserConcours): Observable<Boolean> => {
    let toAdd = JSON.stringify(userConcours);
    let actionUrl = Constants.apiServer + "/service/concours/deleteUC";
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

  public getAllUserConcoursByCollege = (
    college: College
  ): Observable<UserConcours[]> => {
    const collegeId = college.id;
    const requestPayload = { id: collegeId };

    this.actionUrl = Constants.apiServer + "/service/concours/getByCollege";

    return this.http
      .post(this.actionUrl, requestPayload, { headers: this.headers })
      .map((response: Response) => <UserConcours[]>response.json())
      .catch(this.handleError);
  };

  public searchUserConcours = (
    userConcours: UserConcours
  ): Observable<UserConcours[]> => {
    let toAdd = JSON.stringify(userConcours);

    this.actionUrl =
      Constants.apiServer + "/service/concours/searchUserConcours";

    return this.http
      .post(this.actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <UserConcours[]>response.json())
      .catch(this.handleError);
  };
}
