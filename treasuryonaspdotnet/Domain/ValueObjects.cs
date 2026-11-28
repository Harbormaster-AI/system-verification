using System.ComponentModel.DataAnnotations.Schema;

namespace treasuryonaspdotnet.Domain;


    [ComplexType]
    public record Money(
    decimal Amount,
    string Currency
    );


    [ComplexType]
    public record Rate(
    decimal Value
    );


    [ComplexType]
    public record Tenor(
    int Value,
    TenorUnit Unit
    );


    [ComplexType]
    public record ISIN(
    string Value
    );


    [ComplexType]
    public record LegalEntityIdentifier(
    string Value
    );


    [ComplexType]
    public record BIC(
    string Value
    );


    [ComplexType]
    public record AccountIdentifier(
    string Value
    );


    [ComplexType]
    public record TenorUnit(
    string Days,
    string Weeks,
    string Months,
    string Years
    );

