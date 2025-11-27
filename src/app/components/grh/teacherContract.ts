import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { Employee } from '../../models/grh/employee';
import { User } from '../../models/User';
import { Contract } from '../../models/grh/contract';
import { ContractType } from '../../models/grh/contractType';
//import { TeacherService } from '../../services/teacher.service';
import { EmployeeService } from '../../services/grh/employee.service';
import { ContractService } from '../../services/grh/contract.service';
import { Constants } from '../../app.constants';
import { ContractTypeDropdown } from '../dropdowns/grh/dropdown.contractType';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';
import { TeacherService } from 'app/services';
import { LookUpTable } from 'app/models/lookUpTable';
import { PersonType } from 'app/models/grh/PersonType';
import { LookUpTableService } from 'app/services/lookUpTable.service';
import { PersonTypeDropdown } from '../dropdowns/grh/dropdown.personType';

@Component({
  selector: 'app-manage-teacher-contract',
  templateUrl: '../../pages/grh/teacherContract.html',
  providers: [EmployeeService, ContractService, ContractTypeDropdown, LookUpTableService, PersonTypeDropdown]
})
export class ManageTeacherContract implements OnInit {

  public error: String = '';
  public success: String = '';
  public reportName: string;
  @Input() user: User;
  //public teacher: Teacher;
  public employee: Employee;
  public teacher: Teacher;
  public contract : Contract;
  contractTypeDropdown: ContractTypeDropdown;
  personTypeDropdown: PersonTypeDropdown;

  SAVE_LABEL: string = Constants.SAVE_LABEL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  CONTRACT_TYPE: string = Constants.CONTRACT_TYPE;

  PERSON_TYPE: string = Constants.PERSON_TYPE;
  public lookUpTables: LookUpTable[] = [];
  public personTypes: PersonType[] = [];

  constructor(private employeeService: EmployeeService,
    private contractService: ContractService,
    private changeDetectorRef: ChangeDetectorRef,
    private ctDropdown: ContractTypeDropdown,
    private ptDropdown: PersonTypeDropdown,
    private teacherService: TeacherService, 
    private lookUpTableService: LookUpTableService) {
    /*
    this.teacher = new Teacher();
    this.teacher.user = new User();
    this.contract = new Contract();
    */
    //this.teacher.contract = new Contract();
    //this.teacher.contract.contractType = new ContractType();
    this.employee = new Employee();
    this.teacher = new Teacher()
    this.employee.user = new User();
    this.contract = new Contract();
    this.contractTypeDropdown = ctDropdown;
    this.personTypeDropdown = ptDropdown;
  }

  ngOnInit() {
    console.log(this.employee);
    //setTeacher()
    // this.lookUpTableService.getAll("PERSON_TYPE")
    //   .subscribe((data: LookUpTable[]) => {
    //     this.lookUpTables = data;
    //     for(var i=0;  i < this.lookUpTables.length; i++){
    //       this.personTypes.push(new PersonType(this.lookUpTables[i].id, this.lookUpTables[i].name, this.lookUpTables[i].double1));
    //     }

    // });
  }

  setEmployee(user: User) {
    this.employeeService.getByUser(user)
      .subscribe((data: Employee) => {

        this.employee = data
        if (this.employee && this.employee !== undefined && this.employee.hiredDate !== null) {
          this.employee.hiredDate = new Date(this.employee.hiredDate);
        }
        //this.employee.user = user;

        console.log(this.employee);

        if(this.employee.id != null) {
            this.getContractByEmployee();
        }
        else{
          this.getContactByTeacher()
        }
      },
        error => console.log(error),
        () => console.log('Get employee complete'));

  }

  setTeacher(user: User) {
    this.teacherService.getByUser(user)
      .subscribe((data: Teacher) => {

        this.teacher = data
        if (this.teacher && this.teacher !== undefined && this.teacher.hiredDate !== null) {
          this.teacher.hiredDate = new Date(this.teacher.hiredDate);
        }
        this.teacher.user = user;
        console.log(this.teacher);
      },
        error => console.log(error),
        () => console.log('Get teacher complete'));
  }

  public getContractByEmployee() {
    this.contractService.getByEmployee(this.employee)
      .subscribe((data: Contract) => {

        this.contract = data
        if (this.contract && this.contract !== undefined && this.contract.startDate !== null) {
          this.contract.startDate = new Date(this.contract.startDate);
        }
        if (this.contract && this.contract !== undefined && this.contract.endDate !== null) {
          this.contract.endDate = new Date(this.contract.endDate);
        }

        if(this.contract.personType === null) this.contract.personType = new PersonType();
        if(this.contract.contractType === null) this.contract.contractType = new ContractType();

      },
        error => console.log(error),
        () => console.log('Get contract complete'));
  }

  getContactByTeacher(){
    this.contractService.getByTeacher(this.teacher)
      .subscribe((data: Contract) => {

        this.contract = data
        if (this.contract && this.contract !== undefined && this.contract.startDate !== null) {
          this.contract.startDate = new Date(this.contract.startDate);
        }
        if (this.contract && this.contract !== undefined && this.contract.endDate !== null) {
          this.contract.endDate = new Date(this.contract.endDate);
        }

        if(this.contract.personType === null) this.contract.personType = new PersonType();
        if(this.contract.contractType === null) this.contract.contractType = new ContractType();

      },
        error => console.log(error),
        () => console.log('Get contract complete'));
  }

  save() {
    try {
      this.error = '';
      this.success = '';

      if(this.employee.id)
        this.contract.employee = this.employee;
      else
      this.contract.teacher = this.teacher

      if(this.contract.personType.id == 0 || this.contract.personType.id === null || this.contract.personType.id === undefined){
        this.contract.personType = null;
      }
      if(this.contract.contractType.id == 0 || this.contract.contractType.id === null || this.contract.contractType.id === undefined){
        this.contract.contractType = null;
      }

      this.contractService.save(this.contract)
        .subscribe(result => {
          if (result.id > 0) {
            this.contract = result;

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

  /*
  setTeacher(user: User) {
    this.teacherService.getByUser(user)
      .subscribe((data: Teacher) => {

        this.teacher = data
        if (this.teacher && this.teacher !== undefined && this.teacher.hiredDate !== null) {
          this.teacher.hiredDate = new Date(this.teacher.hiredDate);
        }
        this.teacher.user = user;
      },
        error => console.log(error),
        () => console.log('Get teacher complete'));

  }

  save() {
    try {
      this.error = '';
      this.success = '';
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
  */
}
