import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Constants } from 'app/app.constants';
import { User } from 'app/models/User';
import { Cookie } from 'ng2-cookies';
import { StateService } from 'app/services/immo/state.service';
import { State } from 'app/models/immo/State';

@Component({
  selector: 'app-immo-state',
  templateUrl: '../../pages/immo/immoState.html',
  providers: [StateService,Constants]
})
export class ImmoState implements OnInit {

  public state: State;
  public states: State[];
  public selectedstate: State;
  msg: string;

  public error: String = '';
  displayDialog: boolean;
  newstate: boolean;
  wait: boolean;
  cols: any[];
  public user: User;
  //public subjectDropdown: SubjectDropdown;

  DETAIL: string = Constants.DETAIL;
  LEVELS: string = Constants.LEVELS;
  SUBJECT: string = Constants.SUBJECT;
  NAME: string = Constants.NAME;
  DESCRIPTION: string = Constants.DESCRIPTION;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;

  constructor
    (
    private stateService: StateService,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    //this.subjectDropdown = sbjDropdon;
  }
  ngOnDestroy() {
    this.states = null;
    this.error = null;
    this.selectedstate = null;
    this.state = null;
    this.cols = null;
    this.wait = false;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    this.states = [];
    if (this.user == null) {
      this.user = new User();
    }
    this.cols = [
      { field: 'name', header: 'Libellé', sortable: 'true', filter: 'true', style: { 'width': '30%' }, 'type' : 'Text'  },
      { field: 'description', header: 'Description', sortable: 'false', filter: 'true', style: { 'width': '70%' },type:'Raw' }
    ];

    this.getAll();
  }

  showDialogToAdd() {
    /* if (this.user != null && this.user.role == 10) { */
      this.newstate = true;
    this.state = new State();
      this.displayDialog = true;
    /* } */
  }

  public getAll(): void {
    this.states = [];
    this.stateService.getAll()
      .subscribe((data: State[]) => this.states = data,
        error => console.log(error),
        () => console.log('Get all state complete'));
  }

  save() {
    try {
      this.error = '';
      console.log('state :' + this.state)
      this.wait = true;
      this.stateService.save(this.state)
        .subscribe(result => {
          if (result.id > 0) {
            //this.msg = Constants.saveSuccess;
            this.state = result;
            this.putInTable();
          }
          else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
          this.wait = false;
        })
    }
    catch (e) {
      console.log(e);
    }


  }

  delete() {
    try {
      this.error = '';
      this.stateService.delete(this.state)
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
    if (this.newstate)
      this.states.push(this.state);
    else
      this.states[this.findSelectedIndex()] = this.state;

    var onTheFly: State[] = [];
    onTheFly.push(...this.states);
    this.states = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.states.splice(this.findSelectedIndex(), 1);
    var onTheFly: State[] = [];
    onTheFly.push(...this.states);
    this.states = onTheFly;
    this.resetData();
  }

  resetData() {
    this.state = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newstate = false;
    this.state = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: State): State {
    let astate = new State();
    for (let prop in e) {
      astate[prop] = e[prop];
    }
    return astate;
  }

  findSelectedIndex(): number {
    return this.states.indexOf(this.selectedstate);
  }


}
