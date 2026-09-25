using inventoryonaspdotnet.Api;
using inventoryonaspdotnet.Persistence;
using inventoryonaspdotnet.Service;
using inventoryonaspdotnet.Telemetry;
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
        options.UseInMemoryDatabase("inventoryonaspdotnet");
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

    builder.Services.AddScoped<IStockKeepingUnitRepository, StockKeepingUnitRepository>();
    builder.Services.AddScoped<IWarehouseRepository, WarehouseRepository>();
    builder.Services.AddScoped<IStorageLocationRepository, StorageLocationRepository>();
    builder.Services.AddScoped<IInventoryItemRepository, InventoryItemRepository>();
    builder.Services.AddScoped<ILotRepository, LotRepository>();
    builder.Services.AddScoped<ISerialNumberRepository, SerialNumberRepository>();
    builder.Services.AddScoped<IReservationRepository, ReservationRepository>();
    builder.Services.AddScoped<IDemandSignalRepository, DemandSignalRepository>();
    builder.Services.AddScoped<IInventoryTransactionRepository, InventoryTransactionRepository>();
    builder.Services.AddScoped<ITransferOrderRepository, TransferOrderRepository>();
    builder.Services.AddScoped<ITransferOrderLineRepository, TransferOrderLineRepository>();
    builder.Services.AddScoped<IStockAdjustmentRepository, StockAdjustmentRepository>();
    builder.Services.AddScoped<IStockAdjustmentLineRepository, StockAdjustmentLineRepository>();
    builder.Services.AddScoped<ICycleCountRepository, CycleCountRepository>();
    builder.Services.AddScoped<ICycleCountEntryRepository, CycleCountEntryRepository>();
    builder.Services.AddScoped<IReplenishmentPolicyRepository, ReplenishmentPolicyRepository>();
    builder.Services.AddScoped<IUoMConversionRepository, UoMConversionRepository>();
    builder.Services.AddScoped<IInventoryThresholdAlertRepository, InventoryThresholdAlertRepository>();
    builder.Services.AddScoped<IQuarantineRepository, QuarantineRepository>();
    builder.Services.AddScoped<IExpirationPolicyRepository, ExpirationPolicyRepository>();
    builder.Services.AddScoped<IInboundShipmentRepository, InboundShipmentRepository>();
    builder.Services.AddScoped<IInboundShipmentLineRepository, InboundShipmentLineRepository>();
    builder.Services.AddScoped<IOutboundAllocationRepository, OutboundAllocationRepository>();

    builder.Services.AddScoped<IStockKeepingUnitService, StockKeepingUnitService>();
    builder.Services.AddScoped<IWarehouseService, WarehouseService>();
    builder.Services.AddScoped<IStorageLocationService, StorageLocationService>();
    builder.Services.AddScoped<IInventoryItemService, InventoryItemService>();
    builder.Services.AddScoped<ILotService, LotService>();
    builder.Services.AddScoped<ISerialNumberService, SerialNumberService>();
    builder.Services.AddScoped<IReservationService, ReservationService>();
    builder.Services.AddScoped<IDemandSignalService, DemandSignalService>();
    builder.Services.AddScoped<IInventoryTransactionService, InventoryTransactionService>();
    builder.Services.AddScoped<ITransferOrderService, TransferOrderService>();
    builder.Services.AddScoped<ITransferOrderLineService, TransferOrderLineService>();
    builder.Services.AddScoped<IStockAdjustmentService, StockAdjustmentService>();
    builder.Services.AddScoped<IStockAdjustmentLineService, StockAdjustmentLineService>();
    builder.Services.AddScoped<ICycleCountService, CycleCountService>();
    builder.Services.AddScoped<ICycleCountEntryService, CycleCountEntryService>();
    builder.Services.AddScoped<IReplenishmentPolicyService, ReplenishmentPolicyService>();
    builder.Services.AddScoped<IUoMConversionService, UoMConversionService>();
    builder.Services.AddScoped<IInventoryThresholdAlertService, InventoryThresholdAlertService>();
    builder.Services.AddScoped<IQuarantineService, QuarantineService>();
    builder.Services.AddScoped<IExpirationPolicyService, ExpirationPolicyService>();
    builder.Services.AddScoped<IInboundShipmentService, InboundShipmentService>();
    builder.Services.AddScoped<IInboundShipmentLineService, InboundShipmentLineService>();
    builder.Services.AddScoped<IOutboundAllocationService, OutboundAllocationService>();

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


    app.MapStockKeepingUnitEndpoints();
    app.MapWarehouseEndpoints();
    app.MapStorageLocationEndpoints();
    app.MapInventoryItemEndpoints();
    app.MapLotEndpoints();
    app.MapSerialNumberEndpoints();
    app.MapReservationEndpoints();
    app.MapDemandSignalEndpoints();
    app.MapInventoryTransactionEndpoints();
    app.MapTransferOrderEndpoints();
    app.MapTransferOrderLineEndpoints();
    app.MapStockAdjustmentEndpoints();
    app.MapStockAdjustmentLineEndpoints();
    app.MapCycleCountEndpoints();
    app.MapCycleCountEntryEndpoints();
    app.MapReplenishmentPolicyEndpoints();
    app.MapUoMConversionEndpoints();
    app.MapInventoryThresholdAlertEndpoints();
    app.MapQuarantineEndpoints();
    app.MapExpirationPolicyEndpoints();
    app.MapInboundShipmentEndpoints();
    app.MapInboundShipmentLineEndpoints();
    app.MapOutboundAllocationEndpoints();

app.Run();

public partial class Program { }

