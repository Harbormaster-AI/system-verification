using System.ComponentModel.DataAnnotations.Schema;

namespace bankingonaspdotnet.Domain;

[ComplexType]
public record Money(
decimal Amount,
string Currency
);

[ComplexType]
public record Address(
string Street,
string City,
string State,
string PostalCode,
string Country
);

[ComplexType]
public record AccountNumber(
string Value
);

[ComplexType]
public record IBAN(
string Value
);

[ComplexType]
public record BIC(
string Value
);

[ComplexType]
public record CardPAN(
string Value
);

[ComplexType]
public record Percentage(
decimal Value
);

