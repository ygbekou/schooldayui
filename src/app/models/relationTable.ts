import { LookUpTable } from './lookUpTable';

export class RelationTable {
  id: Number;
  parent: LookUpTable;
  childs: LookUpTable[];
}