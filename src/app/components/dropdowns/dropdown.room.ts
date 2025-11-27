import { Room } from '../../models/room';
import { Building } from '../../models/building';
import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
 
@Injectable()
export class RoomDropdown {
  room = new Room();
  filteredRooms : Room[];
  rooms : Room[] = []; 
  
  constructor(
    private baseService: BaseService) {
    this.getAllRooms();
  }
  
  filter(event) {
    this.filteredRooms = DropdownUtil.filter(event, this.rooms);
  }
  
  handleDropdownClick(building: Building) {
   // this.filteredRooms = [];
    setTimeout(() => {
      if (building.id === undefined) {
        console.log('No building id')
      } else {
        this.getAllRoomsByBuilding(building.id);
      }
    }, 10)
  }
  
  private getAllRooms(): void {
    this.baseService.getAllRooms()
      .subscribe((data: Room[]) => this.rooms = data,
      error => console.log(error),
      () => console.log('Get All Rooms Complete'));
  }
  
  private getAllRoomsByBuilding(buildingId: number): void {
    this.baseService.getBuildingRooms(buildingId)
      .subscribe((data: Room[]) => this.filteredRooms = data,
      error => console.log(error),
      () => console.log('Get Building Rooms Complete'));
  }
  
}