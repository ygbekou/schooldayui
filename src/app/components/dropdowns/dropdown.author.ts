
import { Author } from '../../models/author';
import { BaseService } from '../../services';
import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
 
@Injectable()
export class AuthorDropdown {
  
  filteredAuthors : Author[];
  authors : Author[] = []; 
  
  constructor(
    private baseService: BaseService) {
    this.getAllAuthors();
  }
  
  filter(event) {
    this.filteredAuthors = DropdownUtil.filter(event, this.authors);
  }
  
  handleDropdownClick(event) {
    //this.filteredAuthors = [];
    setTimeout(() => {
      this.filteredAuthors = this.authors;
    }, 10)
  }
  
  private getAllAuthors(): void {
    this.baseService.getAllAuthors()
      .subscribe(
        (data: Author[]) => this.authors = data,
      error => console.log(error),
      () => console.log('Get All Authors Complete'));
  }
  
}