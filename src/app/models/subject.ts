import { Prerequisit } from './prerequisit';

export class Subject {
  id: number;
  name: string;
  exam: string;
  credit: number;
  creditUnitPrice: number;
  pic: string;
  duration: number;
  code: string;
  objectif: string;
  description: string;
  prerequisits:  Prerequisit[];
  cost: number;
  costEnt: number;
}