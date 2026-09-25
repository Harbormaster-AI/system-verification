using Microsoft.EntityFrameworkCore;

using crmonaspdotnet.Domain;

namespace crmonaspdotnet.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Organization> Organizations => Set<Organization>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Team> Teams => Set<Team>();
    public DbSet<Territory> Territorys => Set<Territory>();
    public DbSet<Account> Accounts => Set<Account>();
    public DbSet<Contact> Contacts => Set<Contact>();
    public DbSet<Lead> Leads => Set<Lead>();
    public DbSet<Opportunity> Opportunitys => Set<Opportunity>();
    public DbSet<OpportunityLineItem> OpportunityLineItems => Set<OpportunityLineItem>();
    public DbSet<OpportunityStageHistory> OpportunityStageHistorys => Set<OpportunityStageHistory>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<PriceBook> PriceBooks => Set<PriceBook>();
    public DbSet<PriceBookEntry> PriceBookEntrys => Set<PriceBookEntry>();
    public DbSet<Quote> Quotes => Set<Quote>();
    public DbSet<QuoteLineItem> QuoteLineItems => Set<QuoteLineItem>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<Contract> Contracts => Set<Contract>();
    public DbSet<Case_> Case_s => Set<Case_>();
    public DbSet<Activity> Activitys => Set<Activity>();
    public DbSet<Campaign> Campaigns => Set<Campaign>();
    public DbSet<CampaignMember> CampaignMembers => Set<CampaignMember>();
    public DbSet<Note> Notes => Set<Note>();
    public DbSet<EmailMessage> EmailMessages => Set<EmailMessage>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);


        // Organization has one or more Users of type User
        modelBuilder.Entity<User>()
            .HasOne<Organization>()
            .WithMany(parent => parent.Users)
            .HasForeignKey("Organization_Id");

        // Organization has one or more Accounts of type Account
        modelBuilder.Entity<Account>()
            .HasOne<Organization>()
            .WithMany(parent => parent.Accounts)
            .HasForeignKey("Organization_Id");

        // Organization has one or more Teams of type Team
        modelBuilder.Entity<Team>()
            .HasOne<Organization>()
            .WithMany(parent => parent.Teams)
            .HasForeignKey("Organization_Id");

        // Organization has one or more Territories of type Territory
        modelBuilder.Entity<Territory>()
            .HasOne<Organization>()
            .WithMany(parent => parent.Territories)
            .HasForeignKey("Organization_Id");

        // Organization has one or more Products of type Product
        modelBuilder.Entity<Product>()
            .HasOne<Organization>()
            .WithMany(parent => parent.Products)
            .HasForeignKey("Organization_Id");

        // Organization has one or more PriceBooks of type PriceBook
        modelBuilder.Entity<PriceBook>()
            .HasOne<Organization>()
            .WithMany(parent => parent.PriceBooks)
            .HasForeignKey("Organization_Id");

        // Organization has one or more Campaigns of type Campaign
        modelBuilder.Entity<Campaign>()
            .HasOne<Organization>()
            .WithMany(parent => parent.Campaigns)
            .HasForeignKey("Organization_Id");

        // User has one Organization of type Organization
        modelBuilder.Entity<User>()
            .HasOne(x => x.Organization)
            .WithMany()
            .HasForeignKey("Organization_Id");


        // User has one or more Teams of type Team
        modelBuilder.Entity<Team>()
            .HasOne<User>()
            .WithMany(parent => parent.Teams)
            .HasForeignKey("User_Id");

        // User has one or more Activities of type Activity
        modelBuilder.Entity<Activity>()
            .HasOne<User>()
            .WithMany(parent => parent.Activities)
            .HasForeignKey("User_Id");

        // User has one or more OwnedAccounts of type Account
        modelBuilder.Entity<Account>()
            .HasOne<User>()
            .WithMany(parent => parent.OwnedAccounts)
            .HasForeignKey("User_Id");

        // User has one or more OwnedLeads of type Lead
        modelBuilder.Entity<Lead>()
            .HasOne<User>()
            .WithMany(parent => parent.OwnedLeads)
            .HasForeignKey("User_Id");

        // User has one or more OwnedOpportunities of type Opportunity
        modelBuilder.Entity<Opportunity>()
            .HasOne<User>()
            .WithMany(parent => parent.OwnedOpportunities)
            .HasForeignKey("User_Id");

        // User has one or more OwnedCases of type Case_
        modelBuilder.Entity<Case_>()
            .HasOne<User>()
            .WithMany(parent => parent.OwnedCases)
            .HasForeignKey("User_Id");

        // User has one or more Quotes of type Quote
        modelBuilder.Entity<Quote>()
            .HasOne<User>()
            .WithMany(parent => parent.Quotes)
            .HasForeignKey("User_Id");

        // User has one or more Orders of type Order
        modelBuilder.Entity<Order>()
            .HasOne<User>()
            .WithMany(parent => parent.Orders)
            .HasForeignKey("User_Id");

        // User has one or more Contracts of type Contract
        modelBuilder.Entity<Contract>()
            .HasOne<User>()
            .WithMany(parent => parent.Contracts)
            .HasForeignKey("User_Id");

        // User has one or more EmailMessages of type EmailMessage
        modelBuilder.Entity<EmailMessage>()
            .HasOne<User>()
            .WithMany(parent => parent.EmailMessages)
            .HasForeignKey("User_Id");

        // Team has one Organization of type Organization
        modelBuilder.Entity<Team>()
            .HasOne(x => x.Organization)
            .WithMany()
            .HasForeignKey("Organization_Id");


        // Team has one or more Users of type User
        modelBuilder.Entity<User>()
            .HasOne<Team>()
            .WithMany(parent => parent.Users)
            .HasForeignKey("Team_Id");

        // Team has one or more Accounts of type Account
        modelBuilder.Entity<Account>()
            .HasOne<Team>()
            .WithMany(parent => parent.Accounts)
            .HasForeignKey("Team_Id");

        // Team has one or more Opportunities of type Opportunity
        modelBuilder.Entity<Opportunity>()
            .HasOne<Team>()
            .WithMany(parent => parent.Opportunities)
            .HasForeignKey("Team_Id");

        // Team has one or more Cases of type Case_
        modelBuilder.Entity<Case_>()
            .HasOne<Team>()
            .WithMany(parent => parent.Cases)
            .HasForeignKey("Team_Id");

        // Team has one or more Campaigns of type Campaign
        modelBuilder.Entity<Campaign>()
            .HasOne<Team>()
            .WithMany(parent => parent.Campaigns)
            .HasForeignKey("Team_Id");

        // Territory has one Organization of type Organization
        modelBuilder.Entity<Territory>()
            .HasOne(x => x.Organization)
            .WithMany()
            .HasForeignKey("Organization_Id");


        // Territory has one or more Accounts of type Account
        modelBuilder.Entity<Account>()
            .HasOne<Territory>()
            .WithMany(parent => parent.Accounts)
            .HasForeignKey("Territory_Id");

        // Territory has one or more Users of type User
        modelBuilder.Entity<User>()
            .HasOne<Territory>()
            .WithMany(parent => parent.Users)
            .HasForeignKey("Territory_Id");

        // Account has one Organization of type Organization
        modelBuilder.Entity<Account>()
            .HasOne(x => x.Organization)
            .WithMany()
            .HasForeignKey("Organization_Id");

        // Account has one ParentAccount of type Account
        modelBuilder.Entity<Account>()
            .HasOne(x => x.ParentAccount)
            .WithMany()
            .HasForeignKey("ParentAccount_Id");

        // Account has one Owner of type User
        modelBuilder.Entity<Account>()
            .HasOne(x => x.Owner)
            .WithMany()
            .HasForeignKey("Owner_Id");

        // Account has one Territory of type Territory
        modelBuilder.Entity<Account>()
            .HasOne(x => x.Territory)
            .WithMany()
            .HasForeignKey("Territory_Id");


        // Account has one or more ChildAccounts of type Account
        modelBuilder.Entity<Account>()
            .HasOne<Account>()
            .WithMany(parent => parent.ChildAccounts)
            .HasForeignKey("Account_Id");

        // Account has one or more Contacts of type Contact
        modelBuilder.Entity<Contact>()
            .HasOne<Account>()
            .WithMany(parent => parent.Contacts)
            .HasForeignKey("Account_Id");

        // Account has one or more Opportunities of type Opportunity
        modelBuilder.Entity<Opportunity>()
            .HasOne<Account>()
            .WithMany(parent => parent.Opportunities)
            .HasForeignKey("Account_Id");

        // Account has one or more Cases of type Case_
        modelBuilder.Entity<Case_>()
            .HasOne<Account>()
            .WithMany(parent => parent.Cases)
            .HasForeignKey("Account_Id");

        // Account has one or more Activities of type Activity
        modelBuilder.Entity<Activity>()
            .HasOne<Account>()
            .WithMany(parent => parent.Activities)
            .HasForeignKey("Account_Id");

        // Account has one or more Campaigns of type Campaign
        modelBuilder.Entity<Campaign>()
            .HasOne<Account>()
            .WithMany(parent => parent.Campaigns)
            .HasForeignKey("Account_Id");

        // Account has one or more Quotes of type Quote
        modelBuilder.Entity<Quote>()
            .HasOne<Account>()
            .WithMany(parent => parent.Quotes)
            .HasForeignKey("Account_Id");

        // Account has one or more Orders of type Order
        modelBuilder.Entity<Order>()
            .HasOne<Account>()
            .WithMany(parent => parent.Orders)
            .HasForeignKey("Account_Id");

        // Account has one or more Contracts of type Contract
        modelBuilder.Entity<Contract>()
            .HasOne<Account>()
            .WithMany(parent => parent.Contracts)
            .HasForeignKey("Account_Id");

        // Account has one or more Notes of type Note
        modelBuilder.Entity<Note>()
            .HasOne<Account>()
            .WithMany(parent => parent.Notes)
            .HasForeignKey("Account_Id");

        // Account has one or more EmailMessages of type EmailMessage
        modelBuilder.Entity<EmailMessage>()
            .HasOne<Account>()
            .WithMany(parent => parent.EmailMessages)
            .HasForeignKey("Account_Id");

        // Contact has one Organization of type Organization
        modelBuilder.Entity<Contact>()
            .HasOne(x => x.Organization)
            .WithMany()
            .HasForeignKey("Organization_Id");

        // Contact has one Account of type Account
        modelBuilder.Entity<Contact>()
            .HasOne(x => x.Account)
            .WithMany()
            .HasForeignKey("Account_Id");

        // Contact has one Owner of type User
        modelBuilder.Entity<Contact>()
            .HasOne(x => x.Owner)
            .WithMany()
            .HasForeignKey("Owner_Id");


        // Contact has one or more Activities of type Activity
        modelBuilder.Entity<Activity>()
            .HasOne<Contact>()
            .WithMany(parent => parent.Activities)
            .HasForeignKey("Contact_Id");

        // Contact has one or more Opportunities of type Opportunity
        modelBuilder.Entity<Opportunity>()
            .HasOne<Contact>()
            .WithMany(parent => parent.Opportunities)
            .HasForeignKey("Contact_Id");

        // Contact has one or more Cases of type Case_
        modelBuilder.Entity<Case_>()
            .HasOne<Contact>()
            .WithMany(parent => parent.Cases)
            .HasForeignKey("Contact_Id");

        // Contact has one or more Campaigns of type Campaign
        modelBuilder.Entity<Campaign>()
            .HasOne<Contact>()
            .WithMany(parent => parent.Campaigns)
            .HasForeignKey("Contact_Id");

        // Contact has one or more Notes of type Note
        modelBuilder.Entity<Note>()
            .HasOne<Contact>()
            .WithMany(parent => parent.Notes)
            .HasForeignKey("Contact_Id");

        // Contact has one or more EmailMessages of type EmailMessage
        modelBuilder.Entity<EmailMessage>()
            .HasOne<Contact>()
            .WithMany(parent => parent.EmailMessages)
            .HasForeignKey("Contact_Id");

        // Lead has one Organization of type Organization
        modelBuilder.Entity<Lead>()
            .HasOne(x => x.Organization)
            .WithMany()
            .HasForeignKey("Organization_Id");

        // Lead has one Owner of type User
        modelBuilder.Entity<Lead>()
            .HasOne(x => x.Owner)
            .WithMany()
            .HasForeignKey("Owner_Id");

        // Lead has one ConvertedAccount of type Account
        modelBuilder.Entity<Lead>()
            .HasOne(x => x.ConvertedAccount)
            .WithMany()
            .HasForeignKey("ConvertedAccount_Id");

        // Lead has one ConvertedContact of type Contact
        modelBuilder.Entity<Lead>()
            .HasOne(x => x.ConvertedContact)
            .WithMany()
            .HasForeignKey("ConvertedContact_Id");

        // Lead has one ConvertedOpportunity of type Opportunity
        modelBuilder.Entity<Lead>()
            .HasOne(x => x.ConvertedOpportunity)
            .WithMany()
            .HasForeignKey("ConvertedOpportunity_Id");


        // Lead has one or more Activities of type Activity
        modelBuilder.Entity<Activity>()
            .HasOne<Lead>()
            .WithMany(parent => parent.Activities)
            .HasForeignKey("Lead_Id");

        // Lead has one or more Campaigns of type Campaign
        modelBuilder.Entity<Campaign>()
            .HasOne<Lead>()
            .WithMany(parent => parent.Campaigns)
            .HasForeignKey("Lead_Id");

        // Lead has one or more Notes of type Note
        modelBuilder.Entity<Note>()
            .HasOne<Lead>()
            .WithMany(parent => parent.Notes)
            .HasForeignKey("Lead_Id");

        // Lead has one or more EmailMessages of type EmailMessage
        modelBuilder.Entity<EmailMessage>()
            .HasOne<Lead>()
            .WithMany(parent => parent.EmailMessages)
            .HasForeignKey("Lead_Id");

        // Opportunity has one Organization of type Organization
        modelBuilder.Entity<Opportunity>()
            .HasOne(x => x.Organization)
            .WithMany()
            .HasForeignKey("Organization_Id");

        // Opportunity has one Account of type Account
        modelBuilder.Entity<Opportunity>()
            .HasOne(x => x.Account)
            .WithMany()
            .HasForeignKey("Account_Id");

        // Opportunity has one Owner of type User
        modelBuilder.Entity<Opportunity>()
            .HasOne(x => x.Owner)
            .WithMany()
            .HasForeignKey("Owner_Id");


        // Opportunity has one or more Contacts of type Contact
        modelBuilder.Entity<Contact>()
            .HasOne<Opportunity>()
            .WithMany(parent => parent.Contacts)
            .HasForeignKey("Opportunity_Id");

        // Opportunity has one or more LineItems of type OpportunityLineItem
        modelBuilder.Entity<OpportunityLineItem>()
            .HasOne<Opportunity>()
            .WithMany(parent => parent.LineItems)
            .HasForeignKey("Opportunity_Id");

        // Opportunity has one or more StageHistory of type OpportunityStageHistory
        modelBuilder.Entity<OpportunityStageHistory>()
            .HasOne<Opportunity>()
            .WithMany(parent => parent.StageHistory)
            .HasForeignKey("Opportunity_Id");

        // Opportunity has one or more Quotes of type Quote
        modelBuilder.Entity<Quote>()
            .HasOne<Opportunity>()
            .WithMany(parent => parent.Quotes)
            .HasForeignKey("Opportunity_Id");

        // Opportunity has one or more Orders of type Order
        modelBuilder.Entity<Order>()
            .HasOne<Opportunity>()
            .WithMany(parent => parent.Orders)
            .HasForeignKey("Opportunity_Id");

        // Opportunity has one or more Campaigns of type Campaign
        modelBuilder.Entity<Campaign>()
            .HasOne<Opportunity>()
            .WithMany(parent => parent.Campaigns)
            .HasForeignKey("Opportunity_Id");

        // Opportunity has one or more Activities of type Activity
        modelBuilder.Entity<Activity>()
            .HasOne<Opportunity>()
            .WithMany(parent => parent.Activities)
            .HasForeignKey("Opportunity_Id");

        // Opportunity has one or more Teams of type Team
        modelBuilder.Entity<Team>()
            .HasOne<Opportunity>()
            .WithMany(parent => parent.Teams)
            .HasForeignKey("Opportunity_Id");

        // OpportunityLineItem has one Opportunity of type Opportunity
        modelBuilder.Entity<OpportunityLineItem>()
            .HasOne(x => x.Opportunity)
            .WithMany()
            .HasForeignKey("Opportunity_Id");

        // OpportunityLineItem has one Product of type Product
        modelBuilder.Entity<OpportunityLineItem>()
            .HasOne(x => x.Product)
            .WithMany()
            .HasForeignKey("Product_Id");

        // OpportunityLineItem has one PriceBookEntry of type PriceBookEntry
        modelBuilder.Entity<OpportunityLineItem>()
            .HasOne(x => x.PriceBookEntry)
            .WithMany()
            .HasForeignKey("PriceBookEntry_Id");


        // OpportunityStageHistory has one Opportunity of type Opportunity
        modelBuilder.Entity<OpportunityStageHistory>()
            .HasOne(x => x.Opportunity)
            .WithMany()
            .HasForeignKey("Opportunity_Id");

        // OpportunityStageHistory has one ChangedBy of type User
        modelBuilder.Entity<OpportunityStageHistory>()
            .HasOne(x => x.ChangedBy)
            .WithMany()
            .HasForeignKey("ChangedBy_Id");


        // Product has one Organization of type Organization
        modelBuilder.Entity<Product>()
            .HasOne(x => x.Organization)
            .WithMany()
            .HasForeignKey("Organization_Id");


        // Product has one or more PriceBookEntries of type PriceBookEntry
        modelBuilder.Entity<PriceBookEntry>()
            .HasOne<Product>()
            .WithMany(parent => parent.PriceBookEntries)
            .HasForeignKey("Product_Id");

        // Product has one or more OpportunityLineItems of type OpportunityLineItem
        modelBuilder.Entity<OpportunityLineItem>()
            .HasOne<Product>()
            .WithMany(parent => parent.OpportunityLineItems)
            .HasForeignKey("Product_Id");

        // Product has one or more QuoteLineItems of type QuoteLineItem
        modelBuilder.Entity<QuoteLineItem>()
            .HasOne<Product>()
            .WithMany(parent => parent.QuoteLineItems)
            .HasForeignKey("Product_Id");

        // Product has one or more OrderItems of type OrderItem
        modelBuilder.Entity<OrderItem>()
            .HasOne<Product>()
            .WithMany(parent => parent.OrderItems)
            .HasForeignKey("Product_Id");

        // PriceBook has one Organization of type Organization
        modelBuilder.Entity<PriceBook>()
            .HasOne(x => x.Organization)
            .WithMany()
            .HasForeignKey("Organization_Id");


        // PriceBook has one or more Entries of type PriceBookEntry
        modelBuilder.Entity<PriceBookEntry>()
            .HasOne<PriceBook>()
            .WithMany(parent => parent.Entries)
            .HasForeignKey("PriceBook_Id");

        // PriceBook has one or more Quotes of type Quote
        modelBuilder.Entity<Quote>()
            .HasOne<PriceBook>()
            .WithMany(parent => parent.Quotes)
            .HasForeignKey("PriceBook_Id");

        // PriceBook has one or more Orders of type Order
        modelBuilder.Entity<Order>()
            .HasOne<PriceBook>()
            .WithMany(parent => parent.Orders)
            .HasForeignKey("PriceBook_Id");

        // PriceBookEntry has one PriceBook of type PriceBook
        modelBuilder.Entity<PriceBookEntry>()
            .HasOne(x => x.PriceBook)
            .WithMany()
            .HasForeignKey("PriceBook_Id");

        // PriceBookEntry has one Product of type Product
        modelBuilder.Entity<PriceBookEntry>()
            .HasOne(x => x.Product)
            .WithMany()
            .HasForeignKey("Product_Id");


        // Quote has one Organization of type Organization
        modelBuilder.Entity<Quote>()
            .HasOne(x => x.Organization)
            .WithMany()
            .HasForeignKey("Organization_Id");

        // Quote has one Account of type Account
        modelBuilder.Entity<Quote>()
            .HasOne(x => x.Account)
            .WithMany()
            .HasForeignKey("Account_Id");

        // Quote has one Opportunity of type Opportunity
        modelBuilder.Entity<Quote>()
            .HasOne(x => x.Opportunity)
            .WithMany()
            .HasForeignKey("Opportunity_Id");

        // Quote has one Owner of type User
        modelBuilder.Entity<Quote>()
            .HasOne(x => x.Owner)
            .WithMany()
            .HasForeignKey("Owner_Id");

        // Quote has one PriceBook of type PriceBook
        modelBuilder.Entity<Quote>()
            .HasOne(x => x.PriceBook)
            .WithMany()
            .HasForeignKey("PriceBook_Id");

        // Quote has one Order of type Order
        modelBuilder.Entity<Quote>()
            .HasOne(x => x.Order)
            .WithMany()
            .HasForeignKey("Order_Id");


        // Quote has one or more LineItems of type QuoteLineItem
        modelBuilder.Entity<QuoteLineItem>()
            .HasOne<Quote>()
            .WithMany(parent => parent.LineItems)
            .HasForeignKey("Quote_Id");

        // QuoteLineItem has one Quote of type Quote
        modelBuilder.Entity<QuoteLineItem>()
            .HasOne(x => x.Quote)
            .WithMany()
            .HasForeignKey("Quote_Id");

        // QuoteLineItem has one Product of type Product
        modelBuilder.Entity<QuoteLineItem>()
            .HasOne(x => x.Product)
            .WithMany()
            .HasForeignKey("Product_Id");

        // QuoteLineItem has one PriceBookEntry of type PriceBookEntry
        modelBuilder.Entity<QuoteLineItem>()
            .HasOne(x => x.PriceBookEntry)
            .WithMany()
            .HasForeignKey("PriceBookEntry_Id");

        // QuoteLineItem has one OpportunityLineItem of type OpportunityLineItem
        modelBuilder.Entity<QuoteLineItem>()
            .HasOne(x => x.OpportunityLineItem)
            .WithMany()
            .HasForeignKey("OpportunityLineItem_Id");


        // Order has one Organization of type Organization
        modelBuilder.Entity<Order>()
            .HasOne(x => x.Organization)
            .WithMany()
            .HasForeignKey("Organization_Id");

        // Order has one Account of type Account
        modelBuilder.Entity<Order>()
            .HasOne(x => x.Account)
            .WithMany()
            .HasForeignKey("Account_Id");

        // Order has one Opportunity of type Opportunity
        modelBuilder.Entity<Order>()
            .HasOne(x => x.Opportunity)
            .WithMany()
            .HasForeignKey("Opportunity_Id");

        // Order has one Quote of type Quote
        modelBuilder.Entity<Order>()
            .HasOne(x => x.Quote)
            .WithMany()
            .HasForeignKey("Quote_Id");

        // Order has one Owner of type User
        modelBuilder.Entity<Order>()
            .HasOne(x => x.Owner)
            .WithMany()
            .HasForeignKey("Owner_Id");

        // Order has one Contract of type Contract
        modelBuilder.Entity<Order>()
            .HasOne(x => x.Contract)
            .WithMany()
            .HasForeignKey("Contract_Id");

        // Order has one PriceBook of type PriceBook
        modelBuilder.Entity<Order>()
            .HasOne(x => x.PriceBook)
            .WithMany()
            .HasForeignKey("PriceBook_Id");


        // Order has one or more Items of type OrderItem
        modelBuilder.Entity<OrderItem>()
            .HasOne<Order>()
            .WithMany(parent => parent.Items)
            .HasForeignKey("Order_Id");

        // OrderItem has one Order of type Order
        modelBuilder.Entity<OrderItem>()
            .HasOne(x => x.Order)
            .WithMany()
            .HasForeignKey("Order_Id");

        // OrderItem has one Product of type Product
        modelBuilder.Entity<OrderItem>()
            .HasOne(x => x.Product)
            .WithMany()
            .HasForeignKey("Product_Id");

        // OrderItem has one PriceBookEntry of type PriceBookEntry
        modelBuilder.Entity<OrderItem>()
            .HasOne(x => x.PriceBookEntry)
            .WithMany()
            .HasForeignKey("PriceBookEntry_Id");


        // Contract has one Organization of type Organization
        modelBuilder.Entity<Contract>()
            .HasOne(x => x.Organization)
            .WithMany()
            .HasForeignKey("Organization_Id");

        // Contract has one Account of type Account
        modelBuilder.Entity<Contract>()
            .HasOne(x => x.Account)
            .WithMany()
            .HasForeignKey("Account_Id");

        // Contract has one Owner of type User
        modelBuilder.Entity<Contract>()
            .HasOne(x => x.Owner)
            .WithMany()
            .HasForeignKey("Owner_Id");


        // Contract has one or more Orders of type Order
        modelBuilder.Entity<Order>()
            .HasOne<Contract>()
            .WithMany(parent => parent.Orders)
            .HasForeignKey("Contract_Id");

        // Contract has one or more Cases of type Case_
        modelBuilder.Entity<Case_>()
            .HasOne<Contract>()
            .WithMany(parent => parent.Cases)
            .HasForeignKey("Contract_Id");

        // Case_ has one Organization of type Organization
        modelBuilder.Entity<Case_>()
            .HasOne(x => x.Organization)
            .WithMany()
            .HasForeignKey("Organization_Id");

        // Case_ has one Account of type Account
        modelBuilder.Entity<Case_>()
            .HasOne(x => x.Account)
            .WithMany()
            .HasForeignKey("Account_Id");

        // Case_ has one Contact of type Contact
        modelBuilder.Entity<Case_>()
            .HasOne(x => x.Contact)
            .WithMany()
            .HasForeignKey("Contact_Id");

        // Case_ has one Owner of type User
        modelBuilder.Entity<Case_>()
            .HasOne(x => x.Owner)
            .WithMany()
            .HasForeignKey("Owner_Id");

        // Case_ has one Team of type Team
        modelBuilder.Entity<Case_>()
            .HasOne(x => x.Team)
            .WithMany()
            .HasForeignKey("Team_Id");


        // Case_ has one or more Activities of type Activity
        modelBuilder.Entity<Activity>()
            .HasOne<Case_>()
            .WithMany(parent => parent.Activities)
            .HasForeignKey("Case__Id");

        // Case_ has one or more CaseComments of type Note
        modelBuilder.Entity<Note>()
            .HasOne<Case_>()
            .WithMany(parent => parent.CaseComments)
            .HasForeignKey("Case__Id");

        // Case_ has one or more Emails of type EmailMessage
        modelBuilder.Entity<EmailMessage>()
            .HasOne<Case_>()
            .WithMany(parent => parent.Emails)
            .HasForeignKey("Case__Id");

        // Case_ has one or more RelatedOpportunities of type Opportunity
        modelBuilder.Entity<Opportunity>()
            .HasOne<Case_>()
            .WithMany(parent => parent.RelatedOpportunities)
            .HasForeignKey("Case__Id");

        // Activity has one Organization of type Organization
        modelBuilder.Entity<Activity>()
            .HasOne(x => x.Organization)
            .WithMany()
            .HasForeignKey("Organization_Id");

        // Activity has one Owner of type User
        modelBuilder.Entity<Activity>()
            .HasOne(x => x.Owner)
            .WithMany()
            .HasForeignKey("Owner_Id");

        // Activity has one Account of type Account
        modelBuilder.Entity<Activity>()
            .HasOne(x => x.Account)
            .WithMany()
            .HasForeignKey("Account_Id");

        // Activity has one Contact of type Contact
        modelBuilder.Entity<Activity>()
            .HasOne(x => x.Contact)
            .WithMany()
            .HasForeignKey("Contact_Id");

        // Activity has one Lead of type Lead
        modelBuilder.Entity<Activity>()
            .HasOne(x => x.Lead)
            .WithMany()
            .HasForeignKey("Lead_Id");

        // Activity has one Opportunity of type Opportunity
        modelBuilder.Entity<Activity>()
            .HasOne(x => x.Opportunity)
            .WithMany()
            .HasForeignKey("Opportunity_Id");

        // Activity has one Case_ of type Case_
        modelBuilder.Entity<Activity>()
            .HasOne(x => x.Case_)
            .WithMany()
            .HasForeignKey("Case__Id");

        // Activity has one Campaign of type Campaign
        modelBuilder.Entity<Activity>()
            .HasOne(x => x.Campaign)
            .WithMany()
            .HasForeignKey("Campaign_Id");


        // Campaign has one Organization of type Organization
        modelBuilder.Entity<Campaign>()
            .HasOne(x => x.Organization)
            .WithMany()
            .HasForeignKey("Organization_Id");

        // Campaign has one ParentCampaign of type Campaign
        modelBuilder.Entity<Campaign>()
            .HasOne(x => x.ParentCampaign)
            .WithMany()
            .HasForeignKey("ParentCampaign_Id");


        // Campaign has one or more ChildCampaigns of type Campaign
        modelBuilder.Entity<Campaign>()
            .HasOne<Campaign>()
            .WithMany(parent => parent.ChildCampaigns)
            .HasForeignKey("Campaign_Id");

        // Campaign has one or more Members of type CampaignMember
        modelBuilder.Entity<CampaignMember>()
            .HasOne<Campaign>()
            .WithMany(parent => parent.Members)
            .HasForeignKey("Campaign_Id");

        // Campaign has one or more Opportunities of type Opportunity
        modelBuilder.Entity<Opportunity>()
            .HasOne<Campaign>()
            .WithMany(parent => parent.Opportunities)
            .HasForeignKey("Campaign_Id");

        // Campaign has one or more Accounts of type Account
        modelBuilder.Entity<Account>()
            .HasOne<Campaign>()
            .WithMany(parent => parent.Accounts)
            .HasForeignKey("Campaign_Id");

        // Campaign has one or more Leads of type Lead
        modelBuilder.Entity<Lead>()
            .HasOne<Campaign>()
            .WithMany(parent => parent.Leads)
            .HasForeignKey("Campaign_Id");

        // Campaign has one or more Contacts of type Contact
        modelBuilder.Entity<Contact>()
            .HasOne<Campaign>()
            .WithMany(parent => parent.Contacts)
            .HasForeignKey("Campaign_Id");

        // Campaign has one or more Teams of type Team
        modelBuilder.Entity<Team>()
            .HasOne<Campaign>()
            .WithMany(parent => parent.Teams)
            .HasForeignKey("Campaign_Id");

        // Campaign has one or more Activities of type Activity
        modelBuilder.Entity<Activity>()
            .HasOne<Campaign>()
            .WithMany(parent => parent.Activities)
            .HasForeignKey("Campaign_Id");

        // CampaignMember has one Campaign of type Campaign
        modelBuilder.Entity<CampaignMember>()
            .HasOne(x => x.Campaign)
            .WithMany()
            .HasForeignKey("Campaign_Id");

        // CampaignMember has one Lead of type Lead
        modelBuilder.Entity<CampaignMember>()
            .HasOne(x => x.Lead)
            .WithMany()
            .HasForeignKey("Lead_Id");

        // CampaignMember has one Contact of type Contact
        modelBuilder.Entity<CampaignMember>()
            .HasOne(x => x.Contact)
            .WithMany()
            .HasForeignKey("Contact_Id");


        // Note has one Organization of type Organization
        modelBuilder.Entity<Note>()
            .HasOne(x => x.Organization)
            .WithMany()
            .HasForeignKey("Organization_Id");

        // Note has one Owner of type User
        modelBuilder.Entity<Note>()
            .HasOne(x => x.Owner)
            .WithMany()
            .HasForeignKey("Owner_Id");

        // Note has one Account of type Account
        modelBuilder.Entity<Note>()
            .HasOne(x => x.Account)
            .WithMany()
            .HasForeignKey("Account_Id");

        // Note has one Contact of type Contact
        modelBuilder.Entity<Note>()
            .HasOne(x => x.Contact)
            .WithMany()
            .HasForeignKey("Contact_Id");

        // Note has one Opportunity of type Opportunity
        modelBuilder.Entity<Note>()
            .HasOne(x => x.Opportunity)
            .WithMany()
            .HasForeignKey("Opportunity_Id");

        // Note has one Case_ of type Case_
        modelBuilder.Entity<Note>()
            .HasOne(x => x.Case_)
            .WithMany()
            .HasForeignKey("Case__Id");

        // Note has one Lead of type Lead
        modelBuilder.Entity<Note>()
            .HasOne(x => x.Lead)
            .WithMany()
            .HasForeignKey("Lead_Id");


        // EmailMessage has one Organization of type Organization
        modelBuilder.Entity<EmailMessage>()
            .HasOne(x => x.Organization)
            .WithMany()
            .HasForeignKey("Organization_Id");

        // EmailMessage has one Owner of type User
        modelBuilder.Entity<EmailMessage>()
            .HasOne(x => x.Owner)
            .WithMany()
            .HasForeignKey("Owner_Id");

        // EmailMessage has one Account of type Account
        modelBuilder.Entity<EmailMessage>()
            .HasOne(x => x.Account)
            .WithMany()
            .HasForeignKey("Account_Id");

        // EmailMessage has one Contact of type Contact
        modelBuilder.Entity<EmailMessage>()
            .HasOne(x => x.Contact)
            .WithMany()
            .HasForeignKey("Contact_Id");

        // EmailMessage has one Lead of type Lead
        modelBuilder.Entity<EmailMessage>()
            .HasOne(x => x.Lead)
            .WithMany()
            .HasForeignKey("Lead_Id");

        // EmailMessage has one Case_ of type Case_
        modelBuilder.Entity<EmailMessage>()
            .HasOne(x => x.Case_)
            .WithMany()
            .HasForeignKey("Case__Id");

        // EmailMessage has one Opportunity of type Opportunity
        modelBuilder.Entity<EmailMessage>()
            .HasOne(x => x.Opportunity)
            .WithMany()
            .HasForeignKey("Opportunity_Id");

        // EmailMessage has one Campaign of type Campaign
        modelBuilder.Entity<EmailMessage>()
            .HasOne(x => x.Campaign)
            .WithMany()
            .HasForeignKey("Campaign_Id");


    }
}
