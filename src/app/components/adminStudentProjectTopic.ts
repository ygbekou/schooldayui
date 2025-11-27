import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {StudentProjectService} from '../services/studentProject.service';
import {LevelService} from '../services/level.service';
import {Constants} from '../app.constants';
import {DataTableModule, DialogModule, InputTextareaModule} from 'primeng/primeng';
import {FileUploader} from './fileUploader';
import {StudentProject} from "../models/studentProject";
import {StudentProjectCategoryDropdown} from "./dropdowns/dropdown.studentProjectCategory";
import {StudentProjectPhase} from "../models/studentProjectPhase";
import {StudentProjectPhaseView} from "../models/studentProjectPhaseView";
import {TuitionView} from "../models/tuitionView";
import {StudentProjectTopicPhase} from "../models/studentProjectTopicPhase";
import { CollegeDropdown } from './dropdowns/dropdown.college';
import { StudentProjectCategory } from 'app/models/studentProjectCategory';

@Component({
    selector: 'app-admin-student-project-topic',
    templateUrl: '../pages/adminStudentProjectTopic.html',
    providers: [StudentProjectService, StudentProjectCategoryDropdown,CollegeDropdown]
})
export class AdminStudentProjectTopic implements OnInit, OnDestroy {

    public studentsProjects: StudentProject[];
    public error: String = '';
    public selectedStudentProject: StudentProject;
    displayDialog: boolean;
    displayPhasesDialog: boolean;
    studentProject: StudentProject = new StudentProject();
    newStudentProject: boolean;
    studentProjectTopicPhase: StudentProjectTopicPhase = new StudentProjectTopicPhase();
    cols: any[];
    phaseCols: any[];
    studentsProjectsPhases: StudentProjectPhase[];
    studentsProjectsPhasesView: StudentProjectPhaseView[];
    @ViewChild(FileUploader) fileUploader: FileUploader;


    studentProjectCategoryDropdown: StudentProjectCategoryDropdown;

    DETAIL: string = Constants.DETAIL;
    DELETE_LABEL: string = Constants.DELETE_LABEL;
    SAVE_LABEL: string = Constants.SAVE_LABEL;
    ADD_LABEL: string = Constants.ADD_LABEL;
    ADD_IMAGE: string = Constants.ADD_IMAGE;
    STUDENT_PROJECT_CATEGORY: string = Constants.STUDENTS_PROJECTS_CATEGORY;
    collegeDropdown: CollegeDropdown;

    theCategory : StudentProjectCategory;

    constructor
    (
        private studentProjectService: StudentProjectService,
        private levelService: LevelService,
        private clgDropdown: CollegeDropdown,
        private spcDropdown: StudentProjectCategoryDropdown,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        this.studentProjectCategoryDropdown = spcDropdown;
        this.collegeDropdown = clgDropdown;

    }

    ngOnDestroy() {
        this.studentsProjects = null;
        this.error = null;
        this.selectedStudentProject = null;
        this.studentProject = null;
        this.cols = null;
    }

    ngOnInit() {
        this.cols = [
            {
                field: 'name',
                header: Constants.NAME,
                sortable: 'true',
                filter: 'true',
                style: {'width': '40%', 'overflow': 'visible'}
            },
            //{field: 'studentProjectCategory.name', header: Constants.STUDENTS_PROJECTS_CATEGORY, sortable: 'true', filter: 'true', style: {'width': '33%', 'overflow': 'visible'}},
            //{field: 'creditUnitPrice', header: Constants.CREDIT_UNIT_PRICE, sortable: 'true', filter: 'true', style: {'width': '15%', 'overflow': 'visible'}}
        ];
        this.phaseCols = [
            {
                field: 'name',
                header: Constants.NAME,
                sortable: 'true',
                filter: 'true',
                style: {'width': '40%', 'overflow': 'visible'}
            },
            //{field: 'studentProjectCategory.name', header: Constants.STUDENTS_PROJECTS_CATEGORY, sortable: 'true', filter: 'true', style: {'width': '33%', 'overflow': 'visible'}},
            //{field: 'creditUnitPrice', header: Constants.CREDIT_UNIT_PRICE, sortable: 'true', filter: 'true', style: {'width': '15%', 'overflow': 'visible'}}
        ];

        this.getAll();

    }

    public getAll(): void {
        this.studentsProjects = [];
        this.studentProjectService.getAll()
            .subscribe((data: StudentProject[]) => this.studentsProjects = data,
                error => console.log(error),
                () => console.log('Get all students projects complete'));
        console.log(this.studentsProjects);
    }


    showDialogToAdd() {
        this.newStudentProject = true;
        this.studentProject = new StudentProject();
        this.displayDialog = true;
        this.displayPhasesDialog = false;
    }

    save() {
        try {
            this.error = '';
            this.studentProjectService.save(this.studentProject)
                .subscribe(result => {
                    if (result.id > 0) {
                        this.studentProject = result;
                        this.putInTable();
                    }
                    else {
                        this.error = Constants.saveFailed;
                        this.displayDialog = true;
                        this.displayPhasesDialog = false;
                    }
                })
            console.log(this.studentProject);
        }
        catch (e) {
            console.log(e);
        }


    }

    addPhaseToStudentProjectTopic(studentProjectTopicPhaseView: StudentProjectPhaseView) {
        studentProjectTopicPhaseView.studentProjectId = this.studentProject.id;

        console.log(studentProjectTopicPhaseView);

        try {
            this.error = '';
            this.studentProjectService.saveProjectTopicPhase(studentProjectTopicPhaseView)
                .subscribe(result => {
                    if (result.studentProjectTopicPhaseId > 0) {
                        studentProjectTopicPhaseView = result;
                        //this.putInTable();
                    }
                })
            console.log(studentProjectTopicPhaseView);
        }
        catch (e) {
            console.log(e);
        }


    }

    deletePhaseToStudentProjectTopic(studentProjectTopicPhaseView: StudentProjectPhaseView) {
        //studentProjectTopicPhaseView.studentProjectId = this.studentProject.id;

        try {
            this.error = '';
            this.studentProjectService.deleteProjectTopicPhase(studentProjectTopicPhaseView)
                .subscribe(result => {
                    if (result) {
                        studentProjectTopicPhaseView.studentProjectTopicPhaseId = null;
                    }
                    else {
                        this.error = Constants.deleteFailed;
                        this.displayDialog = false;
                        this.displayPhasesDialog = true;
                    }
                })
            console.log(studentProjectTopicPhaseView);
        }
        catch (e) {
            console.log(e);
        }


    }

    delete() {
        try {
            this.error = '';
            this.studentProjectService.delete(this.studentProject)
                .subscribe(result => {
                    if (result) {
                        this.removeFromTable();
                    }
                    else {
                        this.error = Constants.deleteFailed;
                        this.displayDialog = true;
                        this.displayPhasesDialog = false;
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

    public getProjectPhases(evt) {
        this.displayPhasesDialog = true;
        this.displayDialog = false;
        this.studentProject = evt;
        console.log(this.studentProject);
        this.studentProjectService.getProjectPhases(this.studentProject).subscribe((data: StudentProjectPhaseView[]) => {
                this.studentsProjectsPhasesView = data;
                console.log(this.studentsProjectsPhasesView);
            },
            error => console.log(error),
            () => console.log('Get students projects phases'));
    }

    showDialogToUploadProjectDescription(data) {
        this.fileUploader.showDialogToUploadImage("projetEtudiant", data);
    }

    putInTable() {
        if (this.newStudentProject)
            this.studentsProjects.push(this.studentProject);
        else
            this.studentsProjects[this.findSelectedIndex()] = this.studentProject;

        var onTheFly: StudentProject[] = [];
        onTheFly.push(...this.studentsProjects);
        this.studentsProjects = onTheFly;

        this.resetData();
    }

    removeFromTable() {
        this.studentsProjects.splice(this.findSelectedIndex(), 1);
        var onTheFly: StudentProject[] = [];
        onTheFly.push(...this.studentsProjects);
        this.studentsProjects = onTheFly;
        this.resetData();
    }

    resetData() {
        this.studentProject = null;
        this.displayDialog = false;
        this.displayPhasesDialog = false;
        this.changeDetectorRef.detectChanges();
    }

    onRowSelect(evt) {
        this.newStudentProject = false;
        this.studentProject = this.clone(evt.data);
        console.log(this.studentProject);
        this.displayDialog = true;
        this.displayPhasesDialog = false;
    }

    onRowExpand(evt) {
        this.studentsProjectsPhases = null;
        this.getAllPhases();

        //this.findStudentsByProject();
    }

    clone(e: StudentProject): StudentProject {
        let aStudentProject = new StudentProject();
        for (let prop in e) {
            aStudentProject[prop] = e[prop];
        }
        return aStudentProject;
    }

    findSelectedIndex(): number {
        return this.studentsProjects.indexOf(this.selectedStudentProject);
    }

    showDialogToUploadImage(data) {
        this.fileUploader.showDialogToUploadImage("studentProject", data);
    }

    searchProject(){
        console.log(this.theCategory);

        this.studentProjectService.getAllProjetByCategory(this.theCategory)
                .subscribe((data: StudentProject[]) =>{
    
                    this.studentsProjects = data;
                    
                },
                    error => console.log(error),
                    () => console.log('Get students projects complete'));
    }

    
}
