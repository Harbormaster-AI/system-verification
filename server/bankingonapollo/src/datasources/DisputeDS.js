const { DataSource } = require('apollo-datasource');
const TransactionAPI = require('./TransactionDS');
const CustomerAPI = require('./CustomerDS');
const AccountAPI = require('./AccountDS');
const PaymentCardAPI = require('./PaymentCardDS');

class DisputeAPI extends DataSource {

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
  // find a Dispute
  //********************************************************************
  async find( id ) {
    return await this.store.dispute.findOne({ where: {id} });
  }

  //********************************************************************
  // add a Dispute
  //********************************************************************
  async add( { disputeReference, raisedOn, reason, Status } ) {
    return await this.store.dispute.create( { disputeReference, raisedOn, reason, Status } );
  }

  //********************************************************************
  // update a Dispute
  //********************************************************************
  async update( { disputeReference, raisedOn, reason, Status, id } ) {
	await this.store.dispute.update( { disputeReference, raisedOn, reason, Status }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a Dispute by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.dispute.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all Dispute
  //********************************************************************
  async findAll() {
    return await this.store.dispute.findAll();
  }


  //********************************************************************
  // adds a Transaction on a Dispute
  //returns this Dispute
  //********************************************************************
  async addTransaction( disputeId, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: disputeId}).then(dispute => {
    		  new TransactionAPI({store: this.store}).add( { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel  } ).then(transaction => {
    			  dispute.setTransaction(transaction).then(() => {
				        resolve( dispute );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created transaction to Transaction 
  // on a Dispute
  //returns this Dispute
  //********************************************************************
  async assignToTransaction( disputeId, transactionId ) {
    return new Promise((resolve, reject) => {
	    this.find(disputeId).then(dispute => {
	    	new TransactionAPI({store: this.store}).find( transactionId ).then(transaction => {
    	        dispute.setTransaction(transaction);
    	       resolve(dispute);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Transaction on a Dispute by setting it to null
  //returns this Dispute
  //********************************************************************				
  async unassignTransaction( disputeId ) {
    return new Promise((resolve, reject) => {
	    this.find(disputeId).then(dispute => {
    	    dispute.setTransaction(null);
    	    resolve(dispute);
        })
    })
  }
		

  //********************************************************************
  // adds a Customer on a Dispute
  //returns this Dispute
  //********************************************************************
  async addCustomer( disputeId, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: disputeId}).then(dispute => {
    		  new CustomerAPI({store: this.store}).add( { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus  } ).then(customer => {
    			  dispute.setCustomer(customer).then(() => {
				        resolve( dispute );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created customer to Customer 
  // on a Dispute
  //returns this Dispute
  //********************************************************************
  async assignToCustomer( disputeId, customerId ) {
    return new Promise((resolve, reject) => {
	    this.find(disputeId).then(dispute => {
	    	new CustomerAPI({store: this.store}).find( customerId ).then(customer => {
    	        dispute.setCustomer(customer);
    	       resolve(dispute);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Customer on a Dispute by setting it to null
  //returns this Dispute
  //********************************************************************				
  async unassignCustomer( disputeId ) {
    return new Promise((resolve, reject) => {
	    this.find(disputeId).then(dispute => {
    	    dispute.setCustomer(null);
    	    resolve(dispute);
        })
    })
  }
		

  //********************************************************************
  // adds a Account on a Dispute
  //returns this Dispute
  //********************************************************************
  async addAccount( disputeId, { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: disputeId}).then(dispute => {
    		  new AccountAPI({store: this.store}).add( { accountNumber, iban, accountName, currency, openedOn, closedOn, AccountType, OwnershipType, Status  } ).then(account => {
    			  dispute.setAccount(account).then(() => {
				        resolve( dispute );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created account to Account 
  // on a Dispute
  //returns this Dispute
  //********************************************************************
  async assignToAccount( disputeId, accountId ) {
    return new Promise((resolve, reject) => {
	    this.find(disputeId).then(dispute => {
	    	new AccountAPI({store: this.store}).find( accountId ).then(account => {
    	        dispute.setAccount(account);
    	       resolve(dispute);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Account on a Dispute by setting it to null
  //returns this Dispute
  //********************************************************************				
  async unassignAccount( disputeId ) {
    return new Promise((resolve, reject) => {
	    this.find(disputeId).then(dispute => {
    	    dispute.setAccount(null);
    	    resolve(dispute);
        })
    })
  }
		

  //********************************************************************
  // adds a PaymentCard on a Dispute
  //returns this Dispute
  //********************************************************************
  async addPaymentCard( disputeId, { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: disputeId}).then(dispute => {
    		  new PaymentCardAPI({store: this.store}).add( { cardNumber, embossedName, expiryMonth, expiryYear, CardType, CardStatus, Network  } ).then(paymentCard => {
    			  dispute.setPaymentCard(paymentCard).then(() => {
				        resolve( dispute );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created paymentCard to PaymentCard 
  // on a Dispute
  //returns this Dispute
  //********************************************************************
  async assignToPaymentCard( disputeId, paymentCardId ) {
    return new Promise((resolve, reject) => {
	    this.find(disputeId).then(dispute => {
	    	new PaymentCardAPI({store: this.store}).find( paymentCardId ).then(paymentCard => {
    	        dispute.setPaymentCard(paymentCard);
    	       resolve(dispute);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a PaymentCard on a Dispute by setting it to null
  //returns this Dispute
  //********************************************************************				
  async unassignPaymentCard( disputeId ) {
    return new Promise((resolve, reject) => {
	    this.find(disputeId).then(dispute => {
    	    dispute.setPaymentCard(null);
    	    resolve(dispute);
        })
    })
  }
		

  //********************************************************************
  // saveHelper - internal helper to save a Dispute
  //********************************************************************
  async saveHelper( disputeReference, raisedOn, reason, Status )  {
    return await this.update( disputeReference, raisedOn, reason, Status );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable dispute
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = DisputeAPI;
