

import Decimal from "decimal.js";

// Define collection and schema for RiskAssessment
export interface RiskAssessment {
    riskAssessmentId: string;
    score: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    assessedOn: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    kycProfile: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    rating: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    collection: 'riskAssessments'
}
