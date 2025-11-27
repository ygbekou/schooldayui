import {StudentProjectTopicPhase} from "./studentProjectTopicPhase";
import {StudentProjectPhase} from "./studentProjectPhase";

export class StudentProjectPhaseView {
  id: number;
  name: string; 
  description: string;
  percentage: number;
  ordreExecution: number;
  studentProjectPhaseId: number;
  studentProjectId: number;
  studentProjectTopicPhaseId: number;
    studentProjectCollegeId: number;
    studentProjectCollegePhaseId: number;
    studentProjectCollegePhaseStatus: number;
}