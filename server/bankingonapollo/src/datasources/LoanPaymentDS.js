const { DataSource } = require('apollo-datasource');
const LoanAccountAPI = require('./LoanAccountDS');
const TransactionAPI = require('./TransactionDS');

class LoanPaymentAPI extends DataSource {

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
  // find a LoanPayment
  //********************************************************************
  async find( id ) {
    return await this.store.loanPayment.findOne({ where: {id} });
  }

  //********************************************************************
  // add a LoanPayment
  //********************************************************************
  async add( { paymentReference, amount, paymentDate, Method, Status } ) {
    return await this.store.loanPayment.create( { paymentReference, amount, paymentDate, Method, Status } );
  }

  //********************************************************************
  // update a LoanPayment
  //********************************************************************
  async update( { paymentReference, amount, paymentDate, Method, Status, id } ) {
	await this.store.loanPayment.update( { paymentReference, amount, paymentDate, Method, Status }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a LoanPayment by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.loanPayment.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all LoanPayment
  //********************************************************************
  async findAll() {
    return await this.store.loanPayment.findAll();
  }


  //********************************************************************
  // adds a LoanAccount on a LoanPayment
  //returns this LoanPayment
  //********************************************************************
  async addLoanAccount( loanPaymentId, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: loanPaymentId}).then(loanPayment => {
    		  new LoanAccountAPI({store: this.store}).add( { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status  } ).then(loanAccount => {
    			  loanPayment.setLoanAccount(loanAccount).then(() => {
				        resolve( loanPayment );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created loanAccount to LoanAccount 
  // on a LoanPayment
  //returns this LoanPayment
  //********************************************************************
  async assignToLoanAccount( loanPaymentId, loanAccountId ) {
    return new Promise((resolve, reject) => {
	    this.find(loanPaymentId).then(loanPayment => {
	    	new LoanAccountAPI({store: this.store}).find( loanAccountId ).then(loanAccount => {
    	        loanPayment.setLoanAccount(loanAccount);
    	       resolve(loanPayment);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a LoanAccount on a LoanPayment by setting it to null
  //returns this LoanPayment
  //********************************************************************				
  async unassignLoanAccount( loanPaymentId ) {
    return new Promise((resolve, reject) => {
	    this.find(loanPaymentId).then(loanPayment => {
    	    loanPayment.setLoanAccount(null);
    	    resolve(loanPayment);
        })
    })
  }
		

  //********************************************************************
  // adds a Transaction on a LoanPayment
  //returns this LoanPayment
  //********************************************************************
  async addTransaction( loanPaymentId, { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: loanPaymentId}).then(loanPayment => {
    		  new TransactionAPI({store: this.store}).add( { bookingDate, valueDate, amount, description, Direction, TransactionType, Status, Channel  } ).then(transaction => {
    			  loanPayment.setTransaction(transaction).then(() => {
				        resolve( loanPayment );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created transaction to Transaction 
  // on a LoanPayment
  //returns this LoanPayment
  //********************************************************************
  async assignToTransaction( loanPaymentId, transactionId ) {
    return new Promise((resolve, reject) => {
	    this.find(loanPaymentId).then(loanPayment => {
	    	new TransactionAPI({store: this.store}).find( transactionId ).then(transaction => {
    	        loanPayment.setTransaction(transaction);
    	       resolve(loanPayment);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Transaction on a LoanPayment by setting it to null
  //returns this LoanPayment
  //********************************************************************				
  async unassignTransaction( loanPaymentId ) {
    return new Promise((resolve, reject) => {
	    this.find(loanPaymentId).then(loanPayment => {
    	    loanPayment.setTransaction(null);
    	    resolve(loanPayment);
        })
    })
  }
		

  //********************************************************************
  // saveHelper - internal helper to save a LoanPayment
  //********************************************************************
  async saveHelper( paymentReference, amount, paymentDate, Method, Status )  {
    return await this.update( paymentReference, amount, paymentDate, Method, Status );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable loanPayment
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = LoanPaymentAPI;
