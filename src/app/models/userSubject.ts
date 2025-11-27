import {User} from "./User";
import {Subject} from "./subject";
import {InformationChannel} from "./informationChannel";

export class UserSubject {
    id: number;
    user: User;
    subject: Subject;
    informationChannel: InformationChannel;
    visitDate: Date;
}