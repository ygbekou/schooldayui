import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Employee } from '../../models/grh/employee';
import { EmployeeKiosk } from '../../models/kiosk/employeeKiosk';
import { Periode } from '../../models/grh/periode';
import { PaySlip } from '../../models/grh/paySlip';
import { Report } from '../../models/report';
import { EmployeeDocument } from '../../models/grh/employeeDocument';
import { User } from '../../models/User';
import { Constants } from '../../app.constants';
import { EmployeeDocumentType } from 'app/models/grh/employeeDocumentType';
import { PaySlipHistory } from 'app/models/grh/paySlipHistory';

@Injectable()
export class EmployeeService {

  private actionUrl: string;
  private headers: Headers;
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  /*
  public getByUser = (user: User): Observable<Employee> => {
    this.actionUrl = Constants.apiServer + '/service/Employee/getByUser/' + user.id;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Employee>response.json())
      .catch(this.handleError);
  }
  */
  public getByUser = (user: User): Observable<Employee> => {
    const toAdd = JSON.stringify(user);
    this.actionUrl = Constants.apiServer + '/service/Employee/getByUser';

    return this.http.post(this.actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <Employee>response.json())
      .catch(this.handleError);
  }

  public getAll = (): Observable<Employee[]> => {
    this.actionUrl = Constants.apiServer + '/service/Employee/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Employee[]>response.json())
      .catch(this.handleError);
  }

  public getDocuments = (employee: Employee): Observable<EmployeeDocument[]> => {
    this.actionUrl = Constants.apiServer + '/service/Employee/getDocuments/' + employee.id;
    console.log("getEmployeeDocuments: " + this.actionUrl);
    return this.http.get(this.actionUrl)
      .map((response: Response) => <EmployeeDocument[]>response.json())
      .catch(this.handleError);
  }

  

  public getEmployeeAnotherDocumentsType = (empId: number): Observable<EmployeeDocumentType[]> => {
    this.actionUrl = Constants.apiServer + '/service/employeeDocumentType/getEmployeeAnotherDocument/' + empId;
    console.log("getAllAnotherEmployeeDocumentType: " + this.actionUrl);
    return this.http.get(this.actionUrl)
      .map((response: Response) => <EmployeeDocumentType[]>response.json())
      .catch(this.handleError);
  }

  public getEmployeeAnotherDocuments = (empId: number): Observable<EmployeeDocument[]> => {
    this.actionUrl = Constants.apiServer + '/service/employeeDocument/getAllAnotherEmployeeDocument/' + empId;
    console.log("getAllAnotherEmployeeDocument: " + this.actionUrl);
    return this.http.get(this.actionUrl)
      .map((response: Response) => <EmployeeDocument[]>response.json())
      .catch(this.handleError);
  }

  public deleteDoc = (employeeDocument: EmployeeDocument): Observable<string> => {
    const toAdd = JSON.stringify(employeeDocument);
    const actionUrl = Constants.apiServer + '/service/Employee/deleteDocument/' + employeeDocument.id;
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public save = (employee: Employee): Observable<Employee> => {
    const toAdd = JSON.stringify(employee);
    const actionUrl = Constants.apiServer + '/service/Employee/save';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public savePeriodPay = (periode: Periode): Observable<PaySlip[]> => {
    const toAdd = JSON.stringify(periode);
    const actionUrl = Constants.apiServer + '/service/Employee/calculateAllEmpPeriodPaySlip';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <PaySlip[]>response.json())
      .catch(this.handleError);
  }

  public savePeriodPayByPaiementMode = (paySlip: PaySlip): Observable<PaySlip[]> => {
    const toAdd = JSON.stringify(paySlip);
    const actionUrl = Constants.apiServer + '/service/Employee/calculateActiveEmpPeriodPaySlip';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <PaySlip[]>response.json())
      .catch(this.handleError);
  }

  /*
  public calculateActiveEmpPeriodPaySlipAndReturnTheirReport = (paySlip: PaySlip): Observable<string> => {
    const toAdd = JSON.stringify(paySlip);
    const actionUrl = Constants.apiServer + '/service/Employee/calculateActiveEmpPeriodPaySlipAndReturnTheirReport';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <string>response.json())
      .catch(this.handleError);
  }
  */

  public calculateActiveEmpPeriodPaySlipAndReturnTheirReport = (paySlip: PaySlip): Observable<any> => {
    const toAdd = JSON.stringify(paySlip);
    const actionUrl = Constants.apiServer + '/service/Employee/calculateActiveEmpPeriodPaySlipAndReturnTheirReport';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  public calculateActiveEmpPeriodPaySlipAndReturnPaySlipHistory = (paySlipHistory: PaySlipHistory): Observable<PaySlipHistory> => {
    const toAdd = JSON.stringify(paySlipHistory);
    const actionUrl = Constants.apiServer + '/service/Employee/calculateActiveEmpPeriodPaySlipAndReturnPaySlipHistory';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <PaySlipHistory>response.json())
      .catch(this.handleError);
  }

  public delete = (employee: Employee): Observable<Boolean> => {
    const toAdd = JSON.stringify(employee);
    const actionUrl = Constants.apiServer + '/service/Employee/delete';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json() == 'Success') {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  public printPaySlip = (paySlip: PaySlip): Observable<string> => {
    const toAdd = JSON.stringify(paySlip);
    const actionUrl = Constants.apiServer + '/service/Employee/printPaySlip';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }

  public printPaySlipsAllEmployees = (periode: Periode): Observable<string> => {
    const toAdd = JSON.stringify(periode);
    const actionUrl = Constants.apiServer + '/service/Employee/printPaySlipAllEmployee';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }

  public printRecapitulatifGlobalVirementSalaireParBanque = (periode: Periode): Observable<string> => {
    const toAdd = JSON.stringify(periode);
    const actionUrl = Constants.apiServer + '/service/Employee/printRecapitulatifGlobalVirementSalaireParBanque';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }

  public printRecapitulatifVirementSalaireParBanque = (periode: Periode): Observable<string> => {
    const toAdd = JSON.stringify(periode);
    const actionUrl = Constants.apiServer + '/service/Employee/printRecapitulatifVirementSalaireParBanque';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }

  public printRecapitulatifVirementSalaireParEmployee = (periode: Periode): Observable<string> => {
    const toAdd = JSON.stringify(periode);
    const actionUrl = Constants.apiServer + '/service/Employee/printRecapitulatifVirementSalaireParEmployee';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }

  public printServiceProviderPay = (periode: Periode): Observable<string> => {
    const toAdd = JSON.stringify(periode);
    const actionUrl = Constants.apiServer + '/service/Employee/printServiceProviderPay';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }

  public printFicheDePaie = (periode: Periode): Observable<string> => {
    const toAdd = JSON.stringify(periode);
    const actionUrl = Constants.apiServer + '/service/Employee/printFicheDePaie';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }

  public printAllDocuments = (periode: Periode): Observable<any> => {
    const toAdd = JSON.stringify(periode);
    const actionUrl = Constants.apiServer + '/service/Employee/printAllDocuments';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <any>response.json();
      })
      .catch(this.handleError);
  }

  public printEtatHonoraiePeriodTeacher = (paySlip: PaySlip): Observable<string> => {
    const toAdd = JSON.stringify(paySlip);
    const actionUrl = Constants.apiServer + '/service/Employee/printEtatHonoraiePeriodTeacher';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }

  // public printEtatHonoraieMensuelTeacher = (data): Observable<string> => {
  //   const toAdd = JSON.stringify(data);
  //   const actionUrl = Constants.apiServer + '/service/Employee/printEtatPaieTeachersMonth';
  //   return this.http.post(actionUrl, data, { headers: this.headers })
  //     .map((response: Response) => {
  //       return <string>response.json();
  //     })
  //     .catch(this.handleError);
  // }

  public printEtatHonoraieMensuelTeacher = (paySlip: PaySlip): Observable<string> => {
    const toAdd = JSON.stringify(paySlip);
    const actionUrl = Constants.apiServer + '/service/Employee/printEtatPaieTeachersMonthNew';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }


  public printEtatHonoraiePeriodTypeTeachers = (paySlip: PaySlip): Observable<string> => {
    const toAdd = JSON.stringify(paySlip);
    const actionUrl = Constants.apiServer + '/service/Employee/printEtatHonoraiePeriodTypeTeachers';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }

  public printEtatHonoraireRecapitulatifPeriodTypeTeachers = (paySlip: PaySlip): Observable<string> => {
    const toAdd = JSON.stringify(paySlip);
    const actionUrl = Constants.apiServer + '/service/Employee/printEtatHonoraieRecapitulatifPeriodTypeTeachers';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }

  public printEtatHonoraiePeriodAllTeachers = (paySlip: PaySlip): Observable<string> => {
    const toAdd = JSON.stringify(paySlip);
    const actionUrl = Constants.apiServer + '/service/Employee/printEtatHonoraiePeriodAllTeachers';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }

  public printEtatHonoraieRecapitulatifPeriodAllTeachers = (paySlip: PaySlip): Observable<string> => {
    const toAdd = JSON.stringify(paySlip);
    const actionUrl = Constants.apiServer + '/service/Employee/printEtatHonoraieRecapitulatifPeriodAllTeachers';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }

  public desactivateAndGenerateNewEmployeeKioskCardNumber = (employee: Employee): Observable<EmployeeKiosk> => {
    const toAdd = JSON.stringify(employee);
    const actionUrl = Constants.apiServer + '/service/Employee/desactivateAndGenerateNewEmployeeKioskCardNumber';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getActiveEmployeeKiosk = (employee: Employee): Observable<EmployeeKiosk> => {
    const toAdd = JSON.stringify(employee);
    const actionUrl = Constants.apiServer + '/service/Employee/getActiveEmployeeKiosk';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public printCard = (matricule: string): Observable<string> => {
    const toAdd = JSON.stringify(matricule);
    const actionUrl = Constants.apiServer + '/service/Employee/printCard';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
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
