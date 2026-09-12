const { DataSource } = require('apollo-datasource');
const CustomerAPI = require('./CustomerDS');
const BankAPI = require('./BankDS');
const ExchangeRateAPI = require('./ExchangeRateDS');
const AccountAPI = require('./AccountDS');
const TransactionAPI = require('./TransactionDS');

class FXTradeAPI extends DataSource {

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
  // find a FXTrade
  //********************************************************************
  async find( id ) {
    return await this.store.fXTrade.findOne({ where: {id} });
  }

  //********************************************************************
  // add a FXTrade
  //********************************************************************
  async add( { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status } ) {
    return await this.store.fXTrade.create( { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status } );
  }

  //********************************************************************
  // update a FXTrade
  //********************************************************************
  async update( { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status, id } ) {
	await this.store.fXTrade.update( { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a FXTrade by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.fXTrade.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all FXTrade
  //********************************************************************
  async findAll() {
    return await this.store.fXTrade.findAll();
  }


  //********************************************************************
  // adds a Customer on a FXTrade
  //returns this FXTrade
  //********************************************************************
  async addCustomer( fXTradeId, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: fXTradeId}).then(fXTrade => {
    		  new CustomerAPI({store: this.store}).add( { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus  } ).then(customer => {
    			  fXTrade.setCustomer(customer).then(() => {
				        resolve( fXTrade );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created customer to Customer 
  // on a FXTrade
  //returns this FXTrade
  //********************************************************************
  async assignToCustomer( fXTradeId, customerId ) {
    return new Promise((resolve, reject) => {
	    this.find(fXTradeId).then(fXTrade => {
	    	new CustomerAPI({store: this.store}).find( customerId ).then(customer => {
    	        fXTrade.setCustomer(customer);
    	       resolve(fXTrade);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Customer on a FXTrade by setting it to null
  //returns this FXTrade
  //********************************************************************				
  async unassignCustomer( fXTradeId ) {
    return new Promise((resolve, reject) => {
	    this.find(fXTradeId).then(fXTrade => {
    	    fXTrade.setCustomer(null);
    	    resolve(fXTrade);
        })
    })
  }
		

  //********************************************************************
  // adds a Bank on a FXTrade
  //returns this FXTrade
  //********************************************************************
  async addBank( fXTradeId, { name, legalName, swiftBic, headquartersCountry, website } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: fXTradeId}).then(fXTrade => {
    		  new BankAPI({store: this.store}).add( { name, legalName, swiftBic, headquartersCountry, website  } ).then(bank => {
    			  fXTrade.setBank(bank).then(() => {
				        resolve( fXTrade );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created bank to Bank 
  // on a FXTrade
  //returns this FXTrade
  //********************************************************************
  async assignToBank( fXTradeId, bankId ) {
    return new Promise((resolve, reject) => {
	    this.find(fXTradeId).then(fXTrade => {
	    	new BankAPI({store: this.store}).find( bankId ).then(bank => {
    	        fXTrade.setBank(bank);
    	       resolve(fXTrade);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Bank on a FXTrade by setting it to null
  //returns this FXTrade
  //********************************************************************				
  async unassignBank( fXTradeId ) {
    return new Promise((resolve, reject) => {
	    this.find(fXTradeId).then(fXTrade => {
    	    fXTrade.setBank(null);
    	    resolve(fXTrade);
        })
    })
  }
		

  //********************************************************************
  // adds a ExchangeRate on a FXTrade
  //returns this FXTrade
  //********************************************************************
  async addExchangeRate( fXTradeId, { baseCurrency, counterCurrency, rate, asOf, source } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: fXTradeId}).then(fXTrade => {
    		  new ExchangeRateAPI({store: this.store}).add( { baseCurrency, counterCurrency, rate, asOf, source  } ).then(exchangeRate => {
    			  fXTrade.setExchangeRate(exchangeRate).then(() => {
				        resolve( fXTrade );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created exchangeRate to ExchangeRate 
  // on a FXTrade
  //returns this FXTrade
  //********************************************************************
  async assignToExchangeRate( fXTradeId, exchangeRateId ) {
    return new Promise((resolve, reject) => {
	    this.find(fXTradeId).then(fXTrade => {
	    	new ExchangeRateAPI({store: this.store}).find( exchangeRateId ).then(exchangeRate => {
    	        fXTrade.setExchangeRate(exchangeRate);
    	       resolve(fXTrade);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a ExchangeRate on a FXTrade by setting it to null
  //returns this FXTrade
  //********************************************************************				
  async unassignExchangeRate( fXTradeId ) {
    return new Promise((resolve, reject) => {
	    this.find(fXTradeId).then(fXTrade => {
    	    fXTrade.setExchangeRate(null);
    	    resolve(fXTrade);
        })
    })
  }
		

  //********************************************************************
  // adds a SourceAccount on a FXTrade
  //returns this FXTrade
  //********************************************************************
  async addSourceAccount( fXTradeId, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: fXTradeId}).then(fXTrade => {
    		  new AccountAPI({store: this.store}).add( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status  } ).then(account => {
    			  fXTrade.setSourceAccount(account).then(() => {
				        resolve( fXTrade );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created sourceAccount to SourceAccount 
  // on a FXTrade
  //returns this FXTrade
  //********************************************************************
  async assignToSourceAccount( fXTradeId, sourceAccountId ) {
    return new Promise((resolve, reject) => {
	    this.find(fXTradeId).then(fXTrade => {
	    	new AccountAPI({store: this.store}).find( sourceAccountId ).then(account => {
    	        fXTrade.setSourceAccount(account);
    	       resolve(fXTrade);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a SourceAccount on a FXTrade by setting it to null
  //returns this FXTrade
  //********************************************************************				
  async unassignSourceAccount( fXTradeId ) {
    return new Promise((resolve, reject) => {
	    this.find(fXTradeId).then(fXTrade => {
    	    fXTrade.setSourceAccount(null);
    	    resolve(fXTrade);
        })
    })
  }
		

  //********************************************************************
  // adds a DestinationAccount on a FXTrade
  //returns this FXTrade
  //********************************************************************
  async addDestinationAccount( fXTradeId, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: fXTradeId}).then(fXTrade => {
    		  new AccountAPI({store: this.store}).add( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status  } ).then(account => {
    			  fXTrade.setDestinationAccount(account).then(() => {
				        resolve( fXTrade );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created destinationAccount to DestinationAccount 
  // on a FXTrade
  //returns this FXTrade
  //********************************************************************
  async assignToDestinationAccount( fXTradeId, destinationAccountId ) {
    return new Promise((resolve, reject) => {
	    this.find(fXTradeId).then(fXTrade => {
	    	new AccountAPI({store: this.store}).find( destinationAccountId ).then(account => {
    	        fXTrade.setDestinationAccount(account);
    	       resolve(fXTrade);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a DestinationAccount on a FXTrade by setting it to null
  //returns this FXTrade
  //********************************************************************				
  async unassignDestinationAccount( fXTradeId ) {
    return new Promise((resolve, reject) => {
	    this.find(fXTradeId).then(fXTrade => {
    	    fXTrade.setDestinationAccount(null);
    	    resolve(fXTrade);
        })
    })
  }
		

  //********************************************************************
  // adds a Transaction on a FXTrade
  //returns this FXTrade
  //********************************************************************
  async addTransaction( fXTradeId, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: fXTradeId}).then(fXTrade => {
    		  new TransactionAPI({store: this.store}).add( { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel  } ).then(transaction => {
    			  fXTrade.setTransaction(transaction).then(() => {
				        resolve( fXTrade );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created transaction to Transaction 
  // on a FXTrade
  //returns this FXTrade
  //********************************************************************
  async assignToTransaction( fXTradeId, transactionId ) {
    return new Promise((resolve, reject) => {
	    this.find(fXTradeId).then(fXTrade => {
	    	new TransactionAPI({store: this.store}).find( transactionId ).then(transaction => {
    	        fXTrade.setTransaction(transaction);
    	       resolve(fXTrade);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Transaction on a FXTrade by setting it to null
  //returns this FXTrade
  //********************************************************************				
  async unassignTransaction( fXTradeId ) {
    return new Promise((resolve, reject) => {
	    this.find(fXTradeId).then(fXTrade => {
    	    fXTrade.setTransaction(null);
    	    resolve(fXTrade);
        })
    })
  }
		

  //********************************************************************
  // saveHelper - internal helper to save a FXTrade
  //********************************************************************
  async saveHelper( tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status )  {
    return await this.update( tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable fXTrade
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = FXTradeAPI;
