using inventoryonaspdotnet.Domain;

namespace inventoryonaspdotnet.Contracts;

public class IdentifierRequest
{
    public Guid Id { get; set; }
}

public class AssociationRequest
{
    public Guid ParentId { get; set; }
    public Guid ChildId { get; set; }
}

public class MultipleAssociationRequest
{
    public Guid ParentId { get; set; }
    public List<Guid> ChildIds { get; set; } = new();
}

public class StockKeepingUnitRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual SKU? SkuCode { get; set; }
    public virtual string? Name { get; set; }
    public virtual decimal? Weight { get; set; }
    public virtual string? WeightUnit { get; set; }
    public virtual decimal? Volume { get; set; }
    public virtual string? VolumeUnit { get; set; }
    public virtual int? ShelfLifeDays { get; set; }
    public virtual bool? HazardousMaterial { get; set; }
    public virtual ItemType? ItemType { get; set; }
    public virtual UnitOfMeasure? UnitOfMeasure { get; set; }
}

public class StockKeepingUnitResponse : StockKeepingUnitRequest
{
    public static StockKeepingUnitResponse FromModel(StockKeepingUnit model)
    {
        return new StockKeepingUnitResponse
        {
            Id = model.Id,
            SkuCode = model.SkuCode,
            Name = model.Name,
            Weight = model.Weight,
            WeightUnit = model.WeightUnit,
            Volume = model.Volume,
            VolumeUnit = model.VolumeUnit,
            ShelfLifeDays = model.ShelfLifeDays,
            HazardousMaterial = model.HazardousMaterial,
            ItemType = model.ItemType,
            UnitOfMeasure = model.UnitOfMeasure,
        };
    }
}

public class WarehouseRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? Name { get; set; }
    public virtual string? Code { get; set; }
    public virtual Address? Address { get; set; }
    public virtual string? TimeZone { get; set; }
    public virtual bool? AllowsOverAllocation { get; set; }
}

public class WarehouseResponse : WarehouseRequest
{
    public static WarehouseResponse FromModel(Warehouse model)
    {
        return new WarehouseResponse
        {
            Id = model.Id,
            Name = model.Name,
            Code = model.Code,
            Address = model.Address,
            TimeZone = model.TimeZone,
            AllowsOverAllocation = model.AllowsOverAllocation,
        };
    }
}

public class StorageLocationRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? Code { get; set; }
    public virtual bool? TemperatureControlled { get; set; }
    public virtual decimal? Capacity { get; set; }
    public virtual string? CapacityUnit { get; set; }
    public virtual LocationType? LocationType { get; set; }
}

public class StorageLocationResponse : StorageLocationRequest
{
    public static StorageLocationResponse FromModel(StorageLocation model)
    {
        return new StorageLocationResponse
        {
            Id = model.Id,
            Code = model.Code,
            TemperatureControlled = model.TemperatureControlled,
            Capacity = model.Capacity,
            CapacityUnit = model.CapacityUnit,
            LocationType = model.LocationType,
        };
    }
}

public class InventoryItemRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual decimal? QuantityOnHand { get; set; }
    public virtual decimal? QuantityAvailable { get; set; }
    public virtual decimal? QuantityReserved { get; set; }
    public virtual Money? UnitCost { get; set; }
    public virtual DateOnly? LastUpdated { get; set; }
    public virtual StockStatus? StockStatus { get; set; }
}

public class InventoryItemResponse : InventoryItemRequest
{
    public static InventoryItemResponse FromModel(InventoryItem model)
    {
        return new InventoryItemResponse
        {
            Id = model.Id,
            QuantityOnHand = model.QuantityOnHand,
            QuantityAvailable = model.QuantityAvailable,
            QuantityReserved = model.QuantityReserved,
            UnitCost = model.UnitCost,
            LastUpdated = model.LastUpdated,
            StockStatus = model.StockStatus,
        };
    }
}

public class LotRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual BatchNumber? BatchNumber { get; set; }
    public virtual DateOnly? ManufactureDate { get; set; }
    public virtual DateOnly? ExpirationDate { get; set; }
    public virtual LotStatus? LotStatus { get; set; }
}

public class LotResponse : LotRequest
{
    public static LotResponse FromModel(Lot model)
    {
        return new LotResponse
        {
            Id = model.Id,
            BatchNumber = model.BatchNumber,
            ManufactureDate = model.ManufactureDate,
            ExpirationDate = model.ExpirationDate,
            LotStatus = model.LotStatus,
        };
    }
}

public class SerialNumberRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual SerialCode? Serial { get; set; }
    public virtual DateOnly? ActivationDate { get; set; }
    public virtual SerialStatus? Status { get; set; }
}

public class SerialNumberResponse : SerialNumberRequest
{
    public static SerialNumberResponse FromModel(SerialNumber model)
    {
        return new SerialNumberResponse
        {
            Id = model.Id,
            Serial = model.Serial,
            ActivationDate = model.ActivationDate,
            Status = model.Status,
        };
    }
}

public class ReservationRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? ReferenceNumber { get; set; }
    public virtual decimal? ReservedQuantity { get; set; }
    public virtual DateOnly? PromisedDate { get; set; }
    public virtual ReservationStatus? ReservationStatus { get; set; }
    public virtual ReservationType? ReservationType { get; set; }
}

public class ReservationResponse : ReservationRequest
{
    public static ReservationResponse FromModel(Reservation model)
    {
        return new ReservationResponse
        {
            Id = model.Id,
            ReferenceNumber = model.ReferenceNumber,
            ReservedQuantity = model.ReservedQuantity,
            PromisedDate = model.PromisedDate,
            ReservationStatus = model.ReservationStatus,
            ReservationType = model.ReservationType,
        };
    }
}

public class DemandSignalRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? ExternalReference { get; set; }
    public virtual DateOnly? RequestedDate { get; set; }
    public virtual decimal? Quantity { get; set; }
    public virtual DemandType? DemandType { get; set; }
}

public class DemandSignalResponse : DemandSignalRequest
{
    public static DemandSignalResponse FromModel(DemandSignal model)
    {
        return new DemandSignalResponse
        {
            Id = model.Id,
            ExternalReference = model.ExternalReference,
            RequestedDate = model.RequestedDate,
            Quantity = model.Quantity,
            DemandType = model.DemandType,
        };
    }
}

public class InventoryTransactionRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? TransactionNumber { get; set; }
    public virtual decimal? Quantity { get; set; }
    public virtual Money? UnitCost { get; set; }
    public virtual DateOnly? TransactionDate { get; set; }
    public virtual string? ReasonCode { get; set; }
    public virtual TransactionType? TransactionType { get; set; }
    public virtual UnitOfMeasure? UnitOfMeasure { get; set; }
    public virtual TransactionStatus? Status { get; set; }
}

public class InventoryTransactionResponse : InventoryTransactionRequest
{
    public static InventoryTransactionResponse FromModel(InventoryTransaction model)
    {
        return new InventoryTransactionResponse
        {
            Id = model.Id,
            TransactionNumber = model.TransactionNumber,
            Quantity = model.Quantity,
            UnitCost = model.UnitCost,
            TransactionDate = model.TransactionDate,
            ReasonCode = model.ReasonCode,
            TransactionType = model.TransactionType,
            UnitOfMeasure = model.UnitOfMeasure,
            Status = model.Status,
        };
    }
}

public class TransferOrderRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? OrderNumber { get; set; }
    public virtual DateOnly? RequestedShipDate { get; set; }
    public virtual DateOnly? RequestedReceiveDate { get; set; }
    public virtual DateOnly? ShippedDate { get; set; }
    public virtual DateOnly? ReceivedDate { get; set; }
    public virtual TransferOrderStatus? Status { get; set; }
}

public class TransferOrderResponse : TransferOrderRequest
{
    public static TransferOrderResponse FromModel(TransferOrder model)
    {
        return new TransferOrderResponse
        {
            Id = model.Id,
            OrderNumber = model.OrderNumber,
            RequestedShipDate = model.RequestedShipDate,
            RequestedReceiveDate = model.RequestedReceiveDate,
            ShippedDate = model.ShippedDate,
            ReceivedDate = model.ReceivedDate,
            Status = model.Status,
        };
    }
}

public class TransferOrderLineRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual int? LineNumber { get; set; }
    public virtual decimal? Quantity { get; set; }
    public virtual UnitOfMeasure? UnitOfMeasure { get; set; }
    public virtual StockStatus? StockStatus { get; set; }
}

public class TransferOrderLineResponse : TransferOrderLineRequest
{
    public static TransferOrderLineResponse FromModel(TransferOrderLine model)
    {
        return new TransferOrderLineResponse
        {
            Id = model.Id,
            LineNumber = model.LineNumber,
            Quantity = model.Quantity,
            UnitOfMeasure = model.UnitOfMeasure,
            StockStatus = model.StockStatus,
        };
    }
}

public class StockAdjustmentRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? AdjustmentNumber { get; set; }
    public virtual string? Reason { get; set; }
    public virtual DateOnly? AdjustmentDate { get; set; }
    public virtual AdjustmentType? AdjustmentType { get; set; }
    public virtual AdjustmentStatus? Status { get; set; }
}

public class StockAdjustmentResponse : StockAdjustmentRequest
{
    public static StockAdjustmentResponse FromModel(StockAdjustment model)
    {
        return new StockAdjustmentResponse
        {
            Id = model.Id,
            AdjustmentNumber = model.AdjustmentNumber,
            Reason = model.Reason,
            AdjustmentDate = model.AdjustmentDate,
            AdjustmentType = model.AdjustmentType,
            Status = model.Status,
        };
    }
}

public class StockAdjustmentLineRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual int? LineNumber { get; set; }
    public virtual decimal? Quantity { get; set; }
    public virtual UnitOfMeasure? UnitOfMeasure { get; set; }
    public virtual StockStatus? StockStatus { get; set; }
}

public class StockAdjustmentLineResponse : StockAdjustmentLineRequest
{
    public static StockAdjustmentLineResponse FromModel(StockAdjustmentLine model)
    {
        return new StockAdjustmentLineResponse
        {
            Id = model.Id,
            LineNumber = model.LineNumber,
            Quantity = model.Quantity,
            UnitOfMeasure = model.UnitOfMeasure,
            StockStatus = model.StockStatus,
        };
    }
}

public class CycleCountRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? CountNumber { get; set; }
    public virtual DateOnly? ScheduledDate { get; set; }
    public virtual DateOnly? PerformedDate { get; set; }
    public virtual string? ApprovedBy { get; set; }
    public virtual CountStatus? Status { get; set; }
}

public class CycleCountResponse : CycleCountRequest
{
    public static CycleCountResponse FromModel(CycleCount model)
    {
        return new CycleCountResponse
        {
            Id = model.Id,
            CountNumber = model.CountNumber,
            ScheduledDate = model.ScheduledDate,
            PerformedDate = model.PerformedDate,
            ApprovedBy = model.ApprovedBy,
            Status = model.Status,
        };
    }
}

public class CycleCountEntryRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual int? LineNumber { get; set; }
    public virtual decimal? SystemQuantity { get; set; }
    public virtual decimal? CountedQuantity { get; set; }
    public virtual decimal? VarianceQuantity { get; set; }
    public virtual bool? RecountRequired { get; set; }
    public virtual StockStatus? StockStatus { get; set; }
}

public class CycleCountEntryResponse : CycleCountEntryRequest
{
    public static CycleCountEntryResponse FromModel(CycleCountEntry model)
    {
        return new CycleCountEntryResponse
        {
            Id = model.Id,
            LineNumber = model.LineNumber,
            SystemQuantity = model.SystemQuantity,
            CountedQuantity = model.CountedQuantity,
            VarianceQuantity = model.VarianceQuantity,
            RecountRequired = model.RecountRequired,
            StockStatus = model.StockStatus,
        };
    }
}

public class ReplenishmentPolicyRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual decimal? MinLevel { get; set; }
    public virtual decimal? MaxLevel { get; set; }
    public virtual decimal? ReorderPoint { get; set; }
    public virtual decimal? ReorderQuantity { get; set; }
    public virtual int? LeadTimeDays { get; set; }
    public virtual int? ReviewPeriodDays { get; set; }
    public virtual ReplenishmentPolicyType? PolicyType { get; set; }
}

public class ReplenishmentPolicyResponse : ReplenishmentPolicyRequest
{
    public static ReplenishmentPolicyResponse FromModel(ReplenishmentPolicy model)
    {
        return new ReplenishmentPolicyResponse
        {
            Id = model.Id,
            MinLevel = model.MinLevel,
            MaxLevel = model.MaxLevel,
            ReorderPoint = model.ReorderPoint,
            ReorderQuantity = model.ReorderQuantity,
            LeadTimeDays = model.LeadTimeDays,
            ReviewPeriodDays = model.ReviewPeriodDays,
            PolicyType = model.PolicyType,
        };
    }
}

public class UoMConversionRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual decimal? Factor { get; set; }
    public virtual int? Precision { get; set; }
    public virtual UnitOfMeasure? FromUnit { get; set; }
    public virtual UnitOfMeasure? ToUnit { get; set; }
}

public class UoMConversionResponse : UoMConversionRequest
{
    public static UoMConversionResponse FromModel(UoMConversion model)
    {
        return new UoMConversionResponse
        {
            Id = model.Id,
            Factor = model.Factor,
            Precision = model.Precision,
            FromUnit = model.FromUnit,
            ToUnit = model.ToUnit,
        };
    }
}

public class InventoryThresholdAlertRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? AlertNumber { get; set; }
    public virtual DateOnly? DetectedAt { get; set; }
    public virtual string? Message { get; set; }
    public virtual InventoryAlertType? AlertType { get; set; }
    public virtual AlertStatus? Status { get; set; }
}

public class InventoryThresholdAlertResponse : InventoryThresholdAlertRequest
{
    public static InventoryThresholdAlertResponse FromModel(InventoryThresholdAlert model)
    {
        return new InventoryThresholdAlertResponse
        {
            Id = model.Id,
            AlertNumber = model.AlertNumber,
            DetectedAt = model.DetectedAt,
            Message = model.Message,
            AlertType = model.AlertType,
            Status = model.Status,
        };
    }
}

public class QuarantineRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? Reason { get; set; }
    public virtual DateOnly? StartedAt { get; set; }
    public virtual DateOnly? ReleasedAt { get; set; }
    public virtual Disposition? Disposition { get; set; }
}

public class QuarantineResponse : QuarantineRequest
{
    public static QuarantineResponse FromModel(Quarantine model)
    {
        return new QuarantineResponse
        {
            Id = model.Id,
            Reason = model.Reason,
            StartedAt = model.StartedAt,
            ReleasedAt = model.ReleasedAt,
            Disposition = model.Disposition,
        };
    }
}

public class ExpirationPolicyRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual int? RejectIfDaysToExpireLessThan { get; set; }
    public virtual int? AutoQuarantineDaysToExpire { get; set; }
    public virtual RotationMethod? RotationMethod { get; set; }
}

public class ExpirationPolicyResponse : ExpirationPolicyRequest
{
    public static ExpirationPolicyResponse FromModel(ExpirationPolicy model)
    {
        return new ExpirationPolicyResponse
        {
            Id = model.Id,
            RejectIfDaysToExpireLessThan = model.RejectIfDaysToExpireLessThan,
            AutoQuarantineDaysToExpire = model.AutoQuarantineDaysToExpire,
            RotationMethod = model.RotationMethod,
        };
    }
}

public class InboundShipmentRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? ShipmentNumber { get; set; }
    public virtual DateOnly? ExpectedArrivalDate { get; set; }
    public virtual DateOnly? ArrivalDate { get; set; }
    public virtual string? CarrierName { get; set; }
    public virtual InboundShipmentStatus? Status { get; set; }
}

public class InboundShipmentResponse : InboundShipmentRequest
{
    public static InboundShipmentResponse FromModel(InboundShipment model)
    {
        return new InboundShipmentResponse
        {
            Id = model.Id,
            ShipmentNumber = model.ShipmentNumber,
            ExpectedArrivalDate = model.ExpectedArrivalDate,
            ArrivalDate = model.ArrivalDate,
            CarrierName = model.CarrierName,
            Status = model.Status,
        };
    }
}

public class InboundShipmentLineRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual int? LineNumber { get; set; }
    public virtual decimal? Quantity { get; set; }
    public virtual UnitOfMeasure? UnitOfMeasure { get; set; }
    public virtual StockStatus? StockStatus { get; set; }
}

public class InboundShipmentLineResponse : InboundShipmentLineRequest
{
    public static InboundShipmentLineResponse FromModel(InboundShipmentLine model)
    {
        return new InboundShipmentLineResponse
        {
            Id = model.Id,
            LineNumber = model.LineNumber,
            Quantity = model.Quantity,
            UnitOfMeasure = model.UnitOfMeasure,
            StockStatus = model.StockStatus,
        };
    }
}

public class OutboundAllocationRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public virtual string? AllocationNumber { get; set; }
    public virtual decimal? AllocatedQuantity { get; set; }
    public virtual DateOnly? AllocationDate { get; set; }
    public virtual AllocationStatus? Status { get; set; }
}

public class OutboundAllocationResponse : OutboundAllocationRequest
{
    public static OutboundAllocationResponse FromModel(OutboundAllocation model)
    {
        return new OutboundAllocationResponse
        {
            Id = model.Id,
            AllocationNumber = model.AllocationNumber,
            AllocatedQuantity = model.AllocatedQuantity,
            AllocationDate = model.AllocationDate,
            Status = model.Status,
        };
    }
}

