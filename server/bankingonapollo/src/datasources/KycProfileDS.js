const { DataSource } = require('apollo-datasource');
const CustomerAPI = require('./CustomerDS');
const IdentityDocumentAPI = require('./IdentityDocumentDS');
const RiskAssessmentAPI = require('./RiskAssessmentDS');
const ScreeningResultAPI = require('./ScreeningResultDS');

class KycProfileAPI extends DataSource {

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
  // find a KycProfile
  //********************************************************************
  async find( id ) {
    return await this.store.kycProfile.findOne({ where: {id} });
  }

  //********************************************************************
  // add a KycProfile
  //********************************************************************
  async add( { profileId, lastReviewedOn, Status } ) {
    return await this.store.kycProfile.create( { profileId, lastReviewedOn, Status } );
  }

  //********************************************************************
  // update a KycProfile
  //********************************************************************
  async update( { profileId, lastReviewedOn, Status, id } ) {
	await this.store.kycProfile.update( { profileId, lastReviewedOn, Status }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a KycProfile by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.kycProfile.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all KycProfile
  //********************************************************************
  async findAll() {
    return await this.store.kycProfile.findAll();
  }


  //********************************************************************
  // adds a Customer on a KycProfile
  //returns this KycProfile
  //********************************************************************
  async addCustomer( kycProfileId, { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: kycProfileId}).then(kycProfile => {
    		  new CustomerAPI({store: this.store}).add( { firstName, lastName, legalName, dateOfBirth, taxId, email, phone, address, CustomerType, RiskRating, KycStatus  } ).then(customer => {
    			  kycProfile.setCustomer(customer).then(() => {
				        resolve( kycProfile );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created customer to Customer 
  // on a KycProfile
  //returns this KycProfile
  //********************************************************************
  async assignToCustomer( kycProfileId, customerId ) {
    return new Promise((resolve, reject) => {
	    this.find(kycProfileId).then(kycProfile => {
	    	new CustomerAPI({store: this.store}).find( customerId ).then(customer => {
    	        kycProfile.setCustomer(customer);
    	       resolve(kycProfile);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Customer on a KycProfile by setting it to null
  //returns this KycProfile
  //********************************************************************				
  async unassignCustomer( kycProfileId ) {
    return new Promise((resolve, reject) => {
	    this.find(kycProfileId).then(kycProfile => {
    	    kycProfile.setCustomer(null);
    	    resolve(kycProfile);
        })
    })
  }
		


  //********************************************************************
  // adds a IdentityDocument as the IdentityDocuments by first creating it 
  //returns this KycProfile
  //********************************************************************				
  async addToIdentityDocuments( kycProfileId, { documentNumber, issuingCountry, expirationDate, DocumentType } ) {
	return new Promise((resolve, reject) => {
		this.find(kycProfileId).then(kycProfile => {
		    new IdentityDocumentAPI({store: this.store}).add( { documentNumber, issuingCountry, expirationDate, DocumentType } ).then(identityDocument => {
		    	kycProfile.addToIdentityDocuments(kycProfile).then(() => {
			        resolve( kycProfile );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more identityDocumentsIds as a IdentityDocuments 
  // to a KycProfile
  //returns this KycProfile
  //********************************************************************				
  async assignToIdentityDocuments( kycProfileId, identityDocumentsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(kycProfile => {
			var identityDocumentApi = new IdentityDocumentAPI({store: this.store});
			kycProfile.setIdentityDocuments([]).then((kycProfile) => {			
				identityDocumentsIds.forEach(function (identityDocumentId, index) {
					identityDocumentApi.find({id: identityDocumentId}).then( foundIdentityDocument => {
						kycProfile.addToIdentityDocuments(foundIdentityDocument);
					})
				})
				resolve(kycProfile);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a RiskAssessment as the RiskAssessments by first creating it 
  //returns this KycProfile
  //********************************************************************				
  async addToRiskAssessments( kycProfileId, { score, assessedOn, Rating } ) {
	return new Promise((resolve, reject) => {
		this.find(kycProfileId).then(kycProfile => {
		    new RiskAssessmentAPI({store: this.store}).add( { score, assessedOn, Rating } ).then(riskAssessment => {
		    	kycProfile.addToRiskAssessments(kycProfile).then(() => {
			        resolve( kycProfile );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more riskAssessmentsIds as a RiskAssessments 
  // to a KycProfile
  //returns this KycProfile
  //********************************************************************				
  async assignToRiskAssessments( kycProfileId, riskAssessmentsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(kycProfile => {
			var riskAssessmentApi = new RiskAssessmentAPI({store: this.store});
			kycProfile.setRiskAssessments([]).then((kycProfile) => {			
				riskAssessmentsIds.forEach(function (riskAssessmentId, index) {
					riskAssessmentApi.find({id: riskAssessmentId}).then( foundRiskAssessment => {
						kycProfile.addToRiskAssessments(foundRiskAssessment);
					})
				})
				resolve(kycProfile);
			})
		})
	})
  }			
				

  //********************************************************************
  // adds a ScreeningResult as the Screenings by first creating it 
  //returns this KycProfile
  //********************************************************************				
  async addToScreenings( kycProfileId, { screeningDate, provider, Outcome } ) {
	return new Promise((resolve, reject) => {
		this.find(kycProfileId).then(kycProfile => {
		    new ScreeningResultAPI({store: this.store}).add( { screeningDate, provider, Outcome } ).then(screeningResult => {
		    	kycProfile.addToScreenings(kycProfile).then(() => {
			        resolve( kycProfile );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more screeningsIds as a Screenings 
  // to a KycProfile
  //returns this KycProfile
  //********************************************************************				
  async assignToScreenings( kycProfileId, screeningsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(kycProfile => {
			var screeningResultApi = new ScreeningResultAPI({store: this.store});
			kycProfile.setScreenings([]).then((kycProfile) => {			
				screeningsIds.forEach(function (screeningResultId, index) {
					screeningResultApi.find({id: screeningResultId}).then( foundScreeningResult => {
						kycProfile.addToScreenings(foundScreeningResult);
					})
				})
				resolve(kycProfile);
			})
		})
	})
  }			
				
  //********************************************************************
  // saveHelper - internal helper to save a KycProfile
  //********************************************************************
  async saveHelper( profileId, lastReviewedOn, Status )  {
    return await this.update( profileId, lastReviewedOn, Status );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable kycProfile
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = KycProfileAPI;
