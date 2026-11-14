

import Decimal from "decimal.js";

// Define collection and schema for StandingInstruction
export interface StandingInstruction {
    standingInstructionId: string;
    instructionId: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    amount: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    nextExecutionDate: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    account: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    beneficiary: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    frequency: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    status: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    collection: 'standingInstructions'
}
