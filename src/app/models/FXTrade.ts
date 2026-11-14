

import Decimal from "decimal.js";

// Define collection and schema for FXTrade
export interface FXTrade {
    fXTradeId: string;
    tradeReference: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    tradeDate: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    settlementDate: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    amountSold: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    amountBought: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    rate: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    customer: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    bank: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    exchangeRate: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    sourceAccount: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    destinationAccount: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    transaction: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    status: #attributeTypeDeclaration(${attribute}, ${classObject}, ${outputTheAttributeType})
    collection: 'fXTrades'
}
