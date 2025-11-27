import {StudentProject} from "./studentProject";
import {StudentProjectPhase} from "./studentProjectPhase";
import {College} from "./college";
import {Teacher} from "./teacher";
import {StudentProjectPromotion} from "./studentProjectPromotion";

export class StudentProjectCollege {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: boolean;
  studentProject: StudentProject;
  //studentProjectPhase: StudentProjectPhase;
  college: College;
  responsable: Teacher;
  backup1: Teacher;
  backup2: Teacher;
  studentProjectPromotion: StudentProjectPromotion;
}
