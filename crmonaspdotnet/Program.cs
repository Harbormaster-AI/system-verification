using crmonaspdotnet.Api;
using crmonaspdotnet.Persistence;
using crmonaspdotnet.Service;
using crmonaspdotnet.Telemetry;
using OpenTelemetry.Metrics;
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
        options.UseInMemoryDatabase("crmonaspdotnet");
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

    builder.Services.AddScoped<IOrganizationRepository, OrganizationRepository>();
    builder.Services.AddScoped<IUserRepository, UserRepository>();
    builder.Services.AddScoped<ITeamRepository, TeamRepository>();
    builder.Services.AddScoped<ITerritoryRepository, TerritoryRepository>();
    builder.Services.AddScoped<IAccountRepository, AccountRepository>();
    builder.Services.AddScoped<IContactRepository, ContactRepository>();
    builder.Services.AddScoped<ILeadRepository, LeadRepository>();
    builder.Services.AddScoped<IOpportunityRepository, OpportunityRepository>();
    builder.Services.AddScoped<IOpportunityLineItemRepository, OpportunityLineItemRepository>();
    builder.Services.AddScoped<IOpportunityStageHistoryRepository, OpportunityStageHistoryRepository>();
    builder.Services.AddScoped<IProductRepository, ProductRepository>();
    builder.Services.AddScoped<IPriceBookRepository, PriceBookRepository>();
    builder.Services.AddScoped<IPriceBookEntryRepository, PriceBookEntryRepository>();
    builder.Services.AddScoped<IQuoteRepository, QuoteRepository>();
    builder.Services.AddScoped<IQuoteLineItemRepository, QuoteLineItemRepository>();
    builder.Services.AddScoped<IOrderRepository, OrderRepository>();
    builder.Services.AddScoped<IOrderItemRepository, OrderItemRepository>();
    builder.Services.AddScoped<IContractRepository, ContractRepository>();
    builder.Services.AddScoped<ICase_Repository, Case_Repository>();
    builder.Services.AddScoped<IActivityRepository, ActivityRepository>();
    builder.Services.AddScoped<ICampaignRepository, CampaignRepository>();
    builder.Services.AddScoped<ICampaignMemberRepository, CampaignMemberRepository>();
    builder.Services.AddScoped<INoteRepository, NoteRepository>();
    builder.Services.AddScoped<IEmailMessageRepository, EmailMessageRepository>();

    builder.Services.AddScoped<IOrganizationService, OrganizationService>();
    builder.Services.AddScoped<IUserService, UserService>();
    builder.Services.AddScoped<ITeamService, TeamService>();
    builder.Services.AddScoped<ITerritoryService, TerritoryService>();
    builder.Services.AddScoped<IAccountService, AccountService>();
    builder.Services.AddScoped<IContactService, ContactService>();
    builder.Services.AddScoped<ILeadService, LeadService>();
    builder.Services.AddScoped<IOpportunityService, OpportunityService>();
    builder.Services.AddScoped<IOpportunityLineItemService, OpportunityLineItemService>();
    builder.Services.AddScoped<IOpportunityStageHistoryService, OpportunityStageHistoryService>();
    builder.Services.AddScoped<IProductService, ProductService>();
    builder.Services.AddScoped<IPriceBookService, PriceBookService>();
    builder.Services.AddScoped<IPriceBookEntryService, PriceBookEntryService>();
    builder.Services.AddScoped<IQuoteService, QuoteService>();
    builder.Services.AddScoped<IQuoteLineItemService, QuoteLineItemService>();
    builder.Services.AddScoped<IOrderService, OrderService>();
    builder.Services.AddScoped<IOrderItemService, OrderItemService>();
    builder.Services.AddScoped<IContractService, ContractService>();
    builder.Services.AddScoped<ICase_Service, Case_Service>();
    builder.Services.AddScoped<IActivityService, ActivityService>();
    builder.Services.AddScoped<ICampaignService, CampaignService>();
    builder.Services.AddScoped<ICampaignMemberService, CampaignMemberService>();
    builder.Services.AddScoped<INoteService, NoteService>();
    builder.Services.AddScoped<IEmailMessageService, EmailMessageService>();

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


    app.MapOrganizationEndpoints();
    app.MapUserEndpoints();
    app.MapTeamEndpoints();
    app.MapTerritoryEndpoints();
    app.MapAccountEndpoints();
    app.MapContactEndpoints();
    app.MapLeadEndpoints();
    app.MapOpportunityEndpoints();
    app.MapOpportunityLineItemEndpoints();
    app.MapOpportunityStageHistoryEndpoints();
    app.MapProductEndpoints();
    app.MapPriceBookEndpoints();
    app.MapPriceBookEntryEndpoints();
    app.MapQuoteEndpoints();
    app.MapQuoteLineItemEndpoints();
    app.MapOrderEndpoints();
    app.MapOrderItemEndpoints();
    app.MapContractEndpoints();
    app.MapCase_Endpoints();
    app.MapActivityEndpoints();
    app.MapCampaignEndpoints();
    app.MapCampaignMemberEndpoints();
    app.MapNoteEndpoints();
    app.MapEmailMessageEndpoints();

app.Run();

public partial class Program { }

