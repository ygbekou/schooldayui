import { Attendance } from "./attendance";

export class AttendanceDetails{
   id:        number;
   teacherId: number;
   studentId: number;
   timePeriodeId: number;
   classId: number;
   courseId: number;
   estPresent: number;
   attendance: Attendance = new Attendance();
   lastName: string;
   firstName: string;
   sex: string;
   sclass: string;
   isPresent: boolean;
   stContact: string;
   parContact: string;
   userId: number;
   fatherId: number;
   motherId: number;
   attendanceId: number;
   descHour : string ;
   cycleId : number;
   tutorId : number;
   status : number;

  
}