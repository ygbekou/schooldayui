import { TermGroup } from './termGroup';
import { SemestreGroup } from './semestreGroup';

export class Term {
  id: number;
  name: string;
  showFinalRank: boolean;
  code: string;
  description: string;
  termGroup: TermGroup;
  semestreGroup: SemestreGroup;
}
