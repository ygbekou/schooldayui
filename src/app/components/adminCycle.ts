import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {Cycle} from '../models/cycle';
import {CycleService} from '../services/cycle.service';
import {Constants} from '../app.constants';
import {FileUploader} from './fileUploader';
import {ConfirmationService, MessageService} from 'primeng/primeng';
import { User } from 'app/models/User';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-admin-cycle',
  templateUrl: '../pages/adminCycle.html',
  providers: [CycleService,MessageService,ConfirmationService]
})
export class AdminCycle implements OnInit, OnDestroy {

  public cycles: Cycle[];
  public error: String = '';
  public selectedCycle: Cycle;
  displayDialog: boolean = false;
  cycle: Cycle = new Cycle();
  newCycle: boolean;
  zIndexDialog: number = 1000; 
  zIndexConfirmDialog: number = 1100;
  currentUser: User = JSON.parse(atob(Cookie.get("user")));


  cols: any[];
  @ViewChild(FileUploader) fileUploader: FileUploader;
  constructor
    (
    private cycleService: CycleService,
    private changeDetectorRef: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
    ) {

  }
  ngOnInit() {
    this.cols = [
      {field: 'name', header: 'Nom', sortable: 'true', style: {'width': '49%'}},
      {field: 'code', header: 'Code', sortable: 'true', style: {'width': '7%'}},
      {field: 'ordreAffichageMenuSiteWeb', header: 'Ordre d\'affichage - Menu Web', sortable: 'true', style: {'width': '24%'}},
      {field: 'creditsPerSemester', header: 'Credits par Sem./Trim.', sortable: 'true', style: {'width': '20%'}}
    ];
  }
  ngOnDestroy() {
    this.cycles = null;
    this.error = null;
    this.selectedCycle = null;
    this.cycle = null;
    this.cols = null;
  }
  public getAll(): void {
    this.cycles = [];
    this.cycleService.getAll()
      .subscribe((data: Cycle[]) => this.cycles = data,
      error => console.log(error),
      () => console.log('Get all Cycles complete'));
  }


  showDialogToAdd() {
    this.newCycle = true;
    this.cycle = new Cycle();
    this.displayDialog = true;
  }

  save() {
    try {
      this.error = '';
      if(this.cycle.id == null){
        this.cycle.publier = true;
      }
      console.log(this.cycle);
      this.cycleService.save(this.cycle)
        .subscribe(result => {
          if (result.id > 0) {
            this.cycle = result;
            this.putInTable();
          }
          else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
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
      this.cycleService.delete(this.cycle)
        .subscribe(result => {
          if (result) {
            this.removeFromTable();
          }
          else {
            this.error = Constants.deleteFailed;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  confirmpopop() {
    this.messageService.add({severity:'info', summary:'supprimé', detail:'élément supprimé avec succès'});
}

confirmDelete() {
  this.confirmationService.confirm({
    message: 'Êtes-vous sûr de vouloir supprimer cet enregistrement ?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.delete();
    },
    reject: () => {
      
    }
  });
}
  putInTable() {
    if (this.newCycle)
      this.cycles.push(this.cycle);
    else
      this.cycles[this.findSelectedIndex()] = this.cycle;
    var onTheFly: Cycle[] = [];
    onTheFly.push(...this.cycles);
    this.cycles = onTheFly;
    this.resetData();
  }

  removeFromTable() {
    this.cycles.splice(this.findSelectedIndex(), 1);
    this.cycles.splice(this.findSelectedIndex(), 1);
    var onTheFly: Cycle[] = [];
    onTheFly.push(...this.cycles);
    this.cycles = onTheFly;
    this.resetData();
  }

  resetData() {
    this.cycle = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newCycle = false;
    this.cycle = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: Cycle): Cycle {
    let aCycle = new Cycle();
    for (let prop in e) {
      aCycle[prop] = e[prop];
    }
    return aCycle;
  }

  findSelectedIndex(): number {
    return this.cycles.indexOf(this.selectedCycle);
  }


}
