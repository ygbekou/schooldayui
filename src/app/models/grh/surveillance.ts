import { Evaluation } from "./evaluation";
import { User } from "../User";

export class Surveillance {
    id: number;
    totalHours: number;
    evaluation: Evaluation;
    user: User;
    status: number;
}