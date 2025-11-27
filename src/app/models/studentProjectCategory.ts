import { College } from "./college";
import { StudentProjectCategoryView } from "./studentProjectCategoryView";

export class StudentProjectCategory {
  id: number;
  name: string; 
  description: string;
  categoryOrder: number;

  college : College;

  projets : StudentProjectCategoryView[];
}