import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Country} from '../models/country';
//import {Nationality} from '../models/nationality';
import {Contact} from '../models/contact';
import {SchoolYear} from '../models/schoolYear';
import {EventType} from '../models/eventType';
import {TuitionType} from '../models/tuitionType';
import {Term} from '../models/term';
import {TermGroup} from '../models/termGroup';
import {ExamType} from '../models/examType';
import {School} from '../models/school';
import {Constants} from '../app.constants';
import { Author } from '../models/author';
import { Brand } from '../models/brand';
import { Building } from '../models/building';
import { Room } from '../models/room';
import { Category } from '../models/category';
import {Currency} from '../models/currency';
import { Department } from '../models/department';
import { Language } from '../models/language';
import { Mail } from '../models/mail';
import { Publisher } from '../models/publisher';
import { ExpenseType } from '../models/expenseType';
import {TimePeriod} from '../models/timePeriod';
import {Weekday} from '../models/weekday';
import {Doc} from '../models/doc';
import {SelectItem} from 'primeng/primeng';
import { Fee } from '../models/fee';
import { Company } from '../models/company';
import {InformationChannel} from "../models/informationChannel";
import { Bank } from 'app/models/bank';
import { StudentTuitionView } from 'app/models/studentTuitionView';
import { ContractType } from 'app/models/grh/contractType';
import { AvantageType } from 'app/models/grh/avantageType';
import { Avantage } from 'app/models/grh/avantage';
import { TimeSheetEntryType } from 'app/models/timeSheetEntryType'; 
import { CourseGroupeCode } from 'app/models/courseGroupeCode';
import { StudentProjectPromotion } from 'app/models/studentProjectPromotion';
import { UserJpope } from 'app/models/UserJpope';
import { AnyView } from 'app/models/anyView';
import { LevelGlobal } from 'app/models/levelGlobal';

@Injectable()
export class BaseService {

  private headers: Headers;
  public DAYS_MAP: {[key: number]: string} = {};
  public TIME_PERIOD_MAP: {[key: number]: string} = {};

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getAllCountries = (): Observable<Country[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getAllCountries';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Country[]>response.json())
      .catch(this.handleError);
  }


  public getAllExpenseTypes = (): Observable<ExpenseType[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getAllExpenseTypes';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <ExpenseType[]>response.json())
      .catch(this.handleError);
  }
  public getAllTerms = (): Observable<Term[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getAllTerms';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Term[]>response.json())
      .catch(this.handleError);
  }


  public getAllCourseGroupeCode = (): Observable<CourseGroupeCode[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getAllCourseGrouepCode';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <CourseGroupeCode[]>response.json())
      .catch(this.handleError);
  }

  public getAllStudentProjectPromotion = (): Observable<StudentProjectPromotion[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getAllStudentProjectPromotion';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <StudentProjectPromotion[]>response.json())
      .catch(this.handleError);
  }

  public getSchool = (): Observable<School> => {
    const actionUrl = Constants.apiServer + '/service/base/getSchool';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <School>response.json())
      .catch(this.handleError);
  }

  public getCurrentSchoolYear = (): Observable<SchoolYear> => {
      const actionUrl = Constants.apiServer + '/service/base/getCurrentSchoolYear';
    return this.http.get(actionUrl, { headers: this.headers })
      .map((response: Response) => <SchoolYear>response.json())
      .catch(this.handleError);
  }
  public getSessionChart = (): Observable<any> => {
    const actionUrl = Constants.apiServer + '/service/base/getSessionChart';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getAllTermGroups = (): Observable<TermGroup[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getAllTermGroups';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <TermGroup[]>response.json())
      .catch(this.handleError);
  }
  public getAllExamTypes = (): Observable<ExamType[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getAllExamTypes';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <ExamType[]>response.json())
      .catch(this.handleError);
  }
  public getAllCurrencies = (): Observable<Currency[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getAllCurrencies';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Currency[]>response.json())
      .catch(this.handleError);
  }
  public getAllSchoolYears = (): Observable<SchoolYear[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getAllSchoolYears';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <SchoolYear[]>response.json())
      .catch(this.handleError);
  }

    public getAllCompanies = (): Observable<Company[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getAllCompanies';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Company[]>response.json())
      .catch(this.handleError);
  }

  public getAllEventTypes = (): Observable<EventType[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getAllEventTypes';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <EventType[]>response.json())
      .catch(this.handleError);
  }

  public getAllCategories = (): Observable<Category[]> => {
    const actionUrl = Constants.apiServer + '/service/lookUpTable/CATEGORY/getAll';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Category[]>response.json())
      .catch(this.handleError);
  }

  public getAllDdCategories = (): Observable<Category[]> => {
    const actionUrl = Constants.apiServer + '/service/lookUpTable/DD_CATEGORY/getAll';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Category[]>response.json())
      .catch(this.handleError);
  }

  public getAllInformationsChannel = (): Observable<InformationChannel[]> => {
    const actionUrl = Constants.apiServer + '/service/lookUpTable/INFORMATION_CHANNEL/getAll';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <InformationChannel[]>response.json())
      .catch(this.handleError);
  }

    public getAllBanks = (): Observable<Bank[]> => {
    const actionUrl = Constants.apiServer + '/service/lookUpTable/BANK/getAll';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Bank[]>response.json())
      .catch(this.handleError);
  }

  public getAllPublishers = (): Observable<Publisher[]> => {
    const actionUrl = Constants.apiServer + '/service/lookUpTable/PUBLISHER/getAll';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Category[]>response.json())
      .catch(this.handleError);
  }

  public getAllBrands = (): Observable<Brand[]> => {
    const actionUrl = Constants.apiServer + '/service/lookUpTable/BRAND/getAll';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Brand[]>response.json())
      .catch(this.handleError);
  }

  public getAllBuildings = (): Observable<Building[]> => {
    const actionUrl = Constants.apiServer + '/service/lookUpTable/BUILDING/getAll';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Building[]>response.json())
      .catch(this.handleError);
  }

  public getAllRooms = (): Observable<Room[]> => {
    const actionUrl = Constants.apiServer + '/service/lookUpTable/ROOM/getAll';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Room[]>response.json())
      .catch(this.handleError);
  }

  public getBuildingRooms = (buildingId: number): Observable<Room[]> => {
    const actionUrl = Constants.apiServer + '/service/lookUpTable/ROOM/getByParent/' + buildingId;
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Room[]>response.json())
      .catch(this.handleError);
  }

  public getAllLanguages = (): Observable<Language[]> => {
    const actionUrl = Constants.apiServer + '/service/lookUpTable/LANGUAGE/getAll';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Language[]>response.json())
      .catch(this.handleError);
  }

  public getAllAuthors = (): Observable<Author[]> => {
    const actionUrl = Constants.apiServer + '/service/lookUpTable/AUTHOR/getAll';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Author[]>response.json())
      .catch(this.handleError);
  }

  public getFees = (): Observable<Fee[]> => {
    const actionUrl = Constants.apiServer + '/service/lookUpTable/FEE/getAll';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Fee[]>response.json())
      .catch(this.handleError);
  }

  public getAllTuitionTypes = (): Observable<TuitionType[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getAllTuitionTypes';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <TuitionType[]>response.json())
      .catch(this.handleError);
  }

    public getAllDepartments = (): Observable<Department[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getAllDepartments';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Department[]>response.json())
      .catch(this.handleError);
  }

   public getActiveDepartments = (): Observable<Department[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getActiveDepartments';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Department[]>response.json())
      .catch(this.handleError);
  }

  public getAllSysConfig = (): Observable<Constants[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getAllSysConfigs';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Constants[]>response.json())
      .catch(this.handleError);
  }

  public sendMail = (contact: Contact): Observable<boolean> => {
    const toAdd = JSON.stringify(contact);
    const actionUrl = Constants.apiServer + '/service/base/sendMail';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        if (response && response.json() === 'Success') {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  public getLatePayments = (): Observable<StudentTuitionView[]> => {
        const actionUrl = Constants.apiServer + '/service/user/getLatePayments';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <StudentTuitionView[]>response.json())
      .catch(this.handleError);
  }

  public getLatePaymentsBySchoolYear = (schoolYear : SchoolYear): Observable<StudentTuitionView[]> => {
    let toAdd = JSON.stringify(schoolYear);
    let actionUrl = Constants.apiServer + '/service/user/getLatePaymentsBySchoolYear';      
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
          return  response.json();
      }) 
      .catch(this.handleError);
  }

  public saveStudentTuitionBySchooYear = (schoolYear : SchoolYear): Observable<AnyView[]> => {
    let toAdd = JSON.stringify(schoolYear);
    let actionUrl = Constants.apiServer + '/service/tuition/saveStudentTuitionBySchooYear';      
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
          return  response.json();
      }) 
      .catch(this.handleError);
  }

  public saveLevelGlobal = (level : LevelGlobal): Observable<LevelGlobal> => {
    let toAdd = JSON.stringify(level);
    let actionUrl = Constants.apiServer + '/service/base/saveLevelGlobal';      
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
          return  response.json();
      }) 
      .catch(this.handleError);
 }

  public getAllLevelGlobal = (): Observable<LevelGlobal[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getAllLevelGlobal';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <LevelGlobal[]>response.json())
      .catch(this.handleError);
  }

  public deleteLevelGlobal = (level: LevelGlobal): Observable<Boolean> => {
    let toAdd = JSON.stringify(level);
    let actionUrl = Constants.apiServer + '/service/base/deleteLevelGlobal';
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

  public saveSchool = (school: School): Observable<boolean> => {
    const toAdd = JSON.stringify(school);
    const actionUrl = Constants.apiServer + '/service/base/saveSchool';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        if (response && response.json() === 'Success') {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }


   public saveJpope = (jpope: UserJpope): Observable<boolean> => {
    const toAdd = JSON.stringify(jpope);
    const actionUrl = Constants.apiServer + '/service/base/saveJpopeUser';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        if (response && response.json() === 'Success') {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  public getMarkProgress = (param: string): Observable<string> => {
    const actionUrl = Constants.apiServer + '/service/base/getMarkProgress';
    const toAdd = JSON.stringify(param);
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getAvgProgress = (param: number): Observable<string> => {
    const actionUrl = Constants.apiServer + '/service/base/getAvgProgress';
    const toAdd = JSON.stringify(param);
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getPaymentGraph = (param: number): Observable<string> => {
    const actionUrl = Constants.apiServer + '/service/base/getPaymentGraph';
    const toAdd = JSON.stringify(param);
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }


  public sendMassMail = (mail: Mail): Observable<boolean> => {
    const toAdd = JSON.stringify(mail);
    const actionUrl = Constants.apiServer + '/service/base/sendMassMail';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        if (response && response.json() === 'Success') {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  public getWeekDaysDropDown = (): SelectItem[] => {
    const weekDays: SelectItem[] = [];
    this.getWeekDays()
      .subscribe((data: Weekday[]) => {
        weekDays.push({label: Constants.CHOOSE_ONE, value: {}});
        for (const wd of data) {
          weekDays.push({label: wd.name, value: wd.id});
          this.DAYS_MAP[wd.id] = wd.name;
        }
        return weekDays;
      },
      error => console.log(error),
      () => console.log('Get all weekday complete'));
    return weekDays;
  }

  public getWeekDays = (): Observable<Weekday[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getAllWeekdays';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);

  }
  public getTimePeriodsDropDown = (): SelectItem[] => {
    const timePeriods: SelectItem[] = [];
    this.getTimePeriods()
      .subscribe((data: TimePeriod[]) => {
        timePeriods.push({label: Constants.CHOOSE_ONE, value: {}});
        for (const wd of data) {
          timePeriods.push({label: wd.description, value: wd.id});
          this.TIME_PERIOD_MAP[wd.id] = wd.description;
        }
        return timePeriods;
      },
      error => console.log(error),
      () => console.log('Get all timeperiods complete'));

    return timePeriods;

  }

  public getTimePeriods = (): Observable<TimePeriod[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getAllTimePeriods';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getFiles = (entity: string, id: number): Observable<Doc[]> => {
    const actionUrl = Constants.apiServer + '/service/fileUploader/file/list/' + entity + '/' + id;
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public deleteFile = (doc: Doc, entity: string, id: number): Observable<boolean> => {
    const toAdd = JSON.stringify(doc.fileName);
    const actionUrl = Constants.apiServer + '/service/fileUploader/file/delete/' + entity + '/' + id;
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        if (response && response.json() === 'Success') {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  public getAllContractTypes = (): Observable<ContractType[]> => {
    const actionUrl = Constants.apiServer + '/service/contractType/getAll';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <ContractType[]>response.json())
      .catch(this.handleError);
  }

  public getAllAvantageTypes = (): Observable<AvantageType[]> => {
    const actionUrl = Constants.apiServer + '/service/avantageType/getAll';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <AvantageType[]>response.json())
      .catch(this.handleError);
  }

  public getAllAvantages = (): Observable<Avantage[]> => {
    const actionUrl = Constants.apiServer + '/service/avantage/getAll';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Avantage[]>response.json())
      .catch(this.handleError);
  }

  public getAllTimeSheetEntryTypes = (): Observable<TimeSheetEntryType[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getAllTimeSheetEntryTypes';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <TimeSheetEntryType[]>response.json())
      .catch(this.handleError);
  }

}
