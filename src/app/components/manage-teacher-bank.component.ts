import { EmployeeService } from './../services/grh/employee.service';
import { BankDropdown } from './dropdowns/grh/dropdown.bank';
import { Employee } from './../models/grh/employee';
import { ContractBankService } from './../services/grh/contractBank.service';
import { BankService } from './../services/grh/bank.service';
import { TeacherService } from './../services/teacher.service';
import { Teacher } from './../models/teacher';
import { User } from './../models/User';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Bank } from 'app/models/grh/bank';
import { ContractBank } from 'app/models/grh/contractBank';
import { Constants } from '../app.constants';

@Component({
  selector: 'app-manage-teacher-bank',
  templateUrl: '../pages/manage-teacher-bank.component.html',
  providers: [EmployeeService, ContractBankService, BankDropdown]
})
export class ManageTeacherBankComponent implements OnInit, OnDestroy {

  public bank: Bank;
  public banks: Bank[];
  public selectedBank: Bank;

  public employee: Employee;
  public contractBank : ContractBank;
  bankDropdown: BankDropdown;
  SAVE_LABEL: string = Constants.SAVE_LABEL;

  @Input() user: User;
  @Input() teacher: Teacher;
  constructor(private teacherService: TeacherService, private bankService: BankService,
    private contractBankService: ContractBankService,
    private bDropdown: BankDropdown) { 
    this.teacher=new Teacher()
    this.teacher.user = new User();
    this.bankDropdown = bDropdown
    this.contractBank = new ContractBank();
  }

  ngOnInit() {
    console.log(this.user)
    this.setTeacher(this.user);
  }

  ngOnDestroy() {
    this.banks = null;
  }

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

  public getAll(): void {
    this.banks = [];
    this.bankService.getAll()
      .subscribe((data: Bank[]) => this.banks = data,
      error => console.log(error),
      () => console.log('Get all Banks complete'));
  }

  public getContractBankByEmployee() {
    this.contractBankService.getByEmployee(this.employee)
      .subscribe((data: ContractBank) => {

        this.contractBank = data

        console.log(this.contractBank);

      },
        error => console.log(error),
        () => console.log('Get ContractBank complete'));
  }

}
