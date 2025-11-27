import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Level } from '../models/level';
import { User } from '../models/User';
import { Exam } from '../models/exam';
import { Mark } from '../models/mark';
import { TermResultView } from '../models/termResultView';
import { Constants } from '../app.constants';
import { MarkView } from '../models/markView'
import { ResultSummaryView } from '../models/resultSummaryView';

@Injectable()
export class ExamService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getByTeacher = (user: User): Observable<Exam[]> => {
    this.actionUrl = Constants.apiServer + '/service/exam/getByTeacher/' + user.id;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Exam[]>response.json())
      .catch(this.handleError);
  }

  public getAll = (): Observable<Exam[]> => {
    this.actionUrl = Constants.apiServer + '/service/exam/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Exam[]>response.json())
      .catch(this.handleError);
  }

  public save = (exam: Exam): Observable<Exam> => {
    let toAdd = JSON.stringify(exam);
    let actionUrl = Constants.apiServer + '/service/exam/save';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public saveMark = (markV: MarkView): Observable<MarkView> => {
    let toAdd = JSON.stringify(markV);
    let actionUrl = Constants.apiServer + '/service/exam/saveMark';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public delete = (exam: Exam): Observable<Boolean> => {
    let toAdd = JSON.stringify(exam);
    let actionUrl = Constants.apiServer + '/service/exam/delete';
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

  public getUserExams = (user: User): Observable<Exam[]> => {
    this.actionUrl = Constants.apiServer + '/service/exam/getByUser/' + user.id;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Exam[]>response.json())
      .catch(this.handleError);
  }

  public getMarks = (exam: Exam): Observable<MarkView[]> => {
    let toAdd = JSON.stringify(exam);
    let actionUrl = Constants.apiServer + '/service/exam/getMarks';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <MarkView[]>response.json();
      })
      .catch(this.handleError);
  }

  public search = (searchText: string): Observable<Exam[]> => {
    let toAdd = JSON.stringify(searchText);
    let actionUrl = Constants.apiServer + '/service/exam/findExams';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <Exam[]>response.json();
      })
      .catch(this.handleError);
  }

  public searchTeacherExams = (searchText: string, teacherId : number): Observable<Exam[]> => {
    let toAdd = JSON.stringify(searchText);
    let actionUrl = Constants.apiServer + '/service/exam/findExamsByTeacher/'+ teacherId;
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <Exam[]>response.json();
      })
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  public calculateMonth = (param: string): Observable<string> => {
    let toAdd = JSON.stringify(param);
    let actionUrl = Constants.apiServer + '/service/exam/calculateMonth';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getTermResults = (param: string): Observable<TermResultView> => {
    let toAdd = JSON.stringify(param);
    let actionUrl = Constants.apiServer + '/service/exam/getTermResults';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getTermGroupResults = (param: string): Observable<TermResultView> => {
    let toAdd = JSON.stringify(param);
    let actionUrl = Constants.apiServer + '/service/exam/getTermGroupResults';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getYearResults = (param: string): Observable<TermResultView> => {
    let toAdd = JSON.stringify(param);
    let actionUrl = Constants.apiServer + '/service/exam/getYearResults';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getAverages = (param: ResultSummaryView): Observable<ResultSummaryView> => {
    let toAdd = JSON.stringify(param);
    let actionUrl = Constants.apiServer + '/service/exam/getAverages';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getTermGroupBulletins = (param: ResultSummaryView): Observable<ResultSummaryView> => {
    let toAdd = JSON.stringify(param);
    let actionUrl = Constants.apiServer + '/service/exam/termGroup/getBulletins';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getYearBulletins = (param: ResultSummaryView): Observable<ResultSummaryView> => {
    let toAdd = JSON.stringify(param);
    let actionUrl = Constants.apiServer + '/service/exam/year/getBulletins';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public calculateSemester = (param: string): Observable<string> => {
    let toAdd = JSON.stringify(param);
    let actionUrl = Constants.apiServer + '/service/exam/calculateSemester';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public calculateYear = (param: string): Observable<string> => {
    let toAdd = JSON.stringify(param);
    let actionUrl = Constants.apiServer + '/service/exam/calculateYear';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public emailTermResults = (param: string): Observable<string> => {
    let toAdd = JSON.stringify(param);
    let actionUrl = Constants.apiServer + '/service/exam/emailTermResults';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  public emailYearResults = (param: string): Observable<string> => {
    let toAdd = JSON.stringify(param);
    let actionUrl = Constants.apiServer + '/service/exam/emailYearResults';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  public emailTermGroupResults = (param: string): Observable<string> => {
    let toAdd = JSON.stringify(param);
    let actionUrl = Constants.apiServer + '/service/exam/emailTermGroupResults';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  
    public getStudentYearResults = (param: string): Observable<TermResultView> => {
    let toAdd = JSON.stringify(param);
    let actionUrl = Constants.apiServer + '/service/exam/getStudentYearResults';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }


// Télécharger le template (retourne un Blob)
 public exportTemplate(examId: number): Observable<any> {
    const actionUrl = Constants.apiServer + '/service/exam/exportTemplate/' + examId;
    
    return this.http.get(actionUrl)
      .map((res: Response) => res.blob()); // ✅ .blob() sur la Response
  }


// Importer le fichier (multipart/form-data)
public importMarks = (file: File, examId: number, modifiedBy?: number): Observable<string> => {
  const actionUrl = Constants.apiServer + '/service/exam/importMarks/' + examId;
  const formData: FormData = new FormData();
  formData.append('file', file, file.name);
  if (modifiedBy) {
    formData.append('modifiedBy', modifiedBy.toString());
  }
  return this.http.post(actionUrl, formData)
    .map((res: Response) => res.text())
    .catch(this.handleError);
}


}