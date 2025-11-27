import { College }        from '../models/college';
import { DocumentType }   from '../models/documentType';

export class CollegeDocument {
  id:               number;
  college:          College;  
  documentType:     DocumentType;
}