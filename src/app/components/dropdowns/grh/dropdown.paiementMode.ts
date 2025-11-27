import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from '../dropdown.util';
import { PaiementModeService } from '../../../services/grh/paiementMode.service';
import { PaiementMode } from 'app/models/grh/paiementMode';

@Injectable()
export class PaiementModeDropdown {

  filteredPaiementModes: PaiementMode[];
  paiementModes: PaiementMode[] = [];

  constructor(
    private paiementModeService: PaiementModeService) {
    this.getAllPaiementModes();
  }

  filter(event) {
    this.filteredPaiementModes = this.find(event);
  }

  handleDropdownClick(event) {
    console.info(this.paiementModes);
    setTimeout(() => {
      this.filteredPaiementModes = this.paiementModes;
    }, 10)
  }

  public find(event) {
      let query = event.query;
      let filteredPModes = [];
      for(let i = 0; i < this.paiementModes.length; i++) {
          let pMode = this.paiementModes[i];
          if(pMode.wording.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredPModes.push(pMode);
          }
      }

    return filteredPModes;
  }

  private getAllPaiementModes(): void {
    this.paiementModeService.getAll()
      .subscribe((data: PaiementMode[]) => {
      this.paiementModes = data;
      },
        error => console.log(error),
        () => console.log('Get All PaiementModes Complete'));
  }

}
