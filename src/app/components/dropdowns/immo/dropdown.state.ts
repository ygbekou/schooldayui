import { Injectable, OnInit } from '@angular/core';
import { State } from 'app/models/immo/State';
import { StateService } from 'app/services/immo/state.service';

@Injectable()
export class StateDropdown {

  filteredStates: State[];
  States: State[] = [];

  constructor(
    private locationService: StateService) {
    this.getAll();
  }

  filter(event) {
    this.filteredStates = this.find(event);
  }

  handleDropdownClick(event) {
    this.getAll();
    setTimeout(() => {
      this.filteredStates = this.States;
    }, 3)
  }

  public find(event) {
      let query = event.query;
      let filteredA = [];
      for(let i = 0; i < this.States.length; i++) {
          let a = this.States[i];
        if (a.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredA.push(a);
          }
      }

    return filteredA;
  }

  public getAll(): void {
    this.locationService.getAll()
      .subscribe((data: State[]) => {
      this.States = data;
      },
        error => console.log(error),
        () => console.log('Get All State Complete'));
  }

}
