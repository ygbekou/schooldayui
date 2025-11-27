import { CourseView } from "./courseView";
import { Student } from "./student";

export class CourseClassStudentView {
    student: Student;
    coursesView: CourseView[];
    numberCoursesClass: number;
    numberCoursesAffected: number;
    numberCoursesNotAffected: number;
    error: string;
}