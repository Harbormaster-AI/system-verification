const { DataSource } = require('apollo-datasource');
const BankAPI = require('./BankDS');
const AccountAPI = require('./AccountDS');
const CustomerAPI = require('./CustomerDS');
const TransactionAPI = require('./TransactionDS');

class PaymentCardAPI extends DataSource {

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
  // find a PaymentCard
  //********************************************************************
  async find( id ) {
    return await this.store.paymentCard.findOne({ where: {id} });
  }

  //********************************************************************
  // add a PaymentCard
  //********************************************************************
  async add( { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } ) {
    return await this.store.paymentCard.create( { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } );
  }

  //********************************************************************
  // update a PaymentCard
  //********************************************************************
  async update( { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network, id } ) {
	await this.store.paymentCard.update( { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a PaymentCard by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.paymentCard.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all PaymentCard
  //********************************************************************
  async findAll() {
    return await this.store.paymentCard.findAll();
  }


  //********************************************************************
  // adds a Bank on a PaymentCard
  //returns this PaymentCard
  //********************************************************************
  async addBank( paymentCardId, { name, legalName, swiftBic, headquartersCountry, website } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: paymentCardId}).then(paymentCard => {
    		  new BankAPI({store: this.store}).add( { name, legalName, swiftBic, headquartersCountry, website  } ).then(bank => {
    			  paymentCard.setBank(bank).then(() => {
				        resolve( paymentCard );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created bank to Bank 
  // on a PaymentCard
  //returns this PaymentCard
  //********************************************************************
  async assignToBank( paymentCardId, bankId ) {
    return new Promise((resolve, reject) => {
	    this.find(paymentCardId).then(paymentCard => {
	    	new BankAPI({store: this.store}).find( bankId ).then(bank => {
    	        paymentCard.setBank(bank);
    	       resolve(paymentCard);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Bank on a PaymentCard by setting it to null
  //returns this PaymentCard
  //********************************************************************				
  async unassignBank( paymentCardId ) {
    return new Promise((resolve, reject) => {
	    this.find(paymentCardId).then(paymentCard => {
    	    paymentCard.setBank(null);
    	    resolve(paymentCard);
        })
    })
  }
		

  //********************************************************************
  // adds a Account on a PaymentCard
  //returns this PaymentCard
  //********************************************************************
  async addAccount( paymentCardId, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: paymentCardId}).then(paymentCard => {
    		  new AccountAPI({store: this.store}).add( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status  } ).then(account => {
    			  paymentCard.setAccount(account).then(() => {
				        resolve( paymentCard );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created account to Account 
  // on a PaymentCard
  //returns this PaymentCard
  //********************************************************************
  async assignToAccount( paymentCardId, accountId ) {
    return new Promise((resolve, reject) => {
	    this.find(paymentCardId).then(paymentCard => {
	    	new AccountAPI({store: this.store}).find( accountId ).then(account => {
    	        paymentCard.setAccount(account);
    	       resolve(paymentCard);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Account on a PaymentCard by setting it to null
  //returns this PaymentCard
  //********************************************************************				
  async unassignAccount( paymentCardId ) {
    return new Promise((resolve, reject) => {
	    this.find(paymentCardId).then(paymentCard => {
    	    paymentCard.setAccount(null);
    	    resolve(paymentCard);
        })
    })
  }
		

  //********************************************************************
  // adds a Customer on a PaymentCard
  //returns this PaymentCard
  //********************************************************************
  async addCustomer( paymentCardId, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: paymentCardId}).then(paymentCard => {
    		  new CustomerAPI({store: this.store}).add( { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus  } ).then(customer => {
    			  paymentCard.setCustomer(customer).then(() => {
				        resolve( paymentCard );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created customer to Customer 
  // on a PaymentCard
  //returns this PaymentCard
  //********************************************************************
  async assignToCustomer( paymentCardId, customerId ) {
    return new Promise((resolve, reject) => {
	    this.find(paymentCardId).then(paymentCard => {
	    	new CustomerAPI({store: this.store}).find( customerId ).then(customer => {
    	        paymentCard.setCustomer(customer);
    	       resolve(paymentCard);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Customer on a PaymentCard by setting it to null
  //returns this PaymentCard
  //********************************************************************				
  async unassignCustomer( paymentCardId ) {
    return new Promise((resolve, reject) => {
	    this.find(paymentCardId).then(paymentCard => {
    	    paymentCard.setCustomer(null);
    	    resolve(paymentCard);
        })
    })
  }
		


  //********************************************************************
  // adds a Transaction as the Transactions by first creating it 
  //returns this PaymentCard
  //********************************************************************				
  async addToTransactions( paymentCardId, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } ) {
	return new Promise((resolve, reject) => {
		this.find(paymentCardId).then(paymentCard => {
		    new TransactionAPI({store: this.store}).add( { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } ).then(transaction => {
		    	paymentCard.addToTransactions(paymentCard).then(() => {
			        resolve( paymentCard );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more transactionsIds as a Transactions 
  // to a PaymentCard
  //returns this PaymentCard
  //********************************************************************				
  async assignToTransactions( paymentCardId, transactionsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(paymentCard => {
			var transactionApi = new TransactionAPI({store: this.store});
			paymentCard.setTransactions([]).then((paymentCard) => {			
				transactionsIds.forEach(function (transactionId, index) {
					transactionApi.find({id: transactionId}).then( foundTransaction => {
						paymentCard.addToTransactions(foundTransaction);
					})
				})
				resolve(paymentCard);
			})
		})
	})
  }			
				
  //********************************************************************
  // saveHelper - internal helper to save a PaymentCard
  //********************************************************************
  async saveHelper( cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network )  {
    return await this.update( cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable paymentCard
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = PaymentCardAPI;
