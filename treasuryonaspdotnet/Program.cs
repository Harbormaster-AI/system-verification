
using treasuryonaspdotnet.Api;
using treasuryonaspdotnet.Persistence;
using treasuryonaspdotnet.Service;
using treasuryonaspdotnet.Telemetry;
using OpenTelemetry.Metrics;
using Microsoft.EntityFrameworkCore;
using Oracle.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddValidation();
builder.Services.AddControllersWithViews();
builder.Services.AddOpenApi();
builder.Services.AddHealthChecks()
    .AddDbContextCheck<ApplicationDbContext>();

// OpenAPI enablement
builder.Services.AddOpenApi();


var dbEngineEnvironment = builder.Configuration["DB_TYPE"];

string dbEngine;
string dbUserName;
string dbPassword;
string dbName;
string dbHost;
string dbPort;
string dbArgs;

if (string.IsNullOrWhiteSpace(dbEngineEnvironment))
{
    // Generation-time configuration
    dbEngine = "mysql";
    dbUserName = "postgres";
    dbPassword = "no_password";
    dbName = "testDb";
    dbHost = "localhost";
    dbPort = "5432";
    dbArgs = "${dbArgs}";
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

    dbArgs = builder.Configuration["DB_ARGS"] ?? "";

    }

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var connectionString =
        $"Host={dbHost};Port={dbPort};Database={dbName};Username={dbUserName};Password={dbPassword}";

    if (!string.IsNullOrWhiteSpace(dbArgs))
    {
//        connectionString += dbArgs.Trim().Trim(';') + ";";
    }

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
        options.UseInMemoryDatabase("treasuryonaspdotnet");
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

    builder.Services.AddScoped<ITreasuryUnitRepository, TreasuryUnitRepository>();
    builder.Services.AddScoped<ITradingBookRepository, TradingBookRepository>();
    builder.Services.AddScoped<IPortfolioRepository, PortfolioRepository>();
    builder.Services.AddScoped<ICounterpartyRepository, CounterpartyRepository>();
    builder.Services.AddScoped<INettingAgreementRepository, NettingAgreementRepository>();
    builder.Services.AddScoped<ICollateralAgreementRepository, CollateralAgreementRepository>();
    builder.Services.AddScoped<ICollateralAccountRepository, CollateralAccountRepository>();
    builder.Services.AddScoped<IMarginCallRepository, MarginCallRepository>();
    builder.Services.AddScoped<IBankAccountRepository, BankAccountRepository>();
    builder.Services.AddScoped<ICashPositionRepository, CashPositionRepository>();
    builder.Services.AddScoped<ICashFlowRepository, CashFlowRepository>();
    builder.Services.AddScoped<ITradeRepository, TradeRepository>();
    builder.Services.AddScoped<ISettlementInstructionRepository, SettlementInstructionRepository>();
    builder.Services.AddScoped<IFundingProgramRepository, FundingProgramRepository>();
    builder.Services.AddScoped<IIssuanceRepository, IssuanceRepository>();
    builder.Services.AddScoped<IPositionRepository, PositionRepository>();
    builder.Services.AddScoped<IRiskLimitRepository, RiskLimitRepository>();
    builder.Services.AddScoped<ILimitBreachRepository, LimitBreachRepository>();
    builder.Services.AddScoped<IApprovalRepository, ApprovalRepository>();
    builder.Services.AddScoped<ITreasuryPolicyRepository, TreasuryPolicyRepository>();
    builder.Services.AddScoped<IMarketDataSetRepository, MarketDataSetRepository>();
    builder.Services.AddScoped<IYieldCurveRepository, YieldCurveRepository>();
    builder.Services.AddScoped<ICurveQuoteRepository, CurveQuoteRepository>();
    builder.Services.AddScoped<IFXRateRepository, FXRateRepository>();
    builder.Services.AddScoped<IVolSurfaceRepository, VolSurfaceRepository>();
    builder.Services.AddScoped<IRiskReportRepository, RiskReportRepository>();
    builder.Services.AddScoped<IRegulatoryMetricRepository, RegulatoryMetricRepository>();
    builder.Services.AddScoped<ILiquidityBufferRepository, LiquidityBufferRepository>();
    builder.Services.AddScoped<IBufferAssetRepository, BufferAssetRepository>();
    builder.Services.AddScoped<ITransferPricingRuleRepository, TransferPricingRuleRepository>();
    builder.Services.AddScoped<IInternalDealRepository, InternalDealRepository>();
    builder.Services.AddScoped<IHedgeRelationshipRepository, HedgeRelationshipRepository>();
    builder.Services.AddScoped<IAccountingEntryRepository, AccountingEntryRepository>();
    builder.Services.AddScoped<IStressScenarioRepository, StressScenarioRepository>();
    builder.Services.AddScoped<IStressResultRepository, StressResultRepository>();
    builder.Services.AddScoped<IBusinessCalendarRepository, BusinessCalendarRepository>();
    builder.Services.AddScoped<IHolidayRepository, HolidayRepository>();

    builder.Services.AddScoped<ITreasuryUnitService, TreasuryUnitService>();
    builder.Services.AddScoped<ITradingBookService, TradingBookService>();
    builder.Services.AddScoped<IPortfolioService, PortfolioService>();
    builder.Services.AddScoped<ICounterpartyService, CounterpartyService>();
    builder.Services.AddScoped<INettingAgreementService, NettingAgreementService>();
    builder.Services.AddScoped<ICollateralAgreementService, CollateralAgreementService>();
    builder.Services.AddScoped<ICollateralAccountService, CollateralAccountService>();
    builder.Services.AddScoped<IMarginCallService, MarginCallService>();
    builder.Services.AddScoped<IBankAccountService, BankAccountService>();
    builder.Services.AddScoped<ICashPositionService, CashPositionService>();
    builder.Services.AddScoped<ICashFlowService, CashFlowService>();
    builder.Services.AddScoped<ITradeService, TradeService>();
    builder.Services.AddScoped<ISettlementInstructionService, SettlementInstructionService>();
    builder.Services.AddScoped<IFundingProgramService, FundingProgramService>();
    builder.Services.AddScoped<IIssuanceService, IssuanceService>();
    builder.Services.AddScoped<IPositionService, PositionService>();
    builder.Services.AddScoped<IRiskLimitService, RiskLimitService>();
    builder.Services.AddScoped<ILimitBreachService, LimitBreachService>();
    builder.Services.AddScoped<IApprovalService, ApprovalService>();
    builder.Services.AddScoped<ITreasuryPolicyService, TreasuryPolicyService>();
    builder.Services.AddScoped<IMarketDataSetService, MarketDataSetService>();
    builder.Services.AddScoped<IYieldCurveService, YieldCurveService>();
    builder.Services.AddScoped<ICurveQuoteService, CurveQuoteService>();
    builder.Services.AddScoped<IFXRateService, FXRateService>();
    builder.Services.AddScoped<IVolSurfaceService, VolSurfaceService>();
    builder.Services.AddScoped<IRiskReportService, RiskReportService>();
    builder.Services.AddScoped<IRegulatoryMetricService, RegulatoryMetricService>();
    builder.Services.AddScoped<ILiquidityBufferService, LiquidityBufferService>();
    builder.Services.AddScoped<IBufferAssetService, BufferAssetService>();
    builder.Services.AddScoped<ITransferPricingRuleService, TransferPricingRuleService>();
    builder.Services.AddScoped<IInternalDealService, InternalDealService>();
    builder.Services.AddScoped<IHedgeRelationshipService, HedgeRelationshipService>();
    builder.Services.AddScoped<IAccountingEntryService, AccountingEntryService>();
    builder.Services.AddScoped<IStressScenarioService, StressScenarioService>();
    builder.Services.AddScoped<IStressResultService, StressResultService>();
    builder.Services.AddScoped<IBusinessCalendarService, BusinessCalendarService>();
    builder.Services.AddScoped<IHolidayService, HolidayService>();

// apply the service resolver
builder.Services.AddScoped<IServiceResolver, ServiceResolver>();

builder.Services.AddSingleton<ApplicationTelemetry>();

builder.Services
    .AddOpenTelemetry()
    .WithMetrics(metrics =>
    {
        metrics.AddMeter("Harbormaster.Application");

        metrics.AddPrometheusExporter();
    });

var app = builder.Build();

app.MapPrometheusScrapingEndpoint();

// OpenAPI handling
app.MapOpenApi();

app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint(
        "/openapi/v1.json",
        "Application API v1"
    );
});

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


    app.MapTreasuryUnitEndpoints();
    app.MapTradingBookEndpoints();
    app.MapPortfolioEndpoints();
    app.MapCounterpartyEndpoints();
    app.MapNettingAgreementEndpoints();
    app.MapCollateralAgreementEndpoints();
    app.MapCollateralAccountEndpoints();
    app.MapMarginCallEndpoints();
    app.MapBankAccountEndpoints();
    app.MapCashPositionEndpoints();
    app.MapCashFlowEndpoints();
    app.MapTradeEndpoints();
    app.MapSettlementInstructionEndpoints();
    app.MapFundingProgramEndpoints();
    app.MapIssuanceEndpoints();
    app.MapPositionEndpoints();
    app.MapRiskLimitEndpoints();
    app.MapLimitBreachEndpoints();
    app.MapApprovalEndpoints();
    app.MapTreasuryPolicyEndpoints();
    app.MapMarketDataSetEndpoints();
    app.MapYieldCurveEndpoints();
    app.MapCurveQuoteEndpoints();
    app.MapFXRateEndpoints();
    app.MapVolSurfaceEndpoints();
    app.MapRiskReportEndpoints();
    app.MapRegulatoryMetricEndpoints();
    app.MapLiquidityBufferEndpoints();
    app.MapBufferAssetEndpoints();
    app.MapTransferPricingRuleEndpoints();
    app.MapInternalDealEndpoints();
    app.MapHedgeRelationshipEndpoints();
    app.MapAccountingEntryEndpoints();
    app.MapStressScenarioEndpoints();
    app.MapStressResultEndpoints();
    app.MapBusinessCalendarEndpoints();
    app.MapHolidayEndpoints();

app.Run();

public partial class Program { }

