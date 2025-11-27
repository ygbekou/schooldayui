import { getTestBed } from '@angular/core/testing';
import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Constants} from '../app.constants';
import {StudentProject} from "../models/studentProject";
import {StudentProjectPhase} from "../models/studentProjectPhase";
import {StudentProjectCollege} from "../models/studentProjectCollege";
import {StudentProjectCategory} from "../models/studentProjectCategory";
import {Enrollment} from "../models/enrollment";
import {TuitionView} from "../models/tuitionView";
import {StudentProjectPhaseView} from "../models/studentProjectPhaseView";
import {StudentProjectTopicPhase} from "../models/studentProjectTopicPhase";
import {StudentProjectCategoryView} from "../models/studentProjectCategoryView";
import {StudentProjectStudentView} from "../models/studentProjectStudentView";
import {StudentProjectTopicStudentsPhasesView} from "../models/StudentProjectTopicStudentsPhasesView";
import { User } from '../models/User';
import { StudentProjectCollegeTeam } from '../models/studentProjectCollegeTeam';
import { College } from 'app/models/college';

@Injectable()
export class StudentProjectService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public getAll = (): Observable<StudentProject[]> => {
        this.actionUrl = Constants.apiServer + '/service/studentProject/getAll';

        return this.http.get(this.actionUrl)
            .map((response: Response) => <StudentProject[]>response.json())
            .catch(this.handleError);
    }

    public getStudentProject = (studentProjectId: string): Observable<StudentProject> => {
        let toAdd = JSON.stringify(studentProjectId);
        let actionUrl = Constants.apiServer + '/service/studentProject/getStudentProject';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }
    public save = (studentProject: StudentProject): Observable<StudentProject> => {
        let toAdd = JSON.stringify(studentProject);
        let actionUrl = Constants.apiServer + '/service/studentProject/save';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public delete = (studentProject: StudentProject): Observable<Boolean> => {
        let toAdd = JSON.stringify(studentProject);
        let actionUrl = Constants.apiServer + '/service/studentProject/delete';
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

    public getProjectPhases = (studentProject: StudentProject): Observable<StudentProjectPhaseView[]> => {
        let toAdd = JSON.stringify(studentProject);
        let actionUrl = Constants.apiServer + '/service/studentProject/getProjectPhases';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <StudentProjectPhaseView[]>response.json();
            })
            .catch(this.handleError);
    }


    /* Students projects phases */


    public getAllPhase = (): Observable<StudentProjectPhase[]> => {
        this.actionUrl = Constants.apiServer + '/service/studentProject/phase/getAll';

        return this.http.get(this.actionUrl)
            .map((response: Response) => <StudentProjectPhase[]>response.json())
            .catch(this.handleError);
    }

    public getStudentProjectPhase = (studentProjectPhaseId: string): Observable<StudentProjectPhase> => {
        let toAdd = JSON.stringify(studentProjectPhaseId);
        let actionUrl = Constants.apiServer + '/service/studentProject/phase/getStudentProjectPhase';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }
    public savePhase = (studentProjectPhase: StudentProjectPhase): Observable<StudentProjectPhase> => {
        let toAdd = JSON.stringify(studentProjectPhase);
        let actionUrl = Constants.apiServer + '/service/studentProject/phase/save';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public deletePhase = (studentProjectPhase: StudentProjectPhase): Observable<Boolean> => {
        let toAdd = JSON.stringify(studentProjectPhase);
        let actionUrl = Constants.apiServer + '/service/studentProject/phase/delete';
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


    /* Students projects college */


    public getAllCollege = (): Observable<StudentProjectCollege[]> => {
        this.actionUrl = Constants.apiServer + '/service/studentProject/college/getAll';

        return this.http.get(this.actionUrl)
            .map((response: Response) => <StudentProjectCollege[]>response.json())
            .catch(this.handleError);
    }

    public getStudentProjectCollege = (studentProjectTeamId: string): Observable<StudentProjectCollege> => {
        let toAdd = JSON.stringify(studentProjectTeamId);
        let actionUrl = Constants.apiServer + '/service/studentProject/college/getStudentProjectTeam';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }
    public saveCollege = (studentProjectTeam: StudentProjectCollege): Observable<StudentProjectCollege> => {
        let toAdd = JSON.stringify(studentProjectTeam);
        let actionUrl = Constants.apiServer + '/service/studentProject/college/save';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public deleteCollege = (studentProjectTeam: StudentProjectCollege): Observable<Boolean> => {
        let toAdd = JSON.stringify(studentProjectTeam);
        let actionUrl = Constants.apiServer + '/service/studentProject/college/delete';
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

    public getProjectCollegePhases = (studentProjectCollege: StudentProjectCollege): Observable<StudentProjectPhaseView[]> => {
        let toAdd = JSON.stringify(studentProjectCollege);
        let actionUrl = Constants.apiServer + '/service/studentProject/college/getProjectCollegePhases';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <StudentProjectPhaseView[]>response.json();
            })
            .catch(this.handleError);
    }

    public getProjectCollegePhasesByTopicId = (projectId: number): Observable<StudentProjectPhaseView[]> => {
        let toAdd = JSON.stringify(projectId);
        let actionUrl = Constants.apiServer + '/service/studentProject/college/getProjectCollegePhasesByTopicId';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <StudentProjectPhaseView[]>response.json();
            })
            .catch(this.handleError);
    }


    /* Students projects category */


    public getAllCategory = (): Observable<StudentProjectCategory[]> => {
        this.actionUrl = Constants.apiServer + '/service/studentProject/category/getAll';

        return this.http.get(this.actionUrl)
            .map((response: Response) => <StudentProjectCategory[]>response.json())
            .catch(this.handleError);
    }

    public getAllCategoriesByCollege = (college: College): Observable<StudentProjectCategory[]> => {
        const collegeId = college.id; 
        const requestPayload = { id: collegeId };
    
        this.actionUrl = Constants.apiServer + '/service/studentProject/category/getByCollege';
    
        return this.http.post(this.actionUrl, requestPayload, { headers: this.headers })
            .map((response: Response) => <StudentProjectCategory[]>response.json())
            .catch(this.handleError);
    }

    public getAllProjetByCategory = (studentProjectCategory: StudentProjectCategory): Observable<StudentProject[]> => {
        const categoryId = studentProjectCategory.id; 
        const requestPayload = { id: categoryId };
    
        this.actionUrl = Constants.apiServer + '/service/studentProject/getAllByCategory';
    
        return this.http.post(this.actionUrl, requestPayload, { headers: this.headers })
            .map((response: Response) => <StudentProject[]>response.json())
            .catch(this.handleError);
    }
    

    public getStudentProjectCategory = (studentProjectCategoryId: string): Observable<StudentProjectCategory> => {
        let toAdd = JSON.stringify(studentProjectCategoryId);
        let actionUrl = Constants.apiServer + '/service/studentProject/category/getStudentProjectCategory';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }
    public saveCategory = (studentProjectCategory: StudentProjectCategory): Observable<StudentProjectCategory> => {
        let toAdd = JSON.stringify(studentProjectCategory);
        let actionUrl = Constants.apiServer + '/service/studentProject/category/save';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public deleteCategory = (studentProjectCategory: StudentProjectCategory): Observable<Boolean> => {
        let toAdd = JSON.stringify(studentProjectCategory);
        let actionUrl = Constants.apiServer + '/service/studentProject/category/delete';
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

    /* Project topic phase */

    public saveProjectTopicPhase = (studentProjectPhaseView: StudentProjectPhaseView): Observable<StudentProjectPhaseView> => {
        let toAdd = JSON.stringify(studentProjectPhaseView);
        let actionUrl = Constants.apiServer + '/service/studentProject/topicPhase/save';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public deleteProjectTopicPhase = (studentProjectPhaseView: StudentProjectPhaseView): Observable<Boolean> => {
        let toAdd = JSON.stringify(studentProjectPhaseView.studentProjectTopicPhaseId);
        let actionUrl = Constants.apiServer + '/service/studentProject/topicPhase/delete';
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

    /* Project college phase */

    public saveProjectCollegePhase = (studentProjectPhaseView: StudentProjectPhaseView): Observable<StudentProjectPhaseView> => {
        let toAdd = JSON.stringify(studentProjectPhaseView);
        let actionUrl = Constants.apiServer + '/service/studentProject/collegePhase/save';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public deleteCollegePhaseByStudentProjectPhaseVO = (studentProjectPhaseView: StudentProjectPhaseView): Observable<StudentProjectPhaseView> => {
        let toAdd = JSON.stringify(studentProjectPhaseView);
        let actionUrl = Constants.apiServer + '/service/studentProject/collegePhase/deleteByStudentProjectPhaseVO';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public deleteProjectCollegePhase = (studentProjectPhaseView: StudentProjectPhaseView): Observable<Boolean> => {
        let toAdd = JSON.stringify(studentProjectPhaseView.studentProjectCollegePhaseId);
        let actionUrl = Constants.apiServer + '/service/studentProject/collegePhase/delete';
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

    public getProjectTopicsByCategory = (): Observable<StudentProjectCategoryView[]> => {
        let actionUrl = Constants.apiServer + '/service/studentProject/category/getStudentProjectTopicsByCategory';
        return this.http.post(actionUrl, /*toAdd,*/ {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    
    /* Project on site */

    public getStudentsProject = (studentProjectCategoryView: StudentProjectCategoryView): Observable<StudentProjectStudentView[]> => {
        let toAdd = JSON.stringify(studentProjectCategoryView);
        let actionUrl = Constants.apiServer + '/service/studentProject/projectCategory/getProjectCollegeStudents';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public getProjectCollegeAllStudentsAndPhases = (studentProjectCategoryView: StudentProjectCategoryView): Observable<StudentProjectTopicStudentsPhasesView[]> => {
        let toAdd = JSON.stringify(studentProjectCategoryView);
        let actionUrl = Constants.apiServer + '/service/studentProject/projectCategory/getProjectCollegeAllStudents';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public getProjectCollegeAllStudentsByProjectIdAndCodeCycle = (projectId: number, codeCycle: string): Observable<StudentProjectTopicStudentsPhasesView[]> => {
        this.actionUrl = Constants.apiServer + '/service/studentProject/projectCategory/getProjectCollegeAllStudentsByProjectIdAndCodeCycle/'+projectId+'/'+codeCycle;

        return this.http.get(this.actionUrl)
            .map((response: Response) => <StudentProjectTopicStudentsPhasesView[]>response.json())
            .catch(this.handleError);
    }

    public getProjectCollegeAllStudentsAndPhasesByCollege = (studentProjectCollege: StudentProjectCollege): Observable<StudentProjectTopicStudentsPhasesView[]> => {
        let toAdd = JSON.stringify(studentProjectCollege);
        let actionUrl = Constants.apiServer + '/service/studentProject/projectCategory/getProjectCollegeAllStudentsAndPhasesByCollege';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    /* MANAGE STUDENTS ON PROJECT */

    public addStudentToProject = (studentProjectCollegeTeam: StudentProjectCollegeTeam): Observable<StudentProjectCollegeTeam> => {
        let toAdd = JSON.stringify(studentProjectCollegeTeam);
        let actionUrl = Constants.apiServer + '/service/studentProject/student/addStudentToProject';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public removeStudentOnProject = (user: User): Observable<StudentProjectCollegeTeam> => {
        let toAdd = JSON.stringify(user);
        let actionUrl = Constants.apiServer + '/service/studentProject/student/removeStudentOnProject';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public removeStudentOnProjectByIds = (studentProjectCollegeId: number, userId: number): Observable<StudentProjectCollegeTeam> => {
        let actionUrl = Constants.apiServer + '/service/studentProject/student/removeStudentOnProjectByIds/'+studentProjectCollegeId+'/'+userId;
        return this.http.get(actionUrl, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public getStudentsByProject = (studentProjectCollege: StudentProjectCollege): Observable<User[]> => {
        const toAdd = JSON.stringify(studentProjectCollege);
        const actionUrl = Constants.apiServer + '/service/studentProject/student/getStudentsByProject';
        return this.http.post(actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => {
                return <User[]>response.json();
            })
            .catch(this.handleError);
    }

    public searchStudentProject = (searchText: string): Observable<StudentProjectCollege[]> => {
      const toAdd= JSON.stringify(searchText);
      const actionUrl = Constants.apiServer + '/service/studentProject/search';
      return this.http.post(actionUrl, toAdd, {headers: this.headers})
        .map((response: Response) => {
          return <StudentProjectCollege[]>response.json();
        })
        .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    public getAllCollegeWithProjects = (): Observable<College[]> => {
        let actionUrl = Constants.apiServer + '/service/studentProject/getAllCollegeWithProjects';
        return this.http.get(actionUrl, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public getAllCollegeWithNewProjects = (): Observable<College[]> => {
        let actionUrl = Constants.apiServer + '/service/studentProject/getAllCollegeWithNewProjects';
        return this.http.get(actionUrl, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public getAllInterFiliereThemeWithProjects = (): Observable<StudentProjectCategory[]> => {
        let actionUrl = Constants.apiServer + '/service/studentProject/getAllInterFiliereThemeWithProjects';
        return this.http.get(actionUrl, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public getMarketingDigitalProject = (): Observable<StudentProjectCategory[]> => {
        let actionUrl = Constants.apiServer + '/service/studentProject/getMarketingDigitalProject';
        return this.http.get(actionUrl, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public getSupporITProject = (): Observable<StudentProjectCategory[]> => {
        let actionUrl = Constants.apiServer + '/service/studentProject/getSupporITProject';
        return this.http.get(actionUrl, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

}
