import { College } from './college';
import { RegistrationRequest } from './registrationRequest';
import { User } from "./User";

export class UserRegistrationRequest {
    id: number;
    user: User;
    registrationRequest: RegistrationRequest;
    college : College;
    etat : number = 1;
    montant : number ;
   
}