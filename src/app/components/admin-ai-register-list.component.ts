import { Component, OnInit } from '@angular/core';
import { AiRegister } from 'app/models/aiRegister';
import { AiRegisterService } from 'app/services/airegistration.service';

@Component({
  selector: 'app-admin-ai-register-list',
  templateUrl: '../pages/admin-ai-register-list.component.html',
})
export class AdminAiRegisterListComponent implements OnInit {
  cols: any[];
  registers: any[];

  constructor(public aiRegisterService: AiRegisterService) { }

  ngOnInit() {
    this.getAll();

    this.cols = [
      {field: 'createDate', header: 'DATE DEMANDE', type: 'Date',sortable: 'true', filter: 'true', style: {'width': '10%'}},
      {field: 'lastName', header: 'NOM', sortable: 'true', filter: 'true', style: {'width': '15%'}},
      {field: 'firstName', header: 'PRENOM', sortable: 'true', filter: 'true', style: {'width': '15%'}},
      {field: 'email', header: 'EMAIL', sortable: 'true', filter: 'true', style: {'width': '25%'}},
      {field: 'phone', header: 'CONTACT', sortable: 'true', filter: 'true', style: {'width': '15%'}},
      {field: 'countryResidence.name', header: 'PAYS', sortable: 'true', filter: 'true', style: {'width': '15%'}},
      {field: 'cityResidence', header: 'VILLE', sortable: 'true', filter: 'true', style: {'width': '15%'}}
     
    ];
  }

  ngOnDestroy() {
    this.cols = null;
    this.registers = null;
  }

  getAll(){
    this.registers = [];
    this.aiRegisterService.getAll()
      .subscribe((data: AiRegister[]) => {
        this.registers = data;
        console.log("rdv");
        console.log(this.registers);
      },
      error => console.log(error),
      () => console.log('Get all Registers complete'));
  }

}
