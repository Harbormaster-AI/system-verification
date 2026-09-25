using Microsoft.EntityFrameworkCore;

using inventoryonaspdotnet.Domain;

namespace inventoryonaspdotnet.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<StockKeepingUnit> StockKeepingUnits => Set<StockKeepingUnit>();
    public DbSet<Warehouse> Warehouses => Set<Warehouse>();
    public DbSet<StorageLocation> StorageLocations => Set<StorageLocation>();
    public DbSet<InventoryItem> InventoryItems => Set<InventoryItem>();
    public DbSet<Lot> Lots => Set<Lot>();
    public DbSet<SerialNumber> SerialNumbers => Set<SerialNumber>();
    public DbSet<Reservation> Reservations => Set<Reservation>();
    public DbSet<DemandSignal> DemandSignals => Set<DemandSignal>();
    public DbSet<InventoryTransaction> InventoryTransactions => Set<InventoryTransaction>();
    public DbSet<TransferOrder> TransferOrders => Set<TransferOrder>();
    public DbSet<TransferOrderLine> TransferOrderLines => Set<TransferOrderLine>();
    public DbSet<StockAdjustment> StockAdjustments => Set<StockAdjustment>();
    public DbSet<StockAdjustmentLine> StockAdjustmentLines => Set<StockAdjustmentLine>();
    public DbSet<CycleCount> CycleCounts => Set<CycleCount>();
    public DbSet<CycleCountEntry> CycleCountEntrys => Set<CycleCountEntry>();
    public DbSet<ReplenishmentPolicy> ReplenishmentPolicys => Set<ReplenishmentPolicy>();
    public DbSet<UoMConversion> UoMConversions => Set<UoMConversion>();
    public DbSet<InventoryThresholdAlert> InventoryThresholdAlerts => Set<InventoryThresholdAlert>();
    public DbSet<Quarantine> Quarantines => Set<Quarantine>();
    public DbSet<ExpirationPolicy> ExpirationPolicys => Set<ExpirationPolicy>();
    public DbSet<InboundShipment> InboundShipments => Set<InboundShipment>();
    public DbSet<InboundShipmentLine> InboundShipmentLines => Set<InboundShipmentLine>();
    public DbSet<OutboundAllocation> OutboundAllocations => Set<OutboundAllocation>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);


        // StockKeepingUnit has one or more InventoryItems of type InventoryItem
        modelBuilder.Entity<InventoryItem>()
            .HasOne<StockKeepingUnit>()
            .WithMany(parent => parent.InventoryItems)
            .HasForeignKey("StockKeepingUnit_Id");

        // StockKeepingUnit has one or more UomConversions of type UoMConversion
        modelBuilder.Entity<UoMConversion>()
            .HasOne<StockKeepingUnit>()
            .WithMany(parent => parent.UomConversions)
            .HasForeignKey("StockKeepingUnit_Id");

        // StockKeepingUnit has one or more ReplenishmentPolicies of type ReplenishmentPolicy
        modelBuilder.Entity<ReplenishmentPolicy>()
            .HasOne<StockKeepingUnit>()
            .WithMany(parent => parent.ReplenishmentPolicies)
            .HasForeignKey("StockKeepingUnit_Id");

        // StockKeepingUnit has one or more Lots of type Lot
        modelBuilder.Entity<Lot>()
            .HasOne<StockKeepingUnit>()
            .WithMany(parent => parent.Lots)
            .HasForeignKey("StockKeepingUnit_Id");

        // StockKeepingUnit has one or more SerialNumbers of type SerialNumber
        modelBuilder.Entity<SerialNumber>()
            .HasOne<StockKeepingUnit>()
            .WithMany(parent => parent.SerialNumbers)
            .HasForeignKey("StockKeepingUnit_Id");


        // Warehouse has one or more StorageLocations of type StorageLocation
        modelBuilder.Entity<StorageLocation>()
            .HasOne<Warehouse>()
            .WithMany(parent => parent.StorageLocations)
            .HasForeignKey("Warehouse_Id");

        // Warehouse has one or more InventoryItems of type InventoryItem
        modelBuilder.Entity<InventoryItem>()
            .HasOne<Warehouse>()
            .WithMany(parent => parent.InventoryItems)
            .HasForeignKey("Warehouse_Id");

        // Warehouse has one or more InboundShipments of type InboundShipment
        modelBuilder.Entity<InboundShipment>()
            .HasOne<Warehouse>()
            .WithMany(parent => parent.InboundShipments)
            .HasForeignKey("Warehouse_Id");

        // Warehouse has one or more OutboundAllocations of type OutboundAllocation
        modelBuilder.Entity<OutboundAllocation>()
            .HasOne<Warehouse>()
            .WithMany(parent => parent.OutboundAllocations)
            .HasForeignKey("Warehouse_Id");

        // Warehouse has one or more OriginTransfers of type TransferOrder
        modelBuilder.Entity<TransferOrder>()
            .HasOne<Warehouse>()
            .WithMany(parent => parent.OriginTransfers)
            .HasForeignKey("Warehouse_Id");

        // Warehouse has one or more DestinationTransfers of type TransferOrder
        modelBuilder.Entity<TransferOrder>()
            .HasOne<Warehouse>()
            .WithMany(parent => parent.DestinationTransfers)
            .HasForeignKey("Warehouse_Id");

        // Warehouse has one or more CycleCounts of type CycleCount
        modelBuilder.Entity<CycleCount>()
            .HasOne<Warehouse>()
            .WithMany(parent => parent.CycleCounts)
            .HasForeignKey("Warehouse_Id");

        // StorageLocation has one Warehouse of type Warehouse
        modelBuilder.Entity<StorageLocation>()
            .HasOne(x => x.Warehouse)
            .WithMany()
            .HasForeignKey("Warehouse_Id");

        // StorageLocation has one ParentLocation of type StorageLocation
        modelBuilder.Entity<StorageLocation>()
            .HasOne(x => x.ParentLocation)
            .WithMany()
            .HasForeignKey("ParentLocation_Id");


        // StorageLocation has one or more ChildLocations of type StorageLocation
        modelBuilder.Entity<StorageLocation>()
            .HasOne<StorageLocation>()
            .WithMany(parent => parent.ChildLocations)
            .HasForeignKey("StorageLocation_Id");

        // StorageLocation has one or more InventoryItems of type InventoryItem
        modelBuilder.Entity<InventoryItem>()
            .HasOne<StorageLocation>()
            .WithMany(parent => parent.InventoryItems)
            .HasForeignKey("StorageLocation_Id");

        // InventoryItem has one Sku of type StockKeepingUnit
        modelBuilder.Entity<InventoryItem>()
            .HasOne(x => x.Sku)
            .WithMany()
            .HasForeignKey("Sku_Id");

        // InventoryItem has one Warehouse of type Warehouse
        modelBuilder.Entity<InventoryItem>()
            .HasOne(x => x.Warehouse)
            .WithMany()
            .HasForeignKey("Warehouse_Id");

        // InventoryItem has one Location of type StorageLocation
        modelBuilder.Entity<InventoryItem>()
            .HasOne(x => x.Location)
            .WithMany()
            .HasForeignKey("Location_Id");

        // InventoryItem has one Lot of type Lot
        modelBuilder.Entity<InventoryItem>()
            .HasOne(x => x.Lot)
            .WithMany()
            .HasForeignKey("Lot_Id");


        // InventoryItem has one or more SerialNumbers of type SerialNumber
        modelBuilder.Entity<SerialNumber>()
            .HasOne<InventoryItem>()
            .WithMany(parent => parent.SerialNumbers)
            .HasForeignKey("InventoryItem_Id");

        // InventoryItem has one or more Transactions of type InventoryTransaction
        modelBuilder.Entity<InventoryTransaction>()
            .HasOne<InventoryItem>()
            .WithMany(parent => parent.Transactions)
            .HasForeignKey("InventoryItem_Id");

        // InventoryItem has one or more Reservations of type Reservation
        modelBuilder.Entity<Reservation>()
            .HasOne<InventoryItem>()
            .WithMany(parent => parent.Reservations)
            .HasForeignKey("InventoryItem_Id");

        // Lot has one Sku of type StockKeepingUnit
        modelBuilder.Entity<Lot>()
            .HasOne(x => x.Sku)
            .WithMany()
            .HasForeignKey("Sku_Id");


        // Lot has one or more InventoryItems of type InventoryItem
        modelBuilder.Entity<InventoryItem>()
            .HasOne<Lot>()
            .WithMany(parent => parent.InventoryItems)
            .HasForeignKey("Lot_Id");

        // SerialNumber has one Sku of type StockKeepingUnit
        modelBuilder.Entity<SerialNumber>()
            .HasOne(x => x.Sku)
            .WithMany()
            .HasForeignKey("Sku_Id");

        // SerialNumber has one CurrentInventoryItem of type InventoryItem
        modelBuilder.Entity<SerialNumber>()
            .HasOne(x => x.CurrentInventoryItem)
            .WithMany()
            .HasForeignKey("CurrentInventoryItem_Id");

        // SerialNumber has one Lot of type Lot
        modelBuilder.Entity<SerialNumber>()
            .HasOne(x => x.Lot)
            .WithMany()
            .HasForeignKey("Lot_Id");


        // Reservation has one Sku of type StockKeepingUnit
        modelBuilder.Entity<Reservation>()
            .HasOne(x => x.Sku)
            .WithMany()
            .HasForeignKey("Sku_Id");

        // Reservation has one Warehouse of type Warehouse
        modelBuilder.Entity<Reservation>()
            .HasOne(x => x.Warehouse)
            .WithMany()
            .HasForeignKey("Warehouse_Id");

        // Reservation has one Location of type StorageLocation
        modelBuilder.Entity<Reservation>()
            .HasOne(x => x.Location)
            .WithMany()
            .HasForeignKey("Location_Id");

        // Reservation has one InventoryItem of type InventoryItem
        modelBuilder.Entity<Reservation>()
            .HasOne(x => x.InventoryItem)
            .WithMany()
            .HasForeignKey("InventoryItem_Id");

        // Reservation has one Lot of type Lot
        modelBuilder.Entity<Reservation>()
            .HasOne(x => x.Lot)
            .WithMany()
            .HasForeignKey("Lot_Id");

        // Reservation has one DemandSignal of type DemandSignal
        modelBuilder.Entity<Reservation>()
            .HasOne(x => x.DemandSignal)
            .WithMany()
            .HasForeignKey("DemandSignal_Id");


        // Reservation has one or more SerialNumbers of type SerialNumber
        modelBuilder.Entity<SerialNumber>()
            .HasOne<Reservation>()
            .WithMany(parent => parent.SerialNumbers)
            .HasForeignKey("Reservation_Id");

        // DemandSignal has one Sku of type StockKeepingUnit
        modelBuilder.Entity<DemandSignal>()
            .HasOne(x => x.Sku)
            .WithMany()
            .HasForeignKey("Sku_Id");


        // DemandSignal has one or more Reservations of type Reservation
        modelBuilder.Entity<Reservation>()
            .HasOne<DemandSignal>()
            .WithMany(parent => parent.Reservations)
            .HasForeignKey("DemandSignal_Id");

        // InventoryTransaction has one Sku of type StockKeepingUnit
        modelBuilder.Entity<InventoryTransaction>()
            .HasOne(x => x.Sku)
            .WithMany()
            .HasForeignKey("Sku_Id");

        // InventoryTransaction has one Warehouse of type Warehouse
        modelBuilder.Entity<InventoryTransaction>()
            .HasOne(x => x.Warehouse)
            .WithMany()
            .HasForeignKey("Warehouse_Id");

        // InventoryTransaction has one Location of type StorageLocation
        modelBuilder.Entity<InventoryTransaction>()
            .HasOne(x => x.Location)
            .WithMany()
            .HasForeignKey("Location_Id");

        // InventoryTransaction has one Lot of type Lot
        modelBuilder.Entity<InventoryTransaction>()
            .HasOne(x => x.Lot)
            .WithMany()
            .HasForeignKey("Lot_Id");

        // InventoryTransaction has one RelatedReservation of type Reservation
        modelBuilder.Entity<InventoryTransaction>()
            .HasOne(x => x.RelatedReservation)
            .WithMany()
            .HasForeignKey("RelatedReservation_Id");

        // InventoryTransaction has one TransferOrder of type TransferOrder
        modelBuilder.Entity<InventoryTransaction>()
            .HasOne(x => x.TransferOrder)
            .WithMany()
            .HasForeignKey("TransferOrder_Id");

        // InventoryTransaction has one Adjustment of type StockAdjustment
        modelBuilder.Entity<InventoryTransaction>()
            .HasOne(x => x.Adjustment)
            .WithMany()
            .HasForeignKey("Adjustment_Id");

        // InventoryTransaction has one CycleCount of type CycleCount
        modelBuilder.Entity<InventoryTransaction>()
            .HasOne(x => x.CycleCount)
            .WithMany()
            .HasForeignKey("CycleCount_Id");


        // InventoryTransaction has one or more SerialNumbers of type SerialNumber
        modelBuilder.Entity<SerialNumber>()
            .HasOne<InventoryTransaction>()
            .WithMany(parent => parent.SerialNumbers)
            .HasForeignKey("InventoryTransaction_Id");

        // TransferOrder has one OriginWarehouse of type Warehouse
        modelBuilder.Entity<TransferOrder>()
            .HasOne(x => x.OriginWarehouse)
            .WithMany()
            .HasForeignKey("OriginWarehouse_Id");

        // TransferOrder has one DestinationWarehouse of type Warehouse
        modelBuilder.Entity<TransferOrder>()
            .HasOne(x => x.DestinationWarehouse)
            .WithMany()
            .HasForeignKey("DestinationWarehouse_Id");


        // TransferOrder has one or more Lines of type TransferOrderLine
        modelBuilder.Entity<TransferOrderLine>()
            .HasOne<TransferOrder>()
            .WithMany(parent => parent.Lines)
            .HasForeignKey("TransferOrder_Id");

        // TransferOrder has one or more Transactions of type InventoryTransaction
        modelBuilder.Entity<InventoryTransaction>()
            .HasOne<TransferOrder>()
            .WithMany(parent => parent.Transactions)
            .HasForeignKey("TransferOrder_Id");

        // TransferOrderLine has one TransferOrder of type TransferOrder
        modelBuilder.Entity<TransferOrderLine>()
            .HasOne(x => x.TransferOrder)
            .WithMany()
            .HasForeignKey("TransferOrder_Id");

        // TransferOrderLine has one Sku of type StockKeepingUnit
        modelBuilder.Entity<TransferOrderLine>()
            .HasOne(x => x.Sku)
            .WithMany()
            .HasForeignKey("Sku_Id");

        // TransferOrderLine has one Lot of type Lot
        modelBuilder.Entity<TransferOrderLine>()
            .HasOne(x => x.Lot)
            .WithMany()
            .HasForeignKey("Lot_Id");

        // TransferOrderLine has one FromLocation of type StorageLocation
        modelBuilder.Entity<TransferOrderLine>()
            .HasOne(x => x.FromLocation)
            .WithMany()
            .HasForeignKey("FromLocation_Id");

        // TransferOrderLine has one ToLocation of type StorageLocation
        modelBuilder.Entity<TransferOrderLine>()
            .HasOne(x => x.ToLocation)
            .WithMany()
            .HasForeignKey("ToLocation_Id");


        // TransferOrderLine has one or more SerialNumbers of type SerialNumber
        modelBuilder.Entity<SerialNumber>()
            .HasOne<TransferOrderLine>()
            .WithMany(parent => parent.SerialNumbers)
            .HasForeignKey("TransferOrderLine_Id");

        // StockAdjustment has one Warehouse of type Warehouse
        modelBuilder.Entity<StockAdjustment>()
            .HasOne(x => x.Warehouse)
            .WithMany()
            .HasForeignKey("Warehouse_Id");


        // StockAdjustment has one or more Lines of type StockAdjustmentLine
        modelBuilder.Entity<StockAdjustmentLine>()
            .HasOne<StockAdjustment>()
            .WithMany(parent => parent.Lines)
            .HasForeignKey("StockAdjustment_Id");

        // StockAdjustment has one or more Transactions of type InventoryTransaction
        modelBuilder.Entity<InventoryTransaction>()
            .HasOne<StockAdjustment>()
            .WithMany(parent => parent.Transactions)
            .HasForeignKey("StockAdjustment_Id");

        // StockAdjustmentLine has one Adjustment of type StockAdjustment
        modelBuilder.Entity<StockAdjustmentLine>()
            .HasOne(x => x.Adjustment)
            .WithMany()
            .HasForeignKey("Adjustment_Id");

        // StockAdjustmentLine has one Sku of type StockKeepingUnit
        modelBuilder.Entity<StockAdjustmentLine>()
            .HasOne(x => x.Sku)
            .WithMany()
            .HasForeignKey("Sku_Id");

        // StockAdjustmentLine has one Lot of type Lot
        modelBuilder.Entity<StockAdjustmentLine>()
            .HasOne(x => x.Lot)
            .WithMany()
            .HasForeignKey("Lot_Id");

        // StockAdjustmentLine has one Location of type StorageLocation
        modelBuilder.Entity<StockAdjustmentLine>()
            .HasOne(x => x.Location)
            .WithMany()
            .HasForeignKey("Location_Id");


        // StockAdjustmentLine has one or more SerialNumbers of type SerialNumber
        modelBuilder.Entity<SerialNumber>()
            .HasOne<StockAdjustmentLine>()
            .WithMany(parent => parent.SerialNumbers)
            .HasForeignKey("StockAdjustmentLine_Id");

        // CycleCount has one Warehouse of type Warehouse
        modelBuilder.Entity<CycleCount>()
            .HasOne(x => x.Warehouse)
            .WithMany()
            .HasForeignKey("Warehouse_Id");


        // CycleCount has one or more Locations of type StorageLocation
        modelBuilder.Entity<StorageLocation>()
            .HasOne<CycleCount>()
            .WithMany(parent => parent.Locations)
            .HasForeignKey("CycleCount_Id");

        // CycleCount has one or more Entries of type CycleCountEntry
        modelBuilder.Entity<CycleCountEntry>()
            .HasOne<CycleCount>()
            .WithMany(parent => parent.Entries)
            .HasForeignKey("CycleCount_Id");

        // CycleCount has one or more Transactions of type InventoryTransaction
        modelBuilder.Entity<InventoryTransaction>()
            .HasOne<CycleCount>()
            .WithMany(parent => parent.Transactions)
            .HasForeignKey("CycleCount_Id");

        // CycleCountEntry has one CycleCount of type CycleCount
        modelBuilder.Entity<CycleCountEntry>()
            .HasOne(x => x.CycleCount)
            .WithMany()
            .HasForeignKey("CycleCount_Id");

        // CycleCountEntry has one Sku of type StockKeepingUnit
        modelBuilder.Entity<CycleCountEntry>()
            .HasOne(x => x.Sku)
            .WithMany()
            .HasForeignKey("Sku_Id");

        // CycleCountEntry has one Lot of type Lot
        modelBuilder.Entity<CycleCountEntry>()
            .HasOne(x => x.Lot)
            .WithMany()
            .HasForeignKey("Lot_Id");

        // CycleCountEntry has one Location of type StorageLocation
        modelBuilder.Entity<CycleCountEntry>()
            .HasOne(x => x.Location)
            .WithMany()
            .HasForeignKey("Location_Id");


        // CycleCountEntry has one or more SerialNumbers of type SerialNumber
        modelBuilder.Entity<SerialNumber>()
            .HasOne<CycleCountEntry>()
            .WithMany(parent => parent.SerialNumbers)
            .HasForeignKey("CycleCountEntry_Id");

        // ReplenishmentPolicy has one Sku of type StockKeepingUnit
        modelBuilder.Entity<ReplenishmentPolicy>()
            .HasOne(x => x.Sku)
            .WithMany()
            .HasForeignKey("Sku_Id");

        // ReplenishmentPolicy has one Warehouse of type Warehouse
        modelBuilder.Entity<ReplenishmentPolicy>()
            .HasOne(x => x.Warehouse)
            .WithMany()
            .HasForeignKey("Warehouse_Id");

        // ReplenishmentPolicy has one Location of type StorageLocation
        modelBuilder.Entity<ReplenishmentPolicy>()
            .HasOne(x => x.Location)
            .WithMany()
            .HasForeignKey("Location_Id");


        // UoMConversion has one Sku of type StockKeepingUnit
        modelBuilder.Entity<UoMConversion>()
            .HasOne(x => x.Sku)
            .WithMany()
            .HasForeignKey("Sku_Id");


        // InventoryThresholdAlert has one Sku of type StockKeepingUnit
        modelBuilder.Entity<InventoryThresholdAlert>()
            .HasOne(x => x.Sku)
            .WithMany()
            .HasForeignKey("Sku_Id");

        // InventoryThresholdAlert has one Warehouse of type Warehouse
        modelBuilder.Entity<InventoryThresholdAlert>()
            .HasOne(x => x.Warehouse)
            .WithMany()
            .HasForeignKey("Warehouse_Id");

        // InventoryThresholdAlert has one Location of type StorageLocation
        modelBuilder.Entity<InventoryThresholdAlert>()
            .HasOne(x => x.Location)
            .WithMany()
            .HasForeignKey("Location_Id");

        // InventoryThresholdAlert has one RelatedPolicy of type ReplenishmentPolicy
        modelBuilder.Entity<InventoryThresholdAlert>()
            .HasOne(x => x.RelatedPolicy)
            .WithMany()
            .HasForeignKey("RelatedPolicy_Id");


        // Quarantine has one Warehouse of type Warehouse
        modelBuilder.Entity<Quarantine>()
            .HasOne(x => x.Warehouse)
            .WithMany()
            .HasForeignKey("Warehouse_Id");

        // Quarantine has one Lot of type Lot
        modelBuilder.Entity<Quarantine>()
            .HasOne(x => x.Lot)
            .WithMany()
            .HasForeignKey("Lot_Id");


        // Quarantine has one or more Items of type InventoryItem
        modelBuilder.Entity<InventoryItem>()
            .HasOne<Quarantine>()
            .WithMany(parent => parent.Items)
            .HasForeignKey("Quarantine_Id");

        // Quarantine has one or more SerialNumbers of type SerialNumber
        modelBuilder.Entity<SerialNumber>()
            .HasOne<Quarantine>()
            .WithMany(parent => parent.SerialNumbers)
            .HasForeignKey("Quarantine_Id");

        // ExpirationPolicy has one Sku of type StockKeepingUnit
        modelBuilder.Entity<ExpirationPolicy>()
            .HasOne(x => x.Sku)
            .WithMany()
            .HasForeignKey("Sku_Id");

        // ExpirationPolicy has one Warehouse of type Warehouse
        modelBuilder.Entity<ExpirationPolicy>()
            .HasOne(x => x.Warehouse)
            .WithMany()
            .HasForeignKey("Warehouse_Id");


        // InboundShipment has one Warehouse of type Warehouse
        modelBuilder.Entity<InboundShipment>()
            .HasOne(x => x.Warehouse)
            .WithMany()
            .HasForeignKey("Warehouse_Id");


        // InboundShipment has one or more Lines of type InboundShipmentLine
        modelBuilder.Entity<InboundShipmentLine>()
            .HasOne<InboundShipment>()
            .WithMany(parent => parent.Lines)
            .HasForeignKey("InboundShipment_Id");

        // InboundShipment has one or more Transactions of type InventoryTransaction
        modelBuilder.Entity<InventoryTransaction>()
            .HasOne<InboundShipment>()
            .WithMany(parent => parent.Transactions)
            .HasForeignKey("InboundShipment_Id");

        // InboundShipmentLine has one InboundShipment of type InboundShipment
        modelBuilder.Entity<InboundShipmentLine>()
            .HasOne(x => x.InboundShipment)
            .WithMany()
            .HasForeignKey("InboundShipment_Id");

        // InboundShipmentLine has one Sku of type StockKeepingUnit
        modelBuilder.Entity<InboundShipmentLine>()
            .HasOne(x => x.Sku)
            .WithMany()
            .HasForeignKey("Sku_Id");

        // InboundShipmentLine has one Lot of type Lot
        modelBuilder.Entity<InboundShipmentLine>()
            .HasOne(x => x.Lot)
            .WithMany()
            .HasForeignKey("Lot_Id");

        // InboundShipmentLine has one DestinationLocation of type StorageLocation
        modelBuilder.Entity<InboundShipmentLine>()
            .HasOne(x => x.DestinationLocation)
            .WithMany()
            .HasForeignKey("DestinationLocation_Id");


        // InboundShipmentLine has one or more SerialNumbers of type SerialNumber
        modelBuilder.Entity<SerialNumber>()
            .HasOne<InboundShipmentLine>()
            .WithMany(parent => parent.SerialNumbers)
            .HasForeignKey("InboundShipmentLine_Id");

        // OutboundAllocation has one Warehouse of type Warehouse
        modelBuilder.Entity<OutboundAllocation>()
            .HasOne(x => x.Warehouse)
            .WithMany()
            .HasForeignKey("Warehouse_Id");

        // OutboundAllocation has one Sku of type StockKeepingUnit
        modelBuilder.Entity<OutboundAllocation>()
            .HasOne(x => x.Sku)
            .WithMany()
            .HasForeignKey("Sku_Id");

        // OutboundAllocation has one InventoryItem of type InventoryItem
        modelBuilder.Entity<OutboundAllocation>()
            .HasOne(x => x.InventoryItem)
            .WithMany()
            .HasForeignKey("InventoryItem_Id");

        // OutboundAllocation has one Reservation of type Reservation
        modelBuilder.Entity<OutboundAllocation>()
            .HasOne(x => x.Reservation)
            .WithMany()
            .HasForeignKey("Reservation_Id");

        // OutboundAllocation has one Lot of type Lot
        modelBuilder.Entity<OutboundAllocation>()
            .HasOne(x => x.Lot)
            .WithMany()
            .HasForeignKey("Lot_Id");

        // OutboundAllocation has one SourceLocation of type StorageLocation
        modelBuilder.Entity<OutboundAllocation>()
            .HasOne(x => x.SourceLocation)
            .WithMany()
            .HasForeignKey("SourceLocation_Id");


        // OutboundAllocation has one or more SerialNumbers of type SerialNumber
        modelBuilder.Entity<SerialNumber>()
            .HasOne<OutboundAllocation>()
            .WithMany(parent => parent.SerialNumbers)
            .HasForeignKey("OutboundAllocation_Id");

    }
}
