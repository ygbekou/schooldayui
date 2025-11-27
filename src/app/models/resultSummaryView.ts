import { AverageView } from '../models/averageView';

export class ResultSummaryView {
  id: number;
  schoolYear: string;
  className: string;
  studentFirstName: string;
  studentLastName: string;
  studentMiddleName: string;
  mark: number;
  rankNbr: number;
  gradeName: string;
  decision: string;
  schoolYearId: number;
  summaryId: number;
  studentId: number;
  classId: number;
  term: string;
  averages: AverageView[];
  childSummaries: ResultSummaryView[];
}