import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Message } from 'primeng/primeng';
import { PaySlipAvantageValue } from '../../models/grh/paySlipAvantageValue';
import { PaySlip } from '../../models/grh/paySlip';
import { Periode } from '../../models/grh/periode';
import { User } from '../../models/User';
import { Report } from '../../models/report';
import {PaySlipService } from '../../services/grh/paySlip.service';
import {EmployeeService } from '../../services/grh/employee.service';
import {PaiementModeDropdown } from '../../components/dropdowns/grh/dropdown.paiementMode';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule } from 'primeng/primeng';
import { PaySlipHistory } from 'app/models/grh/paySlipHistory';
import { PaySlipHistoryService } from 'app/services/grh/paySlipHistory.service';

@Component({
  selector: 'app-grh-generate-pay',
  templateUrl: '../../pages/grh/grhGeneratePay.html',
  providers: [PaySlipService, EmployeeService, PaiementModeDropdown, Constants]
})

export class GrhGeneratePay implements OnInit, OnDestroy {

  public paySlip: PaySlip = new PaySlip();
  public paySlips: PaySlip[];
  public selectedPaySlip: PaySlip;

  public paySlipHistory: PaySlipHistory = new PaySlipHistory();
  public paySlipHistories: PaySlipHistory[];
  public selectedPaySlipHistory: PaySlipHistory;
  newPaySlipHistory: boolean;
  paySlipHistoryIndex: number;
  
  msgs: Message[] = [];

  paiementModeDropdown: PaiementModeDropdown;
  public reportName: string;
  public reports: Report[];
  public codeAndReportsName: any;
  public printLabel:string= 'Enregistrer';

  downloadButtonLabelRecapitulatifGlobalVirementSalaireParBanque = 'Réc. Global par banque';
  reportRecapitulatifGlobalVirementSalaireParBanque: string = '';

  downloadButtonLabelRecapitulatifVirementSalaireParBanque = 'Réc. par banque';
  reportRecapitulatifVirementSalaireParBanque: string = '';

  downloadButtonLabelRecapitulatifVirementSalaireParPersonnel = 'Réc. par personnel';
  reportRecapitulatifVirementSalaireParPersonnel: string = '';

  downloadButtonLabelBulletinPaie = 'Bulletins de paie';
  reportBulletinPaie: string = '';

  downloadButtonLabelRecapitulatifStagiaireEtConsultant = 'Réc. des stagiaires et consultants';
  reportRecapitulatifStagiaireEtConsultant: string = '';

  downloadButtonLabelRecapitulatifFicheDePaie = 'Fiche de paie';
  reportRecapitulatifFicheDePaie: string = '';


  public error: String = '';
  displayDialog: boolean;
  newPaySlip: boolean;
  paySlipIndex: number;
  cols: any[];
  colsHistories: any[];
  historyCols: any[];
  public user: User;

  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;

  constructor
    (
    private paySlipHistoryService: PaySlipHistoryService,
    private paySlipService: PaySlipService,
    private employeeService: EmployeeService,
    private pmDropdown: PaiementModeDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.paiementModeDropdown = pmDropdown;
  }
  ngOnDestroy() {
    this.paySlips = null;
    this.paySlipHistories = null;
    this.selectedPaySlipHistory = null;
    this.error = null;
    this.selectedPaySlip = null;
    this.paySlip = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));

    if (this.user == null) {
      this.user = new User();
    }

    this.paySlip.periode = new Periode();
    this.paySlipHistory.periode = new Periode();

    this.colsHistories = [
      { field: 'periode.startDate', header: 'Date de début', type: 'Date', sortable: 'false', filter: 'false', style:  {'width':'20%'}  },
      { field: 'periode.endDate', header: 'Date de fin', type: 'Date', sortable: 'false', filter: 'false', style:  {'width':'20%'}  },
      { field: 'paiementMode.wording', header: 'Mode de paiement', sortable: 'false', filter: 'false',  style:  {'width':'20%'}  },
      { field: 'payDate', header: 'Date de paiement', type: 'Date', sortable: 'false', filter: 'false',  style:  {'width':'20%'}  }
    ];

    this.cols = [
      { field: 'employee.lastName', header: 'Nom', sortable: 'true', filter: 'true', style: { 'width': '10%' } },
      { field: 'employee.firstName', header: 'Prénom', sortable: 'true', filter: 'true', style: { 'width': '15%' } },
      { field: 'baseSalary', header: 'Base', type: 'Currency', sortable: 'true', filter: 'true', style: { 'width': '10%' } },
      { field: 'netSalary', header: 'Net', type: 'Currency', sortable: 'true', filter: 'true', style: { 'width': '10%' } },
      //{ field: 'cnss', header: 'CNSS', type: 'Currency', sortable: 'true', filter: 'true', style: { 'width': '20%' } },
      //{ field: 'irpp', header: 'IRPP', type: 'Currency', sortable: 'true', filter: 'true', style: { 'width': '20%' } },
      //{ field: 'totalInsurence', header: 'ASSURENCE', type: 'Currency', sortable: 'true', filter: 'true', style: { 'width': '20%' } },
      //{ field: 'paiementMode.wording', header: 'MODE PAYEMENT', sortable: 'true', filter: 'true', style: { 'width': '20%' } }
    ];

  }
  
  public getAllPaySlipHistories(): void {
    this.paySlipHistories = [];
    this.paySlipHistoryService.getAll()
      .subscribe((data: PaySlipHistory[]) => {
        this.paySlipHistories = data;
      },
      error => console.log(error),
      () => console.log('Get all PaySlipHistories complete'));
  }
  
  public getAllOrderByPeriodeStartDateDesc(): void {
    this.paySlipHistories = [];
    this.paySlipHistoryService.getAllOrderByPeriodeStartDateDesc()
      .subscribe((data: PaySlipHistory[]) => {
        this.paySlipHistories = data;
      },
      error => console.log(error),
      () => console.log('Get all PaySlipHistories complete'));
  }
  
  public getAllOrderByPeriodeStartDateAsc(): void {
    this.paySlipHistories = [];
    this.paySlipHistoryService.getAllOrderByPeriodeStartDateAsc()
      .subscribe((data: PaySlipHistory[]) => {
        this.paySlipHistories = data;
      },
      error => console.log(error),
      () => console.log('Get all PaySlipHistories complete'));
  }

 public getPaySlips(): void {
    this.paySlips = [];

  }

  public getAll(): void {
    this.paySlips = [];
    this.paySlipService.getAll()
      .subscribe((data: PaySlip[]) => {
        this.paySlips = data;
      },
      error => console.log(error),
      () => console.log('Get all PaySlips complete'));
  }

  public getById(l: number) {
    this.paySlipService.getPaySlipById(l)
      .subscribe(result => {
        if (result.id > 0) {
          this.paySlip = result;
        } else {
          this.error = Constants.saveFailed;
          this.displayDialog = true;
        }
      });
  }

  getPaySlip(evt) {
    this.getById(evt.data.id);
  }

  onRowSelect(evt) {
    this.newPaySlip = false;
    this.getById(evt.data.id);
    this.paySlip = this.clone(this.paySlip);
    this.displayDialog = true;
  }

  clone(e: PaySlip): PaySlip {
    let aPaySlip = new PaySlip();
    for (let prop in e) {
      aPaySlip[prop] = e[prop];
    }
    return aPaySlip;
  }

  save() {
    try {
      this.error = '';
      this.paySlipService.save(this.paySlip)
        .subscribe(result => {
          if (result.id > 0) {
            this.paySlip = result;
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

  /* save1() {
    try {
      this.error = '';
      this.paySlipHistoryService.save(this.paySlipHistory)
        .subscribe(result => {
          if (result.id > 0) {
            this.paySlipHistory = result;
          }
          else {
            this.error = Constants.saveFailed;
          }
        })
    }
    catch (e) {
      console.log(e);
    }

  } */

  savePeriodPay() {
    try {
      this.error = '';
      this.employeeService.savePeriodPay(this.paySlip.periode)
      .subscribe((data: PaySlip[]) => {
        this.paySlips = data;
        console.log(this.paySlips);
      },
      error => console.log(error),
      () => console.log('Get all PaySlips complete'));
    }
    catch (e) {
      console.log(e);
    }

  }

  savePeriodPayByPaiementMode() {
    try {
      this.error = '';
      this.employeeService.savePeriodPayByPaiementMode(this.paySlip)
      .subscribe((data: PaySlip[]) => {
        this.paySlips = data;
        console.log(this.paySlips);
      },
      error => console.log(error),
      () => console.log('Get all PaySlips complete'));
    }
    catch (e) {
      console.log(e);
    }

  }

  /*
  calculateActiveEmpPeriodPaySlipAndReturnTheirReport() {
    this.error = '';
    this.reportName=null;
    this.printLabel = 'Paiement + Génération des bulletins de paie...';
    try {
      this.employeeService.calculateActiveEmpPeriodPaySlipAndReturnTheirReport(this.paySlip)
      .subscribe((data: string) => {
        this.reportName = data;
        console.log(this.reportName);
        this.printLabel = 'Effectuer la paie';
      },
      error => console.log(error),
      () => console.log('Get all PaySlips complete'));
    }
    catch (e) {
      console.log(e);
    }

  }
  */

  calculateActiveEmpPeriodPaySlipAndReturnTheirReport() {
    this.error = '';
    this.reportName=null;
    this.codeAndReportsName = null;
    this.printLabel = 'Enregistrement en cours...';
    try {
      this.employeeService.calculateActiveEmpPeriodPaySlipAndReturnTheirReport(this.paySlip)
      .subscribe((data: any) => {
        this.codeAndReportsName = data;
        console.log(this.codeAndReportsName);
        this.printLabel = 'Enregistrer';
      },
      error => console.log(error),
      () => console.log('Get all PaySlips complete'));
    }
    catch (e) {
      console.log(e);
    }

  }
  
  calculateActiveEmpPeriodPaySlipAndReturnPaySlipHistory() {
    this.error = '';
    this.reportName=null;
    this.codeAndReportsName = null;
    this.printLabel = 'Enregistrement en cours...';
    console.log(this.paySlipHistory);
    try {
      this.employeeService.calculateActiveEmpPeriodPaySlipAndReturnPaySlipHistory(this.paySlipHistory)
      .subscribe((data: PaySlipHistory) => {
        /*this.codeAndReportsName = data;
        console.log(this.codeAndReportsName);*/
        this.paySlipHistory = data;
        console.log(this.paySlipHistory);
        this.putPaySlipHistoryInTable();
            
        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Paiement enregistré avec succès pour la période !'});

        this.printLabel = 'Enregistrer';
      },
      error => console.log(error),
      () => console.log('Save all PaySlips complete'));
    }
    catch (e) {
      console.log(e);
    }

  }

  delete() {
    try {
      this.error = '';
      this.paySlipService.delete(this.paySlip)
        .subscribe(result => {
          if (result) {

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

  showDialogToAdd() {
    this.paySlipHistory = new PaySlipHistory();
    this.paySlipHistory.periode = new Periode();
    this.newPaySlipHistory = true;
    this.displayDialog = true;
  }

  putPaySlipHistoryInTable() {
    var onTheFly: PaySlipHistory[] = [];
    onTheFly.push(...this.paySlipHistories);
    this.paySlipHistories = onTheFly;

    if (this.newPaySlipHistory)
      this.paySlipHistories.push(this.paySlipHistory);
    else
      this.paySlipHistories[this.findPaySlipHistorySelectedIndex()] = this.paySlipHistory;


    //this.resetPaySlipHistoryData();
    this.displayDialog = false;
  }

  resetPaySlipHistoryData() {
    this.paySlipHistory = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onPaySlipHistoryRowSelect(evt) {
    this.newPaySlipHistory = false;
    this.paySlipHistory = this.clonePaySlipHistory(evt.data);
    this.paySlipHistory.periode.startDate = new Date(this.paySlipHistory.periode.startDate);
    this.paySlipHistory.periode.endDate = new Date(this.paySlipHistory.periode.endDate);
    console.log(this.paySlipHistory);
    this.displayDialog = true;
  }

  clonePaySlipHistory(e: PaySlipHistory): PaySlipHistory {
    let aPaySlipHistory = new PaySlipHistory();
    for (let prop in e) {
      aPaySlipHistory[prop] = e[prop];
    }
    return aPaySlipHistory;
  }

  findPaySlipHistorySelectedIndex(): number {
    return this.paySlipHistories.indexOf(this.selectedPaySlipHistory);
  }

  getPaySlipHistory(evt) {
    console.log(evt.data);
    this.paySlipHistory = evt.data;

    this.getListPaySlipByPSHistory();
  }

  public getListPaySlipByPSHistory(): void {
    this.paySlips = [];
    this.paySlipService.getListPaySlipByPSHistory(this.paySlipHistory)
      .subscribe((data: PaySlip[]) => {
        this.paySlips = data;
        console.log(this.paySlips)
      },
      error => console.log(error),
      () => console.log('Get all PaySlips complete'));
  }

  public printRecapitulatifGlobalVirementSalaireParBanque(): void {
    this.reportRecapitulatifGlobalVirementSalaireParBanque = '#';
    this.downloadButtonLabelRecapitulatifGlobalVirementSalaireParBanque = 'Réc. Global par banque...';

    this.employeeService.printRecapitulatifGlobalVirementSalaireParBanque(this.paySlipHistory.periode)
      .subscribe((data: string) => {
        this.reportRecapitulatifGlobalVirementSalaireParBanque = data;
        this.downloadButtonLabelRecapitulatifGlobalVirementSalaireParBanque = 'Réc. Global par banque';
        console.log(this.reportRecapitulatifGlobalVirementSalaireParBanque)
      },
      error => console.log(error),
      () => console.log('Print reportRecapitulatifGlobalVirementSalaireParBanque complete'));
  }

  public printRecapitulatifVirementSalaireParBanque(): void {
    this.reportRecapitulatifVirementSalaireParBanque = '#';
    this.downloadButtonLabelRecapitulatifVirementSalaireParBanque = 'Réc. par banque...';

    this.employeeService.printRecapitulatifVirementSalaireParBanque(this.paySlipHistory.periode)
      .subscribe((data: string) => {
        this.reportRecapitulatifVirementSalaireParBanque = data;
        this.downloadButtonLabelRecapitulatifVirementSalaireParBanque = 'Réc. par banque';
        console.log(this.reportRecapitulatifVirementSalaireParBanque)
      },
      error => console.log(error),
      () => console.log('Print reportRecapitulatifVirementSalaireParBanque complete'));
  }

  public printRecapitulatifVirementSalaireParPersonnel(): void {
    this.reportRecapitulatifVirementSalaireParPersonnel = '#';
    this.downloadButtonLabelRecapitulatifVirementSalaireParPersonnel = 'Réc. par personnel...';

    this.employeeService.printRecapitulatifVirementSalaireParEmployee(this.paySlipHistory.periode)
      .subscribe((data: string) => {
        this.reportRecapitulatifVirementSalaireParPersonnel = data;
        this.downloadButtonLabelRecapitulatifVirementSalaireParPersonnel = 'Réc. par personnel';
        console.log(this.reportRecapitulatifVirementSalaireParPersonnel)
      },
      error => console.log(error),
      () => console.log('Print reportRecapitulatifVirementSalaireParPersonnel complete'));
  }

  public printPaySlipsAllEmployees(): void {
    this.reportBulletinPaie = '#';
    this.downloadButtonLabelBulletinPaie = 'Bulletins de paie...';

    this.employeeService.printPaySlipsAllEmployees(this.paySlipHistory.periode)
      .subscribe((data: string) => {
        this.reportBulletinPaie = data;
        this.downloadButtonLabelBulletinPaie = 'Bulletins de paie';
        console.log(this.reportBulletinPaie)
      },
      error => console.log(error),
      () => console.log('Print reportBulletinPaie complete'));
  }

  public printRecapitulatifStagiaireEtConsultant(): void {
    this.reportRecapitulatifStagiaireEtConsultant = '#';
    this.downloadButtonLabelRecapitulatifStagiaireEtConsultant = 'Réc. des stagiaires et consultants...';

    this.employeeService.printServiceProviderPay(this.paySlipHistory.periode)
      .subscribe((data: string) => {
        this.reportRecapitulatifStagiaireEtConsultant = data;
        this.downloadButtonLabelRecapitulatifStagiaireEtConsultant = 'Réc. des stagiaires et consultants';
        console.log(this.reportRecapitulatifStagiaireEtConsultant)
      },
      error => console.log(error),
      () => console.log('Print reportRecapitulatifStagiaireEtConsultant complete'));
  }

  public printRecapitulatifFicheDePaie(): void {
    this.reportRecapitulatifFicheDePaie = '#';
    this.downloadButtonLabelRecapitulatifFicheDePaie = 'Fiche de paie...';

    this.employeeService.printFicheDePaie(this.paySlipHistory.periode)
      .subscribe((data: string) => {
        this.reportRecapitulatifFicheDePaie = data;
        this.downloadButtonLabelRecapitulatifFicheDePaie = 'Fiche de paie';
        console.log(this.reportRecapitulatifFicheDePaie)
      },
      error => console.log(error),
      () => console.log('Print reportRecapitulatifFicheDePaie complete'));
  }

  public printAllDocuments() {
    console.log("P. all documents");
    //Réc. Global par banque
    this.reportRecapitulatifGlobalVirementSalaireParBanque = '#';
    this.downloadButtonLabelRecapitulatifGlobalVirementSalaireParBanque = 'Réc. Global par banque...';

    //Réc. par banque
    this.reportRecapitulatifVirementSalaireParBanque = '#';
    this.downloadButtonLabelRecapitulatifVirementSalaireParBanque = 'Réc. par banque...';

    //Réc. par personnel
    this.reportRecapitulatifVirementSalaireParPersonnel = '#';
    this.downloadButtonLabelRecapitulatifVirementSalaireParPersonnel = 'Réc. par personnel...';

    //Bulletins de paie
    this.reportBulletinPaie = '#';
    this.downloadButtonLabelBulletinPaie = 'Bulletins de paie...';
    
    //Réc. des stagiaires et consultants
    this.reportRecapitulatifStagiaireEtConsultant = '#';
    this.downloadButtonLabelRecapitulatifStagiaireEtConsultant = 'Réc. des stagiaires et consultants...';
    
    //Fiche de paie
    this.reportRecapitulatifFicheDePaie = '#';
    this.downloadButtonLabelRecapitulatifFicheDePaie = 'Fiche de paie...';

    this.employeeService.printAllDocuments(this.paySlipHistory.periode)
      .subscribe((data: any) => {
        //Réc. Global par banque
        this.reportRecapitulatifGlobalVirementSalaireParBanque = data['RGB'];
        this.downloadButtonLabelRecapitulatifGlobalVirementSalaireParBanque = 'Réc. Global par banque';
        console.log(this.reportRecapitulatifGlobalVirementSalaireParBanque)

        //Réc. par banque
        this.reportRecapitulatifVirementSalaireParBanque = data['RB'];
        this.downloadButtonLabelRecapitulatifVirementSalaireParBanque = 'Réc. par banque';
        console.log(this.reportRecapitulatifVirementSalaireParBanque)

        //Réc. par personnel
        this.reportRecapitulatifVirementSalaireParPersonnel = data['RE'];
        this.downloadButtonLabelRecapitulatifVirementSalaireParPersonnel = 'Réc. par personnel';
        console.log(this.reportRecapitulatifVirementSalaireParPersonnel)

        //Bulletins de paie
        this.reportBulletinPaie = data['RPS'];
        this.downloadButtonLabelBulletinPaie = 'Bulletins de paie';
        console.log(this.reportBulletinPaie)

        //Réc. des stagiaires et consultants
        this.reportRecapitulatifStagiaireEtConsultant = data['SPPS'];
        this.downloadButtonLabelRecapitulatifStagiaireEtConsultant = 'Réc. des stagiaires et consultants';
        console.log(this.reportRecapitulatifStagiaireEtConsultant)

        //Fiche de paie
        this.reportRecapitulatifFicheDePaie = data['FDP'];
        this.downloadButtonLabelRecapitulatifFicheDePaie = 'Fiche de paie';
        console.log(this.reportRecapitulatifFicheDePaie)
      },
      error => console.log(error),
      () => console.log('Print printAllDocuments complete'));
  }

  public updatePaySlip(paySlip: PaySlip, rowIndex) {
      console.log(paySlip);
      console.log(rowIndex);

      this.paySlipIndex = rowIndex;

      /* Si on ne convertit pas le status en number, le backend n'est pas appelé */
      if(paySlip.status) {
        paySlip.status = 1;
      }
      else {
        paySlip.status = 0;
      }

      try {
        this.error = '';
        this.paySlipService.save(paySlip)
          .subscribe(result => {
            if (result.id > 0) {
              this.paySlip = result;

              this.updatePaySlipInTable();

              this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Modification effectuée avec succès sur l\'employé ' + this.paySlip.employee.lastName + ' ' + this.paySlip.employee.firstName + ' !'});
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

  updatePaySlipInTable() {
    this.paySlips[this.paySlipIndex] = this.paySlip;

    var onTheFly: PaySlip[] = [];
    onTheFly.push(...this.paySlips);
    this.paySlips = onTheFly;
  }

  updatePaySlipHistory(paySlipHistory: PaySlipHistory, rowIndex: number) {
    console.log(paySlipHistory);
    console.log(rowIndex);

    this.paySlipHistory = paySlipHistory;
    this.paySlipHistoryIndex = rowIndex;
    this.paySlipHistory.status = 1;

    try {
      this.error = '';
      this.paySlipHistoryService.save(this.paySlipHistory)
        .subscribe(result => {
          if (result.id > 0) {
            this.paySlipHistory = result;

            this.updatePaySlipHistoryInTable();
            
            this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Paiement effectué avec succès pour la période !'});
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

  updatePaySlipHistoryInTable() {
    this.paySlipHistories[this.paySlipHistoryIndex] = this.paySlipHistory;

    var onTheFly: PaySlipHistory[] = [];
    onTheFly.push(...this.paySlipHistories);
    this.paySlipHistories = onTheFly;
  }

}
