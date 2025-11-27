import { BoursePostulant } from "./boursePostulant";
import { Diplome } from "./diplome";
import { Discipline } from "./discipline";
import { Institution } from "./institution";

export class DiplomeObtenuPostulant {
    id: number;
    nomDiplome: string;
    anneeObtention: Date;
    document: string;
    discipline: Discipline;
    institution: Institution;
    diplome: Diplome;
    boursePostulant: BoursePostulant;
}