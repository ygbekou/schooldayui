import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Constants } from 'app/app.constants';
import { User } from 'app/models/User';
import { Cookie } from 'ng2-cookies';
import { AssignmentService } from 'app/services/immo/assignment.service';
import { Assignment } from 'app/models/immo/Assignment';
import { MaterialAcquiredDropdown } from '../dropdowns/immo/dropdown.material-acquired';
import { PlaceDropdown } from '../dropdowns/immo/dropdown.place';
import { EmployeeDropdown } from '../dropdowns/grh/dropdown.employee';
import { MaterialAcquired } from 'app/models/immo/MaterialAcquired';

@Component({
  selector: 'app-immo-assignment',
  templateUrl: '../../pages/immo/immoAssignment.html',
  providers: [AssignmentService,Constants]
})
export class ImmoAssignment implements OnInit, OnDestroy {

  public assignment: Assignment;
  public assignments: Assignment[];
  public selectedAssignment: Assignment;

  public error: String = '';
  displayDialog: boolean;
  newAssignment: boolean;
  wait: boolean;
  cols: any[];
  public user: User;

  public placeDropdown: PlaceDropdown;
  public materialAcquiredDropdown: MaterialAcquiredDropdown;
  public employeeDropdown: EmployeeDropdown;

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
    private assignmentService: AssignmentService,
    private changeDetectorRef: ChangeDetectorRef,
    private placeDropdown1: PlaceDropdown,
    private materialAcquiredDropdown1: MaterialAcquiredDropdown,
    private employeeDropdown1: EmployeeDropdown,
   
    ) {
     this.placeDropdown = placeDropdown1;
    this.materialAcquiredDropdown = materialAcquiredDropdown1;
    this.employeeDropdown = employeeDropdown1;
  }
  ngOnDestroy() {
    this.assignments = null;
    this.error = null;
    this.selectedAssignment = null;
    this.assignment = null;
    this.cols = null;
    this.wait = false;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    this.assignments = [];
    if (this.user == null) {
      this.user = new User();
    }
    this.cols = [
      { field: 'materialAcquired.identificationCode', header: 'Code Identification', sortable: 'false', filter: 'true', style: { 'width': '25%' } },
      { field: 'materialAcquired.materialsAcquired.material.name', header: 'Matériel', sortable: 'false', filter: 'true', style: { 'width': '22%' } },
      { field: 'place.name', header: 'Lieu', sortable: 'false', filter: 'true', style: { 'width': '20%' } },
      { field: 'employee.name', header: 'Detenteur', sortable: 'false', filter: 'true', style: { 'width': '26%' } },
      { field: 'assignmentDate', header: 'Date Affect.', sortable: 'false', filter: 'true', style: { 'width': '7%' },type:'Date' },
      ];
  }

  showDialogToAdd() {
    /* if (this.user != null && this.user.role == 10) { */
      this.newAssignment = true;
      this.assignment = new Assignment();
      this.displayDialog = true;
    /* } */
  }

  public getAll(): void {
    this.assignments = [];
    this.assignmentService.getAll()
      .subscribe((data: Assignment[]) => this.assignments = data,
        error => console.log(error),
        () => console.log('Get all Assignment complete'));
  }

  public getAllByiSUnassign(isUnassign: boolean): void {
    this.assignments = [];
    this.assignmentService.getAllByiSUnassign(isUnassign)
      .subscribe((data: Assignment[]) => this.assignments = data,
        error => console.log(error),
        () => console.log('Get all getAllByiSUnassign complete'));
  }

  save() {
      
      if (this.assignment.assignmentDate == null) {
        this.error = "Précisez la date d'affectation";
      }else{
        if (this.assignment.unassignmentDate != null) {
          this.assignment.isUnassign = true;
        }else{
          this.assignment.isUnassign = false;
        }
        try {
            this.error = '';
            this.wait = true;
            this.assignmentService.save(this.assignment)
              .subscribe(result => {
                console.log(result);
                if(result.id === undefined){
                  this.error = result;
                  this.displayDialog = true;
                }else{
                  if (result.id > 0) {
                    this.assignment = result;
                    this.putInTable();
                  }
                  else {
                    this.error = Constants.saveFailed;
                    this.displayDialog = true;
                  }
                }
                
              })
          }
          catch (e) {
            alert(e);
            console.log(e);
          }
          this.wait = false;
      
      }

   

  }

  delete() {
    try {
      this.error = '';
      this.assignmentService.delete(this.assignment)
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
    if (this.newAssignment)
      this.assignments.push(this.assignment);
    else
      this.assignments[this.findSelectedIndex()] = this.assignment;

    var onTheFly: Assignment[] = [];
    onTheFly.push(...this.assignments);
    this.assignments = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.assignments.splice(this.findSelectedIndex(), 1);
    var onTheFly: Assignment[] = [];
    onTheFly.push(...this.assignments);
    this.assignments = onTheFly;
    this.resetData();
  }

  resetData() {
    this.assignment = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newAssignment = false;
    this.assignment = this.clone(evt.data);
    this.displayDialog = true;

    if (this.assignment.unassignmentDate != null) {
        this.assignment.unassignmentDate = new Date(this.assignment.unassignmentDate);
      }
      if (this.assignment.assignmentDate != null) {
        this.assignment.assignmentDate = new Date(this.assignment.assignmentDate);
      }

  }

  clone(e: Assignment): Assignment {
    let areception = new Assignment();
    for (let prop in e) {
      areception[prop] = e[prop];
    }
    return areception;
  }

  findSelectedIndex(): number {
    return this.assignments.indexOf(this.selectedAssignment);
  }


   myCustomDisplay(item : MaterialAcquired): string {
    return `${item.materialsAcquired.material.name} - ${item.identificationCode}`;
    }

}
