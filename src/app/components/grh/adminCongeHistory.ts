import {Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {Constants} from '../../app.constants';
import {DataTableModule, DialogModule, InputTextareaModule} from 'primeng/primeng';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/User';
import { Employee } from '../../models/grh/employee';
import {GetConge} from '../../models/grh/getConge';
import {CongeHistory} from '../../models/grh/congeHistory';
import {EmployeeService} from '../../services/grh/employee.service';
import {CongeService} from '../../services/grh/conge.service';

@Component({
  selector: 'app-admin-conge-history',
  templateUrl: '../../pages/grh/adminCongeHistory.html',
  providers: [EmployeeService, CongeService]
})
export class AdminCongeHistory implements OnInit, OnDestroy {
  error: string = '';
  success: string = '';
  cols: any[];
  getConges: GetConge[];
  getConge: GetConge = new GetConge();
  congeHistory: CongeHistory = new CongeHistory();
  congeHistories: CongeHistory[];
  selectedConge: GetConge;
  @Input() user: User;
  public employee: Employee;
  public role: string;

  data: any;
  data1: any;
  data2: any;

  constructor (
    private employeeService: EmployeeService,
    private congeService: CongeService
  )
  {

  }

  ngOnDestroy() {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(atob(Cookie.get('user')));
    }
    console.log(this.user);
     this.cols = [
        { field: 'aJouir', header: 'Conge a Jouir', sortable: 'true', filter: 'true', style:  {'width':'20%'}  },
        { field: 'joui', header: 'Conge Jouit', type: 'number',sortable: 'false', filter: 'true',  style:  {'width':'20%'}  },
        { field: 'restAJouir', header: 'Reste a Jouir', type: 'number',sortable: 'false', filter: 'true',  style:  {'width':'30%'}  }
      ];
  }

  setEmployee(user: User) {
    this.employeeService.getByUser(user)
      .subscribe((data: Employee) => {

        this.employee = data;

        console.log(this.employee);

        if(this.employee != null) {
            this.getEmployeeCongeHistory();
        }
      },
        error => console.log(error),
        () => console.log('Get employee complete'));

  }

  getEmployeeCongeHistory() {
      console.log(this.employee);
      this.congeService.getEmployeeCongeHistory(this.employee.id)
        .subscribe(result => {
          this.congeHistories = result ;
         console.log(this.congeHistory);
        });

  }

  
  

  
}
