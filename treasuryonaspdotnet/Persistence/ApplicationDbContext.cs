using Microsoft.EntityFrameworkCore;

using treasuryonaspdotnet.Domain;

namespace treasuryonaspdotnet.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<TreasuryUnit> TreasuryUnits => Set<TreasuryUnit>();
    public DbSet<TradingBook> TradingBooks => Set<TradingBook>();
    public DbSet<Portfolio> Portfolios => Set<Portfolio>();
    public DbSet<Counterparty> Counterpartys => Set<Counterparty>();
    public DbSet<NettingAgreement> NettingAgreements => Set<NettingAgreement>();
    public DbSet<CollateralAgreement> CollateralAgreements => Set<CollateralAgreement>();
    public DbSet<CollateralAccount> CollateralAccounts => Set<CollateralAccount>();
    public DbSet<MarginCall> MarginCalls => Set<MarginCall>();
    public DbSet<BankAccount> BankAccounts => Set<BankAccount>();
    public DbSet<CashPosition> CashPositions => Set<CashPosition>();
    public DbSet<CashFlow> CashFlows => Set<CashFlow>();
    public DbSet<Trade> Trades => Set<Trade>();
    public DbSet<SettlementInstruction> SettlementInstructions => Set<SettlementInstruction>();
    public DbSet<FundingProgram> FundingPrograms => Set<FundingProgram>();
    public DbSet<Issuance> Issuances => Set<Issuance>();
    public DbSet<Position> Positions => Set<Position>();
    public DbSet<RiskLimit> RiskLimits => Set<RiskLimit>();
    public DbSet<LimitBreach> LimitBreachs => Set<LimitBreach>();
    public DbSet<Approval> Approvals => Set<Approval>();
    public DbSet<TreasuryPolicy> TreasuryPolicys => Set<TreasuryPolicy>();
    public DbSet<MarketDataSet> MarketDataSets => Set<MarketDataSet>();
    public DbSet<YieldCurve> YieldCurves => Set<YieldCurve>();
    public DbSet<CurveQuote> CurveQuotes => Set<CurveQuote>();
    public DbSet<FXRate> FXRates => Set<FXRate>();
    public DbSet<VolSurface> VolSurfaces => Set<VolSurface>();
    public DbSet<RiskReport> RiskReports => Set<RiskReport>();
    public DbSet<RegulatoryMetric> RegulatoryMetrics => Set<RegulatoryMetric>();
    public DbSet<LiquidityBuffer> LiquidityBuffers => Set<LiquidityBuffer>();
    public DbSet<BufferAsset> BufferAssets => Set<BufferAsset>();
    public DbSet<TransferPricingRule> TransferPricingRules => Set<TransferPricingRule>();
    public DbSet<InternalDeal> InternalDeals => Set<InternalDeal>();
    public DbSet<HedgeRelationship> HedgeRelationships => Set<HedgeRelationship>();
    public DbSet<AccountingEntry> AccountingEntrys => Set<AccountingEntry>();
    public DbSet<StressScenario> StressScenarios => Set<StressScenario>();
    public DbSet<StressResult> StressResults => Set<StressResult>();
    public DbSet<BusinessCalendar> BusinessCalendars => Set<BusinessCalendar>();
    public DbSet<Holiday> Holidays => Set<Holiday>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);


        // TreasuryUnit has one or more TradingBooks of type TradingBook
        modelBuilder.Entity<TradingBook>()
            .HasOne<TreasuryUnit>()
            .WithMany(parent => parent.TradingBooks)
            .HasForeignKey("TradingBooks_Id");

        // TreasuryUnit has one or more BankAccounts of type BankAccount
        modelBuilder.Entity<BankAccount>()
            .HasOne<TreasuryUnit>()
            .WithMany(parent => parent.BankAccounts)
            .HasForeignKey("BankAccounts_Id");

        // TreasuryUnit has one or more Policies of type TreasuryPolicy
        modelBuilder.Entity<TreasuryPolicy>()
            .HasOne<TreasuryUnit>()
            .WithMany(parent => parent.Policies)
            .HasForeignKey("Policies_Id");

        // TreasuryUnit has one or more TransferPricingRules of type TransferPricingRule
        modelBuilder.Entity<TransferPricingRule>()
            .HasOne<TreasuryUnit>()
            .WithMany(parent => parent.TransferPricingRules)
            .HasForeignKey("TransferPricingRules_Id");

        // TreasuryUnit has one or more InternalDealsOut of type InternalDeal
        modelBuilder.Entity<InternalDeal>()
            .HasOne<TreasuryUnit>()
            .WithMany(parent => parent.InternalDealsOut)
            .HasForeignKey("InternalDealsOut_Id");

        // TreasuryUnit has one or more InternalDealsIn of type InternalDeal
        modelBuilder.Entity<InternalDeal>()
            .HasOne<TreasuryUnit>()
            .WithMany(parent => parent.InternalDealsIn)
            .HasForeignKey("InternalDealsIn_Id");

        // TradingBook has one TreasuryUnit of type TreasuryUnit
        modelBuilder.Entity<TradingBook>()
            .HasOne(x => x.TreasuryUnit)
            .WithMany()
            .HasForeignKey("TreasuryUnit_Id");


        // TradingBook has one or more Portfolios of type Portfolio
        modelBuilder.Entity<Portfolio>()
            .HasOne<TradingBook>()
            .WithMany(parent => parent.Portfolios)
            .HasForeignKey("Portfolios_Id");

        // TradingBook has one or more Limits of type RiskLimit
        modelBuilder.Entity<RiskLimit>()
            .HasOne<TradingBook>()
            .WithMany(parent => parent.Limits)
            .HasForeignKey("Limits_Id");

        // TradingBook has one or more Trades of type Trade
        modelBuilder.Entity<Trade>()
            .HasOne<TradingBook>()
            .WithMany(parent => parent.Trades)
            .HasForeignKey("Trades_Id");

        // Portfolio has one TradingBook of type TradingBook
        modelBuilder.Entity<Portfolio>()
            .HasOne(x => x.TradingBook)
            .WithMany()
            .HasForeignKey("TradingBook_Id");


        // Portfolio has one or more Positions of type Position
        modelBuilder.Entity<Position>()
            .HasOne<Portfolio>()
            .WithMany(parent => parent.Positions)
            .HasForeignKey("Positions_Id");

        // Portfolio has one or more Trades of type Trade
        modelBuilder.Entity<Trade>()
            .HasOne<Portfolio>()
            .WithMany(parent => parent.Trades)
            .HasForeignKey("Trades_Id");

        // Portfolio has one or more RiskReports of type RiskReport
        modelBuilder.Entity<RiskReport>()
            .HasOne<Portfolio>()
            .WithMany(parent => parent.RiskReports)
            .HasForeignKey("RiskReports_Id");

        // Portfolio has one or more RiskLimits of type RiskLimit
        modelBuilder.Entity<RiskLimit>()
            .HasOne<Portfolio>()
            .WithMany(parent => parent.RiskLimits)
            .HasForeignKey("RiskLimits_Id");

        // Portfolio has one or more LiquidityBuffers of type LiquidityBuffer
        modelBuilder.Entity<LiquidityBuffer>()
            .HasOne<Portfolio>()
            .WithMany(parent => parent.LiquidityBuffers)
            .HasForeignKey("LiquidityBuffers_Id");


        // Counterparty has one or more NettingAgreements of type NettingAgreement
        modelBuilder.Entity<NettingAgreement>()
            .HasOne<Counterparty>()
            .WithMany(parent => parent.NettingAgreements)
            .HasForeignKey("NettingAgreements_Id");

        // Counterparty has one or more Trades of type Trade
        modelBuilder.Entity<Trade>()
            .HasOne<Counterparty>()
            .WithMany(parent => parent.Trades)
            .HasForeignKey("Trades_Id");

        // Counterparty has one or more CollateralAgreements of type CollateralAgreement
        modelBuilder.Entity<CollateralAgreement>()
            .HasOne<Counterparty>()
            .WithMany(parent => parent.CollateralAgreements)
            .HasForeignKey("CollateralAgreements_Id");

        // Counterparty has one or more Limits of type RiskLimit
        modelBuilder.Entity<RiskLimit>()
            .HasOne<Counterparty>()
            .WithMany(parent => parent.Limits)
            .HasForeignKey("Limits_Id");

        // Counterparty has one or more MarginCalls of type MarginCall
        modelBuilder.Entity<MarginCall>()
            .HasOne<Counterparty>()
            .WithMany(parent => parent.MarginCalls)
            .HasForeignKey("MarginCalls_Id");

        // Counterparty has one or more SettlementInstructions of type SettlementInstruction
        modelBuilder.Entity<SettlementInstruction>()
            .HasOne<Counterparty>()
            .WithMany(parent => parent.SettlementInstructions)
            .HasForeignKey("SettlementInstructions_Id");

        // NettingAgreement has one Counterparty of type Counterparty
        modelBuilder.Entity<NettingAgreement>()
            .HasOne(x => x.Counterparty)
            .WithMany()
            .HasForeignKey("Counterparty_Id");


        // NettingAgreement has one or more CollateralAgreements of type CollateralAgreement
        modelBuilder.Entity<CollateralAgreement>()
            .HasOne<NettingAgreement>()
            .WithMany(parent => parent.CollateralAgreements)
            .HasForeignKey("CollateralAgreements_Id");

        // NettingAgreement has one or more Trades of type Trade
        modelBuilder.Entity<Trade>()
            .HasOne<NettingAgreement>()
            .WithMany(parent => parent.Trades)
            .HasForeignKey("Trades_Id");

        // CollateralAgreement has one NettingAgreement of type NettingAgreement
        modelBuilder.Entity<CollateralAgreement>()
            .HasOne(x => x.NettingAgreement)
            .WithMany()
            .HasForeignKey("NettingAgreement_Id");

        // CollateralAgreement has one Counterparty of type Counterparty
        modelBuilder.Entity<CollateralAgreement>()
            .HasOne(x => x.Counterparty)
            .WithMany()
            .HasForeignKey("Counterparty_Id");


        // CollateralAgreement has one or more MarginCalls of type MarginCall
        modelBuilder.Entity<MarginCall>()
            .HasOne<CollateralAgreement>()
            .WithMany(parent => parent.MarginCalls)
            .HasForeignKey("MarginCalls_Id");

        // CollateralAgreement has one or more CollateralAccounts of type CollateralAccount
        modelBuilder.Entity<CollateralAccount>()
            .HasOne<CollateralAgreement>()
            .WithMany(parent => parent.CollateralAccounts)
            .HasForeignKey("CollateralAccounts_Id");

        // CollateralAccount has one CollateralAgreement of type CollateralAgreement
        modelBuilder.Entity<CollateralAccount>()
            .HasOne(x => x.CollateralAgreement)
            .WithMany()
            .HasForeignKey("CollateralAgreement_Id");


        // CollateralAccount has one or more Trades of type Trade
        modelBuilder.Entity<Trade>()
            .HasOne<CollateralAccount>()
            .WithMany(parent => parent.Trades)
            .HasForeignKey("Trades_Id");

        // CollateralAccount has one or more MarginCalls of type MarginCall
        modelBuilder.Entity<MarginCall>()
            .HasOne<CollateralAccount>()
            .WithMany(parent => parent.MarginCalls)
            .HasForeignKey("MarginCalls_Id");

        // MarginCall has one CollateralAgreement of type CollateralAgreement
        modelBuilder.Entity<MarginCall>()
            .HasOne(x => x.CollateralAgreement)
            .WithMany()
            .HasForeignKey("CollateralAgreement_Id");

        // MarginCall has one CollateralAccount of type CollateralAccount
        modelBuilder.Entity<MarginCall>()
            .HasOne(x => x.CollateralAccount)
            .WithMany()
            .HasForeignKey("CollateralAccount_Id");

        // MarginCall has one Counterparty of type Counterparty
        modelBuilder.Entity<MarginCall>()
            .HasOne(x => x.Counterparty)
            .WithMany()
            .HasForeignKey("Counterparty_Id");


        // MarginCall has one or more CashFlows of type CashFlow
        modelBuilder.Entity<CashFlow>()
            .HasOne<MarginCall>()
            .WithMany(parent => parent.CashFlows)
            .HasForeignKey("CashFlows_Id");

        // BankAccount has one TreasuryUnit of type TreasuryUnit
        modelBuilder.Entity<BankAccount>()
            .HasOne(x => x.TreasuryUnit)
            .WithMany()
            .HasForeignKey("TreasuryUnit_Id");


        // BankAccount has one or more CashPositions of type CashPosition
        modelBuilder.Entity<CashPosition>()
            .HasOne<BankAccount>()
            .WithMany(parent => parent.CashPositions)
            .HasForeignKey("CashPositions_Id");

        // BankAccount has one or more CashFlows of type CashFlow
        modelBuilder.Entity<CashFlow>()
            .HasOne<BankAccount>()
            .WithMany(parent => parent.CashFlows)
            .HasForeignKey("CashFlows_Id");

        // BankAccount has one or more SettlementInstructions of type SettlementInstruction
        modelBuilder.Entity<SettlementInstruction>()
            .HasOne<BankAccount>()
            .WithMany(parent => parent.SettlementInstructions)
            .HasForeignKey("SettlementInstructions_Id");

        // CashPosition has one BankAccount of type BankAccount
        modelBuilder.Entity<CashPosition>()
            .HasOne(x => x.BankAccount)
            .WithMany()
            .HasForeignKey("BankAccount_Id");


        // CashPosition has one or more CashFlows of type CashFlow
        modelBuilder.Entity<CashFlow>()
            .HasOne<CashPosition>()
            .WithMany(parent => parent.CashFlows)
            .HasForeignKey("CashFlows_Id");

        // CashFlow has one Trade of type Trade
        modelBuilder.Entity<CashFlow>()
            .HasOne(x => x.Trade)
            .WithMany()
            .HasForeignKey("Trade_Id");

        // CashFlow has one CashPosition of type CashPosition
        modelBuilder.Entity<CashFlow>()
            .HasOne(x => x.CashPosition)
            .WithMany()
            .HasForeignKey("CashPosition_Id");

        // CashFlow has one MarginCall of type MarginCall
        modelBuilder.Entity<CashFlow>()
            .HasOne(x => x.MarginCall)
            .WithMany()
            .HasForeignKey("MarginCall_Id");

        // CashFlow has one BankAccount of type BankAccount
        modelBuilder.Entity<CashFlow>()
            .HasOne(x => x.BankAccount)
            .WithMany()
            .HasForeignKey("BankAccount_Id");


        // Trade has one Counterparty of type Counterparty
        modelBuilder.Entity<Trade>()
            .HasOne(x => x.Counterparty)
            .WithMany()
            .HasForeignKey("Counterparty_Id");

        // Trade has one Portfolio of type Portfolio
        modelBuilder.Entity<Trade>()
            .HasOne(x => x.Portfolio)
            .WithMany()
            .HasForeignKey("Portfolio_Id");

        // Trade has one SettlementInstruction of type SettlementInstruction
        modelBuilder.Entity<Trade>()
            .HasOne(x => x.SettlementInstruction)
            .WithMany()
            .HasForeignKey("SettlementInstruction_Id");

        // Trade has one CollateralAccount of type CollateralAccount
        modelBuilder.Entity<Trade>()
            .HasOne(x => x.CollateralAccount)
            .WithMany()
            .HasForeignKey("CollateralAccount_Id");

        // Trade has one HedgeRelationship of type HedgeRelationship
        modelBuilder.Entity<Trade>()
            .HasOne(x => x.HedgeRelationship)
            .WithMany()
            .HasForeignKey("HedgeRelationship_Id");


        // Trade has one or more CashFlows of type CashFlow
        modelBuilder.Entity<CashFlow>()
            .HasOne<Trade>()
            .WithMany(parent => parent.CashFlows)
            .HasForeignKey("CashFlows_Id");

        // SettlementInstruction has one Trade of type Trade
        modelBuilder.Entity<SettlementInstruction>()
            .HasOne(x => x.Trade)
            .WithMany()
            .HasForeignKey("Trade_Id");

        // SettlementInstruction has one Counterparty of type Counterparty
        modelBuilder.Entity<SettlementInstruction>()
            .HasOne(x => x.Counterparty)
            .WithMany()
            .HasForeignKey("Counterparty_Id");

        // SettlementInstruction has one BankAccount of type BankAccount
        modelBuilder.Entity<SettlementInstruction>()
            .HasOne(x => x.BankAccount)
            .WithMany()
            .HasForeignKey("BankAccount_Id");


        // FundingProgram has one TreasuryUnit of type TreasuryUnit
        modelBuilder.Entity<FundingProgram>()
            .HasOne(x => x.TreasuryUnit)
            .WithMany()
            .HasForeignKey("TreasuryUnit_Id");


        // FundingProgram has one or more Issuances of type Issuance
        modelBuilder.Entity<Issuance>()
            .HasOne<FundingProgram>()
            .WithMany(parent => parent.Issuances)
            .HasForeignKey("Issuances_Id");

        // Issuance has one FundingProgram of type FundingProgram
        modelBuilder.Entity<Issuance>()
            .HasOne(x => x.FundingProgram)
            .WithMany()
            .HasForeignKey("FundingProgram_Id");

        // Issuance has one Portfolio of type Portfolio
        modelBuilder.Entity<Issuance>()
            .HasOne(x => x.Portfolio)
            .WithMany()
            .HasForeignKey("Portfolio_Id");


        // Issuance has one or more CashFlows of type CashFlow
        modelBuilder.Entity<CashFlow>()
            .HasOne<Issuance>()
            .WithMany(parent => parent.CashFlows)
            .HasForeignKey("CashFlows_Id");

        // Position has one Portfolio of type Portfolio
        modelBuilder.Entity<Position>()
            .HasOne(x => x.Portfolio)
            .WithMany()
            .HasForeignKey("Portfolio_Id");

        // Position has one Trade of type Trade
        modelBuilder.Entity<Position>()
            .HasOne(x => x.Trade)
            .WithMany()
            .HasForeignKey("Trade_Id");


        // RiskLimit has one Portfolio of type Portfolio
        modelBuilder.Entity<RiskLimit>()
            .HasOne(x => x.Portfolio)
            .WithMany()
            .HasForeignKey("Portfolio_Id");

        // RiskLimit has one Counterparty of type Counterparty
        modelBuilder.Entity<RiskLimit>()
            .HasOne(x => x.Counterparty)
            .WithMany()
            .HasForeignKey("Counterparty_Id");

        // RiskLimit has one Policy of type TreasuryPolicy
        modelBuilder.Entity<RiskLimit>()
            .HasOne(x => x.Policy)
            .WithMany()
            .HasForeignKey("Policy_Id");


        // RiskLimit has one or more Breaches of type LimitBreach
        modelBuilder.Entity<LimitBreach>()
            .HasOne<RiskLimit>()
            .WithMany(parent => parent.Breaches)
            .HasForeignKey("Breaches_Id");

        // RiskLimit has one or more Approvals of type Approval
        modelBuilder.Entity<Approval>()
            .HasOne<RiskLimit>()
            .WithMany(parent => parent.Approvals)
            .HasForeignKey("Approvals_Id");

        // LimitBreach has one RiskLimit of type RiskLimit
        modelBuilder.Entity<LimitBreach>()
            .HasOne(x => x.RiskLimit)
            .WithMany()
            .HasForeignKey("RiskLimit_Id");

        // LimitBreach has one Portfolio of type Portfolio
        modelBuilder.Entity<LimitBreach>()
            .HasOne(x => x.Portfolio)
            .WithMany()
            .HasForeignKey("Portfolio_Id");


        // LimitBreach has one or more Approvals of type Approval
        modelBuilder.Entity<Approval>()
            .HasOne<LimitBreach>()
            .WithMany(parent => parent.Approvals)
            .HasForeignKey("Approvals_Id");

        // Approval has one RiskLimit of type RiskLimit
        modelBuilder.Entity<Approval>()
            .HasOne(x => x.RiskLimit)
            .WithMany()
            .HasForeignKey("RiskLimit_Id");

        // Approval has one LimitBreach of type LimitBreach
        modelBuilder.Entity<Approval>()
            .HasOne(x => x.LimitBreach)
            .WithMany()
            .HasForeignKey("LimitBreach_Id");

        // Approval has one Policy of type TreasuryPolicy
        modelBuilder.Entity<Approval>()
            .HasOne(x => x.Policy)
            .WithMany()
            .HasForeignKey("Policy_Id");


        // TreasuryPolicy has one TreasuryUnit of type TreasuryUnit
        modelBuilder.Entity<TreasuryPolicy>()
            .HasOne(x => x.TreasuryUnit)
            .WithMany()
            .HasForeignKey("TreasuryUnit_Id");


        // TreasuryPolicy has one or more Limits of type RiskLimit
        modelBuilder.Entity<RiskLimit>()
            .HasOne<TreasuryPolicy>()
            .WithMany(parent => parent.Limits)
            .HasForeignKey("Limits_Id");

        // TreasuryPolicy has one or more Approvals of type Approval
        modelBuilder.Entity<Approval>()
            .HasOne<TreasuryPolicy>()
            .WithMany(parent => parent.Approvals)
            .HasForeignKey("Approvals_Id");


        // MarketDataSet has one or more YieldCurves of type YieldCurve
        modelBuilder.Entity<YieldCurve>()
            .HasOne<MarketDataSet>()
            .WithMany(parent => parent.YieldCurves)
            .HasForeignKey("YieldCurves_Id");

        // MarketDataSet has one or more FxRates of type FXRate
        modelBuilder.Entity<FXRate>()
            .HasOne<MarketDataSet>()
            .WithMany(parent => parent.FxRates)
            .HasForeignKey("FxRates_Id");

        // MarketDataSet has one or more VolSurfaces of type VolSurface
        modelBuilder.Entity<VolSurface>()
            .HasOne<MarketDataSet>()
            .WithMany(parent => parent.VolSurfaces)
            .HasForeignKey("VolSurfaces_Id");

        // MarketDataSet has one or more StressScenarios of type StressScenario
        modelBuilder.Entity<StressScenario>()
            .HasOne<MarketDataSet>()
            .WithMany(parent => parent.StressScenarios)
            .HasForeignKey("StressScenarios_Id");

        // YieldCurve has one MarketDataSet of type MarketDataSet
        modelBuilder.Entity<YieldCurve>()
            .HasOne(x => x.MarketDataSet)
            .WithMany()
            .HasForeignKey("MarketDataSet_Id");


        // YieldCurve has one or more Quotes of type CurveQuote
        modelBuilder.Entity<CurveQuote>()
            .HasOne<YieldCurve>()
            .WithMany(parent => parent.Quotes)
            .HasForeignKey("Quotes_Id");

        // CurveQuote has one YieldCurve of type YieldCurve
        modelBuilder.Entity<CurveQuote>()
            .HasOne(x => x.YieldCurve)
            .WithMany()
            .HasForeignKey("YieldCurve_Id");


        // FXRate has one MarketDataSet of type MarketDataSet
        modelBuilder.Entity<FXRate>()
            .HasOne(x => x.MarketDataSet)
            .WithMany()
            .HasForeignKey("MarketDataSet_Id");


        // VolSurface has one MarketDataSet of type MarketDataSet
        modelBuilder.Entity<VolSurface>()
            .HasOne(x => x.MarketDataSet)
            .WithMany()
            .HasForeignKey("MarketDataSet_Id");


        // RiskReport has one Portfolio of type Portfolio
        modelBuilder.Entity<RiskReport>()
            .HasOne(x => x.Portfolio)
            .WithMany()
            .HasForeignKey("Portfolio_Id");


        // RiskReport has one or more Positions of type Position
        modelBuilder.Entity<Position>()
            .HasOne<RiskReport>()
            .WithMany(parent => parent.Positions)
            .HasForeignKey("Positions_Id");

        // RiskReport has one or more RegulatoryMetrics of type RegulatoryMetric
        modelBuilder.Entity<RegulatoryMetric>()
            .HasOne<RiskReport>()
            .WithMany(parent => parent.RegulatoryMetrics)
            .HasForeignKey("RegulatoryMetrics_Id");

        // RegulatoryMetric has one RiskReport of type RiskReport
        modelBuilder.Entity<RegulatoryMetric>()
            .HasOne(x => x.RiskReport)
            .WithMany()
            .HasForeignKey("RiskReport_Id");

        // RegulatoryMetric has one LiquidityBuffer of type LiquidityBuffer
        modelBuilder.Entity<RegulatoryMetric>()
            .HasOne(x => x.LiquidityBuffer)
            .WithMany()
            .HasForeignKey("LiquidityBuffer_Id");


        // LiquidityBuffer has one Portfolio of type Portfolio
        modelBuilder.Entity<LiquidityBuffer>()
            .HasOne(x => x.Portfolio)
            .WithMany()
            .HasForeignKey("Portfolio_Id");


        // LiquidityBuffer has one or more Assets of type BufferAsset
        modelBuilder.Entity<BufferAsset>()
            .HasOne<LiquidityBuffer>()
            .WithMany(parent => parent.Assets)
            .HasForeignKey("Assets_Id");

        // LiquidityBuffer has one or more RegulatoryMetrics of type RegulatoryMetric
        modelBuilder.Entity<RegulatoryMetric>()
            .HasOne<LiquidityBuffer>()
            .WithMany(parent => parent.RegulatoryMetrics)
            .HasForeignKey("RegulatoryMetrics_Id");

        // BufferAsset has one LiquidityBuffer of type LiquidityBuffer
        modelBuilder.Entity<BufferAsset>()
            .HasOne(x => x.LiquidityBuffer)
            .WithMany()
            .HasForeignKey("LiquidityBuffer_Id");

        // BufferAsset has one Portfolio of type Portfolio
        modelBuilder.Entity<BufferAsset>()
            .HasOne(x => x.Portfolio)
            .WithMany()
            .HasForeignKey("Portfolio_Id");


        // TransferPricingRule has one TreasuryUnit of type TreasuryUnit
        modelBuilder.Entity<TransferPricingRule>()
            .HasOne(x => x.TreasuryUnit)
            .WithMany()
            .HasForeignKey("TreasuryUnit_Id");


        // TransferPricingRule has one or more AppliedDeals of type InternalDeal
        modelBuilder.Entity<InternalDeal>()
            .HasOne<TransferPricingRule>()
            .WithMany(parent => parent.AppliedDeals)
            .HasForeignKey("AppliedDeals_Id");

        // InternalDeal has one TransferPricingRule of type TransferPricingRule
        modelBuilder.Entity<InternalDeal>()
            .HasOne(x => x.TransferPricingRule)
            .WithMany()
            .HasForeignKey("TransferPricingRule_Id");

        // InternalDeal has one FromUnit of type TreasuryUnit
        modelBuilder.Entity<InternalDeal>()
            .HasOne(x => x.FromUnit)
            .WithMany()
            .HasForeignKey("FromUnit_Id");

        // InternalDeal has one ToUnit of type TreasuryUnit
        modelBuilder.Entity<InternalDeal>()
            .HasOne(x => x.ToUnit)
            .WithMany()
            .HasForeignKey("ToUnit_Id");

        // InternalDeal has one Portfolio of type Portfolio
        modelBuilder.Entity<InternalDeal>()
            .HasOne(x => x.Portfolio)
            .WithMany()
            .HasForeignKey("Portfolio_Id");


        // InternalDeal has one or more CashFlows of type CashFlow
        modelBuilder.Entity<CashFlow>()
            .HasOne<InternalDeal>()
            .WithMany(parent => parent.CashFlows)
            .HasForeignKey("CashFlows_Id");

        // HedgeRelationship has one HedgedItem of type Trade
        modelBuilder.Entity<HedgeRelationship>()
            .HasOne(x => x.HedgedItem)
            .WithMany()
            .HasForeignKey("HedgedItem_Id");

        // HedgeRelationship has one HedgingInstrument of type Trade
        modelBuilder.Entity<HedgeRelationship>()
            .HasOne(x => x.HedgingInstrument)
            .WithMany()
            .HasForeignKey("HedgingInstrument_Id");


        // HedgeRelationship has one or more AccountingEntries of type AccountingEntry
        modelBuilder.Entity<AccountingEntry>()
            .HasOne<HedgeRelationship>()
            .WithMany(parent => parent.AccountingEntries)
            .HasForeignKey("AccountingEntries_Id");

        // AccountingEntry has one Trade of type Trade
        modelBuilder.Entity<AccountingEntry>()
            .HasOne(x => x.Trade)
            .WithMany()
            .HasForeignKey("Trade_Id");

        // AccountingEntry has one HedgeRelationship of type HedgeRelationship
        modelBuilder.Entity<AccountingEntry>()
            .HasOne(x => x.HedgeRelationship)
            .WithMany()
            .HasForeignKey("HedgeRelationship_Id");

        // AccountingEntry has one Portfolio of type Portfolio
        modelBuilder.Entity<AccountingEntry>()
            .HasOne(x => x.Portfolio)
            .WithMany()
            .HasForeignKey("Portfolio_Id");


        // StressScenario has one MarketDataSet of type MarketDataSet
        modelBuilder.Entity<StressScenario>()
            .HasOne(x => x.MarketDataSet)
            .WithMany()
            .HasForeignKey("MarketDataSet_Id");


        // StressScenario has one or more StressResults of type StressResult
        modelBuilder.Entity<StressResult>()
            .HasOne<StressScenario>()
            .WithMany(parent => parent.StressResults)
            .HasForeignKey("StressResults_Id");

        // StressResult has one StressScenario of type StressScenario
        modelBuilder.Entity<StressResult>()
            .HasOne(x => x.StressScenario)
            .WithMany()
            .HasForeignKey("StressScenario_Id");

        // StressResult has one Portfolio of type Portfolio
        modelBuilder.Entity<StressResult>()
            .HasOne(x => x.Portfolio)
            .WithMany()
            .HasForeignKey("Portfolio_Id");



        // BusinessCalendar has one or more Holidays of type Holiday
        modelBuilder.Entity<Holiday>()
            .HasOne<BusinessCalendar>()
            .WithMany(parent => parent.Holidays)
            .HasForeignKey("Holidays_Id");

        // Holiday has one Calendar of type BusinessCalendar
        modelBuilder.Entity<Holiday>()
            .HasOne(x => x.Calendar)
            .WithMany()
            .HasForeignKey("Calendar_Id");


    }

    protected virtual void ValidateEntities()
    {
        foreach (var entry in ChangeTracker.Entries())
        {
            if (entry.State == EntityState.Added ||
                entry.State == EntityState.Modified)
            {
                EntityValidator.Validate(entry.Entity);
            }
        }
    }

    public override int SaveChanges(
        bool acceptAllChangesOnSuccess)
    {
        ValidateEntities();

        return base.SaveChanges(acceptAllChangesOnSuccess);
    }

    public override Task<int> SaveChangesAsync(
        bool acceptAllChangesOnSuccess,
        CancellationToken cancellationToken = default)
    {
        ValidateEntities();

        return base.SaveChangesAsync(
            acceptAllChangesOnSuccess,
            cancellationToken
        );
    }

}
