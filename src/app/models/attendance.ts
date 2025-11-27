export class Attendance{
   id:        number;
   courseId: number;
   teacherId: number;
   beginHour: number;
   beginMinute: number;
   endHour: number;
   endMinute: number;
   subjectName: string;
   subjectCode:  string;
   weekDayName:       string;
   description: string;
   descBeginHour: string;
   descEndHour: string;
   lastName: string;
   firstName: string;
   createDate: Date;
   descCreateDate: string;
   attendanceDone: number;
}