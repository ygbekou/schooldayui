import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { TeamMember } from '../models/teamMember';
import { Department } from '../models/department';
import { BaseService } from '../services/base.service';
import { TeacherService } from '../services/teacher.service';


@Component({
  moduleId: 'module.id',
  selector: 'app-team',
  templateUrl: '../pages/team.html'
})

export class Team implements OnInit {

  members: TeamMember[] = [];
  departments: Department[] = [];
  firstDept: Department = new Department();
  currTab = 1;
  first = true;
  configs: Map<string, string> = new Map<string, string>();
  constructor(private teacherService: TeacherService, 
    private baseService: BaseService,
    private changeDetectorRef: ChangeDetectorRef) { 
  }

 
  ngOnInit() {
    this.currTab = 1;
    this.first = true;
    this.baseService.getActiveDepartments()
      .subscribe((data: Department[]) => {
        this.departments = data;
        this.firstDept = this.departments[0];
        console.log(this.departments);
        console.log(this.firstDept);
        this.departments = this.departments.slice(1, this.departments.length);
        this.getMembers(this.currTab);
        this.changeDetectorRef.detectChanges();
      },
        error => console.log(error),
        () => console.log('Get   departments complete'));
    this.changeDetectorRef.detectChanges();
  }

  public getTeachers(): void {
    this.members = [];
    this.changeDetectorRef.detectChanges();
    this.teacherService.getTeamMembers()
      .subscribe((data: TeamMember[]) => this.members = data,
        error => console.log(error),
        () => console.log('Get team members complete'));
  }

  public getMembers(dept: number): void {
    if (this.first || this.currTab !== dept) {
      this.members = [];
      this.changeDetectorRef.detectChanges();
      this.first = false;
      this.currTab = dept;
      this.teacherService.getDeptMembers(dept)
        .subscribe((data: TeamMember[]) => {
          this.members = data;
          console.log(this.members);
        },
          error => console.log(error),
          () => console.log('Get team members complete'));
    }
  }
}
