import { Injectable, OnInit } from '@angular/core';
import { PersonType } from 'app/models/grh/PersonType';
import { LookUpTableService } from 'app/services/lookUpTable.service';
import { LookUpTable } from 'app/models/lookUpTable';

@Injectable()
export class PersonTypeDropdown {

  filteredPersonTypes: PersonType[];
  personTypes: PersonType[] = [];
  public lookUpTables: LookUpTable[] = [];
  constructor(
    private lookUpTableService: LookUpTableService) {
    this.getAllPersonTypes();
  }

  filter(event) {
    this.filteredPersonTypes = this.find(event);
  }

  handleDropdownClick(event) {
    console.info(this.personTypes);
    setTimeout(() => {
      this.filteredPersonTypes = this.personTypes;
    }, 10)
  }

  public find(event) {
      let query = event.query;
      let filteredPTypes = [];
      for(let i = 0; i < this.personTypes.length; i++) {
          let cType = this.personTypes[i];
          if(cType.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filteredPTypes.push(cType);
          }
      }

    return filteredPTypes;
  }

  private getAllPersonTypes(): void {
    this.lookUpTableService.getAll("PERSON_TYPE")
      .subscribe((data: LookUpTable[]) => {
        this.lookUpTables = data;
        for(var i=0;  i < this.lookUpTables.length; i++){
          this.personTypes.push(new PersonType(this.lookUpTables[i].id, this.lookUpTables[i].name, this.lookUpTables[i].double1));
        }
    },
    error => console.log(error),
    () => console.log('Get All PersonTypes Complete'));

  }

}
