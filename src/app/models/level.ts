import { College } from '../models/college';
import { LevelGlobal } from './levelGlobal';
export class Level {
  id: number;
  name: string;
  description: string;
  college: College;
  levelGlobal: LevelGlobal;
  admission: string;
  fees: string;
  duration: number;
  creditUnitPrice: number;
  pic: string;
  openDate: Date;
  status: boolean;
}