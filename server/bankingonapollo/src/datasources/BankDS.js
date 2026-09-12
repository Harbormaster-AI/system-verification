const { DataSource } = require('apollo-datasource');
const BranchAPI = require('./BranchDS');
const BankingProductAPI = require('./BankingProductDS');
const CustomerAPI = require('./CustomerDS');
const AccountAPI = require('./AccountDS');
const PaymentCardAPI = require('./PaymentCardDS');
const LoanAccountAPI = require('./LoanAccountDS');
const ExchangeRateAPI = require('./ExchangeRateDS');
const ConsentAPI = require('./ConsentDS');
const ThirdPartyProviderAPI = require('./ThirdPartyProviderDS');

class BankAPI extends DataSource {

	//********************************************************************
	// general holder 
	//********************************************************************

	constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

    //********************************************************************
  // find a Bank
  //********************************************************************
  async find( id ) {
    return await this.store.bank.findOne({ where: {id} });
  }

  //********************************************************************
  // add a Bank
  //********************************************************************
  async add( { name, legalName, swiftBic, headquartersCountry, website } ) {
    return await this.store.bank.create( { name, legalName, swiftBic, headquartersCountry, website } );
  }

  //********************************************************************
  // update a Bank
  //********************************************************************
  async update( { name, legalName, swiftBic, headquartersCountry, website, id } ) {
	await this.store.bank.update( { name, legalName, swiftBic, headquartersCountry, website }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a Bank by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.bank.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all Bank
  //********************************************************************
  async findAll() {
    return await this.store.bank.findAll();
  }



  //********************************************************************
  // adds a Branch as the Branches by first creating it 
  //returns this Bank
  //********************************************************************				
  async addToBranches( bankId, { name, branchCode, address, phone, openingHours } ) {
	return new Promise((resolve, reject) => {
		this.find(bankId).then(bank => {
		    new BranchAPI({store: this.store}).add( { name, branchCode, address, phone, openingHours } ).then(branch => {
		    	bank.addToBranches(bank).then(() => {
			        resolve( bank );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more branchesIds as a Branches 
  // to a Bank
  //returns this Bank
  //********************************************************************				
  async assignToBranches( bankId, branchesIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(bank => {
			var branchApi = new BranchAPI({store: this.store});
			bank.setBranches([]).then((bank) => {			
				branchesIds.forEach(function (branchId, index) {
					branchApi.find({id: branchId}).then( foundBranch => {
						bank.addToBranches(foundBranch);
					})
				})
				resolve(bank);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a BankingProduct as the Products by first creating it 
  //returns this Bank
  //********************************************************************				
  async addToProducts( bankId, { productCode, name, description, ProductCategory } ) {
	return new Promise((resolve, reject) => {
		this.find(bankId).then(bank => {
		    new BankingProductAPI({store: this.store}).add( { productCode, name, description, ProductCategory } ).then(bankingProduct => {
		    	bank.addToProducts(bank).then(() => {
			        resolve( bank );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more productsIds as a Products 
  // to a Bank
  //returns this Bank
  //********************************************************************				
  async assignToProducts( bankId, productsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(bank => {
			var bankingProductApi = new BankingProductAPI({store: this.store});
			bank.setProducts([]).then((bank) => {			
				productsIds.forEach(function (bankingProductId, index) {
					bankingProductApi.find({id: bankingProductId}).then( foundBankingProduct => {
						bank.addToProducts(foundBankingProduct);
					})
				})
				resolve(bank);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a Customer as the Customers by first creating it 
  //returns this Bank
  //********************************************************************				
  async addToCustomers( bankId, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } ) {
	return new Promise((resolve, reject) => {
		this.find(bankId).then(bank => {
		    new CustomerAPI({store: this.store}).add( { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } ).then(customer => {
		    	bank.addToCustomers(bank).then(() => {
			        resolve( bank );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more customersIds as a Customers 
  // to a Bank
  //returns this Bank
  //********************************************************************				
  async assignToCustomers( bankId, customersIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(bank => {
			var customerApi = new CustomerAPI({store: this.store});
			bank.setCustomers([]).then((bank) => {			
				customersIds.forEach(function (customerId, index) {
					customerApi.find({id: customerId}).then( foundCustomer => {
						bank.addToCustomers(foundCustomer);
					})
				})
				resolve(bank);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a Account as the Accounts by first creating it 
  //returns this Bank
  //********************************************************************				
  async addToAccounts( bankId, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ) {
	return new Promise((resolve, reject) => {
		this.find(bankId).then(bank => {
		    new AccountAPI({store: this.store}).add( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ).then(account => {
		    	bank.addToAccounts(bank).then(() => {
			        resolve( bank );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more accountsIds as a Accounts 
  // to a Bank
  //returns this Bank
  //********************************************************************				
  async assignToAccounts( bankId, accountsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(bank => {
			var accountApi = new AccountAPI({store: this.store});
			bank.setAccounts([]).then((bank) => {			
				accountsIds.forEach(function (accountId, index) {
					accountApi.find({id: accountId}).then( foundAccount => {
						bank.addToAccounts(foundAccount);
					})
				})
				resolve(bank);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a PaymentCard as the PaymentCards by first creating it 
  //returns this Bank
  //********************************************************************				
  async addToPaymentCards( bankId, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } ) {
	return new Promise((resolve, reject) => {
		this.find(bankId).then(bank => {
		    new PaymentCardAPI({store: this.store}).add( { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } ).then(paymentCard => {
		    	bank.addToPaymentCards(bank).then(() => {
			        resolve( bank );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more paymentCardsIds as a PaymentCards 
  // to a Bank
  //returns this Bank
  //********************************************************************				
  async assignToPaymentCards( bankId, paymentCardsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(bank => {
			var paymentCardApi = new PaymentCardAPI({store: this.store});
			bank.setPaymentCards([]).then((bank) => {			
				paymentCardsIds.forEach(function (paymentCardId, index) {
					paymentCardApi.find({id: paymentCardId}).then( foundPaymentCard => {
						bank.addToPaymentCards(foundPaymentCard);
					})
				})
				resolve(bank);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a LoanAccount as the LoanAccounts by first creating it 
  //returns this Bank
  //********************************************************************				
  async addToLoanAccounts( bankId, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ) {
	return new Promise((resolve, reject) => {
		this.find(bankId).then(bank => {
		    new LoanAccountAPI({store: this.store}).add( { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ).then(loanAccount => {
		    	bank.addToLoanAccounts(bank).then(() => {
			        resolve( bank );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more loanAccountsIds as a LoanAccounts 
  // to a Bank
  //returns this Bank
  //********************************************************************				
  async assignToLoanAccounts( bankId, loanAccountsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(bank => {
			var loanAccountApi = new LoanAccountAPI({store: this.store});
			bank.setLoanAccounts([]).then((bank) => {			
				loanAccountsIds.forEach(function (loanAccountId, index) {
					loanAccountApi.find({id: loanAccountId}).then( foundLoanAccount => {
						bank.addToLoanAccounts(foundLoanAccount);
					})
				})
				resolve(bank);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a ExchangeRate as the ExchangeRates by first creating it 
  //returns this Bank
  //********************************************************************				
  async addToExchangeRates( bankId, { baseCurrency, counterCurrency, rate, asOf, source } ) {
	return new Promise((resolve, reject) => {
		this.find(bankId).then(bank => {
		    new ExchangeRateAPI({store: this.store}).add( { baseCurrency, counterCurrency, rate, asOf, source } ).then(exchangeRate => {
		    	bank.addToExchangeRates(bank).then(() => {
			        resolve( bank );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more exchangeRatesIds as a ExchangeRates 
  // to a Bank
  //returns this Bank
  //********************************************************************				
  async assignToExchangeRates( bankId, exchangeRatesIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(bank => {
			var exchangeRateApi = new ExchangeRateAPI({store: this.store});
			bank.setExchangeRates([]).then((bank) => {			
				exchangeRatesIds.forEach(function (exchangeRateId, index) {
					exchangeRateApi.find({id: exchangeRateId}).then( foundExchangeRate => {
						bank.addToExchangeRates(foundExchangeRate);
					})
				})
				resolve(bank);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a Consent as the Consents by first creating it 
  //returns this Bank
  //********************************************************************				
  async addToConsents( bankId, { grantedOn, expiresOn, ConsentType, Status } ) {
	return new Promise((resolve, reject) => {
		this.find(bankId).then(bank => {
		    new ConsentAPI({store: this.store}).add( { grantedOn, expiresOn, ConsentType, Status } ).then(consent => {
		    	bank.addToConsents(bank).then(() => {
			        resolve( bank );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more consentsIds as a Consents 
  // to a Bank
  //returns this Bank
  //********************************************************************				
  async assignToConsents( bankId, consentsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(bank => {
			var consentApi = new ConsentAPI({store: this.store});
			bank.setConsents([]).then((bank) => {			
				consentsIds.forEach(function (consentId, index) {
					consentApi.find({id: consentId}).then( foundConsent => {
						bank.addToConsents(foundConsent);
					})
				})
				resolve(bank);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a ThirdPartyProvider as the ThirdPartyProviders by first creating it 
  //returns this Bank
  //********************************************************************				
  async addToThirdPartyProviders( bankId, { name, registrationId, website } ) {
	return new Promise((resolve, reject) => {
		this.find(bankId).then(bank => {
		    new ThirdPartyProviderAPI({store: this.store}).add( { name, registrationId, website } ).then(thirdPartyProvider => {
		    	bank.addToThirdPartyProviders(bank).then(() => {
			        resolve( bank );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more thirdPartyProvidersIds as a ThirdPartyProviders 
  // to a Bank
  //returns this Bank
  //********************************************************************				
  async assignToThirdPartyProviders( bankId, thirdPartyProvidersIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(bank => {
			var thirdPartyProviderApi = new ThirdPartyProviderAPI({store: this.store});
			bank.setThirdPartyProviders([]).then((bank) => {			
				thirdPartyProvidersIds.forEach(function (thirdPartyProviderId, index) {
					thirdPartyProviderApi.find({id: thirdPartyProviderId}).then( foundThirdPartyProvider => {
						bank.addToThirdPartyProviders(foundThirdPartyProvider);
					})
				})
				resolve(bank);
			})
		})
	})
  }			
				
  //********************************************************************
  // saveHelper - internal helper to save a Bank
  //********************************************************************
  async saveHelper( name, legalName, swiftBic, headquartersCountry, website )  {
    return await this.update( name, legalName, swiftBic, headquartersCountry, website );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable bank
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = BankAPI;
