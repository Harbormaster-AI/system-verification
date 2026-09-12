const SQL = require('sequelize');

module.exports.paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  // can pass in a function to calculate an item's cursor
  getCursor = () => null,
}) => {
  if (pageSize < 1) 
	  return [];

  if (!cursor) 
	  return results.slice(0, pageSize);
  
  const cursorIndex = results.findIndex(item => {
    // if an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item.cursor ? item.cursor : getCursor(item);

    // if there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize),
        )
    : results.slice(0, pageSize);
};

module.exports.createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in,
  };

  const db = new SQL('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './store.sqlite',
    operatorsAliases,
    logging: false,
  });

  const bank = db.define('bank', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    name: SQL.STRING,
    legalName: SQL.STRING,
    swiftBic: SQL.STRING,
    headquartersCountry: SQL.STRING,
    website: SQL.STRING,
    freezeTableName:true
  });

  const branch = db.define('branch', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    name: SQL.STRING,
    branchCode: SQL.STRING,
    address: SQL.STRING,
    phone: SQL.STRING,
    openingHours: SQL.STRING,
    freezeTableName:true
  });

  const aTM = db.define('aTM', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    terminalId: SQL.STRING,
    location: SQL.STRING,

    Status: SQL.ENUM('InService', 'OutOfService', 'Maintenance'),
    freezeTableName:true
  });

  const customer = db.define('customer', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    firstName: SQL.STRING,
    lastName: SQL.STRING,
    legalName: SQL.STRING,
    dateOfBirth: SQL.STRING,
    taxId: SQL.STRING,
    email: SQL.STRING,
    phone: SQL.STRING,
    address: SQL.STRING,

    CustomerType: SQL.ENUM('Individual', 'Business', 'NonProfit', 'Government'),

    RiskRating: SQL.ENUM('Low', 'Medium', 'High'),

    KycStatus: SQL.ENUM('Pending', 'Verified', 'Rejected', 'Expired'),
    freezeTableName:true
  });

  const kycProfile = db.define('kycProfile', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    profileId: SQL.STRING,
    lastReviewedOn: SQL.STRING,

    Status: SQL.ENUM('Pending', 'Verified', 'Rejected', 'Expired'),
    freezeTableName:true
  });

  const identityDocument = db.define('identityDocument', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    documentNumber: SQL.STRING,
    issuingCountry: SQL.STRING,
    expirationDate: SQL.STRING,

    DocumentType: SQL.ENUM('Passport', 'NationalID', 'DriverLicense', 'ResidencePermit', 'BusinessRegistration', 'TaxCertificate'),
    freezeTableName:true
  });

  const riskAssessment = db.define('riskAssessment', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    score: SQL.STRING,
    assessedOn: SQL.STRING,

    Rating: SQL.ENUM('Low', 'Medium', 'High'),
    freezeTableName:true
  });

  const screeningResult = db.define('screeningResult', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    screeningDate: SQL.STRING,
    provider: SQL.STRING,

    Outcome: SQL.ENUM('Clear', 'Match', 'Review'),
    freezeTableName:true
  });

  const bankingProduct = db.define('bankingProduct', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    productCode: SQL.STRING,
    name: SQL.STRING,
    description: SQL.STRING,

    ProductCategory: SQL.ENUM('Deposit', 'Loan', 'Card', 'PaymentService', 'Investment'),
    freezeTableName:true
  });

  const account = db.define('account', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    accountNumber: SQL.STRING,
    iban: SQL.STRING,
    accountName: SQL.STRING,
    currency: SQL.STRING,
    openedOn: SQL.STRING,
    closedOn: SQL.STRING,

    AccountType: SQL.ENUM('Checking', 'Savings', 'MoneyMarket', 'TimeDeposit'),

    OwnershipType: SQL.ENUM('Sole', 'Joint', 'Corporate', 'Trust'),

    Status: SQL.ENUM('Open', 'Frozen', 'Dormant', 'Closed'),
    freezeTableName:true
  });

  const accountStatement = db.define('accountStatement', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    statementNumber: SQL.STRING,
    periodStart: SQL.STRING,
    periodEnd: SQL.STRING,
    openingBalance: SQL.STRING,
    closingBalance: SQL.STRING,

    DeliveryMethod: SQL.ENUM('Electronic', 'Paper'),
    freezeTableName:true
  });

  const transaction = db.define('transaction', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    bookingDate: SQL.STRING,
    valueDate: SQL.STRING,
    amount: SQL.STRING,
    description: SQL.STRING,

    Direction: SQL.ENUM('Credit', 'Debit'),

    TransactionType: SQL.ENUM('Deposit', 'Withdrawal', 'Transfer', 'Payment', 'Fee', 'Interest', 'Adjustment', 'Chargeback', 'Refund', 'FXConversion'),

    Status: SQL.ENUM('Pending', 'Posted', 'Reversed', 'Failed', 'Cancelled'),

    Channel: SQL.ENUM('Branch', 'Online', 'Mobile', 'ATM', 'API', 'CallCenter'),
    freezeTableName:true
  });

  const externalAccount = db.define('externalAccount', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    name: SQL.STRING,
    iban: SQL.STRING,
    accountNumber: SQL.STRING,
    bic: SQL.STRING,
    bankName: SQL.STRING,
    country: SQL.STRING,
    freezeTableName:true
  });

  const fundsTransfer = db.define('fundsTransfer', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    transferReference: SQL.STRING,
    amount: SQL.STRING,
    requestedDate: SQL.STRING,
    executionDate: SQL.STRING,
    purpose: SQL.STRING,
    feeAmount: SQL.STRING,

    Method: SQL.ENUM('InternalTransfer', 'ACH', 'Wire', 'SEPA', 'SWIFT', 'Card', 'Cash', 'Check', 'MobileWallet'),

    Status: SQL.ENUM('Initiated', 'InProcess', 'Settled', 'Failed', 'Reversed', 'Cancelled'),
    freezeTableName:true
  });

  const standingInstruction = db.define('standingInstruction', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    instructionId: SQL.STRING,
    amount: SQL.STRING,
    nextExecutionDate: SQL.STRING,

    Frequency: SQL.ENUM('OneTime', 'Weekly', 'BiWeekly', 'Monthly', 'Quarterly', 'Annually'),

    Status: SQL.ENUM('Active', 'Paused', 'Cancelled', 'Completed'),
    freezeTableName:true
  });

  const paymentCard = db.define('paymentCard', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    cardNumber: SQL.STRING,
    embossedName: SQL.STRING,
    expiryMonth: SQL.STRING,
    expiryYear: SQL.STRING,

    CardType: SQL.ENUM('Debit', 'Credit', 'Prepaid', 'Virtual'),

    CardStatus: SQL.ENUM('Active', 'Blocked', 'LostStolen', 'Expired', 'Closed'),

    Network: SQL.ENUM('Visa', 'Mastercard', 'Amex', 'Discover', 'UnionPay', 'Other'),
    freezeTableName:true
  });

  const loanAccount = db.define('loanAccount', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    loanNumber: SQL.STRING,
    principalAmount: SQL.STRING,
    outstandingPrincipal: SQL.STRING,
    interestRate: SQL.STRING,
    originationDate: SQL.STRING,
    maturityDate: SQL.STRING,
    paymentDayOfMonth: SQL.STRING,
    currency: SQL.STRING,

    LoanType: SQL.ENUM('Mortgage', 'Personal', 'Auto', 'SmallBusiness', 'CreditLine', 'Student'),

    RateType: SQL.ENUM('Fixed', 'Variable'),

    Compounding: SQL.ENUM('Daily', 'Monthly', 'Quarterly', 'Annually'),

    Status: SQL.ENUM('Applied', 'Approved', 'Active', 'Delinquent', 'Defaulted', 'Closed'),
    freezeTableName:true
  });

  const repaymentSchedule = db.define('repaymentSchedule', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    installmentNumber: SQL.STRING,
    dueDate: SQL.STRING,
    principalDue: SQL.STRING,
    interestDue: SQL.STRING,
    totalDue: SQL.STRING,

    Status: SQL.ENUM('Due', 'Paid', 'Overdue', 'Deferred'),
    freezeTableName:true
  });

  const loanPayment = db.define('loanPayment', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    paymentReference: SQL.STRING,
    amount: SQL.STRING,
    paymentDate: SQL.STRING,

    Method: SQL.ENUM('InternalTransfer', 'ACH', 'Wire', 'SEPA', 'SWIFT', 'Card', 'Cash', 'Check', 'MobileWallet'),

    Status: SQL.ENUM('Initiated', 'InProcess', 'Settled', 'Failed', 'Reversed', 'Cancelled'),
    freezeTableName:true
  });

  const collateral = db.define('collateral', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    appraisedValue: SQL.STRING,
    description: SQL.STRING,
    location: SQL.STRING,

    CollateralType: SQL.ENUM('RealEstate', 'Vehicle', 'Cash', 'Securities', 'Guarantee', 'Equipment'),
    freezeTableName:true
  });

  const feeCharge = db.define('feeCharge', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    feeCode: SQL.STRING,
    amount: SQL.STRING,
    appliedOn: SQL.STRING,

    FeeType: SQL.ENUM('Maintenance', 'Overdraft', 'Wire', 'ATM', 'CardAnnual', 'LatePayment', 'EarlyWithdrawal', 'ReplacementCard'),
    freezeTableName:true
  });

  const exchangeRate = db.define('exchangeRate', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    baseCurrency: SQL.STRING,
    counterCurrency: SQL.STRING,
    rate: SQL.STRING,
    asOf: SQL.STRING,
    source: SQL.STRING,
    freezeTableName:true
  });

  const fXTrade = db.define('fXTrade', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    tradeReference: SQL.STRING,
    tradeDate: SQL.STRING,
    settlementDate: SQL.STRING,
    amountSold: SQL.STRING,
    amountBought: SQL.STRING,
    rate: SQL.STRING,

    Status: SQL.ENUM('Booked', 'Settled', 'Cancelled'),
    freezeTableName:true
  });

  const dispute = db.define('dispute', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    disputeReference: SQL.STRING,
    raisedOn: SQL.STRING,
    reason: SQL.STRING,

    Status: SQL.ENUM('Open', 'UnderReview', 'Resolved', 'Rejected', 'Withdrawn'),
    freezeTableName:true
  });

  const consent = db.define('consent', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    grantedOn: SQL.STRING,
    expiresOn: SQL.STRING,

    ConsentType: SQL.ENUM('OpenBanking', 'PaymentInitiation', 'AccountInformation', 'Marketing', 'DataSharing'),

    Status: SQL.ENUM('Active', 'Revoked', 'Expired'),
    freezeTableName:true
  });

  const thirdPartyProvider = db.define('thirdPartyProvider', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    name: SQL.STRING,
    registrationId: SQL.STRING,
    website: SQL.STRING,
    freezeTableName:true
  });

  bank.hasMany(branch, {
    as: { 
	  singular: 'ToBranches', 
	  plural: 'Branches' 
    }
  })
  bank.hasMany(bankingProduct, {
    as: { 
	  singular: 'ToProducts', 
	  plural: 'Products' 
    }
  })
  bank.hasMany(customer, {
    as: { 
	  singular: 'ToCustomers', 
	  plural: 'Customers' 
    }
  })
  bank.hasMany(account, {
    as: { 
	  singular: 'ToAccounts', 
	  plural: 'Accounts' 
    }
  })
  bank.hasMany(paymentCard, {
    as: { 
	  singular: 'ToPaymentCards', 
	  plural: 'PaymentCards' 
    }
  })
  bank.hasMany(loanAccount, {
    as: { 
	  singular: 'ToLoanAccounts', 
	  plural: 'LoanAccounts' 
    }
  })
  bank.hasMany(exchangeRate, {
    as: { 
	  singular: 'ToExchangeRates', 
	  plural: 'ExchangeRates' 
    }
  })
  bank.hasMany(consent, {
    as: { 
	  singular: 'ToConsents', 
	  plural: 'Consents' 
    }
  })
  bank.hasMany(thirdPartyProvider, {
    as: { 
	  singular: 'ToThirdPartyProviders', 
	  plural: 'ThirdPartyProviders' 
    }
  })
  branch.hasOne(bank, {as: 'Bank'})
  branch.hasMany(account, {
    as: { 
	  singular: 'ToAccounts', 
	  plural: 'Accounts' 
    }
  })
  branch.hasMany(loanAccount, {
    as: { 
	  singular: 'ToLoanAccounts', 
	  plural: 'LoanAccounts' 
    }
  })
  branch.hasMany(aTM, {
    as: { 
	  singular: 'ToAtms', 
	  plural: 'Atms' 
    }
  })
  aTM.hasOne(branch, {as: 'Branch'})
  customer.hasOne(bank, {as: 'Bank'})
  customer.hasMany(account, {
    as: { 
	  singular: 'ToAccounts', 
	  plural: 'Accounts' 
    }
  })
  customer.hasMany(loanAccount, {
    as: { 
	  singular: 'ToLoanAccounts', 
	  plural: 'LoanAccounts' 
    }
  })
  customer.hasMany(paymentCard, {
    as: { 
	  singular: 'ToPaymentCards', 
	  plural: 'PaymentCards' 
    }
  })
  customer.hasMany(externalAccount, {
    as: { 
	  singular: 'ToExternalAccounts', 
	  plural: 'ExternalAccounts' 
    }
  })
  customer.hasMany(fundsTransfer, {
    as: { 
	  singular: 'ToFundsTransfers', 
	  plural: 'FundsTransfers' 
    }
  })
  customer.hasMany(dispute, {
    as: { 
	  singular: 'ToDisputes', 
	  plural: 'Disputes' 
    }
  })
  customer.hasMany(kycProfile, {
    as: { 
	  singular: 'ToKycProfiles', 
	  plural: 'KycProfiles' 
    }
  })
  customer.hasMany(consent, {
    as: { 
	  singular: 'ToConsents', 
	  plural: 'Consents' 
    }
  })
  kycProfile.hasOne(customer, {as: 'Customer'})
  kycProfile.hasMany(identityDocument, {
    as: { 
	  singular: 'ToIdentityDocuments', 
	  plural: 'IdentityDocuments' 
    }
  })
  kycProfile.hasMany(riskAssessment, {
    as: { 
	  singular: 'ToRiskAssessments', 
	  plural: 'RiskAssessments' 
    }
  })
  kycProfile.hasMany(screeningResult, {
    as: { 
	  singular: 'ToScreenings', 
	  plural: 'Screenings' 
    }
  })
  identityDocument.hasOne(kycProfile, {as: 'KycProfile'})
  riskAssessment.hasOne(kycProfile, {as: 'KycProfile'})
  screeningResult.hasOne(kycProfile, {as: 'KycProfile'})
  bankingProduct.hasOne(bank, {as: 'Bank'})
  bankingProduct.hasMany(account, {
    as: { 
	  singular: 'ToAccounts', 
	  plural: 'Accounts' 
    }
  })
  bankingProduct.hasMany(loanAccount, {
    as: { 
	  singular: 'ToLoanAccounts', 
	  plural: 'LoanAccounts' 
    }
  })
  bankingProduct.hasMany(paymentCard, {
    as: { 
	  singular: 'ToPaymentCards', 
	  plural: 'PaymentCards' 
    }
  })
  account.hasOne(bank, {as: 'Bank'})
  account.hasOne(branch, {as: 'Branch'})
  account.hasOne(bankingProduct, {as: 'Product'})
  account.hasMany(customer, {
    as: { 
	  singular: 'ToOwners', 
	  plural: 'Owners' 
    }
  })
  account.hasMany(transaction, {
    as: { 
	  singular: 'ToTransactions', 
	  plural: 'Transactions' 
    }
  })
  account.hasMany(accountStatement, {
    as: { 
	  singular: 'ToStatements', 
	  plural: 'Statements' 
    }
  })
  account.hasMany(standingInstruction, {
    as: { 
	  singular: 'ToStandingInstructions', 
	  plural: 'StandingInstructions' 
    }
  })
  account.hasMany(feeCharge, {
    as: { 
	  singular: 'ToFeeCharges', 
	  plural: 'FeeCharges' 
    }
  })
  accountStatement.hasOne(account, {as: 'Account'})
  transaction.hasOne(account, {as: 'Account'})
  transaction.hasOne(externalAccount, {as: 'ExternalCounterparty'})
  transaction.hasOne(paymentCard, {as: 'PaymentCard'})
  transaction.hasOne(fundsTransfer, {as: 'FundsTransfer'})
  transaction.hasOne(fXTrade, {as: 'FxTrade'})
  transaction.hasOne(dispute, {as: 'Dispute'})
  externalAccount.hasOne(customer, {as: 'Customer'})
  externalAccount.hasMany(transaction, {
    as: { 
	  singular: 'ToTransactions', 
	  plural: 'Transactions' 
    }
  })
  fundsTransfer.hasOne(account, {as: 'SourceAccount'})
  fundsTransfer.hasOne(account, {as: 'DestinationAccount'})
  fundsTransfer.hasOne(externalAccount, {as: 'ExternalBeneficiary'})
  fundsTransfer.hasOne(customer, {as: 'InitiatedBy'})
  fundsTransfer.hasMany(transaction, {
    as: { 
	  singular: 'ToTransactions', 
	  plural: 'Transactions' 
    }
  })
  standingInstruction.hasOne(account, {as: 'Account'})
  standingInstruction.hasOne(externalAccount, {as: 'Beneficiary'})
  paymentCard.hasOne(bank, {as: 'Bank'})
  paymentCard.hasOne(account, {as: 'Account'})
  paymentCard.hasOne(customer, {as: 'Customer'})
  paymentCard.hasMany(transaction, {
    as: { 
	  singular: 'ToTransactions', 
	  plural: 'Transactions' 
    }
  })
  loanAccount.hasOne(bank, {as: 'Bank'})
  loanAccount.hasOne(branch, {as: 'Branch'})
  loanAccount.hasOne(bankingProduct, {as: 'Product'})
  loanAccount.hasMany(customer, {
    as: { 
	  singular: 'ToBorrowers', 
	  plural: 'Borrowers' 
    }
  })
  loanAccount.hasMany(repaymentSchedule, {
    as: { 
	  singular: 'ToRepaymentSchedule', 
	  plural: 'RepaymentSchedule' 
    }
  })
  loanAccount.hasMany(loanPayment, {
    as: { 
	  singular: 'ToPayments', 
	  plural: 'Payments' 
    }
  })
  loanAccount.hasMany(collateral, {
    as: { 
	  singular: 'ToCollateral', 
	  plural: 'Collateral' 
    }
  })
  loanAccount.hasMany(feeCharge, {
    as: { 
	  singular: 'ToFeeCharges', 
	  plural: 'FeeCharges' 
    }
  })
  repaymentSchedule.hasOne(loanAccount, {as: 'LoanAccount'})
  repaymentSchedule.hasOne(loanPayment, {as: 'Payment'})
  loanPayment.hasOne(loanAccount, {as: 'LoanAccount'})
  loanPayment.hasOne(transaction, {as: 'Transaction'})
  collateral.hasOne(loanAccount, {as: 'LoanAccount'})
  feeCharge.hasOne(account, {as: 'Account'})
  feeCharge.hasOne(loanAccount, {as: 'LoanAccount'})
  exchangeRate.hasOne(bank, {as: 'Bank'})
  exchangeRate.hasMany(fXTrade, {
    as: { 
	  singular: 'ToFxTrades', 
	  plural: 'FxTrades' 
    }
  })
  fXTrade.hasOne(customer, {as: 'Customer'})
  fXTrade.hasOne(bank, {as: 'Bank'})
  fXTrade.hasOne(exchangeRate, {as: 'ExchangeRate'})
  fXTrade.hasOne(account, {as: 'SourceAccount'})
  fXTrade.hasOne(account, {as: 'DestinationAccount'})
  fXTrade.hasOne(transaction, {as: 'Transaction'})
  dispute.hasOne(transaction, {as: 'Transaction'})
  dispute.hasOne(customer, {as: 'Customer'})
  dispute.hasOne(account, {as: 'Account'})
  dispute.hasOne(paymentCard, {as: 'PaymentCard'})
  consent.hasOne(customer, {as: 'Customer'})
  consent.hasOne(bank, {as: 'Bank'})
  consent.hasOne(thirdPartyProvider, {as: 'ThirdPartyProvider'})
  consent.hasMany(account, {
    as: { 
	  singular: 'ToAuthorizedAccounts', 
	  plural: 'AuthorizedAccounts' 
    }
  })
  thirdPartyProvider.hasOne(bank, {as: 'Bank'})
  thirdPartyProvider.hasMany(consent, {
    as: { 
	  singular: 'ToConsents', 
	  plural: 'Consents' 
    }
  })

  return { bank, branch, aTM, customer, kycProfile, identityDocument, riskAssessment, screeningResult, bankingProduct, account, accountStatement, transaction, externalAccount, fundsTransfer, standingInstruction, paymentCard, loanAccount, repaymentSchedule, loanPayment, collateral, feeCharge, exchangeRate, fXTrade, dispute, consent, thirdPartyProvider };
};
