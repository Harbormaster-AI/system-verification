

import Decimal from "decimal.js";

// Define collection and schema for AccountStatement
export interface AccountStatement {
    accountStatementId: string;
    statementNumber: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    periodStart: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    periodEnd: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    openingBalance: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    closingBalance: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    account: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    deliveryMethod: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    collection: 'accountStatements'
}
