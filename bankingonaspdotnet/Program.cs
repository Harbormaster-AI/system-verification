using bankingonaspdotnet.Api;
using bankingonaspdotnet.Persistence;
using bankingonaspdotnet.Service;

using Microsoft.EntityFrameworkCore;
using Oracle.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddOpenApi();
builder.Services.AddHealthChecks()
    .AddDbContextCheck<ApplicationDbContext>();


var dbEngineEnvironment = builder.Configuration["DB_TYPE"];

string dbEngine;
string dbUserName;
string dbPassword;
string dbName;
string dbHost;
string dbPort;

if (string.IsNullOrWhiteSpace(dbEngineEnvironment))
{
    // Generation-time configuration
    dbEngine = "mysql";
    dbUserName = "postgres";
    dbPassword = "no_password";
    dbName = "testDb";
    dbHost = "localhost";
    dbPort = "5432";
}
else
{
    // Runtime environment configuration
    dbEngine = dbEngineEnvironment;
    dbUserName = builder.Configuration["DB_USER_NAME"]
        ?? throw new InvalidOperationException("DB_USER_NAME is required when DB_ENGINE is provided.");

    dbPassword = builder.Configuration["DB_PASSWORD"]
        ?? throw new InvalidOperationException("DB_PASSWORD is required when DB_ENGINE is provided.");

    dbName = builder.Configuration["DB_NAME"]
        ?? throw new InvalidOperationException("DB_NAME is required when DB_ENGINE is provided.");

    dbHost = builder.Configuration["DB_HOST"]
        ?? throw new InvalidOperationException("DB_HOST is required when DB_ENGINE is provided.");

    dbPort = builder.Configuration["DB_PORT"]
        ?? throw new InvalidOperationException("DB_PORT is required when DB_ENGINE is provided.");
}

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var connectionString =
        $"Host={dbHost};Port={dbPort};Database={dbName};Username={dbUserName};Password={dbPassword}";

    if (dbEngine.Equals("mysql", StringComparison.OrdinalIgnoreCase))
    {
        options.UseMySQL(connectionString);
    }
    else if (dbEngine.Equals("mariadb", StringComparison.OrdinalIgnoreCase))
    {
        options.UseMySQL(connectionString);
    }
    else if (dbEngine.Equals("sqlite", StringComparison.OrdinalIgnoreCase))
    {
        options.UseSqlite(connectionString);
    }
    else if (dbEngine.Equals("sqlserver", StringComparison.OrdinalIgnoreCase) ||
             dbEngine.Equals("azuresql", StringComparison.OrdinalIgnoreCase))
    {
        options.UseSqlServer(connectionString);
    }
    else if (dbEngine.Equals("oracle", StringComparison.OrdinalIgnoreCase))
    {
        options.UseOracle(connectionString);
    }
    else if (dbEngine.Equals("mongodb", StringComparison.OrdinalIgnoreCase))
    {
        options.UseMongoDB(connectionString);
    }
    else if (dbEngine.Equals("inmemory", StringComparison.OrdinalIgnoreCase))
    {
        options.UseInMemoryDatabase("bankingonaspdotnet");
    }
    else if (dbEngine.Equals("cosmosdb", StringComparison.OrdinalIgnoreCase))
    {
        var cosmosEndpoint = builder.Configuration["DB_ENDPOINT"]
            ?? throw new InvalidOperationException(
                "DB_ENDPOINT is required for Cosmos DB.");

        var cosmosKey = builder.Configuration["DB_KEY"]
            ?? throw new InvalidOperationException(
                "DB_KEY is required for Cosmos DB.");

        options.UseCosmos(
            cosmosEndpoint,
            cosmosKey,
            dbName);
    }
    else if (dbEngine.Equals("postgres", StringComparison.OrdinalIgnoreCase))
    {
        options.UseNpgsql(connectionString);
    }
    else
    {
        throw new InvalidOperationException(
            "Unsupported or missing database engine configuration.");
    }
    // etc.
});

    builder.Services.AddScoped<IBankRepository, BankRepository>();
    builder.Services.AddScoped<IBranchRepository, BranchRepository>();
    builder.Services.AddScoped<IATMRepository, ATMRepository>();
    builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
    builder.Services.AddScoped<IKycProfileRepository, KycProfileRepository>();
    builder.Services.AddScoped<IIdentityDocumentRepository, IdentityDocumentRepository>();
    builder.Services.AddScoped<IRiskAssessmentRepository, RiskAssessmentRepository>();
    builder.Services.AddScoped<IScreeningResultRepository, ScreeningResultRepository>();
    builder.Services.AddScoped<IBankingProductRepository, BankingProductRepository>();
    builder.Services.AddScoped<IAccountRepository, AccountRepository>();
    builder.Services.AddScoped<IAccountStatementRepository, AccountStatementRepository>();
    builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
    builder.Services.AddScoped<IExternalAccountRepository, ExternalAccountRepository>();
    builder.Services.AddScoped<IFundsTransferRepository, FundsTransferRepository>();
    builder.Services.AddScoped<IStandingInstructionRepository, StandingInstructionRepository>();
    builder.Services.AddScoped<IPaymentCardRepository, PaymentCardRepository>();
    builder.Services.AddScoped<ILoanAccountRepository, LoanAccountRepository>();
    builder.Services.AddScoped<IRepaymentScheduleRepository, RepaymentScheduleRepository>();
    builder.Services.AddScoped<ILoanPaymentRepository, LoanPaymentRepository>();
    builder.Services.AddScoped<ICollateralRepository, CollateralRepository>();
    builder.Services.AddScoped<IFeeChargeRepository, FeeChargeRepository>();
    builder.Services.AddScoped<IExchangeRateRepository, ExchangeRateRepository>();
    builder.Services.AddScoped<IFXTradeRepository, FXTradeRepository>();
    builder.Services.AddScoped<IDisputeRepository, DisputeRepository>();
    builder.Services.AddScoped<IConsentRepository, ConsentRepository>();
    builder.Services.AddScoped<IThirdPartyProviderRepository, ThirdPartyProviderRepository>();

    builder.Services.AddScoped<IBankService, BankService>();
    builder.Services.AddScoped<IBranchService, BranchService>();
    builder.Services.AddScoped<IATMService, ATMService>();
    builder.Services.AddScoped<ICustomerService, CustomerService>();
    builder.Services.AddScoped<IKycProfileService, KycProfileService>();
    builder.Services.AddScoped<IIdentityDocumentService, IdentityDocumentService>();
    builder.Services.AddScoped<IRiskAssessmentService, RiskAssessmentService>();
    builder.Services.AddScoped<IScreeningResultService, ScreeningResultService>();
    builder.Services.AddScoped<IBankingProductService, BankingProductService>();
    builder.Services.AddScoped<IAccountService, AccountService>();
    builder.Services.AddScoped<IAccountStatementService, AccountStatementService>();
    builder.Services.AddScoped<ITransactionService, TransactionService>();
    builder.Services.AddScoped<IExternalAccountService, ExternalAccountService>();
    builder.Services.AddScoped<IFundsTransferService, FundsTransferService>();
    builder.Services.AddScoped<IStandingInstructionService, StandingInstructionService>();
    builder.Services.AddScoped<IPaymentCardService, PaymentCardService>();
    builder.Services.AddScoped<ILoanAccountService, LoanAccountService>();
    builder.Services.AddScoped<IRepaymentScheduleService, RepaymentScheduleService>();
    builder.Services.AddScoped<ILoanPaymentService, LoanPaymentService>();
    builder.Services.AddScoped<ICollateralService, CollateralService>();
    builder.Services.AddScoped<IFeeChargeService, FeeChargeService>();
    builder.Services.AddScoped<IExchangeRateService, ExchangeRateService>();
    builder.Services.AddScoped<IFXTradeService, FXTradeService>();
    builder.Services.AddScoped<IDisputeService, DisputeService>();
    builder.Services.AddScoped<IConsentService, ConsentService>();
    builder.Services.AddScoped<IThirdPartyProviderService, ThirdPartyProviderService>();

var app = builder.Build();

// Health endpoint
app.MapHealthChecks("/health");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    // Testing uses a shared SQLite file; wipe it so unique indexes (e.g. email) don't fail on re-runs.
    if (app.Environment.IsEnvironment("Testing"))
    {
        db.Database.EnsureDeleted();
    }

    // EnsureCreated does not alter an existing schema. If you changed relationships locally,
    // recreate the MySQL database (docker compose down -v && docker compose up -d).
    db.Database.EnsureCreated();
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");


    app.MapBankEndpoints();
    app.MapBranchEndpoints();
    app.MapATMEndpoints();
    app.MapCustomerEndpoints();
    app.MapKycProfileEndpoints();
    app.MapIdentityDocumentEndpoints();
    app.MapRiskAssessmentEndpoints();
    app.MapScreeningResultEndpoints();
    app.MapBankingProductEndpoints();
    app.MapAccountEndpoints();
    app.MapAccountStatementEndpoints();
    app.MapTransactionEndpoints();
    app.MapExternalAccountEndpoints();
    app.MapFundsTransferEndpoints();
    app.MapStandingInstructionEndpoints();
    app.MapPaymentCardEndpoints();
    app.MapLoanAccountEndpoints();
    app.MapRepaymentScheduleEndpoints();
    app.MapLoanPaymentEndpoints();
    app.MapCollateralEndpoints();
    app.MapFeeChargeEndpoints();
    app.MapExchangeRateEndpoints();
    app.MapFXTradeEndpoints();
    app.MapDisputeEndpoints();
    app.MapConsentEndpoints();
    app.MapThirdPartyProviderEndpoints();

app.Run();

public partial class Program { }

