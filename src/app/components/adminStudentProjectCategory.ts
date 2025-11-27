import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {StudentProjectService} from '../services/studentProject.service';
import {LevelService} from '../services/level.service';
import {Constants} from '../app.constants';
import {DataTableModule, DialogModule, InputTextareaModule} from 'primeng/primeng';
import {FileUploader} from './fileUploader';
import {StudentProjectCategory} from "../models/studentProjectCategory";
import {StudentProjectPhase} from "../models/studentProjectPhase";
import { CollegeDropdown } from './dropdowns/dropdown.college';
import { College } from 'app/models/college';

@Component({
    selector: 'app-admin-student-project-category',
    templateUrl: '../pages/adminStudentProjectCategory.html',
    providers: [CollegeDropdown]
})
export class AdminStudentProjectCategory implements OnInit, OnDestroy {

    public studentsProjectsCategories: StudentProjectCategory[];
    public error: String = '';
    public selectedStudentProjectCategory: StudentProjectCategory;
    displayDialog: boolean;
    studentProjectCategory: StudentProjectCategory = new StudentProjectCategory();
    newStudentProjectCategory: boolean;
    cols: any[];
     theCollege: College;

    @ViewChild(FileUploader) fileUploader: FileUploader;

    DETAIL: string = Constants.DETAIL;
    DELETE_LABEL: string = Constants.DELETE_LABEL;
    SAVE_LABEL: string = Constants.SAVE_LABEL;
    ADD_LABEL: string = Constants.ADD_LABEL;
    ADD_IMAGE: string = Constants.ADD_IMAGE;
    FILIERE: string = Constants.FILIERE;

    collegeDropdown: CollegeDropdown;

    constructor
    (
        private studentProjectService: StudentProjectService,
        private levelService: LevelService,
        private clgDropdown: CollegeDropdown,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        this.collegeDropdown = clgDropdown;
    }

    ngOnDestroy() {
        this.studentsProjectsCategories = null;
        this.error = null;
        this.selectedStudentProjectCategory = null;
        this.studentProjectCategory = null;
        this.cols = null;
    }
    ngOnInit() {
        this.cols = [
            {field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true', style: {'width': '80%', 'overflow': 'visible'}},
            {field: 'categoryOrder', header: 'Ordre d\'affichage', sortable: 'true', filter: 'true', style: {'width': '20%', 'overflow': 'visible'}},
            //{field: 'college.name', header: Constants.FILIERE, sortable: 'true', filter: 'true', style: {'width': '33%', 'overflow': 'visible'}},
            //{field: 'creditUnitPrice', header: Constants.CREDIT_UNIT_PRICE, sortable: 'true', filter: 'true', style: {'width': '15%', 'overflow': 'visible'}}
        ];

        this.getAll();

    }

    public getAll(): void {
        this.studentsProjectsCategories = [];
        this.studentProjectService.getAllCategory()
            .subscribe((data: StudentProjectCategory[]) => this.studentsProjectsCategories = data,
                error => console.log(error),
                () => console.log('Get all students projects phases complete'));
    }


    showDialogToAdd() {
        this.newStudentProjectCategory = true;
        this.studentProjectCategory = new StudentProjectCategory();
        this.displayDialog = true;
    }

    save() {
        try {
            this.error = '';
            this.studentProjectService.saveCategory(this.studentProjectCategory)
                .subscribe(result => {
                    if (result.id > 0) {
                        this.studentProjectCategory = result;
                        console.log(this.studentProjectCategory);
                        this.putInTable();
                    }
                    else {
                        this.error = Constants.saveFailed;
                        this.displayDialog = true;
                    }
                })
            console.log(this.studentProjectCategory);
        }
        catch (e) {
            console.log(e);
        }


    }

    delete() {
        try {
            this.error = '';
            this.studentProjectService.deleteCategory(this.studentProjectCategory)
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

    putInTable() {
        if (this.newStudentProjectCategory)
            this.studentsProjectsCategories.push(this.studentProjectCategory);
        else
            this.studentsProjectsCategories[this.findSelectedIndex()] = this.studentProjectCategory;

        var onTheFly: StudentProjectCategory[] = [];
        onTheFly.push(...this.studentsProjectsCategories);
        this.studentsProjectsCategories = onTheFly;

        this.resetData();
    }

    removeFromTable() {
        this.studentsProjectsCategories.splice(this.findSelectedIndex(), 1);
        var onTheFly: StudentProjectCategory[] = [];
        onTheFly.push(...this.studentsProjectsCategories);
        this.studentsProjectsCategories = onTheFly;
        this.resetData();
    }

    resetData() {
        this.studentProjectCategory = null;
        this.displayDialog = false;
        this.changeDetectorRef.detectChanges();
    }

    onRowSelect(evt) {
        this.newStudentProjectCategory = false;
        this.studentProjectCategory = this.clone(evt.data);
        console.log(this.studentProjectCategory);
        this.displayDialog = true;
    }

    clone(e: StudentProjectCategory): StudentProjectCategory {
        let aStudentProjectCategory = new StudentProjectCategory();
        for (let prop in e) {
            aStudentProjectCategory[prop] = e[prop];
        }
        return aStudentProjectCategory;
    }

    findSelectedIndex(): number {
        return this.studentsProjectsCategories.indexOf(this.selectedStudentProjectCategory);
    }

    searchProjectCategory(){

        this.studentProjectService.getAllCategoriesByCollege(this.theCollege)
            .subscribe((data: StudentProjectCategory[]) =>{

                this.studentsProjectsCategories = data;
                
            },
                error => console.log(error),
                () => console.log('Get all students projects phases complete'));

    }

}

