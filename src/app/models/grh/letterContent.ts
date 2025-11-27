import { LetterNumeroRef } from "./letterNumeroRef";
import { LetterObject } from "./letterObject";
import { SocietyBank } from "./societyBank";
import { Civility } from "./civility";
import { AccountNumber } from "./accountNumber";

export class LetterContent {
    id: number;
    amountInLetter: string;
    letterNumeroRef: LetterNumeroRef;
    letterObject: LetterObject;
    accountNumber: AccountNumber;
    civility: Civility;
}
