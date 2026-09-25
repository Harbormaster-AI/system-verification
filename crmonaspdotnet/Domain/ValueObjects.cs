using System.ComponentModel.DataAnnotations.Schema;

namespace crmonaspdotnet.Domain;


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
public record EmailAddress(
string Value
);

[ComplexType]
public record PhoneNumber(
string CountryCode,
string Number,
string Extension
);

[ComplexType]
public record URL(
string Value
);

[ComplexType]
public record _Locale(
string Language,
string Region,
string Timezone
);

