import { Teacher } from './../models/teacher';
import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { User } from '../models/User';
import { TeacherService } from '../services/teacher.service';
import { Constants } from '../app.constants';
import { PositionDropdown } from './dropdowns/dropdown.position';
import { DepartmentDropdown } from './dropdowns/dropdown.department';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';

@Component({
  selector: 'app-manage-teacher',
  templateUrl: '../pages/teacher.html',
  providers: [TeacherService, PositionDropdown, DepartmentDropdown]
})
export class ManageTeacher implements OnInit {

  public error: String = '';
  public success: String = '';
  public reportName: string;
  @Input() user: User;
  @Output() teacherTypeEmitter = new EventEmitter < string > ();
  @Output() teacherEmitter = new EventEmitter < Teacher > ();
  PostTeacherType() {  
    this.teacherTypeEmitter.emit(this.teacherType.value);
    this.teacherEmitter.emit(this.teacher)
    //alert(this.teacherType.value)
  } 
  public teacher: Teacher;
  positionDropdown: PositionDropdown;
  departmentDropdown: DepartmentDropdown;
  ACTIF: string = Constants.ACTIF;
  INACTIF: string = Constants.INACTIF;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  POSITION: string = Constants.POSITION;
  DEPARTMENT: string = Constants.DEPARTMENT;
  PRINT_CARD: string = Constants.PRINT_CARD;

  teacherTypes : any[];
  teacherType: any;
  employeeTypes : any[];
  employeeType: any;
  teacherLevels : any[];
  teacherLevel: any;

  constructor(private teacherService: TeacherService,
    private changeDetectorRef: ChangeDetectorRef,
    private dptDropdown: DepartmentDropdown,
    private posDropdown: PositionDropdown) {
    this.teacher = new Teacher();
    this.teacher.user = new User();
    this.positionDropdown = posDropdown;
    this.departmentDropdown = dptDropdown;
  }

  ngOnInit() {

    this.employeeTypes = [
      {code: "Personnel", value: "PERSONNEL"},
      { code: "Stagiaire", value: "STAGIAIRE" },
      { code: "Contractuel", value: "CONTRACTUEL" }
    ];

    this.teacherTypes = [
      {code: "Interne", value: "INTERNE"},
      {code: "Externe", value: "EXTERNE"}
    ];

    this.teacherLevels = [
      {code: "Ing�nieur", value: "INGINEER"},
      {code: "Docteur", value: "DOCTOR"}
    ];
    this.setTeacher(this.user)
  }

  setTeacher(user: User) {
    this.teacherService.getByUser(user)
      .subscribe((data: Teacher) => {

        this.teacher = data
        if (this.teacher && this.teacher !== undefined && this.teacher.hiredDate !== null) {
          this.teacher.hiredDate = new Date(this.teacher.hiredDate);
        }
        this.teacher.user = user;
        this.teacherType=this.teacherTypes.find( ({ value }) => value === this.teacher.teacherType);
        this.teacherLevel=this.teacherLevels.find( ({ value }) => value === this.teacher.level);
        console.log('teac', this.teacherType)
      },
        error => console.log(error),
        () => console.log('Get teacher complete'));

  }

  save() {

    if(this.teacher.user.role == 5) {
      this.teacher.teacherType = this.employeeType.value;
    }

    if(this.teacher.user.role == 2) {
      this.teacher.teacherType = this.teacherType.value;
      this.teacher.level = this.teacherLevel.value;
    }
    try {
      this.error = '';
      this.success = '';
      console.log(this.teacher);
      this.teacherService.save(this.teacher)
        .subscribe(result => {
          if (result.id > 0) {
            this.teacher = result;
            this.teacher.hiredDate = new Date(this.teacher.hiredDate);
            this.success = Constants.saveSuccess;
          }
          else {
            this.error = Constants.saveFailed;
          }
        })
    }
    catch (e) {
      console.log(e);
    }


  }

  delete() {
    try {
      this.error = '';
      this.success = '';
      this.teacherService.delete(this.teacher).subscribe(result => {
        if (result) {
          this.success = Constants.deleteSuccess;
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

  public printCard() {
    this.reportName = null;
    this.teacherService.printCard(this.teacher.matricule).subscribe((data: string) => { this.reportName = data; },
      error => console.log(error),
      () => console.log('Get print card'));
  }
}
