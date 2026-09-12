const { DataSource } = require('apollo-datasource');
const LoanAccountAPI = require('./LoanAccountDS');
const LoanPaymentAPI = require('./LoanPaymentDS');

class RepaymentScheduleAPI extends DataSource {

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
  // find a RepaymentSchedule
  //********************************************************************
  async find( id ) {
    return await this.store.repaymentSchedule.findOne({ where: {id} });
  }

  //********************************************************************
  // add a RepaymentSchedule
  //********************************************************************
  async add( { installmentNumber, dueDate, principalDue, interestDue, totalDue, Status } ) {
    return await this.store.repaymentSchedule.create( { installmentNumber, dueDate, principalDue, interestDue, totalDue, Status } );
  }

  //********************************************************************
  // update a RepaymentSchedule
  //********************************************************************
  async update( { installmentNumber, dueDate, principalDue, interestDue, totalDue, Status, id } ) {
	await this.store.repaymentSchedule.update( { installmentNumber, dueDate, principalDue, interestDue, totalDue, Status }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a RepaymentSchedule by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.repaymentSchedule.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all RepaymentSchedule
  //********************************************************************
  async findAll() {
    return await this.store.repaymentSchedule.findAll();
  }


  //********************************************************************
  // adds a LoanAccount on a RepaymentSchedule
  //returns this RepaymentSchedule
  //********************************************************************
  async addLoanAccount( repaymentScheduleId, { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: repaymentScheduleId}).then(repaymentSchedule => {
    		  new LoanAccountAPI({store: this.store}).add( { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status  } ).then(loanAccount => {
    			  repaymentSchedule.setLoanAccount(loanAccount).then(() => {
				        resolve( repaymentSchedule );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created loanAccount to LoanAccount 
  // on a RepaymentSchedule
  //returns this RepaymentSchedule
  //********************************************************************
  async assignToLoanAccount( repaymentScheduleId, loanAccountId ) {
    return new Promise((resolve, reject) => {
	    this.find(repaymentScheduleId).then(repaymentSchedule => {
	    	new LoanAccountAPI({store: this.store}).find( loanAccountId ).then(loanAccount => {
    	        repaymentSchedule.setLoanAccount(loanAccount);
    	       resolve(repaymentSchedule);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a LoanAccount on a RepaymentSchedule by setting it to null
  //returns this RepaymentSchedule
  //********************************************************************				
  async unassignLoanAccount( repaymentScheduleId ) {
    return new Promise((resolve, reject) => {
	    this.find(repaymentScheduleId).then(repaymentSchedule => {
    	    repaymentSchedule.setLoanAccount(null);
    	    resolve(repaymentSchedule);
        })
    })
  }
		

  //********************************************************************
  // adds a Payment on a RepaymentSchedule
  //returns this RepaymentSchedule
  //********************************************************************
  async addPayment( repaymentScheduleId, { paymentReference, amount, paymentDate, Method, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: repaymentScheduleId}).then(repaymentSchedule => {
    		  new LoanPaymentAPI({store: this.store}).add( { paymentReference, amount, paymentDate, Method, Status  } ).then(loanPayment => {
    			  repaymentSchedule.setPayment(loanPayment).then(() => {
				        resolve( repaymentSchedule );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created payment to Payment 
  // on a RepaymentSchedule
  //returns this RepaymentSchedule
  //********************************************************************
  async assignToPayment( repaymentScheduleId, paymentId ) {
    return new Promise((resolve, reject) => {
	    this.find(repaymentScheduleId).then(repaymentSchedule => {
	    	new LoanPaymentAPI({store: this.store}).find( paymentId ).then(loanPayment => {
    	        repaymentSchedule.setPayment(loanPayment);
    	       resolve(repaymentSchedule);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Payment on a RepaymentSchedule by setting it to null
  //returns this RepaymentSchedule
  //********************************************************************				
  async unassignPayment( repaymentScheduleId ) {
    return new Promise((resolve, reject) => {
	    this.find(repaymentScheduleId).then(repaymentSchedule => {
    	    repaymentSchedule.setPayment(null);
    	    resolve(repaymentSchedule);
        })
    })
  }
		

  //********************************************************************
  // saveHelper - internal helper to save a RepaymentSchedule
  //********************************************************************
  async saveHelper( installmentNumber, dueDate, principalDue, interestDue, totalDue, Status )  {
    return await this.update( installmentNumber, dueDate, principalDue, interestDue, totalDue, Status );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable repaymentSchedule
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = RepaymentScheduleAPI;
