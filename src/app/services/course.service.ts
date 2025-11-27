import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Course} from '../models/course';
import {CourseView} from '../models/courseView';
import {Level} from '../models/level';
import {User} from '../models/User';
import {Payment} from '../models/payment';
import {Mark} from '../models/mark';
import {Expense} from '../models/expense';
import {Constants} from '../app.constants';
import {CourseViewInvoice} from "../models/CourseViewInvoice";
import { CourseClassStudentView } from 'app/models/courseClassStudentView';
import { Attendance } from 'app/models/attendance';
import { StudentView } from 'app/models/studentView';
import { AttendanceDetails } from 'app/models/attendanceDetails';
import { SearchAttendance } from 'app/models/searchAttendance';
import { StudentGlobalResultRequest } from 'app/models/studentGlobalResultRequest';
import { StudentCourseGlobalResult } from 'app/models/studentCourseGlobalResult';

@Injectable()
export class CourseService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getByTeacher = (user: User): Observable<Course[]> => {
    this.actionUrl = Constants.apiServer + '/service/course/getByTeacher/' + user.id;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Course[]>response.json())
      .catch(this.handleError);
  }
  public getByStudent = (user: User): Observable<Course[]> => {
    this.actionUrl = Constants.apiServer + '/service/course/getByStudent/' + user.id;
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Course[]>response.json())
      .catch(this.handleError);
  }
  public printSyllabus = (user: User): Observable<string> => {
    this.actionUrl = Constants.apiServer + '/service/course/printSyllabus/' + user.id;
    return this.http.get(this.actionUrl)
      .map((response: Response) => <string>response.json())
      .catch(this.handleError);
  }

  public getAll = (): Observable<Course[]> => {
    this.actionUrl = Constants.apiServer + '/service/course/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Course[]>response.json())
      .catch(this.handleError);
  }

  public printCourseFinance = (course: Course): Observable<string> => {
    const toAdd= JSON.stringify(course);
    const actionUrl = Constants.apiServer + '/service/course/printCourseFinance';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }

  public searchCourseInvoice = (searchText: string): Observable<CourseViewInvoice[]> => {
    const toAdd= JSON.stringify(searchText);
    const actionUrl = Constants.apiServer + '/service/course/searchCourseInvoice';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return <CourseViewInvoice[]>response.json();
      })
      .catch(this.handleError);
  }

  public search = (searchText: string): Observable<Course[]> => {
    const toAdd= JSON.stringify(searchText);
    const actionUrl = Constants.apiServer + '/service/course/search';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return <Course[]>response.json();
      })
      .catch(this.handleError);
  }

  public signup = (str: string): Observable<CourseView> => {
    const toAdd= JSON.stringify(str);
    const actionUrl = Constants.apiServer + '/service/course/signup';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return <CourseView>response.json();
      })
      .catch(this.handleError);
  }

  public signupCourseClassStudent = (parameters: string): Observable<CourseClassStudentView[]> => {
    const toAdd= JSON.stringify(parameters);
    const actionUrl = Constants.apiServer + '/service/course/signupCourseClassStudent';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return <CourseClassStudentView[]>response.json();
      })
      .catch(this.handleError);
  }

  public signupCourseClassToStudentList = (parameters: string, usersId: string): Observable<CourseClassStudentView[]> => {
    const actionUrl = Constants.apiServer + '/service/course/signupCourseClassToStudentList/' + parameters + '/' + usersId;
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => {
        return <CourseClassStudentView[]>response.json();
      })
      .catch(this.handleError);
  }

  public forceRemoval = (str: string): Observable<string> => {
    const toAdd= JSON.stringify(str);
    const actionUrl = Constants.apiServer + '/service/course/forceRemoval';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }

   public remove = (str: string): Observable<string> => {
    const toAdd= JSON.stringify(str);
    const actionUrl = Constants.apiServer + '/service/course/remove';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }

  public abandon = (str: string): Observable<string> => {
    const toAdd= JSON.stringify(str);
    const actionUrl = Constants.apiServer + '/service/course/abandon';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }

  public approveRegistration = (str: string): Observable<string> => {
    const toAdd= JSON.stringify(str);
    const actionUrl = Constants.apiServer + '/service/course/approveRegistration';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }

  public getRegistrations = (status: number): Observable<CourseView[]> => {
    this.actionUrl = Constants.apiServer + '/service/course/getRegistrations/' + status;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <CourseView[]>response.json())
      .catch(this.handleError);
  }

  public getRegistrationsByUser = (status: number, user: User): Observable<CourseView[]> => {
    this.actionUrl = Constants.apiServer + '/service/course/getRegistrations/getByUser/' + user.id + "/" + status;
    console.log("getRegistrationsByUser: " + this.actionUrl);
    return this.http.get(this.actionUrl)
      .map((response: Response) => <CourseView[]>response.json())
      .catch(this.handleError);
  }
  public save = (course: Course): Observable<Course> => {
    const toAdd= JSON.stringify(course);
    const actionUrl = Constants.apiServer + '/service/course/save';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public saveExpense = (exp: Expense): Observable<Expense> => {
    const toAdd= JSON.stringify(exp);
    const actionUrl = Constants.apiServer + '/service/course/saveExpense';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public delete = (course: Course): Observable<Boolean> => {
    const toAdd= JSON.stringify(course);
    const actionUrl = Constants.apiServer + '/service/course/delete';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        if (response && response.json() == 'Success') {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  public closeCourse = (course: Course): Observable<string> => {
    const toAdd = JSON.stringify(course);
    const actionUrl = Constants.apiServer + '/service/course/closeCourse';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json() ;
      })
      .catch(this.handleError);
  }

   public closeStudentCourse = (str: string): Observable<string> => {
    const toAdd = JSON.stringify(str);
    const actionUrl = Constants.apiServer + '/service/course/closeStudentCourse';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json() ;
      })
      .catch(this.handleError);
  }

  public deleteExpense = (expense: Expense): Observable<Boolean> => {
    const toAdd= JSON.stringify(expense);
    const actionUrl = Constants.apiServer + '/service/course/deleteExpense';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        if (response && response.json() == 'Success') {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  public getExpenses = (course: Course): Observable<Expense[]> => {
    const toAdd = JSON.stringify(course);
    const actionUrl = Constants.apiServer + '/service/course/getExpenses';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        if (response && response.json())
          return <Expense[]>response.json();
      })
      .catch(this.handleError);
  }

  public getUserCourses = (user: User): Observable<CourseView[]> => {
    this.actionUrl = Constants.apiServer + '/service/course/getByUser/' + user.id;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <CourseView[]>response.json())
      .catch(this.handleError);
  }

    public getStudentsByCourse = (cours: Course): Observable<CourseView[]> => {
    this.actionUrl = Constants.apiServer + '/service/course/getStudentsByCourse/' + cours.id;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <CourseView[]>response.json())
      .catch(this.handleError);
  }

  public getUserCoursesBySchoolYear = (user: User,schoolyearId : number): Observable<CourseView[]> => {
    this.actionUrl = Constants.apiServer + '/service/course/getByUserAndSchoolYear/' + user.id+ "/"+schoolyearId;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <CourseView[]>response.json())
      .catch(this.handleError);
  }

  public getPayments = (course: CourseView): Observable<Payment[]> => {
    this.actionUrl = Constants.apiServer + '/service/course/getPayments/' + course.studentCourseId;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Payment[]>response.json())
      .catch(this.handleError);
  }

  public getMarks = (course: CourseView): Observable<Mark[]> => {
    this.actionUrl = Constants.apiServer + '/service/course/getMarks/' + course.studentCourseId;
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Mark[]>response.json())
      .catch(this.handleError);
  }


  public approve = (course: CourseView): Observable<string> => {
    const toAdd= JSON.stringify(course);
    const actionUrl = Constants.apiServer + '/service/course/approve';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public deleteRegistration = (course: CourseView): Observable<string> => {
    const toAdd= JSON.stringify(course);
    const actionUrl = Constants.apiServer + '/service/course/deleteRegistration';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public reject = (course: CourseView): Observable<string> => {
    const toAdd= JSON.stringify(course);
    const actionUrl = Constants.apiServer + '/service/course/reject';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  public savePayment = (courseV: CourseView): Observable<string> => {
    const toAdd= JSON.stringify(courseV);
    const actionUrl = Constants.apiServer + '/service/course/savePayment';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  public saveMark = (courseV: CourseView): Observable<string> => {
    const toAdd= JSON.stringify(courseV);
    const actionUrl = Constants.apiServer + '/service/course/saveMark';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  public getAttendanceByTeacher = (teacherId: number): Observable<Attendance[]> => {
    this.actionUrl = Constants.apiServer + '/service/course/getAttendanceByTeacher/' + teacherId;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Attendance[]>response.json())
      .catch(this.handleError);
  }

  public getAttendanceById = (attendanceId: number): Observable<Attendance> => {
    this.actionUrl = Constants.apiServer + '/service/course/getAttendanceById/' + attendanceId;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Attendance>response.json())
      .catch(this.handleError);
  }

  public getAttendanceDetailsByAttendanceId = (at: Attendance): Observable<AttendanceDetails[]> => {
    const toAdd= JSON.stringify(at);
    const actionUrl = Constants.apiServer + '/service/course/getAttendanceDetailsByAttendanceId';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getAllAttendanceDetailsByStudentId = (studentId: number): Observable<AttendanceDetails[]> => {

    this.actionUrl = Constants.apiServer + '/service/course/getAllAttendanceDetailsByStudentId/' + studentId;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <AttendanceDetails[]>response.json())
      .catch(this.handleError);
  }

  public getSearchAttendanceDetails = (searchAttendance: SearchAttendance): Observable<AttendanceDetails[]> => {
    const toAdd= JSON.stringify(searchAttendance);
    const actionUrl = Constants.apiServer + '/service/course/getSearchAttendanceDetails';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getSearchAttendanceDetailsByStudentId = (searchAttendance: SearchAttendance,studentId : number): Observable<AttendanceDetails[]> => {
    const toAdd= JSON.stringify(searchAttendance);
    const actionUrl = Constants.apiServer + '/service/course/getSearchAttendanceDetailsByStudentId/'+ studentId;
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public saveAttendanceDetail = (at: AttendanceDetails): Observable<AttendanceDetails> => {
   console.log("Service présence " +at.isPresent);
    const toAdd= JSON.stringify(at);
    console.log("atd : " +at);
    const actionUrl = Constants.apiServer + '/service/course/saveAttendanceDetail';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  public doAttendance = (attendanceId: number): Observable<string> => {
    const toAdd = JSON.stringify(attendanceId);
    const actionUrl = Constants.apiServer + '/service/course/doAttendance/' + attendanceId;
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => <string>response.json())
      .catch(this.handleError);
  }

  public sendAttendanceSms = (): Observable<any> => {
    const actionUrl = Constants.apiServer + '/service/course/sendAttendanceSms';
    return this.http.get(actionUrl)    
  }

  public sendAttendanceSmsCs = (): Observable<any> => {
    const actionUrl = Constants.apiServer + '/service/course/sendAttendanceSmsCs';
    return this.http.get(actionUrl)    
  }



  public getAllAttendances = (): Observable<Attendance[]> => {
    this.actionUrl = Constants.apiServer + '/service/course/getAllAttendances' ;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Attendance[]>response.json())
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

   public getStudentCourseGlobalResult = (request: StudentGlobalResultRequest): Observable<StudentCourseGlobalResult[]> => {
    const toAdd= JSON.stringify(request);
 
    const actionUrl = Constants.apiServer + '/service/course/getStudentCourseGlobalResult';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
}
