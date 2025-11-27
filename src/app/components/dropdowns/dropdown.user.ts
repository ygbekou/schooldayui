import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../models/teacher';
import { User } from 'app/models/User';
import { UserService } from 'app/services';
 
@Injectable()
export class UserDropdown {
  
  filteredUsers: User[];
  users: User[] = []; 
  
  constructor(
    private userService: UserService) {
    this.getAllUsers();
  }
  
  filter(event) {
    this.filteredUsers = DropdownUtil.filterLastFirstName(event, this.users);
  }
  
  handleDropdownClick(event) {
    //this.filteredTeachers = [];
    //console.info(this.teachers);
    setTimeout(() => {
      this.filteredUsers = this.users;
    }, 10)
  }
  
  private getAllUsers(): void {
    this.userService.getAll()
      .subscribe((data: User[]) => this.users = data,
      error => console.log(error),
      () => console.log('Get All Teachers Complete'));
  }
  
}