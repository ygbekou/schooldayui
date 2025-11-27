import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { Employee } from '../../models/grh/employee';
import { User } from '../../models/User';
import { TeacherType } from '../../models/grh/teacherType';
import { TeacherLevel } from '../../models/grh/teacherLevel';
import { EmployeeService } from '../../services/grh/employee.service';
import { TeacherService } from '../../services/teacher.service';
import { Constants } from '../../app.constants';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-manage-employee-teacher',
  templateUrl: '../../pages/grh/grhManageEmployeeTeacher.html',
  providers: [EmployeeService, TeacherService]
})
export class GrhManageEmployeeTeacher implements OnInit {

  public error: String = '';
  public success: String = '';
  public reportName: string;
  @Input() user: User;

  public employee: Employee;
  public teacher: Teacher;

  teacherTypes = TeacherType;
  teacherTypeArray : TeacherType[];
  teacherLevels = TeacherLevel;
  teacherLevelArray : TeacherLevel[];

  ACTIF: string = Constants.ACTIF;
  INACTIF: string = Constants.INACTIF;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  CONTRACT_TYPE: string = Constants.CONTRACT_TYPE;
  PRINT_CARD: string = Constants.PRINT_CARD;

  constructor(private employeeService: EmployeeService,
              private teacherService: TeacherService,
              private changeDetectorRef: ChangeDetectorRef) {

    this.employee = new Employee();
    this.employee.user = new User();
    this.teacher = new Teacher();
    this.teacher.user = new User();
  }

  ngOnInit() {
    console.log(this.employee);
  }

  setEmployee(user: User) {
    this.employeeService.getByUser(user)
      .subscribe((data: Employee) => {

        this.employee = data;
        console.log(this.employee);
        /*
        this.employee.user = user;
        console.log(this.employee);
        */
      },
        error => console.log(error),
        () => console.log('Get employee complete'));

  }

  setTeacher(user: User) {
    this.teacherService.getByUser(user)
      .subscribe((data: Teacher) => {

        this.teacher = data;
        console.log(this.teacher);

      },
        error => console.log(error),
        () => console.log('Get teacher complete'));

  }

  save() {
    try {
      this.error = '';
      this.success = '';

      console.log(this.teacher);

      //this.employeeService.save(this.employee)
      this.teacherService.save(this.teacher)
        .subscribe(result => {
          if (result.id > 0) {
            this.teacher = result;
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
      this.employeeService.delete(this.employee).subscribe(result => {
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

}
