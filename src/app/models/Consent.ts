

import Decimal from "decimal.js";

// Define collection and schema for Consent
export interface Consent {
    consentId: string;
    grantedOn: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    expiresOn: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    customer: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    bank: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    authorizedAccounts: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    thirdPartyProvider: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    consentType: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    status: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    collection: 'consents'
}
