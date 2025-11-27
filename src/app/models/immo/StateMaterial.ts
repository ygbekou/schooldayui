import { MaterialAcquired } from "./MaterialAcquired";
import { State } from "./State";

export class StateMaterial {
    id: number;
    description: string;
    isActif: boolean;
    startDate: Date;
    endDate: Date;
    state: State;
    materialAcquired: MaterialAcquired;
}