import { Reference } from './reference';

export class Parameter {
  id:               number;
  name:             string;
  displayName:      string;
  dataType:         string;
  inputType:        string; 
  parameterSql:     string;
  parameterValues:  string;
  size:             string;
  maxLength:        string;
  value:            string;
  dateValue:        Date;
  values:           Reference[];
}