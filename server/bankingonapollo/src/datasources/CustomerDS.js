const { DataSource } = require('apollo-datasource');
const BankAPI = require('./BankDS');
const AccountAPI = require('./AccountDS');
const LoanAccountAPI = require('./LoanAccountDS');
const PaymentCardAPI = require('./PaymentCardDS');
const ExternalAccountAPI = require('./ExternalAccountDS');
const FundsTransferAPI = require('./FundsTransferDS');
const DisputeAPI = require('./DisputeDS');
const KycProfileAPI = require('./KycProfileDS');
const ConsentAPI = require('./ConsentDS');

class CustomerAPI extends DataSource {

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
  // find a Customer
  //********************************************************************
  async find( id ) {
    return await this.store.customer.findOne({ where: {id} });
  }

  //********************************************************************
  // add a Customer
  //********************************************************************
  async add( { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } ) {
    return await this.store.customer.create( { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } );
  }

  //********************************************************************
  // update a Customer
  //********************************************************************
  async update( { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus, id } ) {
	await this.store.customer.update( { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a Customer by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.customer.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all Customer
  //********************************************************************
  async findAll() {
    return await this.store.customer.findAll();
  }


  //********************************************************************
  // adds a Bank on a Customer
  //returns this Customer
  //********************************************************************
  async addBank( customerId, { name, legalName, swiftBic, headquartersCountry, website } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: customerId}).then(customer => {
    		  new BankAPI({store: this.store}).add( { name, legalName, swiftBic, headquartersCountry, website  } ).then(bank => {
    			  customer.setBank(bank).then(() => {
				        resolve( customer );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created bank to Bank 
  // on a Customer
  //returns this Customer
  //********************************************************************
  async assignToBank( customerId, bankId ) {
    return new Promise((resolve, reject) => {
	    this.find(customerId).then(customer => {
	    	new BankAPI({store: this.store}).find( bankId ).then(bank => {
    	        customer.setBank(bank);
    	       resolve(customer);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Bank on a Customer by setting it to null
  //returns this Customer
  //********************************************************************				
  async unassignBank( customerId ) {
    return new Promise((resolve, reject) => {
	    this.find(customerId).then(customer => {
    	    customer.setBank(null);
    	    resolve(customer);
        })
    })
  }
		


  //********************************************************************
  // adds a Account as the Accounts by first creating it 
  //returns this Customer
  //********************************************************************				
  async addToAccounts( customerId, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ) {
	return new Promise((resolve, reject) => {
		this.find(customerId).then(customer => {
		    new AccountAPI({store: this.store}).add( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ).then(account => {
		    	customer.addToAccounts(customer).then(() => {
			        resolve( customer );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more accountsIds as a Accounts 
  // to a Customer
  //returns this Customer
  //********************************************************************				
  async assignToAccounts( customerId, accountsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(customer => {
			var accountApi = new AccountAPI({store: this.store});
			customer.setAccounts([]).then((customer) => {			
				accountsIds.forEach(function (accountId, index) {
					accountApi.find({id: accountId}).then( foundAccount => {
						customer.addToAccounts(foundAccount);
					})
				})
				resolve(customer);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a LoanAccount as the LoanAccounts by first creating it 
  //returns this Customer
  //********************************************************************				
  async addToLoanAccounts( customerId, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ) {
	return new Promise((resolve, reject) => {
		this.find(customerId).then(customer => {
		    new LoanAccountAPI({store: this.store}).add( { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ).then(loanAccount => {
		    	customer.addToLoanAccounts(customer).then(() => {
			        resolve( customer );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more loanAccountsIds as a LoanAccounts 
  // to a Customer
  //returns this Customer
  //********************************************************************				
  async assignToLoanAccounts( customerId, loanAccountsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(customer => {
			var loanAccountApi = new LoanAccountAPI({store: this.store});
			customer.setLoanAccounts([]).then((customer) => {			
				loanAccountsIds.forEach(function (loanAccountId, index) {
					loanAccountApi.find({id: loanAccountId}).then( foundLoanAccount => {
						customer.addToLoanAccounts(foundLoanAccount);
					})
				})
				resolve(customer);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a PaymentCard as the PaymentCards by first creating it 
  //returns this Customer
  //********************************************************************				
  async addToPaymentCards( customerId, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } ) {
	return new Promise((resolve, reject) => {
		this.find(customerId).then(customer => {
		    new PaymentCardAPI({store: this.store}).add( { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } ).then(paymentCard => {
		    	customer.addToPaymentCards(customer).then(() => {
			        resolve( customer );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more paymentCardsIds as a PaymentCards 
  // to a Customer
  //returns this Customer
  //********************************************************************				
  async assignToPaymentCards( customerId, paymentCardsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(customer => {
			var paymentCardApi = new PaymentCardAPI({store: this.store});
			customer.setPaymentCards([]).then((customer) => {			
				paymentCardsIds.forEach(function (paymentCardId, index) {
					paymentCardApi.find({id: paymentCardId}).then( foundPaymentCard => {
						customer.addToPaymentCards(foundPaymentCard);
					})
				})
				resolve(customer);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a ExternalAccount as the ExternalAccounts by first creating it 
  //returns this Customer
  //********************************************************************				
  async addToExternalAccounts( customerId, { name, iban, accountNumber, bic, bankName, country } ) {
	return new Promise((resolve, reject) => {
		this.find(customerId).then(customer => {
		    new ExternalAccountAPI({store: this.store}).add( { name, iban, accountNumber, bic, bankName, country } ).then(externalAccount => {
		    	customer.addToExternalAccounts(customer).then(() => {
			        resolve( customer );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more externalAccountsIds as a ExternalAccounts 
  // to a Customer
  //returns this Customer
  //********************************************************************				
  async assignToExternalAccounts( customerId, externalAccountsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(customer => {
			var externalAccountApi = new ExternalAccountAPI({store: this.store});
			customer.setExternalAccounts([]).then((customer) => {			
				externalAccountsIds.forEach(function (externalAccountId, index) {
					externalAccountApi.find({id: externalAccountId}).then( foundExternalAccount => {
						customer.addToExternalAccounts(foundExternalAccount);
					})
				})
				resolve(customer);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a FundsTransfer as the FundsTransfers by first creating it 
  //returns this Customer
  //********************************************************************				
  async addToFundsTransfers( customerId, { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status } ) {
	return new Promise((resolve, reject) => {
		this.find(customerId).then(customer => {
		    new FundsTransferAPI({store: this.store}).add( { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status } ).then(fundsTransfer => {
		    	customer.addToFundsTransfers(customer).then(() => {
			        resolve( customer );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more fundsTransfersIds as a FundsTransfers 
  // to a Customer
  //returns this Customer
  //********************************************************************				
  async assignToFundsTransfers( customerId, fundsTransfersIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(customer => {
			var fundsTransferApi = new FundsTransferAPI({store: this.store});
			customer.setFundsTransfers([]).then((customer) => {			
				fundsTransfersIds.forEach(function (fundsTransferId, index) {
					fundsTransferApi.find({id: fundsTransferId}).then( foundFundsTransfer => {
						customer.addToFundsTransfers(foundFundsTransfer);
					})
				})
				resolve(customer);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a Dispute as the Disputes by first creating it 
  //returns this Customer
  //********************************************************************				
  async addToDisputes( customerId, { disputeReference, raisedOn, reason, Status } ) {
	return new Promise((resolve, reject) => {
		this.find(customerId).then(customer => {
		    new DisputeAPI({store: this.store}).add( { disputeReference, raisedOn, reason, Status } ).then(dispute => {
		    	customer.addToDisputes(customer).then(() => {
			        resolve( customer );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more disputesIds as a Disputes 
  // to a Customer
  //returns this Customer
  //********************************************************************				
  async assignToDisputes( customerId, disputesIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(customer => {
			var disputeApi = new DisputeAPI({store: this.store});
			customer.setDisputes([]).then((customer) => {			
				disputesIds.forEach(function (disputeId, index) {
					disputeApi.find({id: disputeId}).then( foundDispute => {
						customer.addToDisputes(foundDispute);
					})
				})
				resolve(customer);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a KycProfile as the KycProfiles by first creating it 
  //returns this Customer
  //********************************************************************				
  async addToKycProfiles( customerId, { profileId, lastReviewedOn, Status } ) {
	return new Promise((resolve, reject) => {
		this.find(customerId).then(customer => {
		    new KycProfileAPI({store: this.store}).add( { profileId, lastReviewedOn, Status } ).then(kycProfile => {
		    	customer.addToKycProfiles(customer).then(() => {
			        resolve( customer );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more kycProfilesIds as a KycProfiles 
  // to a Customer
  //returns this Customer
  //********************************************************************				
  async assignToKycProfiles( customerId, kycProfilesIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(customer => {
			var kycProfileApi = new KycProfileAPI({store: this.store});
			customer.setKycProfiles([]).then((customer) => {			
				kycProfilesIds.forEach(function (kycProfileId, index) {
					kycProfileApi.find({id: kycProfileId}).then( foundKycProfile => {
						customer.addToKycProfiles(foundKycProfile);
					})
				})
				resolve(customer);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a Consent as the Consents by first creating it 
  //returns this Customer
  //********************************************************************				
  async addToConsents( customerId, { grantedOn, expiresOn, ConsentType, Status } ) {
	return new Promise((resolve, reject) => {
		this.find(customerId).then(customer => {
		    new ConsentAPI({store: this.store}).add( { grantedOn, expiresOn, ConsentType, Status } ).then(consent => {
		    	customer.addToConsents(customer).then(() => {
			        resolve( customer );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more consentsIds as a Consents 
  // to a Customer
  //returns this Customer
  //********************************************************************				
  async assignToConsents( customerId, consentsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(customer => {
			var consentApi = new ConsentAPI({store: this.store});
			customer.setConsents([]).then((customer) => {			
				consentsIds.forEach(function (consentId, index) {
					consentApi.find({id: consentId}).then( foundConsent => {
						customer.addToConsents(foundConsent);
					})
				})
				resolve(customer);
			})
		})
	})
  }			
				
  //********************************************************************
  // saveHelper - internal helper to save a Customer
  //********************************************************************
  async saveHelper( firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus )  {
    return await this.update( firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable customer
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = CustomerAPI;
