const { DataSource } = require('apollo-datasource');
const AccountAPI = require('./AccountDS');
const ExternalAccountAPI = require('./ExternalAccountDS');
const PaymentCardAPI = require('./PaymentCardDS');
const FundsTransferAPI = require('./FundsTransferDS');
const FXTradeAPI = require('./FXTradeDS');
const DisputeAPI = require('./DisputeDS');

class TransactionAPI extends DataSource {

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
  // find a Transaction
  //********************************************************************
  async find( id ) {
    return await this.store.transaction.findOne({ where: {id} });
  }

  //********************************************************************
  // add a Transaction
  //********************************************************************
  async add( { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } ) {
    return await this.store.transaction.create( { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } );
  }

  //********************************************************************
  // update a Transaction
  //********************************************************************
  async update( { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel, id } ) {
	await this.store.transaction.update( { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a Transaction by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.transaction.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all Transaction
  //********************************************************************
  async findAll() {
    return await this.store.transaction.findAll();
  }


  //********************************************************************
  // adds a Account on a Transaction
  //returns this Transaction
  //********************************************************************
  async addAccount( transactionId, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: transactionId}).then(transaction => {
    		  new AccountAPI({store: this.store}).add( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status  } ).then(account => {
    			  transaction.setAccount(account).then(() => {
				        resolve( transaction );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created account to Account 
  // on a Transaction
  //returns this Transaction
  //********************************************************************
  async assignToAccount( transactionId, accountId ) {
    return new Promise((resolve, reject) => {
	    this.find(transactionId).then(transaction => {
	    	new AccountAPI({store: this.store}).find( accountId ).then(account => {
    	        transaction.setAccount(account);
    	       resolve(transaction);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Account on a Transaction by setting it to null
  //returns this Transaction
  //********************************************************************				
  async unassignAccount( transactionId ) {
    return new Promise((resolve, reject) => {
	    this.find(transactionId).then(transaction => {
    	    transaction.setAccount(null);
    	    resolve(transaction);
        })
    })
  }
		

  //********************************************************************
  // adds a ExternalCounterparty on a Transaction
  //returns this Transaction
  //********************************************************************
  async addExternalCounterparty( transactionId, { name, iban, accountNumber, bic, bankName, country } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: transactionId}).then(transaction => {
    		  new ExternalAccountAPI({store: this.store}).add( { name, iban, accountNumber, bic, bankName, country  } ).then(externalAccount => {
    			  transaction.setExternalCounterparty(externalAccount).then(() => {
				        resolve( transaction );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created externalCounterparty to ExternalCounterparty 
  // on a Transaction
  //returns this Transaction
  //********************************************************************
  async assignToExternalCounterparty( transactionId, externalCounterpartyId ) {
    return new Promise((resolve, reject) => {
	    this.find(transactionId).then(transaction => {
	    	new ExternalAccountAPI({store: this.store}).find( externalCounterpartyId ).then(externalAccount => {
    	        transaction.setExternalCounterparty(externalAccount);
    	       resolve(transaction);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a ExternalCounterparty on a Transaction by setting it to null
  //returns this Transaction
  //********************************************************************				
  async unassignExternalCounterparty( transactionId ) {
    return new Promise((resolve, reject) => {
	    this.find(transactionId).then(transaction => {
    	    transaction.setExternalCounterparty(null);
    	    resolve(transaction);
        })
    })
  }
		

  //********************************************************************
  // adds a PaymentCard on a Transaction
  //returns this Transaction
  //********************************************************************
  async addPaymentCard( transactionId, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: transactionId}).then(transaction => {
    		  new PaymentCardAPI({store: this.store}).add( { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network  } ).then(paymentCard => {
    			  transaction.setPaymentCard(paymentCard).then(() => {
				        resolve( transaction );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created paymentCard to PaymentCard 
  // on a Transaction
  //returns this Transaction
  //********************************************************************
  async assignToPaymentCard( transactionId, paymentCardId ) {
    return new Promise((resolve, reject) => {
	    this.find(transactionId).then(transaction => {
	    	new PaymentCardAPI({store: this.store}).find( paymentCardId ).then(paymentCard => {
    	        transaction.setPaymentCard(paymentCard);
    	       resolve(transaction);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a PaymentCard on a Transaction by setting it to null
  //returns this Transaction
  //********************************************************************				
  async unassignPaymentCard( transactionId ) {
    return new Promise((resolve, reject) => {
	    this.find(transactionId).then(transaction => {
    	    transaction.setPaymentCard(null);
    	    resolve(transaction);
        })
    })
  }
		

  //********************************************************************
  // adds a FundsTransfer on a Transaction
  //returns this Transaction
  //********************************************************************
  async addFundsTransfer( transactionId, { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: transactionId}).then(transaction => {
    		  new FundsTransferAPI({store: this.store}).add( { transferReference, amount, requestedDate, executionDate, purpose, feeAmount, Method, Status  } ).then(fundsTransfer => {
    			  transaction.setFundsTransfer(fundsTransfer).then(() => {
				        resolve( transaction );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created fundsTransfer to FundsTransfer 
  // on a Transaction
  //returns this Transaction
  //********************************************************************
  async assignToFundsTransfer( transactionId, fundsTransferId ) {
    return new Promise((resolve, reject) => {
	    this.find(transactionId).then(transaction => {
	    	new FundsTransferAPI({store: this.store}).find( fundsTransferId ).then(fundsTransfer => {
    	        transaction.setFundsTransfer(fundsTransfer);
    	       resolve(transaction);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a FundsTransfer on a Transaction by setting it to null
  //returns this Transaction
  //********************************************************************				
  async unassignFundsTransfer( transactionId ) {
    return new Promise((resolve, reject) => {
	    this.find(transactionId).then(transaction => {
    	    transaction.setFundsTransfer(null);
    	    resolve(transaction);
        })
    })
  }
		

  //********************************************************************
  // adds a FxTrade on a Transaction
  //returns this Transaction
  //********************************************************************
  async addFxTrade( transactionId, { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: transactionId}).then(transaction => {
    		  new FXTradeAPI({store: this.store}).add( { tradeReference, tradeDate, settlementDate, amountSold, amountBought, rate, Status  } ).then(fXTrade => {
    			  transaction.setFxTrade(fXTrade).then(() => {
				        resolve( transaction );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created fxTrade to FxTrade 
  // on a Transaction
  //returns this Transaction
  //********************************************************************
  async assignToFxTrade( transactionId, fxTradeId ) {
    return new Promise((resolve, reject) => {
	    this.find(transactionId).then(transaction => {
	    	new FXTradeAPI({store: this.store}).find( fxTradeId ).then(fXTrade => {
    	        transaction.setFxTrade(fXTrade);
    	       resolve(transaction);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a FxTrade on a Transaction by setting it to null
  //returns this Transaction
  //********************************************************************				
  async unassignFxTrade( transactionId ) {
    return new Promise((resolve, reject) => {
	    this.find(transactionId).then(transaction => {
    	    transaction.setFxTrade(null);
    	    resolve(transaction);
        })
    })
  }
		

  //********************************************************************
  // adds a Dispute on a Transaction
  //returns this Transaction
  //********************************************************************
  async addDispute( transactionId, { disputeReference, raisedOn, reason, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: transactionId}).then(transaction => {
    		  new DisputeAPI({store: this.store}).add( { disputeReference, raisedOn, reason, Status  } ).then(dispute => {
    			  transaction.setDispute(dispute).then(() => {
				        resolve( transaction );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created dispute to Dispute 
  // on a Transaction
  //returns this Transaction
  //********************************************************************
  async assignToDispute( transactionId, disputeId ) {
    return new Promise((resolve, reject) => {
	    this.find(transactionId).then(transaction => {
	    	new DisputeAPI({store: this.store}).find( disputeId ).then(dispute => {
    	        transaction.setDispute(dispute);
    	       resolve(transaction);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Dispute on a Transaction by setting it to null
  //returns this Transaction
  //********************************************************************				
  async unassignDispute( transactionId ) {
    return new Promise((resolve, reject) => {
	    this.find(transactionId).then(transaction => {
    	    transaction.setDispute(null);
    	    resolve(transaction);
        })
    })
  }
		

  //********************************************************************
  // saveHelper - internal helper to save a Transaction
  //********************************************************************
  async saveHelper( bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel )  {
    return await this.update( bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable transaction
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = TransactionAPI;
