import { Level } from '../models/level';
import { Cycle } from '../models/cycle';
import { StudentProjectCategoryView } from './studentProjectCategoryView';
import { StudentProjectCategory } from './studentProjectCategory';
export class College {
  id: number;
  name: string;
  nameShort: string;
  description: string;
  admission: string;
  fees:string;
  duration:number;
  pic:string;
  openDate:Date;
  credit:number;
  levels:Level[];  
  cycle:Cycle;
  collegeType:number;
  status: boolean;
  ordreAffichageMenuSiteWeb: number;

  duree: string;
  nextSchoolyear: string;
  session: string;
  officialName: string;
  ciblePublic: string;
  prix: string;
  isMeta: boolean;
  tarifmeta: string;
  tarifElearning: string;

  ordreAffichageProjetsEtudiant: number;
  projets : StudentProjectCategoryView[];
  themes : StudentProjectCategory []

}