import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {Cookie} from "ng2-cookies/ng2-cookies";
import {StudentProjectService} from '../services/studentProject.service';
import {LevelService} from '../services/level.service';
import {Constants} from '../app.constants';
import {DataTableModule, DialogModule, InputTextareaModule, Message} from 'primeng/primeng';
import {FileUploader} from './fileUploader';
import {CheckboxModule} from 'primeng/checkbox';
import {StudentProjectCollege} from "../models/studentProjectCollege";
import {CollegeDropdown} from './dropdowns/dropdown.college';
import {StudentProjectTopicDropdown} from './dropdowns/dropdown.studentProjectTopic';
import {StudentProjectPromotionDropdown} from './dropdowns/dropdown.studentProjectPromotion';
import {StudentProjectPhaseDropdown} from './dropdowns/dropdown.studentProjectPhase';
import {TeacherDropdown} from './dropdowns/dropdown.teacher';
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {StudentProjectPhase} from "../models/studentProjectPhase";
import {StudentProjectPhaseView} from "../models/studentProjectPhaseView";
import {StudentProject} from "../models/studentProject";
import {StudentProjectCollegePhase} from "../models/studentProjectCollegePhase";
import {StudentProjectTopicStudentsPhasesView} from "../models/StudentProjectTopicStudentsPhasesView";
import {StudentProjectCollegeTeam} from "../models/studentProjectCollegeTeam";
import {Student} from "../models/student";
import {College} from "../models/college";

@Component({
    selector: 'app-admin-student-project-project',
    templateUrl: '../pages/adminStudentProjectProject.html',
    providers: [StudentProjectService, CollegeDropdown, StudentProjectTopicDropdown, StudentProjectPhaseDropdown, TeacherDropdown, StudentProjectPromotionDropdown]
})
export class AdminStudentProjectProject implements OnInit, OnDestroy {

    public studentsProjectsColleges: StudentProjectCollege[];
    public error: String = '';
    public selectedStudentProjectCollege: StudentProjectCollege;
    displayDialog: boolean;
    studentProjectCollege: StudentProjectCollege = new StudentProjectCollege();
    newStudentProjectCollege: boolean;
    studentsProjectsPhases: StudentProjectPhase[];
    cols: any[];
    studentProject: StudentProject = new StudentProject();
    studentsProjectsPhasesView: StudentProjectPhaseView[];
    studentProjectsTopicStudentsPhasesView: StudentProjectTopicStudentsPhasesView[];
    @ViewChild(FileUploader) fileUploader: FileUploader;

    studentProjectCollegeTeam: StudentProjectCollegeTeam = new StudentProjectCollegeTeam();
    public searchTextStudentProject: string;
    theCollege: College;
    theStudentProject: StudentProject;
    loggedUser: User;
    public errorStudentProject: String = '';

    collegeDropdown: CollegeDropdown;
    studentProjectTopicDropdown: StudentProjectTopicDropdown;
    studentProjectPhaseDropdown: StudentProjectPhaseDropdown;
    studentProjectPromotionDropdown: StudentProjectPromotionDropdown;
    public teacherDropdown: TeacherDropdown;

    public searchTextUser = '';
    public users: User[];
    public usersProject: User[];
    selectedUser: User;
    phaseCols: any[];

    userCols: any[];
    msgs: Message[] = [];

    checked: boolean = true;

    PROF_RESPONSABLE: string = Constants.PROF_RESPONSABLE;
    PROF_BACKUP1: string = Constants.PROF_BACKUP1;
    PROF_BACKUP2: string = Constants.PROF_BACKUP2;

    USER_SEARCH_PARTS: string = Constants.USER_SEARCH_PARTS;

    DETAIL: string = Constants.DETAIL;
    DELETE_LABEL: string = Constants.DELETE_LABEL;
    SAVE_LABEL: string = Constants.SAVE_LABEL;
    ADD_LABEL: string = Constants.ADD_LABEL;
    ADD_IMAGE: string = Constants.ADD_IMAGE;
    FILIERE: string = Constants.FILIERE;
    PROMOTION: string = Constants.STUDENTS_PROJECTS_PROMOTION;

    constructor
    (
        private studentProjectService: StudentProjectService,
        private levelService: LevelService,
        private userService: UserService,
        private clgDropdown: CollegeDropdown,
        private sptDropdown: StudentProjectTopicDropdown,
        private sppDropdown: StudentProjectPhaseDropdown,
        private tchDropdown: TeacherDropdown,
        private cstudentProjectPromotionDropdown: StudentProjectPromotionDropdown,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        this.collegeDropdown = clgDropdown;
        this.studentProjectTopicDropdown = sptDropdown;
        this.studentProjectPhaseDropdown = sppDropdown;
        this.teacherDropdown = tchDropdown;
        this.studentProjectPromotionDropdown = cstudentProjectPromotionDropdown;
    }

    ngOnDestroy() {
        this.studentsProjectsColleges = null;
        this.error = null;
        this.selectedStudentProjectCollege = null;
        this.studentProjectCollege = null;
        this.cols = null;
    }

    ngOnInit() {

        this.loggedUser = JSON.parse(atob(Cookie.get('user')));
        this.studentProjectCollegeTeam.student = new Student();

        this.cols = [
            {
                field: 'college.name',
                header: Constants.FILIERE,
                sortable: 'true',
                filter: 'true',
                style: {'width': '30%', 'overflow': 'visible'}
            },
            {
                field: 'name',
                header: Constants.NAME,
                sortable: 'true',
                filter: 'true',
                style: {'width': '30%', 'overflow': 'visible'}
            },
            {
                field: 'studentProject.name',
                header: 'Projet',
                sortable: 'true',
                filter: 'true',
                style: {'width': '30%', 'overflow': 'visible'}
            },
            {
                field: 'responsable.name',
                header: Constants.PROF_RESPONSABLE,
                sortable: 'true',
                filter: 'true',
                style: {'width': '15%', 'overflow': 'visible'}
            }
        ];

        this.userCols = [
            {field: 'lastName', header: Constants.NAME, sortable: 'true', filter: 'true'},
            {field: 'firstName', header: Constants.PRENOM, sortable: 'true', filter: 'true'},
            {field: 'userName', header: Constants.MATRICULE_OR_USER, sortable: 'true', filter: 'true'}
        ];

        this.phaseCols = [
            {field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true', style: {'width': '40%', 'overflow': 'visible'}},
            {field: 'percentage', header: 'Pourcentage', sortable: 'true', filter: 'true', style: {'width': '15%', 'overflow': 'visible'}},
            {field: 'ordreExecution', header: 'Ordre d\'exécution', sortable: 'true', filter: 'true', style: {'width': '15%', 'overflow': 'visible'}},
            //{field: 'creditUnitPrice', header: Constants.CREDIT_UNIT_PRICE, sortable: 'true', filter: 'true', style: {'width': '15%', 'overflow': 'visible'}}
        ];
        //this.getAllPhases();
    }

    public getAll(): void {
        this.studentsProjectsColleges = [];
        this.studentProjectService.getAllCollege()
            .subscribe((data: StudentProjectCollege[]) => this.studentsProjectsColleges = data,
                error => console.log(error),
                () => console.log('Get all students projects complete'));
    }


    showDialogToAdd() {
        this.newStudentProjectCollege = true;
        this.studentProjectCollege = new StudentProjectCollege();
        this.displayDialog = true;
    }

    save() {
        try {
            this.error = '';
            this.studentProjectService.saveCollege(this.studentProjectCollege)
                .subscribe(result => {
                    if (result.id > 0) {
                        this.studentProjectCollege = result;
                        // this.putInTable();
                        this.displayDialog = false;
                    }
                    else {
                        this.error = Constants.saveFailed;
                        this.displayDialog = true;
                    }
                })
            //console.log(this.studentProjectCollege);
        }
        catch (e) {
            console.log(e);
        }


    }

    delete() {
        try {
            this.error = '';
            this.studentProjectService.deleteCollege(this.studentProjectCollege)
                .subscribe(result => {
                    if (result) {
                        this.removeFromTable();
                    }
                    else {
                        this.error = Constants.deleteFailed;
                        this.displayDialog = true;
                    }
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    public getAllPhases(): void {
        this.studentsProjectsPhases = [];
        this.studentProjectService.getAllPhase()
            .subscribe((data: StudentProjectPhase[]) => this.studentsProjectsPhases = data,
                error => console.log(error),
                () => console.log('Get all students projects phases complete'));
    }

    putInTable() {
        if (this.newStudentProjectCollege)
            this.studentsProjectsColleges.push(this.studentProjectCollege);
        else
            this.studentsProjectsColleges[this.findSelectedIndex()] = this.studentProjectCollege;

        var onTheFly: StudentProjectCollege[] = [];
        onTheFly.push(...this.studentsProjectsColleges);
        this.studentsProjectsColleges = onTheFly;

        this.resetData();
    }

    removeFromTable() {
        this.studentsProjectsColleges.splice(this.findSelectedIndex(), 1);
        var onTheFly: StudentProjectCollege[] = [];
        onTheFly.push(...this.studentsProjectsColleges);
        this.studentsProjectsColleges = onTheFly;
        this.resetData();
    }

    resetData() {
        this.studentProjectCollege = null;
        this.displayDialog = false;
        this.changeDetectorRef.detectChanges();
    }

    onRowSelect(evt) {
        this.newStudentProjectCollege = false;
        this.studentProjectCollege = this.clone(evt.data);
        //console.log(this.studentProjectCollege);
        this.displayDialog = true;
    }

    onRowExpand(evt) {
        this.users = null;
        this.usersProject = null;
        this.searchTextUser = null;
        this.newStudentProjectCollege = false;
        this.studentProjectCollege = this.clone(evt.data);
        //console.log(this.studentProjectCollege);

        this.errorStudentProject = "";

        this.findStudentsByProject();

        console.log("Row expand");
        this.getProjectCollegePhases(evt);
    }

    clone(e: StudentProjectCollege): StudentProjectCollege {
        let aStudentProjectCollege = new StudentProjectCollege();
        for (let prop in e) {
            aStudentProjectCollege[prop] = e[prop];
        }
        return aStudentProjectCollege;
    }

    findSelectedIndex(): number {
        return this.studentsProjectsColleges.indexOf(this.selectedStudentProjectCollege);
    }

    onUserSelected(event) {
        this.selectedUser = event.data;
    }

    public searchUser() {
        this.error = null;
        if (this.searchTextUser != null) {
            this.userService.search(this.searchTextUser).subscribe((data: User[]) => {
                    this.users = data;
                    if (this.users == null || this.users.length <= 0) {
                        this.error = Constants.NO_USER_FOUND;
                    }
                },
                error => console.log(error),
                () => console.log('Find users with name like ' + this.searchTextUser));
        }
    }

    public findStudentsByProject() {
        this.error = null;

            //this.userService.getStudentsByProject(this.studentProjectCollege).subscribe((data: User[]) => {
            this.studentProjectService.getStudentsByProject(this.studentProjectCollege).subscribe((data: User[]) => {
                    this.usersProject = data;
                    if (this.usersProject == null || this.usersProject.length <= 0) {
                        this.error = Constants.NO_USER_FOUND;
                    }
                },
                error => console.log(error),
                () => console.log('Find students by project'));

    }

    public addStudentToProject(data: User) {
        this.errorStudentProject = "";
        this.selectedUser = data;

        //data.studentProjectCollege = this.studentProjectCollege;

        this.studentProjectCollegeTeam.student.user = this.selectedUser;
        this.studentProjectCollegeTeam.studentProjectCollege = this.studentProjectCollege;
        this.studentProjectCollegeTeam.status = 1;

        //console.log(this.studentProjectCollegeTeam);

        try {
            this.error = '';
            this.studentProjectService.addStudentToProject(this.studentProjectCollegeTeam)
                .subscribe(result => {
                  //console.log(result);
                    if (result.id > 0) {
                        this.putUserProjectInTable();
                        this.removeUserFromTable();
                        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Succès '});
                        //console.log(result);
                    }
                    else {
                        this.errorStudentProject = "L'étudiant travaille déjà sur un autre projet !";
                    }
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    public addStudentProjectCollegePhase(data: StudentProjectPhaseView) {
        //console.log(this.studentProjectCollege);
        //console.log(data);

        data.studentProjectCollegeId = this.studentProjectCollege.id;

        try {
            this.error = '';
            this.studentProjectService.saveProjectCollegePhase(data)
                .subscribe(result => {
                    if (result.studentProjectCollegePhaseId > 0) {
                        //data = result;
                        data.studentProjectCollegePhaseStatus = 1;
                        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Succès '});
                    }
                    else {
                        this.error = Constants.deleteFailed;
                    }
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    public deleteCollegePhaseByStudentProjectPhaseVO(data: StudentProjectPhaseView) {
        //console.log(this.studentProjectCollege);
        //console.log(data);

        data.studentProjectCollegeId = this.studentProjectCollege.id;

        try {
            this.error = '';
            this.studentProjectService.deleteCollegePhaseByStudentProjectPhaseVO(data)
                .subscribe(result => {
                    if (result.studentProjectCollegePhaseId == null) {
                        //console.log(result);
                        //data = result;
                        data.studentProjectCollegePhaseStatus = 0;
                        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Succès '});
                    }
                    else {
                        this.error = Constants.deleteFailed;
                    }
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    public removeStudentOnProject(data: User) {
        //console.log(this.studentProjectCollege);
        this.selectedUser = data;
        //console.log(data);

        try {
            this.error = '';
            this.studentProjectService.removeStudentOnProject(this.selectedUser)
                .subscribe(result => {
                    if (result.id > 0) {
                        this.removeUserProjectFromTable();
                        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Succès '});
                        //console.log(result);
                    }
                    else {
                        this.error = Constants.deleteFailed;
                    }
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    public removeStudentOnProjectByIds(data: User) {
        //console.log(this.studentProjectCollege);
        this.selectedUser = data;
        //console.log(data);

        try {
            this.error = '';
            this.studentProjectService.removeStudentOnProjectByIds(this.studentProjectCollege.id, this.selectedUser.id)
                .subscribe(result => {
                    if (result.id > 0) {
                        this.removeUserProjectFromTable();
                        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Succès '});
                        //console.log(result);
                    }
                    else {
                        this.error = Constants.deleteFailed;
                    }
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    public getProjectCollegePhases(evt) {
        console.log("College phases");
        this.studentsProjectsPhases = null;
        this.studentProject = this.studentProjectCollege.studentProject;
        //console.log(this.studentProject);
        this.studentProjectService.getProjectCollegePhases(this.studentProjectCollege).subscribe((data: StudentProjectPhaseView[]) => {
                this.studentsProjectsPhasesView = data;
                //console.log(this.studentsProjectsPhasesView);
            },
            error => console.log(error),
            () => console.log('Get students projects colleges phases'));
    }

    public getProjectCollegeAllStudentsAndPhases() {
        console.log("Get All project College Students and Phases");
        this.studentProjectService.getProjectCollegeAllStudentsAndPhasesByCollege(this.studentProjectCollege).subscribe((data: StudentProjectTopicStudentsPhasesView[]) => {
                this.studentProjectsTopicStudentsPhasesView = data;
                //console.log(this.studentProjectsTopicStudentsPhasesView);
            },
            error => console.log(error),
            () => console.log('Get All project College Students and Phases finished'));
    }

    putUserProjectInTable() {
        this.usersProject.push(this.selectedUser);

        var onTheFly: User[] = [];
        onTheFly.push(...this.usersProject);
        this.usersProject = onTheFly;
    }

    putUserInTable() {
        this.users.push(this.selectedUser);

        var onTheFly: User[] = [];
        onTheFly.push(...this.users);
        this.users = onTheFly;
    }

    removeUserFromTable() {
        this.users.splice(this.findSelectedIndex(), 1);
        var onTheFly: User[] = [];
        onTheFly.push(...this.users);
        this.users = onTheFly;
    }

    removeUserProjectFromTable() {
        this.usersProject.splice(this.findSelectedUserProjectIndex(), 1);
        var onTheFly: User[] = [];
        onTheFly.push(...this.usersProject);
        this.usersProject = onTheFly;
    }

    findSelectedUserIndex(): number {
        return this.users.indexOf(this.selectedUser);
    }

    findSelectedUserProjectIndex(): number {
        return this.usersProject.indexOf(this.selectedUser);
    }

    public searchStudentProject() {
      this.studentsProjectsColleges = [];
      this.studentProjectService.searchStudentProject((this.theCollege == null ? 0 : this.theCollege.id) + '|' + (this.theStudentProject == null ? 0 : this.theStudentProject.id) + '|' + this.searchTextStudentProject)
        .subscribe((data: StudentProjectCollege[]) => {
          this.studentsProjectsColleges = data
        },
          error => console.log(error),
          () => console.log('Get StudentProjectColleges for ' + this.searchTextStudentProject + ' complete'));
    }

}
