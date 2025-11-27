import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Student } from '../models/student';
import { StudentKiosk } from '../models/kiosk/studentKiosk';
import { Enrollment } from '../models/enrollment';
import { User } from '../models/User';
import { Doc } from '../models/doc';
import { PrerequisitWaiver } from '../models/prerequisitWaiver';
import { ParentAssignmentView } from '../models/parentAssignmentView';
import { Constants } from '../app.constants';
import { Currency } from '../models/currency';
import { MarkView } from '../models/markView';
import { OnlineRegistration } from '../models/onlineRegistration';
import { TuitionView } from '../models/tuitionView';
import { StudentTuitionComment } from '../models/studentTuitionComment';
import { PaymentCommitment } from 'app/models/paymentCommitment';
import { Payment } from 'app/models/payment';
import {SchoolYear} from '../models/schoolYear';
import { Parentview } from 'app/models/parentview';
import { AnyView } from 'app/models/anyView';
import { PaymentCommitmentView } from 'app/models/paymentCommitmentView';
import { CourseView } from 'app/models/courseView';
import { Degree } from 'app/models/degree';
import { StudentAttendanceResponse } from 'app/models/studentAttendanceResponse';

@Injectable()
export class StudentService {

  private actionUrl: string;
  private headers: Headers;

  public selectedStudentUserId: number;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getByUser = (user: User): Observable<Student> => {
    this.actionUrl = Constants.apiServer + '/service/student/getByUser/' + user.id;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Student>response.json())
      .catch(this.handleError);
  }

  public getEnrollments = (student: Student): Observable<Enrollment[]> => {
    this.actionUrl = Constants.apiServer + '/service/student/getEnrollments/' + student.id;
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Enrollment[]>response.json())
      .catch(this.handleError);
  }

  public getEnrollment = (student: Student, schoolYear: SchoolYear): Observable<Enrollment> => {
    this.actionUrl = Constants.apiServer + '/service/student/getEnrollment/' + student.id + ',' + schoolYear.id;
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Enrollment>response.json())
      .catch(this.handleError);
  }

  public getTuitions = (enrollment: Enrollment): Observable<TuitionView[]> => {
    const toAdd = JSON.stringify(enrollment);
    const actionUrl = Constants.apiServer + '/service/student/getTuitions';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <TuitionView[]>response.json();
      })
      .catch(this.handleError);
  }

  public getTuitionList = (enrollment: Enrollment): Observable<TuitionView[]> => {
    const toAdd = JSON.stringify(enrollment);
    const actionUrl = Constants.apiServer + '/service/student/getTuitionList';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <TuitionView[]>response.json();
      })
      .catch(this.handleError);
  }

  public printRecap = (enrollment: Enrollment): Observable<string> => {
    const toAdd = JSON.stringify(enrollment);
    const actionUrl = Constants.apiServer + '/service/student/printRecap';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }

  public printCard = (matricule: string): Observable<string> => {
    const toAdd = JSON.stringify(matricule);
    const actionUrl = Constants.apiServer + '/service/student/printCard';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }
  public getStudentMarks = (studentYear: String): Observable<MarkView[]> => {
    const toAdd = JSON.stringify(studentYear);
    const actionUrl = Constants.apiServer + '/service/student/getStudentMarks';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <MarkView[]>response.json();
      })
      .catch(this.handleError);
  }

  public getAll = (): Observable<Student[]> => {
    this.actionUrl = Constants.apiServer + '/service/student/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Student[]>response.json())
      .catch(this.handleError);
  }

  public save = (student: Student): Observable<Student> => {
    const toAdd = JSON.stringify(student);
    const actionUrl = Constants.apiServer + '/service/student/save';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public desactivateAndGenerateNewStudentKioskCardNumber = (student: Student): Observable<StudentKiosk> => {
    const toAdd = JSON.stringify(student);
    const actionUrl = Constants.apiServer + '/service/student/desactivateAndGenerateNewStudentKioskCardNumber';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getActiveStudentKiosk = (student: Student): Observable<StudentKiosk> => {
    const toAdd = JSON.stringify(student);
    const actionUrl = Constants.apiServer + '/service/student/getActiveStudentKiosk';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public assignParent = (parentAssignmentView: ParentAssignmentView): Observable<String> => {
    const toAdd = JSON.stringify(parentAssignmentView);
    const actionUrl = Constants.apiServer + '/service/student/assignParent';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public delete = (student: Student): Observable<Boolean> => {
    const toAdd = JSON.stringify(student);
    const actionUrl = Constants.apiServer + '/service/student/delete';
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


  public saveEnrollment = (enrollment: Enrollment): Observable<Enrollment> => {
    const toAdd = JSON.stringify(enrollment);
    const actionUrl = Constants.apiServer + '/service/student/saveEnrollment';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public updateEnrollment = (schoolyear : SchoolYear, enrollment: Enrollment): Observable<Enrollment> => {
    const scY = JSON.stringify(schoolyear);
    const toAdd = JSON.stringify(enrollment);
    const actionUrl = Constants.apiServer + '/service/student/updateEnrollment';
    return this.http.post(actionUrl,scY, toAdd)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }


  public saveTuition = (tuitionView: Enrollment): Observable<TuitionView> => {
    const toAdd = JSON.stringify(tuitionView);
    const actionUrl = Constants.apiServer + '/service/student/saveTuition';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public saveTuitionNew = (tuitionView: TuitionView): Observable<TuitionView> => {
    const toAdd = JSON.stringify(tuitionView);
    const actionUrl = Constants.apiServer + '/service/student/saveTuition';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public saveTuitionNewNew = (tuitionView: TuitionView): Observable<TuitionView> => {
    console.log("Service tuition ");
    console.log(tuitionView);
    const toAdd = JSON.stringify(tuitionView);
    const actionUrl = Constants.apiServer + '/service/student/saveTuitionNew';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public deleteEnrollment = (enrollment: Enrollment): Observable<Boolean> => {
    const toAdd = JSON.stringify(enrollment);
    const actionUrl = Constants.apiServer + '/service/student/deleteEnrollment';
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

  public getOnlineRegistrations = (status: number): Observable<OnlineRegistration[]> => {
    this.actionUrl = Constants.apiServer + '/service/base/getOnlineRegistrations/' + status;
    return this.http.get(this.actionUrl)
      .map((response: Response) => <OnlineRegistration[]>response.json())
      .catch(this.handleError);
  }

  public getOnlineRegistrationsByUser = (status: number, user: User): Observable<OnlineRegistration[]> => {
    this.actionUrl = Constants.apiServer + '/service/base/getOnlineRegistrations/getByUser/' + user.id + "/" + status;
    console.log("getRegistrationsByUser: " + this.actionUrl);
    return this.http.get(this.actionUrl)
      .map((response: Response) => <OnlineRegistration[]>response.json())
      .catch(this.handleError);
  }

  public approve = (oReg: OnlineRegistration): Observable<string> => {
    const toAdd = JSON.stringify(oReg);
    const actionUrl = Constants.apiServer + '/service/student/approve';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

   public preInscription = (oReg: OnlineRegistration): Observable<string> => {
    const toAdd = JSON.stringify(oReg);
    const actionUrl = Constants.apiServer + '/service/student/preInscription';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public addComment = (oReg: OnlineRegistration): Observable<string> => {
    const toAdd = JSON.stringify(oReg);
    const actionUrl = Constants.apiServer + '/service/student/addComment';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  public deleteRegistration = (oReg: OnlineRegistration): Observable<string> => {
    const toAdd = JSON.stringify(oReg);
    const actionUrl = Constants.apiServer + '/service/student/deleteRegistration';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public reject = (oReg: OnlineRegistration): Observable<string> => {
    const toAdd = JSON.stringify(oReg);
    const actionUrl = Constants.apiServer + '/service/student/reject';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public archive = (oReg: OnlineRegistration): Observable<string> => {
    const toAdd = JSON.stringify(oReg);
    const actionUrl = Constants.apiServer + '/service/student/archive';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public addTuition = (tuitionView: TuitionView): Observable<TuitionView> => {
    const toAdd = JSON.stringify(tuitionView);
    const actionUrl = Constants.apiServer + '/service/student/addTuition';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public addStudentTuitionCourse = (tuitionView: TuitionView): Observable<TuitionView> => {
    const toAdd = JSON.stringify(tuitionView);
    const actionUrl = Constants.apiServer + '/service/student/addStudentTuitionCourse';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }


  public removeTuition = (tuitionView: TuitionView): Observable<TuitionView> => {
    const toAdd = JSON.stringify(tuitionView);
    const actionUrl = Constants.apiServer + '/service/student/removeTuition';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


  public getDocuments = (user: User): Observable<Doc[]> => {
    this.actionUrl = Constants.apiServer + '/service/base/getDocuments/' + user.id;
    console.log("getDocuments: " + this.actionUrl);
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Doc[]>response.json())
      .catch(this.handleError);
  }

  public deleteDoc = (doc: Doc): Observable<string> => {
    const toAdd = JSON.stringify(doc);
    const actionUrl = Constants.apiServer + '/service/base/deleteDocument/' + doc.id;
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }


  public getInscriptionChart = (cycleId: number): Observable<string> => {
    const actionUrl = Constants.apiServer + '/service/base/getInscriptionChart/' + cycleId;
    return this.http.get(actionUrl)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getInscriptioLevelChart = (cycleId: number): Observable<string> => {
    const actionUrl = Constants.apiServer + '/service/base/getInscriptioLevelChart/' + cycleId;
    return this.http.get(actionUrl)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getInscriptionCountryChart = (cycleId: number): Observable<string> => {
    const actionUrl = Constants.apiServer + '/service/base/getInscriptionCountryChart/' + cycleId;
    return this.http.get(actionUrl)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getOnlineRegistrationsByType = (theType: string): Observable<OnlineRegistration[]> => {
    this.actionUrl = Constants.apiServer + '/service/base/getOnlineRegistrationsByType/' + theType;
    return this.http.get(this.actionUrl)
      .map((response: Response) => <OnlineRegistration[]>response.json())
      .catch(this.handleError);
  }

  public getAllCurrencies = (): Observable<Currency[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getAllCurrencies';
    return this.http.get(actionUrl, { headers: this.headers })
      .map((response: Response) => <Currency[]>response.json())
      .catch(this.handleError);
  }

  public createPayment = (parm: string): Observable<string> => {
    const toAdd = JSON.stringify(parm);
    const actionUrl = Constants.apiServer + '/service/payment/createPayment';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public makePayment = (parm: string): Observable<string> => {
    const toAdd = JSON.stringify(parm);
    const actionUrl = Constants.apiServer + '/service/payment/makePayment';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getPrerequisitWaivers = (student: Student): Observable<PrerequisitWaiver[]> => {
    this.actionUrl = Constants.apiServer + '/service/prerequisit/waiver/getByStudent/' + student.id;
    console.log("getByStudent: " + this.actionUrl);
    return this.http.get(this.actionUrl)
      .map((response: Response) => <PrerequisitWaiver[]>response.json())
      .catch(this.handleError);
  }

  public savePrerequisitWaiver = (prerequisitWaiver: PrerequisitWaiver): Observable<PrerequisitWaiver> => {
    const toAdd = JSON.stringify(prerequisitWaiver);
    const actionUrl = Constants.apiServer + '/service/prerequisit/savewaiver';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public deletePrerequisitWaiver = (prerequisitWaiver: PrerequisitWaiver): Observable<Boolean> => {
    const toAdd = JSON.stringify(prerequisitWaiver);
    const actionUrl = Constants.apiServer + '/service/prerequisit/waiver/delete';
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


  public saveStudentTuitionComment = (studentTuitionComment: StudentTuitionComment): Observable<StudentTuitionComment> => {
    const toAdd = JSON.stringify(studentTuitionComment);
    const actionUrl = Constants.apiServer + '/service/student/saveStudentTuitionComment';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getStudentTuitionComments = (studentTuitionId: number): Observable<StudentTuitionComment[]> => {
    this.actionUrl = Constants.apiServer + '/service/student/getStudentTuitionComments/' + studentTuitionId;
    console.log("getStudentTuitionComments: " + this.actionUrl);
    return this.http.get(this.actionUrl)
      .map((response: Response) => <StudentTuitionComment[]>response.json())
      .catch(this.handleError);
  }


  public saveStudentPaymentCommitment = (studentPaymentCommitment: PaymentCommitment): Observable<PaymentCommitment> => {
    const toAdd = JSON.stringify(studentPaymentCommitment);
    const actionUrl = Constants.apiServer + '/service/student/saveStudentPaymentCommitment';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public enablePaymentCommitment = (studentPaymentCommitment: PaymentCommitment): Observable<PaymentCommitment> => {
    const toAdd = JSON.stringify(studentPaymentCommitment);
    const actionUrl = Constants.apiServer + '/service/student/enablePaymentCommitment';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public disablePaymentCommitment = (studentPaymentCommitment: PaymentCommitment): Observable<PaymentCommitment> => {
    const toAdd = JSON.stringify(studentPaymentCommitment);
    const actionUrl = Constants.apiServer + '/service/student/disablePaymentCommitment';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public disablePaymentCommitmentAfterMakingItPayment = (studentPaymentCommitment: PaymentCommitment): Observable<PaymentCommitment> => {
    const toAdd = JSON.stringify(studentPaymentCommitment);
    const actionUrl = Constants.apiServer + '/service/student/disablePaymentCommitmentAfterMakingItPayment';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public disableStudentTuition = (tuitionView: TuitionView): Observable<TuitionView> => {
    const toAdd = JSON.stringify(tuitionView);
    const actionUrl = Constants.apiServer + '/service/student/disableStudentTuition';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public disableStudentTuitionAfterPayment = (tuitionView: TuitionView): Observable<TuitionView> => {
    const toAdd = JSON.stringify(tuitionView);
    const actionUrl = Constants.apiServer + '/service/student/disableStudentTuitionAfterPayment';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public enableStudentTuition = (tuitionView: TuitionView): Observable<TuitionView> => {
    const toAdd = JSON.stringify(tuitionView);
    const actionUrl = Constants.apiServer + '/service/student/enableStudentTuition';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getStudentPaymentCommitments = (studentTuitionId: number): Observable<PaymentCommitment[]> => {
    this.actionUrl = Constants.apiServer + '/service/student/getStudentPaymentCommitments/' + studentTuitionId;
    console.log("getStudentPaymentCommitments: " + this.actionUrl);
    return this.http.get(this.actionUrl)
      .map((response: Response) => <PaymentCommitment[]>response.json())
      .catch(this.handleError);
  }

  public getCommitmentPaymentByStudentTuition = (studentTuitionId: number): Observable<PaymentCommitmentView[]> => {
    this.actionUrl = Constants.apiServer + '/service/student/getCommitmentPaymentByStudentTuition/' + studentTuitionId;
    console.log("getCommitmentPaymentByStudentTuition: " + this.actionUrl);
    return this.http.get(this.actionUrl)
      .map((response: Response) => <PaymentCommitmentView[]>response.json())
      .catch(this.handleError);
  }

  public getStudentPayments = (studentTuitionId: number): Observable<Payment[]> => {
    this.actionUrl = Constants.apiServer + '/service/student/getStudentPayments/' + studentTuitionId;
    console.log("getStudentPaymentCommitments: " + this.actionUrl);
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Payment[]>response.json())
      .catch(this.handleError);
  }

  public getTuitionCommitments = (studentTuitionId: number): Observable<TuitionView[]> => {
    this.actionUrl = Constants.apiServer + '/service/student/getTuitionCommitments/' + studentTuitionId;
    console.log("getTuitionCommitments: " + this.actionUrl);
    return this.http.get(this.actionUrl)
      .map((response: Response) => <TuitionView[]>response.json())
      .catch(this.handleError);
  }

  public getTuitionCommitmentsNew = (studentTuitionId: number): Observable<TuitionView[]> => {
    this.actionUrl = Constants.apiServer + '/service/student/getTuitionCommitmentsNew/' + studentTuitionId;
    console.log("getTuitionCommitments: " + this.actionUrl);
    return this.http.get(this.actionUrl)
      .map((response: Response) => <TuitionView[]>response.json())
      .catch(this.handleError);
  }

    public getStudentParent = (studentId: number): Observable<Parentview[]> => {
    const toAdd = JSON.stringify(studentId);
    const actionUrl = Constants.apiServer + '/service/student/getStudentParent';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

   public getStudentBySchoolYearAndClass = (anyView: AnyView): Observable<AnyView[]> => {
    const toAdd = JSON.stringify(anyView);
    const actionUrl = Constants.apiServer + '/service/student/getStudentBySchoolYearAndClass';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getAllStudentHaveCourseToday = (info: AnyView): Observable<AnyView[]> => {
    const toAdd = JSON.stringify(info);
    const actionUrl = Constants.apiServer + '/service/student/getAllStudentHaveCourseToday';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getStudentADateCourse = (info: AnyView): Observable<CourseView[]> => {
    const toAdd = JSON.stringify(info);
    const actionUrl = Constants.apiServer + '/service/student/getStudentADateCourse';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public checkingDiplomaAuthenticity = (degree: Degree): Observable<string> => {
    let toAdd = JSON.stringify(degree);
    let actionUrl = Constants.apiServer + '/service/student/diplomaAuthenticity';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }


  public getLastStudentBulletinAndDegree = (student: Student): Observable<string[]> => {
    let toAdd = JSON.stringify(student);
    let actionUrl = Constants.apiServer + '/service/student/lastStudentBulletinAndDegree';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

   public getStudentAttendanceWithCourses = (info: AnyView): Observable<StudentAttendanceResponse[]> => {
    const toAdd = JSON.stringify(info);
    const actionUrl = Constants.apiServer + '/service/student/getStudentAttendanceWithCourses';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
}