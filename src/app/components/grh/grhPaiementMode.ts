import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PaiementMode } from '../../models/grh/paiementMode';
import { User } from '../../models/User';
import { PaiementModeService } from '../../services/grh/paiementMode.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-paiement-mode',
  templateUrl: '../../pages/grh/grhPaiementMode.html',
  providers: [PaiementModeService, Constants]
})

export class GrhPaiementMode implements OnInit, OnDestroy {

  public paiementMode: PaiementMode;
  public paiementModes: PaiementMode[];
  public selectedPaiementMode: PaiementMode;

  public error: String = '';
  displayDialog: boolean;
  newPaiementMode: boolean;
  cols: any[];
  public user: User;

  DETAIL: string = Constants.DETAIL;
  LEVELS:  string = Constants.LEVELS;
  SUBJECT:  string = Constants.SUBJECT;
  NAME:  string = Constants.NAME;
  DESCRIPTION:  string = Constants.DESCRIPTION;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;

  constructor
    (
    private paiementModeService: PaiementModeService,
    private changeDetectorRef: ChangeDetectorRef
    ) {

  }
  ngOnDestroy() {
    this.paiementModes = null;
    this.error = null;
    this.selectedPaiementMode = null;
    this.paiementMode = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }
      this.cols = [
        { field: 'key', header: 'Code', sortable: 'true', filter: 'true', style:  {'width':'30%'}  },
        { field: 'wording', header: 'Libellé', sortable: 'false', filter: 'true',  style:  {'width':'40%'}  }
      ];
  }

  showDialogToAdd() {
    if (this.user != null && this.user.role == 10) {
      this.newPaiementMode = true;
      this.paiementMode = new PaiementMode();
      this.displayDialog = true;
    }
  }

  public getAll(): void {
    this.paiementModes = [];
    this.paiementModeService.getAll()
      .subscribe((data: PaiementMode[]) => this.paiementModes = data,
      error => console.log(error),
      () => console.log('Get all PaiementModes complete'));
  }

  save() {
    try {
      this.error = '';
      this.paiementModeService.save(this.paiementMode)
        .subscribe(result => {
          if (result.id > 0) {
            this.paiementMode = result;
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
      this.paiementModeService.delete(this.paiementMode)
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

  putInTable() {
    if (this.newPaiementMode)
      this.paiementModes.push(this.paiementMode);
    else
      this.paiementModes[this.findSelectedIndex()] = this.paiementMode;

    var onTheFly: PaiementMode[] = [];
    onTheFly.push(...this.paiementModes);
    this.paiementModes = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.paiementModes.splice(this.findSelectedIndex(), 1);
    var onTheFly: PaiementMode[] = [];
    onTheFly.push(...this.paiementModes);
    this.paiementModes = onTheFly;
    this.resetData();
  }

  resetData() {
    this.paiementMode = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newPaiementMode = false;
    this.paiementMode = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: PaiementMode): PaiementMode {
    let aPaiementMode = new PaiementMode();
    for (let prop in e) {
      aPaiementMode[prop] = e[prop];
    }
    return aPaiementMode;
  }

  findSelectedIndex(): number {
    return this.paiementModes.indexOf(this.selectedPaiementMode);
  }

}
