import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Constants } from "../app.constants";
import { College } from "app/models/college";
import { RegistrationRequest } from "app/models/registrationRequest";
import { UserRegistrationRequest } from "app/models/userRegistrationRequest";

@Injectable()
export class RegistrationRequestService {
  private actionUrl: string;
  private headers: Headers;
  public registrationRequest: RegistrationRequest[];

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Accept", "application/json");

    this.registrationRequest = [];
    this.getAll().subscribe(
      (data: RegistrationRequest[]) => (this.registrationRequest = data),
      (error) => console.log(error),
      () => console.log("Get all registrationRequest complete")
    );
  }
  public getAll = (): Observable<RegistrationRequest[]> => {
    this.actionUrl =
      Constants.apiServer + "/service/registrationRequest/getAll";

    return this.http
      .get(this.actionUrl)
      .map((response: Response) => <RegistrationRequest[]>response.json())
      .catch(this.handleError);
  };

  public save = (
    registrationRequest: RegistrationRequest
  ): Observable<RegistrationRequest> => {
    let toAdd = JSON.stringify(registrationRequest);
    let actionUrl = Constants.apiServer + "/service/registrationRequest/save";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  };

  public delete = (
    registrationRequest: RegistrationRequest
  ): Observable<Boolean> => {
    let toAdd = JSON.stringify(registrationRequest);
    let actionUrl = Constants.apiServer + "/service/registrationRequest/delete";
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

  public saveURR = (
    userRegistrationRequest: UserRegistrationRequest
  ): Observable<UserRegistrationRequest> => {
    let toAdd = JSON.stringify(userRegistrationRequest);
    let actionUrl =
      Constants.apiServer + "/service/registrationRequest/saveURR";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  };

  public getURRByRegistrationRequest = (
    registrationRequest: RegistrationRequest
  ): Observable<UserRegistrationRequest[]> => {
    let toAdd = JSON.stringify(registrationRequest);
    let actionUrl =
      Constants.apiServer +
      "/service/registrationRequest/getURRByRegistrationRequest";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  };

  public deleteURR = (
    userRegistrationRequest: UserRegistrationRequest
  ): Observable<Boolean> => {
    let toAdd = JSON.stringify(userRegistrationRequest);
    let actionUrl =
      Constants.apiServer + "/service/registrationRequest/deleteURR";
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

  public getAllUserRegistrationRequestByCollege = (
    college: College
  ): Observable<UserRegistrationRequest[]> => {
    const collegeId = college.id;
    const requestPayload = { id: collegeId };

    this.actionUrl =
      Constants.apiServer + "/service/registrationRequest/getByCollege";

    return this.http
      .post(this.actionUrl, requestPayload, { headers: this.headers })
      .map((response: Response) => <UserRegistrationRequest[]>response.json())
      .catch(this.handleError);
  };

  public searchUserRegistrationRequest = (
    userRegistrationRequest: UserRegistrationRequest
  ): Observable<UserRegistrationRequest[]> => {
    let toAdd = JSON.stringify(userRegistrationRequest);

    this.actionUrl =
      Constants.apiServer +
      "/service/registrationRequest/searchUserRegistrationRequest";

    return this.http
      .post(this.actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <UserRegistrationRequest[]>response.json())
      .catch(this.handleError);
  };
}
