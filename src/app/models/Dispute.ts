

import Decimal from "decimal.js";

// Define collection and schema for Dispute
export interface Dispute {
    disputeId: string;
    disputeReference: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    raisedOn: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    reason: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    transaction: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    customer: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    account: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    paymentCard: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    status: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    collection: 'disputes'
}
