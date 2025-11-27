import { BoursePostulant } from "./boursePostulant";
import { Diplome } from "./diplome";

export class FuturDiplomeApresProgramme {
    id: number;
    nomDiplome: string;
    diplome: Diplome;
    boursePostulant: BoursePostulant;
}