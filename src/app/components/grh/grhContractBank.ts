import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { Employee } from '../../models/grh/employee';
import { User } from '../../models/User';
import { Bank } from '../../models/grh/bank';
import { ContractBank } from '../../models/grh/contractBank';
import { EmployeeService } from '../../services/grh/employee.service';
import { ContractBankService } from '../../services/grh/contractBank.service';
import { Constants } from '../../app.constants';
import { BankDropdown } from '../dropdowns/grh/dropdown.bank';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';
import { TeacherService } from 'app/services';

@Component({
  selector: 'app-grh-contract-bank',
  templateUrl: '../../pages/grh/grhContractBank.html',
  providers: [EmployeeService, ContractBankService, BankDropdown]
})
export class GrhContractBank implements OnInit {

  public error: String = '';
  public success: String = '';
  public reportName: string;
  @Input() user: User;
  public employee: Employee;
  public teacher: Teacher;
  public contractBank : ContractBank;
  bankDropdown: BankDropdown;

  SAVE_LABEL: string = Constants.SAVE_LABEL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  CONTRACT_TYPE: string = Constants.CONTRACT_TYPE;

  constructor(private employeeService: EmployeeService,
    private contractBankService: ContractBankService,
    private changeDetectorRef: ChangeDetectorRef,
    private bDropdown: BankDropdown,
    private teacherService: TeacherService) {

    this.employee = new Employee();
    this.employee.user = new User();
    this.contractBank = new ContractBank();
    this.bankDropdown = bDropdown;
  }

  ngOnInit() {
    console.log(this.employee);
  }

  setEmployee(user: User) {
    this.employeeService.getByUser(user)
      .subscribe((data: Employee) => {

        this.employee = data

        console.log(this.employee);

        if(this.employee != null) {
            this.getContractBankByEmployee();
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
        if(this.teacher != null) {
          this.getContractBankByTeacher();
      }
        console.log(this.teacher);
      },
        error => console.log(error),
        () => console.log('Get teacher complete'));
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

  public getContractBankByTeacher() {
    this.contractBankService.getByTeacher(this.teacher)
      .subscribe((data: ContractBank) => {

        this.contractBank = data

        console.log(this.contractBank);

      },
        error => console.log(error),
        () => console.log('Get ContractBank complete'));
  }
  

  save() {
    try {
      this.error = '';
      this.success = '';

      if(this.contractBank.contract == null)
      {
          this.error = 'Veuillez enregistrer le contrat de l\'employé d\'abord !';
      }
      else {
          this.contractBankService.save(this.contractBank)
            .subscribe(result => {
              if (result.id > 0) {
                this.contractBank = result;

                this.success = Constants.saveSuccess;
              }
              else {
                this.error = Constants.saveFailed;
              }
            })
      }
    }
    catch (e) {
      console.log(e);
    }


  }

  delete() {
    this.error = '';
    this.success = '';
    try {
      this.contractBankService.delete(this.contractBank).subscribe(result => {
        if (result) {
          this.contractBank = new ContractBank();
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
