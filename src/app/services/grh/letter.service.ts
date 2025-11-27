import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { LetterNumeroRef } from '../../models/grh/letterNumeroRef';
import { Constants } from '../../app.constants';
import { User } from 'app/models/User';
import { LetterObject } from 'app/models/grh/letterObject';
import { Civility } from 'app/models/grh/civility';
import { SocietyBank } from 'app/models/grh/societyBank';
import { AccountNumber } from 'app/models/grh/accountNumber';
import { LetterContent } from 'app/models/grh/letterContent';
import { LetterContentView } from 'app/models/grh/letterContentView';

@Injectable()
export class LetterService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

 

 

  public getAll = (): Observable<LetterNumeroRef[]> => {
    this.actionUrl = Constants.apiServer + '/service/Employee/getAllLetterNumeroRef';
    return this.http.get(this.actionUrl)
      .map((response: Response) => <LetterNumeroRef[]>response.json())
      .catch(this.handleError);
  }

  public save = (letterNumeroRef: LetterNumeroRef): Observable<LetterNumeroRef> => {
    const toAdd = JSON.stringify(letterNumeroRef);
    const actionUrl = Constants.apiServer + '/service/Employee/saveLetterNumeroRef';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public delete = (letterNumeroRef: LetterNumeroRef): Observable<Boolean> => {
    const toAdd = JSON.stringify(letterNumeroRef);
    const actionUrl = Constants.apiServer + '/service/Employee/deleteLetterNumeroRef';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json() === 'Success') {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

public getAllLetterObject = (): Observable<LetterObject[]> => {
    this.actionUrl = Constants.apiServer + '/service/Employee/getAllLetterObject';
    return this.http.get(this.actionUrl)
      .map((response: Response) => <LetterObject[]>response.json())
      .catch(this.handleError);
  }

  public saveLetterObject = (letterObject: LetterObject): Observable<LetterObject> => {
    const toAdd = JSON.stringify(letterObject);
    const actionUrl = Constants.apiServer + '/service/Employee/saveLetterObject';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public deleteLetterObject = (letterObject: LetterObject): Observable<Boolean> => {
    const toAdd = JSON.stringify(letterObject);
    const actionUrl = Constants.apiServer + '/service/Employee/deleteLetterObject';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json() === 'Success') {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }


  
public getAllCivility = (): Observable<Civility[]> => {
    this.actionUrl = Constants.apiServer + '/service/Employee/getAllCivility';
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Civility[]>response.json())
      .catch(this.handleError);
  }

  public saveCivility = (civility: Civility): Observable<Civility> => {
    const toAdd = JSON.stringify(civility);
    const actionUrl = Constants.apiServer + '/service/Employee/saveCivility';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public deleteCivility = (civility: Civility): Observable<Boolean> => {
    const toAdd = JSON.stringify(civility);
    const actionUrl = Constants.apiServer + '/service/Employee/deleteLCivility';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json() === 'Success') {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  
public getAllSocietyBank = (): Observable<SocietyBank[]> => {
    this.actionUrl = Constants.apiServer + '/service/Employee/getAllSocietyBank';
    return this.http.get(this.actionUrl)
      .map((response: Response) => <SocietyBank[]>response.json())
      .catch(this.handleError);
  }

  public saveSocietyBank = (societyBank: SocietyBank): Observable<SocietyBank> => {
    const toAdd = JSON.stringify(societyBank);
    const actionUrl = Constants.apiServer + '/service/Employee/saveSocietyBank';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public deleteSocietyBank = (societyBank: SocietyBank): Observable<Boolean> => {
    const toAdd = JSON.stringify(societyBank);
    const actionUrl = Constants.apiServer + '/service/Employee/deleteSocietyBank';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json() === 'Success') {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  public getAllAccounNumber = (): Observable<AccountNumber[]> => {
    this.actionUrl = Constants.apiServer + '/service/Employee/getAllAccountNumber';
    return this.http.get(this.actionUrl)
      .map((response: Response) => <AccountNumber[]>response.json())
      .catch(this.handleError);
  }

  public saveAccountNumber = (accountNumber: AccountNumber): Observable<AccountNumber> => {
    const toAdd = JSON.stringify(accountNumber);
    const actionUrl = Constants.apiServer + '/service/Employee/saveAccountNumber';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public deleteAccountNumber = (accountNumber: AccountNumber): Observable<Boolean> => {
    const toAdd = JSON.stringify(accountNumber);
    const actionUrl = Constants.apiServer + '/service/Employee/deleteAccountNumber';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json() === 'Success') {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  // public getAllLetterContent = (): Observable<LetterContentView[]> => {
  //   this.actionUrl = Constants.apiServer + '/service/Employee/getAllLetterContentVo';
  //   return this.http.get(this.actionUrl)
  //     .map((response: Response) => <LetterContentView[]>response.json())
  //     .catch(this.handleError);
  // }

  // public saveLetterContent = (letterContent: LetterContentView): Observable<LetterContentView> => {
  //   const toAdd = JSON.stringify(letterContent);
  //   const actionUrl = Constants.apiServer + '/service/Employee/saveLetterContentByVo';
  //   return this.http.post(actionUrl, toAdd, { headers: this.headers })
  //     .map((response: Response) => {
  //       return response.json();
  //     })
  //     .catch(this.handleError);
  // }

  // public deleteLetterContent = (letterContent: LetterContentView): Observable<Boolean> => {
  //   const toAdd = JSON.stringify(letterContent);
  //   const actionUrl = Constants.apiServer + '/service/Employee/deleteLetterContentVo';
  //   return this.http.post(actionUrl, toAdd, { headers: this.headers })
  //     .map((response: Response) => {
  //       if (response && response.json() === 'Success') {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     })
  //     .catch(this.handleError);
  // }

  public getAllLetterContent = (): Observable<LetterContentView[]> => {
    this.actionUrl = Constants.apiServer + '/service/Employee/getAllLetterContent';
    return this.http.get(this.actionUrl)
      .map((response: Response) => <LetterContentView[]>response.json())
      .catch(this.handleError);
  }

   public getLetterContentById = (Id:number): Observable<LetterContent> => {
    this.actionUrl = Constants.apiServer + '/service/Employee/getLetterById/'+Id;
    return this.http.get(this.actionUrl)
      .map((response: Response) => <LetterContent>response.json())
      .catch(this.handleError);
  }


  public saveLetterContent = (letterContent: LetterContent): Observable<LetterContent> => {
    const toAdd = JSON.stringify(letterContent);
    const actionUrl = Constants.apiServer + '/service/Employee/saveLetterContent';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public deleteLetterContent = (letterContent: LetterContentView): Observable<Boolean> => {
    const toAdd = JSON.stringify(letterContent);
    const actionUrl = Constants.apiServer + '/service/Employee/deleteLetterContentVo';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json() === 'Success') {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

   public deleteLetterContentById = (letterContent: LetterContentView): Observable<Boolean> => {
    const toAdd = JSON.stringify(letterContent);
    const actionUrl = Constants.apiServer + '/service/Employee/deleteById/'+letterContent.id;
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json() === 'Success') {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  public printLetter = (letterContent: LetterContent): Observable<string> => {
    const toAdd= JSON.stringify(letterContent);
    const actionUrl = Constants.apiServer + '/service/Employee/printLetter';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
