import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { Employee } from '../../models/grh/employee';
import { User } from '../../models/User';
import { Contract } from '../../models/grh/contract';
import { ContractType } from '../../models/grh/contractType';
import { EmployeeService } from '../../services/grh/employee.service';
import { ContractService } from '../../services/grh/contract.service';
import { Constants } from '../../app.constants';
import { ContractTypeDropdown } from '../dropdowns/grh/dropdown.contractType';
import { PositionDropdown } from '../dropdowns/dropdown.position';
import { DepartmentDropdown } from '../dropdowns/dropdown.department';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';
import { EmployeeType } from 'app/models/grh/employeeType';
import { TeacherService } from 'app/services';
import { TeacherType } from 'app/models/grh/teacherType';
import { TeacherLevel } from 'app/models/grh/teacherLevel';
import { SalaryTypeDropdown } from '../dropdowns/grh/dropdown.salaryType';
import { SalaryType } from 'app/models/grh/salaryType';

@Component({
  selector: 'app-grh-manage-employee',
  templateUrl: '../../pages/grh/grhManageEmployee.html',
  providers: [EmployeeService, ContractService, ContractTypeDropdown, PositionDropdown, DepartmentDropdown, 
    SalaryTypeDropdown]
})
export class GrhManageEmployee implements OnInit {

  public error: String = '';
  public success: String = '';
  public reportName: string;
  @Input() user: User;

  public employee: Employee;
  public contract : Contract;
  contractTypeDropdown: ContractTypeDropdown;
  positionDropdown: PositionDropdown;
  departmentDropdown: DepartmentDropdown;
  
  salaryTypeDropdown: SalaryTypeDropdown;
  salaryType: SalaryType = new SalaryType();

  teacherTypes : any[];
  teacherType: any;
  employeeTypes : any[];
  employeeType: any;
  teacherLevels : any[];
  teacherLevel: any;

  ACTIF: string = Constants.ACTIF;
  INACTIF: string = Constants.INACTIF;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  CONTRACT_TYPE: string = Constants.CONTRACT_TYPE;
  PRINT_CARD: string = Constants.PRINT_CARD;
  POSITION: string = Constants.POSITION;
  DEPARTMENT: string = Constants.DEPARTMENT;
  
  SALARY_TYPE: string = Constants.SALARY_TYPE;

  constructor(private employeeService: EmployeeService,
    private teacherService: TeacherService,
    private contractService: ContractService,
    private changeDetectorRef: ChangeDetectorRef,
    private ctDropdown: ContractTypeDropdown,
    private dptDropdown: DepartmentDropdown,
    private posDropdown: PositionDropdown,
    private salaryTpDropdown: SalaryTypeDropdown
  ) 
  {
    this.employee = new Employee();
    this.employee.user = new User();
    this.employee.salaryType = new SalaryType();
    this.contract = new Contract();
    this.contractTypeDropdown = ctDropdown;
    this.positionDropdown = posDropdown;
    this.departmentDropdown = dptDropdown;
    this.salaryTypeDropdown = salaryTpDropdown;
  }

  ngOnInit() {
    console.log(this.employee);

    // this.employeeTypes = [
    //   {code: "Personnel", value: "PERSONNEL"},
    //   { code: "Stagiaire", value: "STAGIAIRE" },
    //   { code: "Contractuel", value: "CONTRACTUEL" }
    // ];

    // this.teacherTypes = [
    //   {code: "Interne", value: "INTERNE"},
    //   {code: "Externe", value: "EXTERNE"}
    // ];

    // this.teacherLevels = [
    //   {code: "Ing�nieur", value: "INGINEER"},
    //   {code: "Docteur", value: "DOCTOR"}
    // ];
    this.employeeTypes = [
      {code: "Personnel", value: EmployeeType.PERSONNEL},
      { code: "Stagiaire", value: EmployeeType.STAGIAIRE },
      { code: "Contractuel", value: EmployeeType.CONTRACTUEL }
    ];

    this.teacherTypes = [
      {code: "Interne", value: TeacherType.INTERNE},
      {code: "Externe", value: TeacherType.EXTERNE}
    ];

    this.teacherLevels = [
      {code: "Ing�nieur", value: TeacherLevel.INGINEER},
      {code: "Docteur", value: TeacherLevel.DOCTOR}
    ];
  }

  setEmployee(user: User) {
    this.employeeService.getByUser(user)
      .subscribe((data: Employee) => {

        this.employee = data
        console.log(this.employee);
        if (this.employee && this.employee !== undefined && this.employee.status !== null && this.employee.user.role != 2) {
          if (this.employee.hiredDate !== null) {
            this.employee.hiredDate = new Date(this.employee.hiredDate);
          }
          this.employeeType = this.employee.employeeType;
          this.teacherType = this.employee.employeeType;
          this.teacherLevel = this.employee.level;

          if(this.employee.employeeType == EmployeeType.INTERNE) {
            this.employeeType = {code: "Interne", value: EmployeeType.INTERNE};
            /*this.teacherType.code = "Interne";
            this.teacherType.value = "INTERNE";*/
          }else if(this.employee.employeeType == EmployeeType.EXTERNE) {
            this.employeeType = {code: "Externe", value: EmployeeType.EXTERNE};
          }else if(this.employee.employeeType == EmployeeType.PERSONNEL) {
            this.employeeType = {code: "Personnel", value: EmployeeType.PERSONNEL};
          }else if(this.employee.employeeType == EmployeeType.STAGIAIRE) {
            this.employeeType = {code: "Stagiaire", value: EmployeeType.STAGIAIRE};
          }else if(this.employee.employeeType == EmployeeType.CONTRACTUEL) {
            this.employeeType = {code: "Contractuel", value: EmployeeType.CONTRACTUEL};
          }

          if(this.employee.level == 0 || String(this.employee.level) == "INGINEER") {
            this.teacherLevel = {code: "Ing�nieur", value: TeacherLevel.INGINEER};
          }else if(this.employee.level == 1 || String(this.employee.level) == "DOCTOR") {
            this.teacherLevel = {code: "Docteur", value: TeacherLevel.DOCTOR};
          }

          console.log(this.employee);
          console.log(this.employeeType);
        }else{
          this.setTeacher(user);
        }
        /*
        this.employee.user = user;
        console.log(this.employee);
        */
      },
        error => console.log(error),
        () => console.log('Get employee complete'));

  }


  setTeacher(user: User) {
    // this.teacherService.getByUser(user) - Adébayor 08/2022
    this.teacherService.getByUserObject(user)
      .subscribe((data: Teacher) => {
        this.employee = this.convertTeacherToEmployee(data);
        let teacher: Teacher = data;
        console.log(this.employee);
        // if (teacher && teacher !== undefined && teacher.hiredDate !== null) {
        //   this.employee.hiredDate = new Date(this.employee.hiredDate);
        //   this.employeeType = teacher.teacherType;
        //   this.teacherType = teacher.teacherType;
        //   this.teacherLevel = teacher.level;

        //   if(teacher.teacherType == TeacherType.INTERNE) {
        //     this.teacherType = {code: "Interne", value: "INTERNE"};
        //     /*this.teacherType.code = "Interne";
        //     this.teacherType.value = "INTERNE";*/
        //   }
        //   console.log(this.employee);
        //   console.log(this.employeeType);
        // }
        if (this.employee && this.employee !== undefined && this.employee.status !== null && this.employee.user.role == 2) {
          if (this.employee.hiredDate !== null) {
            this.employee.hiredDate = new Date(this.employee.hiredDate);
          }
          
          this.employeeType = this.employee.employeeType;
          this.teacherType = this.employee.employeeType;
          this.teacherLevel = this.employee.level;

          if(this.employee.employeeType == EmployeeType.INTERNE) {
            this.teacherType = {code: "Interne", value: TeacherType.INTERNE};
            /*this.teacherType.code = "Interne";
            this.teacherType.value = "INTERNE";*/
          }else if(this.employee.employeeType == EmployeeType.EXTERNE) {
            this.teacherType = {code: "Externe", value: TeacherType.EXTERNE};
            /*this.teacherType.code = "Interne";
            this.teacherType.value = "INTERNE";*/
          }
          
          if(this.employee.level == 0 || String(this.employee.level) == "INGINEER") {
            this.teacherLevel = {code: "Ing�nieur", value: TeacherLevel.INGINEER};
          }else if(this.employee.level == 1 || String(this.employee.level) == "DOCTOR") {
            this.teacherLevel = {code: "Docteur", value: TeacherLevel.DOCTOR};
          }
          
        }
      },
        error => console.log(error),
        () => console.log('Get teacher complete'));
  }

  save() {
    try {
      this.error = '';
      this.success = '';

      // Si c'est un employé
      if(this.employee.user.role == 15) { 

        this.savePersonnel();
        
      }
      // Si c'est un enseignant
      else if(this.employee.user.role == 2) { 

        this.savePersonnelEnseignant();
        
      }
      // Si c'est un étudiant et qui est aussi un employé/enseignant - Adébayor 08/2022
      else if(this.employee.user.role == 3) { 

        if(this.salaryType.key == 'PRSN') {
          this.savePersonnel();
        }
        else if(this.salaryType.key == 'ESGT') {
          this.savePersonnelEnseignant();
        }

      }

      console.log(this.employee);

      // this.employeeService.save(this.employee)
      //   .subscribe(result => {
      //     if (result.id > 0) {
      //       this.employee = result;
      //       this.employee.hiredDate = new Date(this.employee.hiredDate);
      //       this.success = Constants.saveSuccess;
      //     }
      //     else {
      //       this.error = Constants.saveFailed;
      //     }
      //   })
    }
    catch (e) {
      console.log(e);
    }


  }

  /* Update 08/2022 - Adébayor */

  public savePersonnel() {

    this.employee.employeeType = this.employeeType.value;

    this.employeeService.save(this.employee).subscribe(result => {

      if (result.id > 0) {
        this.employee = result;
        this.employee.hiredDate = new Date(this.employee.hiredDate);
        this.success = Constants.saveSuccess;
      }
      else {
        this.error = Constants.saveFailed;
      }

    })
  }

  public savePersonnelEnseignant() {

    this.employee.employeeType = this.teacherType.value;
    this.employee.level = this.teacherLevel.value;

    let teacher = this.convertEmployeeToTeacher(this.employee);

    this.teacherService.save(teacher).subscribe(result => {

      if (result.id > 0) {
        this.employee = this.convertTeacherToEmployee(result);
        this.employee.hiredDate = new Date(this.employee.hiredDate);
        this.success = Constants.saveSuccess;
      }
      else {
        this.error = Constants.saveFailed;
      }

    })

  }

  /* END Update 08/2022 */

  delete() {
    try {
      this.error = '';
      this.success = '';
      if(this.employee.user.role == 15) {
        this.employeeService.delete(this.employee).subscribe(result => {
          if (result) {
            this.success = Constants.deleteSuccess;
          }
          else {
            this.error = Constants.deleteFailed;
          }
        })
      }else if(this.employee.user.role == 2) {
        this.teacherService.delete(this.convertEmployeeToTeacher(this.employee)).subscribe(result => {
          if (result) {
            this.success = Constants.deleteSuccess;
          }
          else {
            this.error = Constants.deleteFailed;
          }
        })
      }

    }
    catch (e) {
      console.log(e);
    }
  }

  public printCard() {
    this.reportName=null;
    this.PRINT_CARD = 'Impression en cours...';
    if(this.employee.user.role == 15) {
      this.employeeService.printCard(this.employee.matricule).subscribe((data: string) => { 
        this.reportName = data; 
        this.PRINT_CARD = Constants.PRINT_CARD;
      },
      error => {
        console.log(error);
        this.PRINT_CARD = Constants.PRINT_CARD;
      },
      () => console.log('Get print card'));
    }else if(this.employee.user.role == 2){
      this.teacherService.printCard(this.employee.matricule).subscribe((data: string) => { 
        this.reportName = data; 
        this.PRINT_CARD = Constants.PRINT_CARD;
      },
      error => {
        console.log(error);
        this.PRINT_CARD = Constants.PRINT_CARD;
      },
      () => console.log('Get print card'));
    }

  }

  convertTeacherToEmployee(teacher: Teacher): Employee{
    let emp = new Employee();
    emp.id = teacher.id;
  emp.matricule = teacher.matricule;
  emp.lastName = teacher.lastName;
  emp.firstName = teacher.firstName;
  emp.middleName = teacher.middleName;
  emp.resume = teacher.resume;
  emp.status = teacher.status;
  emp.hiredDate = teacher.hiredDate;
  emp.allergy = teacher.allergy;
  emp.user = teacher.user;
  emp.position = teacher.position;
  emp.name = teacher.name;
  emp.department = teacher.department;
  emp.payDetail = teacher.payDetail;

  emp.level = teacher.level;
  if(teacher.teacherType == 0 || String(teacher.teacherType) == "INTERNE") {
    emp.employeeType = EmployeeType.INTERNE;
  }else if(teacher.teacherType == 1 || String(teacher.teacherType) == "EXTERNE"){
    emp.employeeType = EmployeeType.EXTERNE;
  }
  console.log(teacher.level+"=======>")
  console.log(emp.level+"=======>")

  return emp;
  }

  convertEmployeeToTeacher(emp: Employee): Teacher{
    let teacher = new Teacher();
    teacher.id = emp.id;
    teacher.matricule= emp.matricule;
    teacher.lastName = emp.lastName;
    teacher.firstName = emp.firstName ;
    teacher.middleName = emp.middleName;
    teacher.resume =  emp.resume ;
    teacher.status = emp.status ;
    teacher.hiredDate = emp.hiredDate;
    teacher.allergy = emp.allergy;
    teacher.user =  emp.user ;
    teacher.position = emp.position;
    teacher.name = emp.name ;
    teacher.department = emp.department ;
    teacher.payDetail = emp.payDetail;

    teacher.level = emp.level;
    if(emp.employeeType == 0 || emp.employeeType == 3 || String(emp.employeeType) == "INTERNE") {
      teacher.teacherType = TeacherType.INTERNE;
    }else if(emp.employeeType == 1 || emp.employeeType == 4 || String(emp.employeeType) == "EXTERNE"){
      teacher.teacherType = TeacherType.EXTERNE ;
    }
    console.log(emp.level+"<<<<<<<<<<<<<<=======>")
    console.log(teacher.level+"=======>")

    return teacher;
  }
}
