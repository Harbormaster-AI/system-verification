# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


5.times do |i|
  Agency.create( name:"test string for name", legalName:"test string for legalName", headquartersCountry:"test string for headquartersCountry", website:"test string for website" )
  Team.create( name:"test string for name" )
  User.create( firstName:"test string for firstName", lastName:"test string for lastName", email:"test value", Role:0 )
  Advertiser.create( name:"test string for name", legalName:"test string for legalName", industry:"test string for industry", website:"test string for website" )
  BillingProfile.create( billingName:"test string for billingName", taxId:"test string for taxId", billingAddress:"test value", PaymentTerms:0 )
  PaymentMethod.create( last4:"test string for last4", cardholderName:"test string for cardholderName", billingAddress:"test value", MethodType:0 )
  AdAccount.create( name:"test string for name", accountCode:"test string for accountCode", defaultCurrency:"test string for defaultCurrency", defaultTimezone:"test string for defaultTimezone" )
  DSP.create( name:"test string for name", website:"test string for website", region:"test string for region" )
  Campaign.create( name:"test string for name", totalBudget:"test value", flight:1.week.ago, Objective:0, Status:0 )
  KPI.create( targetValue:"test value", MetricType:0 )
  AudienceSegment.create( name:"test string for name", estimatedReach:100, description:"test string for description", ProviderType:0 )
  DataProvider.create( name:"test string for name", website:"test string for website", ProviderType:0 )
  LineItem.create( name:"test string for name", bidAmount:"test value", dailyBudget:"test value", frequencyCap:"test value", Status:0, PricingModel:0, BidStrategy:0, Pacing:0 )
  TargetingProfile.create( name:"test string for name" )
  DeviceCriterion.create( DeviceType:0, PlatformType:0, Operator_:0 )
  BrandSafetyPolicy.create( Level:0, ContentRatingThreshold:0 )
  ContentCategory.create( code:"test string for code", name:"test string for name" )
  Publisher.create( name:"test string for name", website:"test string for website", PublisherType:0 )
  InventorySource.create( name:"test string for name", domain:"test string for domain", Channel:0, PrimaryFormat:0 )
  AdSlot.create( slotCode:"test string for slotCode", width:100, height:100, floorPrice:"test value", Format:0 )
  Deal.create( floorPrice:"test value", DealType:0 )
  Placement.create( name:"test string for name", flight:1.week.ago, goalImpressions:100 )
  CreativeAsset.create( name:"test string for name", clickUrl:"test value", landingPage:"test value", width:100, height:100, durationSeconds:100, CreativeType:0, AdFormat:0 )
  CreativeFile.create( uri:"test value", fileSizeKB:100, mimeType:"test string for mimeType", checksum:"test string for checksum" )
  CreativeVariation.create( name:"test string for name", language:"test string for language", headline:"test string for headline", bodyText:"test string for bodyText", callToAction:"test string for callToAction" )
  CreativeApproval.create( reviewer:"test string for reviewer", reviewedAt:1.week.ago, Status:0 )
  TrackingPixel.create( name:"test string for name", url:"test value", EventType:0, PixelType:0 )
  ConversionEvent.create( timestamp:1.week.ago, value:"test value", EventType:0, AttributionModel:0 )
  PerformanceMetric.create( date:1.week.ago, value:"test value", MetricType:0 )
  Report.create( reportName:"test string for reportName", generatedAt:1.week.ago, fileUrl:"test value", ReportType:0 )
  InsertionOrder.create( ioNumber:"test string for ioNumber", agreedBudget:"test value", flight:1.week.ago, Status:0 )
  RateCard.create( name:"test string for name", effectiveDate:1.week.ago, currency:"test string for currency" )
  Rate.create( unitPrice:"test value", AdFormat:0, PricingModel:0 )
  Experiment.create( name:"test string for name", hypothesis:"test string for hypothesis", startDate:1.week.ago, endDate:1.week.ago, Status:0 )
  ExperimentVariant.create( name:"test string for name", allocation:"test value" )
  GeoRegion.create( code:"test string for code", name:"test string for name", RegionType:0 )
end
