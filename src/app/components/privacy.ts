import { GlobalEventsManager } from './../services/globalEventsManager';
import { BaseService } from './../services/base.service';
import { CollegeService } from './../services/college.service';
import { CycleService } from './../services/cycle.service';
import { Router } from '@angular/router';
import { College } from './../models/college';
import { Cycle } from './../models/cycle';
import { Component } from '@angular/core';
@Component({
  moduleId: 'module.id',
  selector: 'app-privacy',
  templateUrl:'../pages/privacy.html'
})

export class Privacy {
  public cycles: Cycle[];
  public colleges: College[];

  constructor(
    private router: Router,
    private cycleService: CycleService,
    private collegeService: CollegeService,
    private baseService: BaseService,
    private globalEventsManager: GlobalEventsManager) {

  }

  ngOnInit(){
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
