import { CourseView } from "./courseView";

export class StudentCourseGlobalResult {
  id: number;
  userId: number;
  studentId:  number;
  matricule:  string;
  lastName:  string;
  firstName:  string;
  nbreCoursNv: number;
  etat:  string;
  status: boolean;
  listCoursNv : CourseView[];

}