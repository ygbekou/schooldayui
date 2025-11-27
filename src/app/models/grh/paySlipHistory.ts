import { Periode } from './periode';
import { PaiementMode } from './paiementMode';

export class PaySlipHistory {
  id: number;
  payDate: Date;
  paiementMode: PaiementMode;
  periode: Periode;
  status: number;
}
