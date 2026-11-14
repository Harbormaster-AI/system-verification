

import Decimal from "decimal.js";

// Define collection and schema for FundsTransfer
export interface FundsTransfer {
    fundsTransferId: string;
    transferReference: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    amount: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    requestedDate: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    executionDate: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    purpose: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    feeAmount: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    sourceAccount: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    destinationAccount: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    externalBeneficiary: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    initiatedBy: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    transactions: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    method: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    status: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    collection: 'fundsTransfers'
}
