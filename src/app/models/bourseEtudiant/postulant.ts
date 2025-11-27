import { User } from "../User";

export class Postulant {
    id: number;
    adresseActuelle: string;
    adressePermanent: string;
    professionPere: string;
    professionMere: string;
    user: User;
}