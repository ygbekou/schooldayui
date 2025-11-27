import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Message } from 'primeng/primeng';
import { PaySlipAvantageValue } from '../../models/grh/paySlipAvantageValue';
import { PaySlip } from '../../models/grh/paySlip';
import { Periode } from '../../models/grh/periode';
import { User } from '../../models/User';
import { Report } from '../../models/report';
import {PaySlipService } from '../../services/grh/paySlip.service';
import {EmployeeService } from '../../services/grh/employee.service';
import {PaiementModeDropdown } from '../dropdowns/grh/dropdown.paiementMode';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule } from 'primeng/primeng';
import { PaySlipHistory } from 'app/models/grh/paySlipHistory';
import { PaySlipHistoryService } from 'app/services/grh/paySlipHistory.service';
import { Evaluation } from 'app/models/grh/evaluation';
import { EvaluationService } from 'app/services/grh/evaluation.service';
import { CycleDropdown } from '../dropdowns/dropdown.cycle';
import { SchoolYearDropdown } from '../dropdowns/dropdown.schoolYear';
import { SemestreGroupDropdown } from '../dropdowns/dropdown.semestreGroup';
import { ExamTypeDropdown } from '../dropdowns/dropdown.examType';
import { UserService } from 'app/services';
import { SurveillanceService } from 'app/services/grh/surveillance.service';
import { Surveillance } from 'app/models/grh/surveillance';

@Component({
  selector: 'app-grh-surveillant-pay-management',
  templateUrl: '../../pages/grh/grhSurveillantPayManagement.html',
  providers: [EvaluationService, EmployeeService, PaiementModeDropdown, CycleDropdown, 
    SchoolYearDropdown, SemestreGroupDropdown, ExamTypeDropdown, Constants]
})

export class GrhSurveillantPayManagement implements OnInit, OnDestroy {

  public evaluation: Evaluation = new Evaluation();
  public evaluations: Evaluation[];
  public selectedEvaluation: Evaluation;

  surveillance: Surveillance = new Surveillance();
  surveillances: Surveillance[];
  surveillantsEvaluation: Surveillance[];
  selectedSurveillant: Surveillance;
  surveillanceRowIndex: number;
  newSurvaillance: boolean;
  isAddSurveillantToEvaluationButton: boolean = false;
  public users: User[];
  public usersSurveillance: User[];
  surveillanceCols: any[];
  userCols: any[];
  public searchTextUser = '';
  public etatRecapitulatifPaiementSurveillantsName:string= '';
  public printEtatRecapitulatifPaiementSurveillantsLabel:string= 'Etat global de paie';
  public isPrintEtatRecapitulatifPaiementSurveillantsDisabled: boolean= false;

  public paySlipHistory: PaySlipHistory = new PaySlipHistory();
  public paySlipHistories: PaySlipHistory[];
  public selectedPaySlipHistory: PaySlipHistory;
  newPaySlipHistory: boolean;
  paySlipHistoryIndex: number;
  
  public cycleDropdown: CycleDropdown;
  public schoolYearDropdown: SchoolYearDropdown;
  public semestreGroupDropdown: SemestreGroupDropdown;
  public examTypeDropdown: ExamTypeDropdown;
  
  msgs: Message[] = [];

  paiementModeDropdown: PaiementModeDropdown;
  public reportName: string;
  public reports: Report[];
  public codeAndReportsName: any;
  public printLabel:string= 'Enregistrer';


  public error: String = '';
  displayDialog: boolean;
  newEvaluation: boolean;
  evaluationIndex: number;
  cols: any[];
  colsHistories: any[];
  historyCols: any[];
  public user: User;

  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;
  TYPE_EXAM: string = Constants.EXAM_TYPE;
  CYCLE: string = "Niveau";
  TERM: string = Constants.TERM;
  SEMESTRE_GROUP:string='Groupe de semestres';
  USER_SEARCH_PARTS: string = Constants.USER_SEARCH_PARTS;

  constructor
    (
    private evaluationService: EvaluationService,
    private employeeService: EmployeeService,
    private surveillanceService: SurveillanceService,
    private userService: UserService,
    private pmDropdown: PaiementModeDropdown,
    private ccDropdown: CycleDropdown,
    private syDropdown: SchoolYearDropdown,
    private semestreGrpDropdown: SemestreGroupDropdown,
    private etDropdown: ExamTypeDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.paiementModeDropdown = pmDropdown;
    this.cycleDropdown = ccDropdown;
    this.schoolYearDropdown = syDropdown;
    this.semestreGroupDropdown = semestreGrpDropdown;
    this.examTypeDropdown = etDropdown;
  }

  ngOnDestroy() {
    this.evaluations = null;
    this.paySlipHistories = null;
    this.selectedPaySlipHistory = null;
    this.error = null;
    this.selectedEvaluation = null;
    this.evaluation = null;
    this.cols = null;
  }

  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));

    if (this.user == null) {
      this.user = new User();
    }

    this.paySlipHistory.periode = new Periode();

    this.cols = [
      { field: 'examType.name', header: 'Type d\'évaluation', sortable: 'true', filter: 'true' },
      { field: 'cycle.name', header: 'Niveau', sortable: 'true', filter: 'true' },
      { field: 'schoolYear.year', header: 'Année', sortable: 'true', filter: 'true' },
      { field: 'semestreGroup.name', header: 'Groupe de semestre', sortable: 'true', filter: 'true' },
      { field: 'wording', header: 'Libellé', sortable: 'true', filter: 'true' },
      { field: 'startDate', header: 'Date de début', type: 'Date', sortable: 'true', filter: 'true' },
      { field: 'endDate', header: 'Date de fin', type: 'Date', sortable: 'true', filter: 'true' },
      { field: 'hourlyCost', header: 'Coût horaire', type: 'Currency', sortable: 'true', filter: 'true' },
    ];

    this.surveillanceCols = [
      {field: 'user.lastName', header: Constants.NAME, sortable: 'true', filter: 'true'},
      {field: 'user.firstName', header: Constants.PRENOM, sortable: 'true', filter: 'true'},
      {field: 'user.userName', header: Constants.MATRICULE_OR_USER, sortable: 'true', filter: 'true'},
      {field: 'totalHours', header: 'Total heures', sortable: 'true', filter: 'true', editable: 'true', style: {'width': '10%', 'overflow': 'visible'}}
    ];

    this.userCols = [
      {field: 'lastName', header: Constants.NAME, sortable: 'true', filter: 'true'},
      {field: 'firstName', header: Constants.PRENOM, sortable: 'true', filter: 'true'},
      {field: 'userName', header: Constants.MATRICULE_OR_USER, sortable: 'true', filter: 'true'}
    ];

  }

  public getAll(): void {
    this.evaluations = [];
    this.evaluationService.getAll()
      .subscribe((data: Evaluation[]) => {
        this.evaluations = data;
      },
      error => console.log(error),
      () => console.log('Get all Evaluations complete'));
  }

  showDialogToAdd() {
    this.evaluation = new Evaluation();
    this.newEvaluation = true;
    this.displayDialog = true;
  }

  onRowSelect(evt) {
    this.newEvaluation = false;
    //this.getById(evt.data.id);
    console.log(this.selectedEvaluation);
    this.evaluation = this.clone(evt.data);
    this.evaluation.startDate = new Date(this.evaluation.startDate);
    this.evaluation.endDate = new Date(this.evaluation.endDate);
    this.displayDialog = true;
  }

  clone(e: Evaluation): Evaluation {
    let aEvaluation = new Evaluation();
    for (let prop in e) {
      aEvaluation[prop] = e[prop];
    }
    return aEvaluation;
  }

  save() {
    this.evaluation.status = 0;
    try {
      console.log('component');
      this.error = '';
      this.evaluationService.save(this.evaluation)
        .subscribe(result => {
          if (result.id > 0) {
            this.evaluation = result;

            this.putEvaluationInTable();

            this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Evaluation enregistrée avec succès !'});
          }
          else {
            this.error = Constants.saveFailed;
            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Erreur lors de l\'enregistrement' });
          }
        })
    }
    catch (e) {
      console.log(e);
      this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Erreur lors de l\'enregistrement' });
    }

  }

  delete() {
    try {
      this.error = '';
      this.evaluationService.delete(this.evaluation)
        .subscribe(result => {
          if (result) {
            this.removeEvaluationFromTable();this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Evaluation supprimée avec succès !'});
          }
          else {
            this.error = Constants.saveFailed;
            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Erreur lors de l\'enregistrement' });
          }
        })
    }
    catch (e) {
      console.log(e);
      this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Erreur lors de l\'enregistrement' });
    }

  }

  removeEvaluationFromTable() {
    this.evaluations.splice(this.findEvaluationSelectedIndex(), 1);
    const onTheFly: Evaluation[] = [];
    onTheFly.push(...this.evaluations);
    this.evaluations = onTheFly;
    this.resetData();
  }

  resetData() {
    //this.evaluation = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  putEvaluationInTable() {
    var onTheFly: Evaluation[] = [];
    onTheFly.push(...this.evaluations);
    this.evaluations = onTheFly;

    if (this.newEvaluation)
      this.evaluations.push(this.evaluation);
    else
      this.evaluations[this.findEvaluationSelectedIndex()] = this.evaluation;

    this.displayDialog = false;
  }

  findEvaluationSelectedIndex(): number {
    return this.evaluations.indexOf(this.selectedEvaluation);
  }

  public getListeSurveillants(evt) {
    console.log(evt.data);
    this.evaluation = this.clone(evt.data);

    this.getListSurveillantsByEvaluation();
  }

  public addSurveillantToEvaluation(surv: Surveillance) {

    this.isAddSurveillantToEvaluationButton = true; // Désactivation du bouton d'ajout
    
    this.selectedSurveillant = surv;
    this.selectedSurveillant.evaluation = this.evaluation;
    this.selectedSurveillant.status = 1;
    console.log(this.selectedSurveillant);

    if(this.selectedSurveillant.totalHours > 0) {
      try {
        this.error = '';
        this.surveillanceService.save(this.selectedSurveillant)
          .subscribe(result => {
            if (result.id > 0) {
              this.surveillance = result;
  
              if(this.selectedSurveillant.id > 0) {
                this.newSurvaillance = false;
              } else {
                this.newSurvaillance = true;
              }
  
              this.putSurveillanceInTable();

              this.isAddSurveillantToEvaluationButton = false;
  
              this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Surveillant enregistré avec succès !'});
            }
            else {
              this.isAddSurveillantToEvaluationButton = false;
              this.error = Constants.saveFailed;
              this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Erreur lors de l\'enregistrement' });
            }
          })
      }
      catch (e) {
        console.log(e);
        this.isAddSurveillantToEvaluationButton = false;
        this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Erreur lors de l\'enregistrement' });
      }
    }
    else {
      this.isAddSurveillantToEvaluationButton = false;
      this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Entrez le nombre total d\'heures' });
    }

    //this.isAddSurveillantToEvaluationButton = false;

  }

  putSurveillanceInTable() {
    var onTheFly: Surveillance[] = [];
    onTheFly.push(...this.surveillantsEvaluation);
    this.surveillantsEvaluation = onTheFly;

    if (this.newSurvaillance)
      this.surveillantsEvaluation.push(this.surveillance);
    else
      this.surveillantsEvaluation[this.findSurveillanceSelectedIndex()] = this.surveillance;
  }

  findSurveillanceSelectedIndex(): number {
    return this.surveillantsEvaluation.indexOf(this.selectedSurveillant);
  }

  public removeUserToSurveillance(surv: Surveillance) {
    console.log(surv);

    this.isAddSurveillantToEvaluationButton = true;

    this.selectedSurveillant = surv;

    try {
      this.error = '';
      this.surveillanceService.delete(this.selectedSurveillant)
        .subscribe(result => {
          if (result) {

            this.removeSurveillantFromTable();

            this.isAddSurveillantToEvaluationButton = false;

            this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Surveillant supprimé avec succès !'});
          }
          else {
            this.isAddSurveillantToEvaluationButton = false;
            this.error = Constants.saveFailed;
            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Erreur lors de la suppression' });
            
          }
        })
    }
    catch (e) {
      this.isAddSurveillantToEvaluationButton = false;
      console.log(e);
      this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Erreur lors de la suppression' });
    }

    //this.isAddSurveillantToEvaluationButton = false;
  }

  removeSurveillantFromTable() {
    this.surveillantsEvaluation.splice(this.findSurveillanceSelectedIndex(), 1);
    const onTheFly: Surveillance[] = [];
    onTheFly.push(...this.surveillantsEvaluation);
    this.surveillantsEvaluation = onTheFly;
    //this.resetData();
  }

  public searchUser() {
      this.error = null;
      if (this.searchTextUser != null) {
          this.userService.search(this.searchTextUser).subscribe((data: User[]) => {
                  this.users = data;

                  this.constructSurveillancesFromUsers();

                  if (this.users == null || this.users.length <= 0) {
                      this.error = Constants.NO_USER_FOUND;
                  }
              },
              error => console.log(error),
              () => console.log('Find users with name like ' + this.searchTextUser));
      }
  }

  public constructSurveillancesFromUsers() {
    this.surveillances = [];

    if(this.users.length != 0) {
      var i = 0;
      for(i=0; i < this.users.length; i++) {
        var surv : Surveillance = new Surveillance();
        surv.user = this.users[i];
        this.surveillances.push(surv);
      }
      
    }

    console.log(this.surveillances);
  }

  public getListSurveillantsByEvaluation(): void {
    this.surveillantsEvaluation = [];
    this.surveillanceService.getListByEvaluation(this.evaluation)
      .subscribe((data: Surveillance[]) => {
        this.surveillantsEvaluation = data;
      },
      error => console.log(error),
      () => console.log('Get all Surveillances complete'));
  }

  public updateEvaluation(evaluation, rowIndex) {
    console.log(evaluation);
    console.log('Row index : ' + rowIndex);

    this.evaluation = evaluation;
    this.evaluationIndex = rowIndex;
    this.evaluation.status = 1;

    try {
      this.error = '';
      this.evaluationService.save(this.evaluation)
        .subscribe(result => {
          if (result.id > 0) {
            this.evaluation = result;

            this.updateEvaluationInTable();

            this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Paiement effectué avec succès pour la période !'});
          }
          else {
            this.error = Constants.saveFailed;
            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Erreur lors du paiement' });
          }
        })
    }
    catch (e) {
      console.log(e);
      this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Erreur lors du paiement' });
    }
  }

  updateEvaluationInTable() {
    this.evaluations[this.evaluationIndex] = this.evaluation;

    var onTheFly: Evaluation[] = [];
    onTheFly.push(...this.evaluations);
    this.evaluations = onTheFly;
  }

  public printEtatGlobalDocument(): void {
    this.printEtatRecapitulatifPaiementSurveillantsLabel = 'Génération état global de paie...';
    this.isPrintEtatRecapitulatifPaiementSurveillantsDisabled = true;
    this.etatRecapitulatifPaiementSurveillantsName = '';

    this.evaluationService.printRecapitulatifGlobalVirementSalaireParBanque(this.evaluation)
      .subscribe((data: string) => {
        this.etatRecapitulatifPaiementSurveillantsName = data;
        this.printEtatRecapitulatifPaiementSurveillantsLabel = 'Etat global de paie';
        this.isPrintEtatRecapitulatifPaiementSurveillantsDisabled = false;
        console.log(this.etatRecapitulatifPaiementSurveillantsName)
      },
      error => console.log(error),
      () => console.log('Print reportRecapitulatifGlobalVirementSalaireParBanque complete'));
  }

}
