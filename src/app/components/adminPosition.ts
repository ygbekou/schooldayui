import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Position } from '../models/position';
import { PositionService } from '../services/position.service';
import { Constants } from '../app.constants';
import { DataTableModule, DialogModule } from 'primeng/primeng';
import { User } from '../models/User'; 
import { Cookie } from 'ng2-cookies/ng2-cookies'; 
@Component({
  selector: 'app-admin-position',
  templateUrl: '../pages/adminPosition.html',
  providers: []
})
export class AdminPosition implements OnInit, OnDestroy {

  public positions: Position[];
  public error: String = '';
  public selectedPosition: Position;
  displayDialog: boolean;
  position: Position = new Position();
  newPosition: boolean;
  cols: any[];
  
  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;  
  SAVE_LABEL: string = Constants.SAVE_LABEL;  
  ADD_LABEL: string = Constants.ADD_LABEL;  
  
  constructor
    (
    private positionService: PositionService,
    private changeDetectorRef: ChangeDetectorRef
    ) {

  }

  ngOnDestroy() {
    this.positions = null;
    this.error = null;
    this.selectedPosition = null;
    this.position = null;
    this.cols = null;
  }
  ngOnInit() {
    this.cols = [
      { field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true' },
      { field: 'rank', header: Constants.CLASSEMENT, sortable: 'true', filter: 'true' }
    ];
  }

  public getAll(): void {
    this.positions = [];
    this.positionService.getAll()
      .subscribe((data: Position[]) => this.positions = data,
      error => console.log(error),
      () => console.log('Get all Positions complete'));
  }


  showDialogToAdd() {
    this.newPosition = true;
    this.position = new Position();
    this.displayDialog = true;
  }

  save() {
    try {
      this.error = '';
      this.positionService.save(this.position)
        .subscribe(result => {
          if (result.id > 0) {
            this.position = result;
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
      this.positionService.delete(this.position)
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
    if (this.newPosition)
      this.positions.push(this.position);
    else
      this.positions[this.findSelectedIndex()] = this.position;

    var onTheFly : Position [] = [];
    onTheFly.push(...this.positions);
    this.positions = onTheFly;
    
    this.resetData();
  }

  removeFromTable() {
    this.positions.splice(this.findSelectedIndex(), 1);
     var onTheFly : Position [] = [];
    onTheFly.push(...this.positions);
    this.positions = onTheFly;
    this.resetData();
  }

  resetData() {
    this.position = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newPosition = false;
    this.position = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: Position): Position {
    let aPosition = new Position();
    for (let prop in e) {
      aPosition[prop] = e[prop];
    }
    return aPosition;
  }

  findSelectedIndex(): number {
    return this.positions.indexOf(this.selectedPosition);
  }


}
