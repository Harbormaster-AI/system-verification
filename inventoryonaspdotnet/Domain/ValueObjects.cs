using System.ComponentModel.DataAnnotations.Schema;

namespace inventoryonaspdotnet.Domain;


[ComplexType]
public record SKU(
string Value
);

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
public record BatchNumber(
string Value
);

[ComplexType]
public record SerialCode(
string Value
);

