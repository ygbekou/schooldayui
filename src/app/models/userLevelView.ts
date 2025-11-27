
import {Fee} from "./fee";
import {Subject} from "./subject";
import { InformationChannel } from "./informationChannel";

export class UserLevelView {

  id: number;
	levelId: number;
	userId: number;
	onlineregistrationId: number;
	informationChannelId: number;
	levelName: string;
	informationChannel: string;
	visitDate: Date;
}