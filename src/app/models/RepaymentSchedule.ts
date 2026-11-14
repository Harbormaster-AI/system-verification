

import Decimal from "decimal.js";

// Define collection and schema for RepaymentSchedule
export interface RepaymentSchedule {
    repaymentScheduleId: string;
    installmentNumber: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    dueDate: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    principalDue: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    interestDue: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    totalDue: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    loanAccount: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    payment: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    status: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    collection: 'repaymentSchedules'
}
