import { College } from '../models/college';
export class Cycle {
  id: number;
  code: string;
  name: string; 
  ordreAffichageMenuSiteWeb: number;
  colleges:College[];
  creditsPerSemester: number;
  cycleType : number;
  publier : boolean;
}