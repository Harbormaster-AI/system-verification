const { DataSource } = require('apollo-datasource');
const BankAPI = require('./BankDS');
const AccountAPI = require('./AccountDS');
const LoanAccountAPI = require('./LoanAccountDS');
const PaymentCardAPI = require('./PaymentCardDS');

class BankingProductAPI extends DataSource {

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
  // find a BankingProduct
  //********************************************************************
  async find( id ) {
    return await this.store.bankingProduct.findOne({ where: {id} });
  }

  //********************************************************************
  // add a BankingProduct
  //********************************************************************
  async add( { productCode, name, description, ProductCategory } ) {
    return await this.store.bankingProduct.create( { productCode, name, description, ProductCategory } );
  }

  //********************************************************************
  // update a BankingProduct
  //********************************************************************
  async update( { productCode, name, description, ProductCategory, id } ) {
	await this.store.bankingProduct.update( { productCode, name, description, ProductCategory }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a BankingProduct by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.bankingProduct.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all BankingProduct
  //********************************************************************
  async findAll() {
    return await this.store.bankingProduct.findAll();
  }


  //********************************************************************
  // adds a Bank on a BankingProduct
  //returns this BankingProduct
  //********************************************************************
  async addBank( bankingProductId, { name, legalName, swiftBic, headquartersCountry, website } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: bankingProductId}).then(bankingProduct => {
    		  new BankAPI({store: this.store}).add( { name, legalName, swiftBic, headquartersCountry, website  } ).then(bank => {
    			  bankingProduct.setBank(bank).then(() => {
				        resolve( bankingProduct );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created bank to Bank 
  // on a BankingProduct
  //returns this BankingProduct
  //********************************************************************
  async assignToBank( bankingProductId, bankId ) {
    return new Promise((resolve, reject) => {
	    this.find(bankingProductId).then(bankingProduct => {
	    	new BankAPI({store: this.store}).find( bankId ).then(bank => {
    	        bankingProduct.setBank(bank);
    	       resolve(bankingProduct);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Bank on a BankingProduct by setting it to null
  //returns this BankingProduct
  //********************************************************************				
  async unassignBank( bankingProductId ) {
    return new Promise((resolve, reject) => {
	    this.find(bankingProductId).then(bankingProduct => {
    	    bankingProduct.setBank(null);
    	    resolve(bankingProduct);
        })
    })
  }
		


  //********************************************************************
  // adds a Account as the Accounts by first creating it 
  //returns this BankingProduct
  //********************************************************************				
  async addToAccounts( bankingProductId, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ) {
	return new Promise((resolve, reject) => {
		this.find(bankingProductId).then(bankingProduct => {
		    new AccountAPI({store: this.store}).add( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ).then(account => {
		    	bankingProduct.addToAccounts(bankingProduct).then(() => {
			        resolve( bankingProduct );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more accountsIds as a Accounts 
  // to a BankingProduct
  //returns this BankingProduct
  //********************************************************************				
  async assignToAccounts( bankingProductId, accountsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(bankingProduct => {
			var accountApi = new AccountAPI({store: this.store});
			bankingProduct.setAccounts([]).then((bankingProduct) => {			
				accountsIds.forEach(function (accountId, index) {
					accountApi.find({id: accountId}).then( foundAccount => {
						bankingProduct.addToAccounts(foundAccount);
					})
				})
				resolve(bankingProduct);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a LoanAccount as the LoanAccounts by first creating it 
  //returns this BankingProduct
  //********************************************************************				
  async addToLoanAccounts( bankingProductId, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ) {
	return new Promise((resolve, reject) => {
		this.find(bankingProductId).then(bankingProduct => {
		    new LoanAccountAPI({store: this.store}).add( { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ).then(loanAccount => {
		    	bankingProduct.addToLoanAccounts(bankingProduct).then(() => {
			        resolve( bankingProduct );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more loanAccountsIds as a LoanAccounts 
  // to a BankingProduct
  //returns this BankingProduct
  //********************************************************************				
  async assignToLoanAccounts( bankingProductId, loanAccountsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(bankingProduct => {
			var loanAccountApi = new LoanAccountAPI({store: this.store});
			bankingProduct.setLoanAccounts([]).then((bankingProduct) => {			
				loanAccountsIds.forEach(function (loanAccountId, index) {
					loanAccountApi.find({id: loanAccountId}).then( foundLoanAccount => {
						bankingProduct.addToLoanAccounts(foundLoanAccount);
					})
				})
				resolve(bankingProduct);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a PaymentCard as the PaymentCards by first creating it 
  //returns this BankingProduct
  //********************************************************************				
  async addToPaymentCards( bankingProductId, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } ) {
	return new Promise((resolve, reject) => {
		this.find(bankingProductId).then(bankingProduct => {
		    new PaymentCardAPI({store: this.store}).add( { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } ).then(paymentCard => {
		    	bankingProduct.addToPaymentCards(bankingProduct).then(() => {
			        resolve( bankingProduct );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more paymentCardsIds as a PaymentCards 
  // to a BankingProduct
  //returns this BankingProduct
  //********************************************************************				
  async assignToPaymentCards( bankingProductId, paymentCardsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(bankingProduct => {
			var paymentCardApi = new PaymentCardAPI({store: this.store});
			bankingProduct.setPaymentCards([]).then((bankingProduct) => {			
				paymentCardsIds.forEach(function (paymentCardId, index) {
					paymentCardApi.find({id: paymentCardId}).then( foundPaymentCard => {
						bankingProduct.addToPaymentCards(foundPaymentCard);
					})
				})
				resolve(bankingProduct);
			})
		})
	})
  }			
				
  //********************************************************************
  // saveHelper - internal helper to save a BankingProduct
  //********************************************************************
  async saveHelper( productCode, name, description, ProductCategory )  {
    return await this.update( productCode, name, description, ProductCategory );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable bankingProduct
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = BankingProductAPI;
