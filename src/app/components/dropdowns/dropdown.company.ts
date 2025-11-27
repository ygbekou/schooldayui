import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
import { Company } from '../../models/company';

@Injectable()
export class CompanyDropdown {

  filteredCompanies: Company[];
  companies: Company[] = [];

  constructor(
    private baseService: BaseService) {
    this.getAllCompanies();
  }

  filter(event) {
    this.filteredCompanies = DropdownUtil.filter(event, this.companies);
    //console.info("Filtered Companies: " + this.filteredCompanies)
  }

  handleDropdownClick(event) {
    // tslint:disable-next-line:no-console
    console.info(this.companies);
    //this.filteredCompanies = [];
    setTimeout(() => {
      this.filteredCompanies = this.companies;
    }, 10)
    // console.info("Filtered Companies: " + this.filteredCompanies)
  }
  public find = (company: string): Company => {
    for (let i: 0; i < this.companies.length; i++) {
      if (this.companies[i].name.toLowerCase() === company.toLowerCase()) {
        return this.companies[i];
      }
    }
    return null;
  }

  private getAllCompanies(): void {
    //console.info(this.companies);
    this.baseService.getAllCompanies()
      .subscribe((data: Company[]) => {
      this.companies = data;
      },
        error => console.log(error),
        () => console.log('Get All Companies Complete'));
  }

}