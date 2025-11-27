import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { ReportService } from '../../services/report.service';
import { Report } from '../../models/report';
 
@Injectable()
export class ReportDropdown {
  
  filteredReports : Report[];
  reports : Report[] = []; 
  
  constructor(
    private reportService: ReportService) {
    this.getAllReports();
  }
  
  filter(event) {
    this.filteredReports = DropdownUtil.filter(event, this.reports);
  }
  
  handleDropdownClick(event) {
    //this.filteredReports = [];
    setTimeout(() => {
      this.filteredReports = this.reports;
    }, 10)
  }
  
  private getAllReports(): void {
    this.reportService.getActiveReports()
      .subscribe((data: Report[]) => this.reports = data,
      error => console.log(error),
      () => console.log('Get All Reports Complete'));
  }
  
}