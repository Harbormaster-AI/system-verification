

import Decimal from "decimal.js";

// Define collection and schema for FeeCharge
export interface FeeCharge {
    feeChargeId: string;
    feeCode: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    amount: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    appliedOn: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    account: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    loanAccount: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    feeType: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    collection: 'feeCharges'
}
