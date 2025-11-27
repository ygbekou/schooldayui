import { ResultSummaryView } from '../models/resultSummaryView';


export class TermResultView {
  termName:         string;
  yearName:         string;
  className:        string;
  termId:           number;
  nbrOfStudent:     number;
  moyenne:          number;
  minMoyenne:       number;
  maxMoyenne:       number;
  
  resultSummaries:  ResultSummaryView[];
}