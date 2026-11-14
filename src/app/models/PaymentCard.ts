

import Decimal from "decimal.js";

// Define collection and schema for PaymentCard
export interface PaymentCard {
    paymentCardId: string;
    cardNumber: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    embossedName: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    expiryMonth: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    expiryYear: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    bank: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    account: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    customer: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    transactions: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    cardType: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    cardStatus: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    network: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    collection: 'paymentCards'
}
