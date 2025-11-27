import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from '../dropdown.util';
import { Employee } from 'app/models/grh/employee';
import { EmployeeService } from 'app/services/grh/employee.service';

@Injectable()
export class EmployeeDropdown {

  filteredEmployees: Employee[];
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService) {
    this.getAll();
  }

  filter(event) {
    this.filteredEmployees = this.find(event);
  }

  handleDropdownClick(event) {
    console.info(this.employees);
    setTimeout(() => {
      this.filteredEmployees = this.employees;
    }, 10)
  }

  public find(event) {
      let query = event.query;
      let filteredA = [];
      for(let i = 0; i < this.employees.length; i++) {
          let a = this.employees[i];
          if(a.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredA.push(a);
          }
      }

    return filteredA;
  }

  private getAll(): void {
    this.employeeService.getAll()
      .subscribe((data: Employee[]) => {
      this.employees = data;
      },
        error => console.log(error),
        () => console.log('Get All Employee Complete'));
  }

}
