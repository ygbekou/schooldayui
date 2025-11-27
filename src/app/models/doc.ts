import {DocumentType} from './documentType';
import {User} from './User';
export class Doc {
  id: number;
  parentId: number;
  fileName: string;
  documentType: DocumentType;
  user: User;
}