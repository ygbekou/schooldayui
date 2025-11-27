import { College } from './college';
import { Concours } from './concours';
import { User } from "./User";

export class UserConcours {
    id: number;
    user: User;
    concours: Concours;
    college : College;
    etat : number = 1;
   
}