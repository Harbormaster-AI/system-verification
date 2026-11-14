

import Decimal from "decimal.js";

// Define collection and schema for LoanAccount
export interface LoanAccount {
    loanAccountId: string;
    loanNumber: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    principalAmount: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    outstandingPrincipal: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    interestRate: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    originationDate: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    maturityDate: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    paymentDayOfMonth: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    currency: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    bank: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    branch: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    product: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    borrowers: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    repaymentSchedule: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    payments: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    collateral: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    feeCharges: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    loanType: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    rateType: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    compounding: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    status: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    collection: 'loanAccounts'
}
