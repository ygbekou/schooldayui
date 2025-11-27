import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Employee } from '../../models/grh/employee';
import { EmployeeKiosk } from '../../models/kiosk/employeeKiosk';
import { User } from '../../models/User';
import { EmployeeService } from '../../services/grh/employee.service';
import { Constants } from '../../app.constants';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-manage-personnel-kiosk-card',
  templateUrl: '../../pages/grh/grhManagePersonnelKioskCard.html',
  providers: [EmployeeService]
})
export class GrhManagePersonnelKioskCard implements OnInit {

  public error: String = '';
  public success: String = '';
  public reportName: string;
  ACTIF: string = Constants.ACTIF;
  INACTIF: string = Constants.INACTIF;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;

  PRINT_CARD: string = Constants.PRINT_CARD;
  @Input() user: User;
  public employee: Employee;

  public employeeKiosk: EmployeeKiosk;
  public employeeKioskGetting: boolean = false;
  public generateLabel: string;

  constructor ( private employeeService: EmployeeService,
  private changeDetectorRef: ChangeDetectorRef)
  {
    this.employee = new Employee();
    this.employee.user = new User();

    this.employeeKiosk = new EmployeeKiosk();
  }

  ngOnInit() {
    this.generateLabel = 'Désactivation + Génération d\'un nouveau numéro';
    this.employeeKioskGetting = false;
  }

  setEmployee(user: User) {

     this.employeeKioskGetting = true;

     this.employeeService.getByUser(user)
      .subscribe((data: Employee) => {

        this.employee = data
        console.log(this.employee);

        this.employee.user = user;

        if(this.employee.id > 0) {
          this.getActiveEmployeeKiosk();
        }

      },
      error => console.log(error),
      () => console.log('Get active EmployeeKiosk complete'));

  }

  public getActiveEmployeeKiosk() {
    this.error = '';
    this.success = '';
    try {
        this.employeeService.getActiveEmployeeKiosk(this.employee)
        .subscribe(result => {
          if (result) {
            this.employeeKiosk = result;
            console.log(this.employeeKiosk);
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  public desactivateAndGenerateNewEmployeeKioskCardNumber() {
    try {
        this.generateLabel = 'En cours...';
        this.error = '';
        this.success = '';
        this.employeeService.desactivateAndGenerateNewEmployeeKioskCardNumber(this.employee)
        .subscribe(result => {
          if (result.id > 0) {
            this.employeeKiosk = result;
            this.success = 'Désactivation + génération du nouveau numéro effectuées avec succès !';
          }
          else {
            this.error = Constants.saveFailed;
          }

        })
    }
    catch (e) {
      console.log(e);
    }
    this.generateLabel = 'Désactivation + Génération d\'un nouveau numéro';
  }

  public printCard() {
      this.reportName=null;
    this.employeeService.printCard(this.employee.matricule).subscribe((data: string) => { this.reportName = data; },
      error => console.log(error),
      () => console.log('Get print card'));
  }
}
