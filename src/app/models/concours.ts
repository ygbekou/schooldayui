import { SchoolYear } from "./schoolYear";

export class Concours {

  id: number;
  intitule: string;
  montant: number;
  schoolYear: SchoolYear;

  constructor() {
    this.intitule="";
    this.montant = 5000.0;
    this.schoolYear = new SchoolYear();
  }
}
