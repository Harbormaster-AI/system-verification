const { DataSource } = require('apollo-datasource');
const KycProfileAPI = require('./KycProfileDS');

class RiskAssessmentAPI extends DataSource {

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
  // find a RiskAssessment
  //********************************************************************
  async find( id ) {
    return await this.store.riskAssessment.findOne({ where: {id} });
  }

  //********************************************************************
  // add a RiskAssessment
  //********************************************************************
  async add( { score, assessedOn, Rating } ) {
    return await this.store.riskAssessment.create( { score, assessedOn, Rating } );
  }

  //********************************************************************
  // update a RiskAssessment
  //********************************************************************
  async update( { score, assessedOn, Rating, id } ) {
	await this.store.riskAssessment.update( { score, assessedOn, Rating }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a RiskAssessment by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.riskAssessment.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all RiskAssessment
  //********************************************************************
  async findAll() {
    return await this.store.riskAssessment.findAll();
  }


  //********************************************************************
  // adds a KycProfile on a RiskAssessment
  //returns this RiskAssessment
  //********************************************************************
  async addKycProfile( riskAssessmentId, { profileId, lastReviewedOn, Status } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: riskAssessmentId}).then(riskAssessment => {
    		  new KycProfileAPI({store: this.store}).add( { profileId, lastReviewedOn, Status  } ).then(kycProfile => {
    			  riskAssessment.setKycProfile(kycProfile).then(() => {
				        resolve( riskAssessment );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created kycProfile to KycProfile 
  // on a RiskAssessment
  //returns this RiskAssessment
  //********************************************************************
  async assignToKycProfile( riskAssessmentId, kycProfileId ) {
    return new Promise((resolve, reject) => {
	    this.find(riskAssessmentId).then(riskAssessment => {
	    	new KycProfileAPI({store: this.store}).find( kycProfileId ).then(kycProfile => {
    	        riskAssessment.setKycProfile(kycProfile);
    	       resolve(riskAssessment);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a KycProfile on a RiskAssessment by setting it to null
  //returns this RiskAssessment
  //********************************************************************				
  async unassignKycProfile( riskAssessmentId ) {
    return new Promise((resolve, reject) => {
	    this.find(riskAssessmentId).then(riskAssessment => {
    	    riskAssessment.setKycProfile(null);
    	    resolve(riskAssessment);
        })
    })
  }
		

  //********************************************************************
  // saveHelper - internal helper to save a RiskAssessment
  //********************************************************************
  async saveHelper( score, assessedOn, Rating )  {
    return await this.update( score, assessedOn, Rating );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable riskAssessment
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = RiskAssessmentAPI;
