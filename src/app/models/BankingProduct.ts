

import Decimal from "decimal.js";

// Define collection and schema for BankingProduct
export interface BankingProduct {
    bankingProductId: string;
    productCode: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    name: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    description: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    bank: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    accounts: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    loanAccounts: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    paymentCards: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    productCategory: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    collection: 'bankingProducts'
}
