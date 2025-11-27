import { Injectable } from '@angular/core';
 
@Injectable()
export class DropdownUtil {
    
    
  static filter(event, entities) {
      let query = event.query; 
      let filteredEntities = [];
      for(let i = 0; i < entities.length; i++) {
          let entity = entities[i];
          if(entity.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredEntities.push(entity);
          }
      }
    
    return filteredEntities;
  }
  
  static filterLastFirstName(event, entities) {
      let query = event.query; 
      let filteredEntities = [];
      for(let i = 0; i < entities.length; i++) {
          let entity = entities[i];
          let name = entity.lastName + ' ' + entity.firstName;
          if(name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredEntities.push(entity);
          }
      }
    
    return filteredEntities;
  }
  
  static handleDropdownClick(entities) {
      let filteredEntities = [];
      setTimeout(() => {
          filteredEntities = entities;
      }, 100)
    
    return filteredEntities;
  }
  
    
}