
import Decimal from "decimal.js";
// -----------------------------------------
// Money
// -----------------------------------------
declare global {
    interface Money {
    amount: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
    currency: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
    }
}

// -----------------------------------------
// Address
// -----------------------------------------
declare global {
    interface Address {
    street: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
    city: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
    state: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
    postalCode: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
    country: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
    }
}

// -----------------------------------------
// AccountNumber
// -----------------------------------------
declare global {
    interface AccountNumber {
    value: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
    }
}

// -----------------------------------------
// IBAN
// -----------------------------------------
declare global {
    interface IBAN {
    value: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
    }
}

// -----------------------------------------
// BIC
// -----------------------------------------
declare global {
    interface BIC {
    value: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
    }
}

// -----------------------------------------
// CardPAN
// -----------------------------------------
declare global {
    interface CardPAN {
    value: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
    }
}

// -----------------------------------------
// Percentage
// -----------------------------------------
declare global {
    interface Percentage {
    value: #attributeTypeDeclaration(${attribute}, ${valueObject}, ${outputTheAttributeType})
    }
}

