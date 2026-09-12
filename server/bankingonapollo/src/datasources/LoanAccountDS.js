const { DataSource } = require('apollo-datasource');
const BankAPI = require('./BankDS');
const BranchAPI = require('./BranchDS');
const BankingProductAPI = require('./BankingProductDS');
const CustomerAPI = require('./CustomerDS');
const RepaymentScheduleAPI = require('./RepaymentScheduleDS');
const LoanPaymentAPI = require('./LoanPaymentDS');
const CollateralAPI = require('./CollateralDS');
const FeeChargeAPI = require('./FeeChargeDS');

class LoanAccountAPI extends DataSource {

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
  // find a LoanAccount
  //********************************************************************
  async find( id ) {
    return await this.store.loanAccount.findOne({ where: {id} });
  }

  //********************************************************************
  // add a LoanAccount
  //********************************************************************
  async add( { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } ) {
    return await this.store.loanAccount.create( { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status } );
  }

  //********************************************************************
  // update a LoanAccount
  //********************************************************************
  async update( { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status, id } ) {
	await this.store.loanAccount.update( { loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a LoanAccount by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.loanAccount.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all LoanAccount
  //********************************************************************
  async findAll() {
    return await this.store.loanAccount.findAll();
  }


  //********************************************************************
  // adds a Bank on a LoanAccount
  //returns this LoanAccount
  //********************************************************************
  async addBank( loanAccountId, { name, legalName, swiftBic, headquartersCountry, website } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: loanAccountId}).then(loanAccount => {
    		  new BankAPI({store: this.store}).add( { name, legalName, swiftBic, headquartersCountry, website  } ).then(bank => {
    			  loanAccount.setBank(bank).then(() => {
				        resolve( loanAccount );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created bank to Bank 
  // on a LoanAccount
  //returns this LoanAccount
  //********************************************************************
  async assignToBank( loanAccountId, bankId ) {
    return new Promise((resolve, reject) => {
	    this.find(loanAccountId).then(loanAccount => {
	    	new BankAPI({store: this.store}).find( bankId ).then(bank => {
    	        loanAccount.setBank(bank);
    	       resolve(loanAccount);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Bank on a LoanAccount by setting it to null
  //returns this LoanAccount
  //********************************************************************				
  async unassignBank( loanAccountId ) {
    return new Promise((resolve, reject) => {
	    this.find(loanAccountId).then(loanAccount => {
    	    loanAccount.setBank(null);
    	    resolve(loanAccount);
        })
    })
  }
		

  //********************************************************************
  // adds a Branch on a LoanAccount
  //returns this LoanAccount
  //********************************************************************
  async addBranch( loanAccountId, { name, branchCode, address, phone, openingHours } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: loanAccountId}).then(loanAccount => {
    		  new BranchAPI({store: this.store}).add( { name, branchCode, address, phone, openingHours  } ).then(branch => {
    			  loanAccount.setBranch(branch).then(() => {
				        resolve( loanAccount );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created branch to Branch 
  // on a LoanAccount
  //returns this LoanAccount
  //********************************************************************
  async assignToBranch( loanAccountId, branchId ) {
    return new Promise((resolve, reject) => {
	    this.find(loanAccountId).then(loanAccount => {
	    	new BranchAPI({store: this.store}).find( branchId ).then(branch => {
    	        loanAccount.setBranch(branch);
    	       resolve(loanAccount);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Branch on a LoanAccount by setting it to null
  //returns this LoanAccount
  //********************************************************************				
  async unassignBranch( loanAccountId ) {
    return new Promise((resolve, reject) => {
	    this.find(loanAccountId).then(loanAccount => {
    	    loanAccount.setBranch(null);
    	    resolve(loanAccount);
        })
    })
  }
		

  //********************************************************************
  // adds a Product on a LoanAccount
  //returns this LoanAccount
  //********************************************************************
  async addProduct( loanAccountId, { productCode, name, description, ProductCategory } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: loanAccountId}).then(loanAccount => {
    		  new BankingProductAPI({store: this.store}).add( { productCode, name, description, ProductCategory  } ).then(bankingProduct => {
    			  loanAccount.setProduct(bankingProduct).then(() => {
				        resolve( loanAccount );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created product to Product 
  // on a LoanAccount
  //returns this LoanAccount
  //********************************************************************
  async assignToProduct( loanAccountId, productId ) {
    return new Promise((resolve, reject) => {
	    this.find(loanAccountId).then(loanAccount => {
	    	new BankingProductAPI({store: this.store}).find( productId ).then(bankingProduct => {
    	        loanAccount.setProduct(bankingProduct);
    	       resolve(loanAccount);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Product on a LoanAccount by setting it to null
  //returns this LoanAccount
  //********************************************************************				
  async unassignProduct( loanAccountId ) {
    return new Promise((resolve, reject) => {
	    this.find(loanAccountId).then(loanAccount => {
    	    loanAccount.setProduct(null);
    	    resolve(loanAccount);
        })
    })
  }
		


  //********************************************************************
  // adds a Customer as the Borrowers by first creating it 
  //returns this LoanAccount
  //********************************************************************				
  async addToBorrowers( loanAccountId, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } ) {
	return new Promise((resolve, reject) => {
		this.find(loanAccountId).then(loanAccount => {
		    new CustomerAPI({store: this.store}).add( { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } ).then(customer => {
		    	loanAccount.addToBorrowers(loanAccount).then(() => {
			        resolve( loanAccount );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more borrowersIds as a Borrowers 
  // to a LoanAccount
  //returns this LoanAccount
  //********************************************************************				
  async assignToBorrowers( loanAccountId, borrowersIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(loanAccount => {
			var customerApi = new CustomerAPI({store: this.store});
			loanAccount.setBorrowers([]).then((loanAccount) => {			
				borrowersIds.forEach(function (customerId, index) {
					customerApi.find({id: customerId}).then( foundCustomer => {
						loanAccount.addToBorrowers(foundCustomer);
					})
				})
				resolve(loanAccount);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a RepaymentSchedule as the RepaymentSchedule by first creating it 
  //returns this LoanAccount
  //********************************************************************				
  async addToRepaymentSchedule( loanAccountId, { installmentNumber, dueDate, principalDue, interestDue, totalDue, Status } ) {
	return new Promise((resolve, reject) => {
		this.find(loanAccountId).then(loanAccount => {
		    new RepaymentScheduleAPI({store: this.store}).add( { installmentNumber, dueDate, principalDue, interestDue, totalDue, Status } ).then(repaymentSchedule => {
		    	loanAccount.addToRepaymentSchedule(loanAccount).then(() => {
			        resolve( loanAccount );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more repaymentScheduleIds as a RepaymentSchedule 
  // to a LoanAccount
  //returns this LoanAccount
  //********************************************************************				
  async assignToRepaymentSchedule( loanAccountId, repaymentScheduleIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(loanAccount => {
			var repaymentScheduleApi = new RepaymentScheduleAPI({store: this.store});
			loanAccount.setRepaymentSchedule([]).then((loanAccount) => {			
				repaymentScheduleIds.forEach(function (repaymentScheduleId, index) {
					repaymentScheduleApi.find({id: repaymentScheduleId}).then( foundRepaymentSchedule => {
						loanAccount.addToRepaymentSchedule(foundRepaymentSchedule);
					})
				})
				resolve(loanAccount);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a LoanPayment as the Payments by first creating it 
  //returns this LoanAccount
  //********************************************************************				
  async addToPayments( loanAccountId, { paymentReference, amount, paymentDate, Method, Status } ) {
	return new Promise((resolve, reject) => {
		this.find(loanAccountId).then(loanAccount => {
		    new LoanPaymentAPI({store: this.store}).add( { paymentReference, amount, paymentDate, Method, Status } ).then(loanPayment => {
		    	loanAccount.addToPayments(loanAccount).then(() => {
			        resolve( loanAccount );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more paymentsIds as a Payments 
  // to a LoanAccount
  //returns this LoanAccount
  //********************************************************************				
  async assignToPayments( loanAccountId, paymentsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(loanAccount => {
			var loanPaymentApi = new LoanPaymentAPI({store: this.store});
			loanAccount.setPayments([]).then((loanAccount) => {			
				paymentsIds.forEach(function (loanPaymentId, index) {
					loanPaymentApi.find({id: loanPaymentId}).then( foundLoanPayment => {
						loanAccount.addToPayments(foundLoanPayment);
					})
				})
				resolve(loanAccount);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a Collateral as the Collateral by first creating it 
  //returns this LoanAccount
  //********************************************************************				
  async addToCollateral( loanAccountId, { appraisedValue, description, location, CollateralType } ) {
	return new Promise((resolve, reject) => {
		this.find(loanAccountId).then(loanAccount => {
		    new CollateralAPI({store: this.store}).add( { appraisedValue, description, location, CollateralType } ).then(collateral => {
		    	loanAccount.addToCollateral(loanAccount).then(() => {
			        resolve( loanAccount );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more collateralIds as a Collateral 
  // to a LoanAccount
  //returns this LoanAccount
  //********************************************************************				
  async assignToCollateral( loanAccountId, collateralIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(loanAccount => {
			var collateralApi = new CollateralAPI({store: this.store});
			loanAccount.setCollateral([]).then((loanAccount) => {			
				collateralIds.forEach(function (collateralId, index) {
					collateralApi.find({id: collateralId}).then( foundCollateral => {
						loanAccount.addToCollateral(foundCollateral);
					})
				})
				resolve(loanAccount);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a FeeCharge as the FeeCharges by first creating it 
  //returns this LoanAccount
  //********************************************************************				
  async addToFeeCharges( loanAccountId, { feeCode, amount, appliedOn, FeeType } ) {
	return new Promise((resolve, reject) => {
		this.find(loanAccountId).then(loanAccount => {
		    new FeeChargeAPI({store: this.store}).add( { feeCode, amount, appliedOn, FeeType } ).then(feeCharge => {
		    	loanAccount.addToFeeCharges(loanAccount).then(() => {
			        resolve( loanAccount );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more feeChargesIds as a FeeCharges 
  // to a LoanAccount
  //returns this LoanAccount
  //********************************************************************				
  async assignToFeeCharges( loanAccountId, feeChargesIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(loanAccount => {
			var feeChargeApi = new FeeChargeAPI({store: this.store});
			loanAccount.setFeeCharges([]).then((loanAccount) => {			
				feeChargesIds.forEach(function (feeChargeId, index) {
					feeChargeApi.find({id: feeChargeId}).then( foundFeeCharge => {
						loanAccount.addToFeeCharges(foundFeeCharge);
					})
				})
				resolve(loanAccount);
			})
		})
	})
  }			
				
  //********************************************************************
  // saveHelper - internal helper to save a LoanAccount
  //********************************************************************
  async saveHelper( loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status )  {
    return await this.update( loanNumber, principalAmount, outstandingPrincipal, interestRate, originationDate, maturityDate, paymentDayOfMonth, currency, LoanType, RateType, Compounding, Status );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable loanAccount
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = LoanAccountAPI;
