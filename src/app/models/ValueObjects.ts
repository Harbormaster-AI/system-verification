
// -----------------------------------------
// Money
// -----------------------------------------
interface Money {
    amount: Decimal
    currency: string
}


// -----------------------------------------
// Address
// -----------------------------------------
interface Address {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
}


// -----------------------------------------
// AccountNumber
// -----------------------------------------
interface AccountNumber {
    value: string
}


// -----------------------------------------
// IBAN
// -----------------------------------------
interface IBAN {
    value: string
}


// -----------------------------------------
// BIC
// -----------------------------------------
interface BIC {
    value: string
}


// -----------------------------------------
// CardPAN
// -----------------------------------------
interface CardPAN {
    value: string
}


// -----------------------------------------
// Percentage
// -----------------------------------------
interface Percentage {
    value: Decimal
}


