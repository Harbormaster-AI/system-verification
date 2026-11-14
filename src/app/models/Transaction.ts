

import Decimal from "decimal.js";

// Define collection and schema for Transaction
export interface Transaction {
    transactionId: string;
    bookingDate: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    valueDate: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    amount: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    description: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    account: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    externalCounterparty: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    paymentCard: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    fundsTransfer: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    fxTrade: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    dispute: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    direction: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    transactionType: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    status: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    channel: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    collection: 'transactions'
}
