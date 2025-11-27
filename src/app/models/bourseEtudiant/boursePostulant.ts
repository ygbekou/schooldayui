import { College } from "../college";
import { Cycle } from "../cycle";
import { SchoolYear } from "../schoolYear";
import { Bourse } from "./bourse";
import { Etat } from "./etat";
import { Postulant } from "./postulant";

export class BoursePostulant {
    financementActuelDeSesEtudes: string;
    raisonChoixDomaineEtude: string;
    poursuiteEtudeApresObtentionDiplome: boolean;
    raisonNonPoursuiteEtudesApresObtentionDiplome: string;
    datePremiereInscriptionProgrammeUniversitaire: Date;
    dejaBeneficiaireAutreBourseIPNET: boolean;
    dateSoumissionDemandeBourse: Date;
    postulant: Postulant;
    bourse: Bourse;
    etat: Etat;
    schoolYear: SchoolYear;
    cycle: Cycle;
    college: College;
}