import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from '../models/User';
import { Exam } from '../models/exam';
import { Course } from '../models/course';
import { ReportView } from '../models/reportView';
import { ExamService } from '../services/exam.service';
import { BaseService } from '../services/base.service';
import { ReportService } from '../services/report.service';
import { Constants } from '../app.constants';
import { MarkView } from '../models/markView';
import { Parameter } from '../models/parameter';
import { ClassDropdown } from './dropdowns/dropdown.class';
import { TeacherDropdown } from './dropdowns/dropdown.teacher';
import { SubjectDropdown } from './dropdowns/dropdown.subject';
import { SchoolYearDropdown } from './dropdowns/dropdown.schoolYear';
import { ExamTypeDropdown } from './dropdowns/dropdown.examType';
import { TermDropdown } from './dropdowns/dropdown.term';
import { Doc } from '../models/doc';
import { SchoolYear } from "../models/schoolYear";
import { Term } from "../models/term";
import { FileUploader } from './fileUploader';
import { Message, SelectItem } from 'primeng/primeng';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CloseSemestreGroupService } from '../services/closeSemestreGroup.service';
import {CheckboxModule} from 'primeng/checkbox';
import { ExamType } from 'app/models/examType';
@Component({
  selector: 'app-admin-exam-list',
  templateUrl: '../pages/adminExamList.html',
  providers: [ExamService, CloseSemestreGroupService, ReportService, Constants, ClassDropdown, TeacherDropdown, SubjectDropdown,
    SchoolYearDropdown, ExamTypeDropdown, TermDropdown]
})
export class AdminExamList implements OnInit, OnDestroy {
  public exams: Exam[];
  public selectedExam: Exam;
  public marks: MarkView[];
  public exam: Exam;
  public newExam: boolean;
  public user: User;
  public loggedInUser: User;
  public classDropdown: ClassDropdown;
  public teacherDropdown: TeacherDropdown;
  public subjectDropdown: SubjectDropdown;
  public schoolYearDropdown: SchoolYearDropdown;
  public termDropdown: TermDropdown;
  public examTypeDropdown: ExamTypeDropdown;
  
  listTpTypes: SelectItem[] = [];

  closeSemestreGroupByCycleAndSchoolyearStatus : boolean = true;
  checkingCloseSemestreGroupByCycleAndSchoolyearStatus : boolean = false;
  gettingMarksStatus : boolean = false;
  isFinalExamSelected: boolean = false;
  isTpSelected: boolean = false;
  isDegreePrinted : boolean;

  theTerm: Term;
  theSchoolYear: SchoolYear;
  public parameters: Parameter[] = [];
  public reportView: ReportView = new ReportView();
  public reportName: string;
  msgs: Message[] = [];
  @ViewChild(FileUploader) fileUploader: FileUploader;
  public searchText: string;
  @Input() role: string;
  displayDialog: boolean;
  publishExamMarks: boolean=false;
  public error: string;
  cols: any[];
  @Output() onExamSelected = new EventEmitter<Exam>();
  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  EXAM_RESEARCH_PARTS: string = Constants.EXAM_RESEARCH_PARTS;
  ENTER_NOTES: string = Constants.ENTER_NOTES;
  UPLOAD_NOTES: string = Constants.UPLOAD_NOTES;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;
  CLASSE: string = Constants.CLASSE;
  SUBJECT: string = Constants.SUBJECT;
  TYPE_EXAM: string = Constants.EXAM_TYPE;
  TERM: string = Constants.TERM;
  DOWNLOAD: string = Constants.DOWNLOAD;
  PRINT: string = Constants.PRINT;
  sessionTypes: SelectItem[];
  lmd = JSON.parse(Cookie.get('lmd'));

  selectedFile: File | null = null;
selectedExamForImport: Exam = null; // assigné quand on veut importer

currentUser: User = JSON.parse(atob(Cookie.get("user")));

  constructor
    (
      private examService: ExamService,
      private baseService: BaseService,
      private reportService: ReportService,
      private closeSemestreGroupService: CloseSemestreGroupService,
      private clsDropdown: ClassDropdown,
      private tchDropdown: TeacherDropdown,
      private sbjDropdon: SubjectDropdown,
      private syDropdown: SchoolYearDropdown,
      private tmDropdown: TermDropdown,
      private etDropdown: ExamTypeDropdown,
      private changeDetectorRef: ChangeDetectorRef
    ) {
    this.classDropdown = clsDropdown;
    this.teacherDropdown = tchDropdown;
    this.subjectDropdown = sbjDropdon;
    this.schoolYearDropdown = syDropdown;
    this.examTypeDropdown = etDropdown;
    this.termDropdown = tmDropdown;

    this.listTpTypes =  [
        { label: 'TP0', value: 'TP0' },
        { label: 'TP1', value: 'TP1' },
        { label: 'TP2', value: 'TP2' },
        { label: 'TP3', value: 'TP3' },
        { label: 'TP4', value: 'TP4' },
        { label: 'TP5', value: 'TP5' },
        { label: 'TP6', value: 'TP6' },
        { label: 'TP7', value: 'TP7' },
        { label: 'TP8', value: 'TP8' },
        { label: 'TP9', value: 'TP9' },
        { label: 'TP10', value: 'TP10' }

    ]

    this.exam = new Exam();
    this.exam.course = new Course();
   
   
  }

  ngOnDestroy() {
    this.exams = null;
    this.selectedExam = null;
    this.user = null;
    this.cols = null;
  }

  public search() {
    this.error = null;
    this.exams = [];
    if (this.theSchoolYear == null && this.theTerm == null && this.searchText == null) {
      this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Selectionner au moins un critere' });
    } else {

      if(this.loggedInUser.role === 2){
        console.log(this.loggedInUser);
         
          this.examService.searchTeacherExams((this.theSchoolYear == null ? 0 : this.theSchoolYear.id) + '|' + (this.theTerm == null ? 0 : this.theTerm.id) + '|' + this.searchText,this.loggedInUser.id).subscribe((data: Exam[]) => {
            this.exams = data;
            // console.log(this.exams);
            if (this.exams == null || this.exams.length <= 0) {
              this.error = Constants.NO_EXAM_FOUND;
            }
          },
            error => console.log(error),
            () => console.log('Find with this criteria ' + ((this.theSchoolYear == null ? 0 : this.theSchoolYear.id) + '|' + (this.theTerm == null ? 0 : this.theTerm.id) + '|' + this.searchText)));
      }else{

        this.examService.search((this.theSchoolYear == null ? 0 : this.theSchoolYear.id) + '|' + (this.theTerm == null ? 0 : this.theTerm.id) + '|' + this.searchText).subscribe((data: Exam[]) => {
          this.exams = data;
          //console.log(this.exams);
          if (this.exams == null || this.exams.length <= 0) {
            this.error = Constants.NO_EXAM_FOUND;
          }
        },
          error => console.log(error),
          () => console.log('Find with this criteria ' + ((this.theSchoolYear == null ? 0 : this.theSchoolYear.id) + '|' + (this.theTerm == null ? 0 : this.theTerm.id) + '|' + this.searchText))); 
      }

      }

     
  }

  public getMarks(evt) {
    this.marks = null;
    this.gettingMarksStatus = true;

    this.exam = evt.data;
    this.exam.examDate = new Date(this.exam.examDate);
    this.examService.getMarks(evt.data).subscribe(
      (data: MarkView[]) => {
        this.marks = data;
        this.gettingMarksStatus = false;
      },
      error => console.log(error),
      () => console.log('Get marks'));
  }

  public getMarkFiles(evt) {

    if (evt != null) {
      this.exam = evt.data;
    }
    this.baseService.getFiles("exammark", this.exam.id).subscribe((data: Doc[]) => { this.exam.markFiles = data; },
      error => console.log(error),
      () => console.log('Get mark files'));
  }

  deleteDoc(data) {
    console.log('delete   for user:' + data);
    this.exam.id = data.parentId;
    this.baseService.deleteFile(data, "exammark", data.parentId)
      .subscribe(() => {
        this.getMarkFiles(null);
      });
  }

  public saveMark(event) {
    let markView: MarkView = event.data;
    markView.approvedBy = this.loggedInUser.id;
    markView.maxMark = this.exam.maxMark;
    markView.examId = this.exam.id;
    this.examService.saveMark(event.data).subscribe((data: MarkView) => {
      markView = data;
      this.marks[this.marks.indexOf(event.data)] = markView;
      const onTheFly: MarkView[] = [];
      onTheFly.push(...this.marks);
      this.marks = onTheFly;

      console.log(data);
    },
      error => console.log(error),
      () => console.log('Save Mark'));

  }

  ngOnInit() {
    this.loggedInUser = JSON.parse(atob(Cookie.get('user')));

    this.sessionTypes = [];
    this.sessionTypes.push({ label: 'Normale', value: '0' });
    this.sessionTypes.push({ label: 'Rattrapage', value: '1' });
    this.sessionTypes.push({ label: 'Rattrapage spécial', value: '2' });
    if (this.exam == null) {
      this.exam = new Exam()
      this.exam.course = new Course();
    }
    if (this.lmd === 1) {
      this.cols = [
        { field: 'name', header: Constants.DESCRIPTION, type: 'string', sortable: 'true', filter: 'true' },
        { field: 'course.classe.name', header: Constants.CLASSE, type: 'string', sortable: 'true', filter: 'true' },
        { field: 'course.subject.name', header: Constants.SUBJECT, type: 'string', sortable: 'false', filter: 'true' },
        { field: 'course.teacher.name', header: Constants.PROF, type: 'string', sortable: 'false', filter: 'true' },
        { field: 'examDate', header: Constants.DATE_EXAM, type: 'Date', sortable: 'true' },
        { field: 'maxMark', header: Constants.NOTE_SUR, sortable: 'false' },
        { field: 'course.sessionTypeDesc', header: Constants.SESSION, type: 'string', sortable: 'true' }
      ];
    } else {
      this.cols = [
        { field: 'name', header: Constants.DESCRIPTION, type: 'string', sortable: 'true', filter: 'true' },
        { field: 'course.classe.name', header: Constants.CLASSE, type: 'string', sortable: 'true', filter: 'true' },
        { field: 'course.subject.name', header: Constants.SUBJECT, type: 'string', sortable: 'false', filter: 'true' },
        { field: 'course.teacher.name', header: Constants.PROF, type: 'string', sortable: 'false', filter: 'true' },
        { field: 'examDate', header: Constants.DATE_EXAM, type: 'Date', sortable: 'true' },
        { field: 'maxMark', header: Constants.NOTE_SUR, sortable: 'false' }
      ];
    }

  }


  onRowSelect(evt) {
    this.newExam = false;
    this.exam = this.clone(evt.data);
    if(this.exam.publishExamMarks==1){
      this.publishExamMarks=true;
    }else{
      this.publishExamMarks=false;
    }
    this.exam.examDate = new Date(this.exam.examDate);
    console.log(this.exam);

    // this.onExamSelected.emit(this.exam);
    this.displayDialog = true;
    this.isFinalExamSelected = (this.exam.examType.name == "EXAMEN FINAL" || this.exam.examType.name == "EXAMEN RATTRAPAGE");
    this.isTpSelected = this.exam.examType.name == "TP";
  }

  clone(e: Exam): Exam {
    const aExam = new Exam();
    for (const prop in e) {
      aExam[prop] = e[prop];
    }
    return aExam;
  }

  findSelectedIndex(): number {
    return this.exams.indexOf(this.selectedExam);
  }

  showDialogToAdd() {
    this.newExam = true;
    this.exam = new Exam();
    this.exam.course = new Course();
    this.selectedExam = null;
    this.displayDialog = true;
    this.isFinalExamSelected = false;
    this.isTpSelected = false;
  }

  save() {
    try {
      this.error = '';
      this.exam.modifiedBy = this.loggedInUser.id;

      if(this.exam.examType.name == "EXAMEN FINAL" || this.exam.examType.name == "EXAMEN RATTRAPAGE"){
        this.exam.evaluationType = 1;
      }else{
        this.exam.evaluationType = 0;
        this.publishExamMarks = false;
        this.exam.publishExamMarks=0;
      }
      if(this.publishExamMarks==true){
        this.exam.publishExamMarks=1;
      } else{
        this.exam.publishExamMarks=0;
      }
      // console.log(this.exam);
      // console.log(this.publishExamMarks);
      this.examService.save(this.exam)
        .subscribe(result => {
          if (result.id > 0 && !result.error) {
            this.exam = result;
        
            this.putInTable();
          }
          else {
            this.error = result.error;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  onExamTypeChange(selectedType: ExamType) {
    this.isFinalExamSelected = (selectedType.name == "EXAMEN FINAL" || selectedType.name == "EXAMEN RATTRAPAGE");
    this.isTpSelected = selectedType.name == "TP";
}

  delete() {
    try {
      this.error = '';
      this.examService.delete(this.exam)
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
    if (this.exams == null) {
      this.exams = [];
    }
    if (this.newExam) {
      this.exams.push(this.exam);
    }
    else {
      this.exams[this.findSelectedIndex()] = this.exam;
    }

    const onTheFly: Exam[] = [];
    onTheFly.push(...this.exams);
    this.exams = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.exams.splice(this.findSelectedIndex(), 1);
    const onTheFly: Exam[] = [];
    onTheFly.push(...this.exams);
    this.exams = onTheFly;
    this.resetData();
  }

  resetData() {
    this.exam = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  showDialogToUploadFile() {
    this.fileUploader.errorMessage = "";
    this.fileUploader.uploadedFiles = [];
    this.fileUploader.uploadFile("exam");
  }

  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage("exammark", data);
  }

  public printStudentList() {
    this.reportView.reportName = 'courseStudentListEmptyNote';
    const parameter: Parameter = new Parameter();
    parameter.name = 'examId';
    parameter.value = this.exam.id + '';
    this.parameters.push(parameter);

    const parameter2: Parameter = new Parameter();
    parameter2.name = 'classId';
    parameter2.value = this.exam.course.classe.id + '';
    this.parameters.push(parameter2);

    this.reportView.parameters = this.parameters;
    console.log(this.reportView);

    try {
      this.error = '';
      this.reportService.runReportByName(this.reportView)
        .subscribe(result => {
          this.reportName = result;
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  public checkCloseSemestreGroupByCycleAndSchoolyear() {
    if (this.exam.term && this.exam.course.classe && this.exam.schoolYear) {
      this.closeSemestreGroupByCycleAndSchoolyearStatus = true;
      this.checkingCloseSemestreGroupByCycleAndSchoolyearStatus = true;
      this.error = '';
      try {
        this.closeSemestreGroupService.getCloseSemestreGroupBySemestreGroupAndCycleAndSchoolYear(this.exam)
          .subscribe(result => {
            if (result.id > 0) {
              //this.exam = result;
              console.log(result);
              this.error = 'On a déjà délibéré pour cette filière de ce semestre aucours de cette année universitaire.';
              this.closeSemestreGroupByCycleAndSchoolyearStatus = true;
            }
            else {
              this.closeSemestreGroupByCycleAndSchoolyearStatus = false;
            }
          })
      } catch (e) {
        console.log(e);
      }
      this.checkingCloseSemestreGroupByCycleAndSchoolyearStatus = false;
    }
    else {
      this.closeSemestreGroupByCycleAndSchoolyearStatus = true;
    }
    console.log(this.closeSemestreGroupByCycleAndSchoolyearStatus);
  }



 downloadTemplate(exam: Exam) {
    this.examService.exportTemplate(exam.id).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'template_examen_' + exam.id + '.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, err => {
      console.error('Erreur téléchargement:', err);
    });
  }

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

uploadMarks() {
  if (!this.selectedFile || !this.selectedExamForImport) {
    alert('Sélectionner l\'examen et le fichier.');
    return;
  }
  this.examService.importMarks(this.selectedFile, this.selectedExamForImport.id, /*modifiedBy*/ this.loggedInUser.id)
    .subscribe((text) => {
      alert(text);
      this.selectedFile = null;
    }, err => {
      console.error(err);
      alert('Erreur import : ' + err);
    });
}



}
