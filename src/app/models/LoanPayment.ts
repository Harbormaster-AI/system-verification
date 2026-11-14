

import Decimal from "decimal.js";

// Define collection and schema for LoanPayment
export interface LoanPayment {
    loanPaymentId: string;
    paymentReference: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    amount: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    paymentDate: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    loanAccount: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    transaction: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    method: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    status: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    collection: 'loanPayments'
}
