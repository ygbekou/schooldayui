import { Employee } from "../grh/employee";
import { MaterialAcquired } from "./MaterialAcquired";
import { Place } from "./Place";

export class Assignment {
    id: number;
    assignmentDate: Date;
    isUnassign: boolean;
    unassignmentDate: Date;
    reason: string;
    materialAcquired: MaterialAcquired;
    employee: Employee;
    place: Place;
}