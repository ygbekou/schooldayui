import { Cycle } from './../models/cycle';
import { College } from './../models/college';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CollegeService, CycleService } from 'app/services';
@Component({
  moduleId: 'module.id',
  selector: 'app-documentsTelecharge',
  templateUrl:'../pages/documentsTelecharge.html' 
})

export class DocumentsTelecharge {
  public cycles: Cycle[];
  public colleges: College[];
  constructor(
    private router: Router,
    private cycleService: CycleService,
    private collegeService: CollegeService) {

  }

  ngOnInit() {
    this.cycles = [];
    this.cycleService.getAllWithCollge()
      .subscribe((data: Cycle[]) => this.cycles = data,
        error => console.log(error),
        () => console.log('Get all Cycles complete'));
    this.colleges = [];
    this.collegeService.getAllWithLevel()
      .subscribe((data: College[]) => {
        this.colleges = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].collegeType === 1) {
            this.colleges.push(data[i]);
          }
        }
        console.log(this.colleges);
      },
        error => console.log(error),
        () => console.log('Get all Colleges complete'));
  }
}
