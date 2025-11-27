import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Cico } from '../models/cico';
import { User } from '../models/User';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CicoService } from 'app/services/cico.service';

@Component({
  selector: 'app-admin-presence',
  templateUrl: '../pages/adminPresence.html'
})
export class AdminPresence implements OnInit {

  public cicos: Cico[] = [];
  public error: String = '';
  public selectedCico: Cico = new Cico();
  displayDialog: boolean;
  cico: Cico = new Cico();
  newCico: boolean;
  cols: any[];
  @Input() user: User;
  currentUser: User = JSON.parse(atob(Cookie.get('user')));
  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  message : string;

  constructor
    (
      private cicoService: CicoService,
      private changeDetectorRef: ChangeDetectorRef
    ) {
  }

  getAll() {
    this.getUserCico(this.user);
  }
  ngOnInit() {
    if (this.user.role === 7) {
      this.cols = [
        { field: 'name', header: Constants.NAME, sortable: 'true' },
        { field: 'reason', header: Constants.RAISON, sortable: 'true' },
        { field: 'visitee', header: Constants.VISITEE, sortable: 'true' },
        { field: 'ci', header: Constants.ARRIVAL, type: 'Date', sortable: 'true' },
        { field: 'co', header: Constants.DEPARTURE, type: 'Date', sortable: 'true' },
        { field: 'time', header: Constants.DUREE, sortable: 'true' }
      ];
    } else {
      this.cols = [
        { field: 'ci', header: Constants.ARRIVAL, type: 'Date', sortable: 'true' },
        { field: 'co', header: Constants.DEPARTURE, type: 'Date', sortable: 'true' },
        { field: 'time', header: Constants.DUREE, sortable: 'true' }
      ];
    }
  }

  public getUserCico(user: User) {
    if (this.user.role === 7) {
      this.cols = [
        { field: 'name', header: Constants.NAME, sortable: 'true' },
        { field: 'reason', header: Constants.RAISON, sortable: 'true' },
        { field: 'visitee', header: Constants.VISITEE, sortable: 'true' },
        { field: 'ci', header: Constants.ARRIVAL, type: 'Date', sortable: 'true' },
        { field: 'co', header: Constants.DEPARTURE, type: 'Date', sortable: 'true' },
        { field: 'time', header: Constants.DUREE, sortable: 'true' }
      ];
    } else {
      this.cols = [
        { field: 'ci', header: Constants.ARRIVAL, type: 'Date', sortable: 'true' },
        { field: 'co', header: Constants.DEPARTURE, type: 'Date', sortable: 'true' },
        { field: 'time', header: Constants.DUREE, sortable: 'true' }
      ];
    }
    this.cicos = [];
    this.cicoService.getUserCicos(user)
      .subscribe((data: Cico[]) => {
        this.cicos = data;
      },
        error => console.log(error),
        () => console.log('Get all CICO complete'));
  }


  showDialogToAdd() {

  }

  save() {
    try {
      this.error = '';
      this.cico.modifiedBy = this.currentUser.id;
      this.cicoService.save(this.cico)
        .subscribe(result => {
          if (result.id > 0) {
           // this.cico = result;
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
      this.cicoService.delete(this.cico)
        .subscribe(result => {
          // console.log(result,"------");
          this.message = result;
         
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  putInTable() {
    if (this.newCico) {
      this.cicos.push(this.cico);
    }
    else {
      this.cicos[this.findSelectedIndex()] = this.cico;
    }

    const onTheFly: Cico[] = [];
    onTheFly.push(...this.cicos);
    this.cicos = onTheFly;

    this.resetData();
  }


  removeFromTable() {
    this.cicos.splice(this.findSelectedIndex(), 1);
    const onTheFly: Cico[] = [];
    onTheFly.push(...this.cicos);
    this.cicos = onTheFly;
    this.resetData();
  }

  resetData() {
    this.cico = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newCico = false;
    this.message = "";
    this.cico = this.clone(evt.data);
    this.cicoService.getById(this.cico.id)
      .subscribe((data: Cico) => {
        this.cico = data
        if (this.cico && this.cico !== undefined && this.cico.ci !== null) {
          this.cico.ci = new Date(this.cico.ci);
        }
        if (this.cico && this.cico !== undefined && this.cico.co !== null) {
          this.cico.co = new Date(this.cico.co);
        }
      },
        error => console.log(error),
        () => console.log('Get cico complete'));
    if (this.currentUser.role === 1 || this.currentUser.role === 5) {
      this.displayDialog = true;
    }
  }

  clone(e: Cico): Cico {
    const acico = new Cico();
    // tslint:disable-next-line: forin
    for (const prop in e) {
      acico[prop] = e[prop];
    }
    return acico;
  }

  findSelectedIndex(): number {
    return this.cicos.indexOf(this.selectedCico);
  }
}
