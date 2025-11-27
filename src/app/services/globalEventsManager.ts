import { EventEmitter, Injectable} 	from "@angular/core";
import { User } 					from '../models/User';

@Injectable()

export class GlobalEventsManager {
    public showNavBar: EventEmitter<User> = new EventEmitter<User>();


    constructor() {

    }
}