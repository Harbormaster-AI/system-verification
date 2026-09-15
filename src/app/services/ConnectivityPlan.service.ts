
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {ConnectivityPlan} from '../models/ConnectivityPlan';
import {SimCardService} from '../services/SimCard.service';
import {TenantService} from '../services/Tenant.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class ConnectivityPlanService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	connectivityPlan : ConnectivityPlan;

	//********************************************************************
	// Catch all for the return value of a service call
	//********************************************************************
	result: any;

	//********************************************************************
	// sole constructor, injected with the HttpClient
	//********************************************************************
	constructor(private http: HttpClient) {
		super();
	}

		//********************************************************************
	// add a ConnectivityPlan
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addConnectivityPlan(name, dataCapMB, billingCycleDays, SimCards, Tenant) : Observable<any> {
		const uri_ = this.apiUrl + '/ConnectivityPlan/create';
		const obj = {
			      		name: name,
      		dataCapMB: dataCapMB,
      		billingCycleDays: billingCycleDays,
      		SimCards: SimCards != null && SimCards.length > 0 ? SimCards : null,
			Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a ConnectivityPlan
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateConnectivityPlan(name, dataCapMB, billingCycleDays, SimCards, Tenant, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/ConnectivityPlan/update/' + id;
		const obj = {
				      		name: name,
      		dataCapMB: dataCapMB,
      		billingCycleDays: billingCycleDays,
      		SimCards: SimCards != null && SimCards.length > 0 ? SimCards : null,
			Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a ConnectivityPlan
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteConnectivityPlan(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/ConnectivityPlan/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a ConnectivityPlan
	// returns the results untouched as an Observable ConnectivityPlan
	// ConnectivityPlan model
	// delegates via URI
	//********************************************************************
	getConnectivityPlan(id) : Observable<ConnectivityPlan> {
		const uri_ = this.apiUrl + '/ConnectivityPlan/load/' + id;

		return this.http.get<ConnectivityPlan>(uri_);
	}
	
	//********************************************************************
	// gets all ConnectivityPlan
	// returns the results untouched as JSON representation of an
	// Observable array of ConnectivityPlan models
	// delegates via URI
	//********************************************************************
	getConnectivityPlans() : Observable<ConnectivityPlan[]> {
		const uri_ = this.apiUrl + '/ConnectivityPlan/';

		return this
			.http.get<ConnectivityPlan[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Tenant on a ConnectivityPlan
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignTenant( connectivityPlanId, _tenantId ): Observable<any> {

		// get the ConnectivityPlan from storage
		this.loadHelper( connectivityPlanId );

	// get the Tenant from storage
	var tmp 	= new TenantService(this.http).getTenant(_tenantId);

	// assign the Tenant
	this.connectivityPlan.tenant = tmp;

	// save the ConnectivityPlan
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Tenant on a ConnectivityPlan
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignTenant( connectivityPlanId ): Observable<any> {

		// get the ConnectivityPlan from storage
		this.loadHelper( connectivityPlanId );

	// assign Tenant to null
	this.connectivityPlan.tenant = null;

	// save the ConnectivityPlan
	return this.saveHelper();
}

	
		//********************************************************************
	// adds one or more simCardsIds as a SimCards
	// to a ConnectivityPlan
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addSimCards( connectivityPlanId, simCardsIds ): Observable<any> {

		// get the ConnectivityPlan
		this.loadHelper( connectivityPlanId );

	// split on a comma with no spaces
	var idList = simCardsIds.split(',')

	// iterate over array of simCards ids
	idList.forEach(function (id) {
		// read the SimCard
		var simCard = new SimCardService(this.http).getSimCard(id);
		// add the SimCard if not already assigned
		if ( this.connectivityPlan.simCards.indexOf(simCard) == -1 )
		this.connectivityPlan.simCards.push(simCard);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more simCardsIds as a SimCards
	// from a ConnectivityPlan
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeSimCards( connectivityPlanId, simCardsIds ): Observable<any> {

		// get the ConnectivityPlan
		this.loadHelper( connectivityPlanId );


	// split on a comma with no spaces
	var idList 					= simCardsIds.split(',');
	var simCards 	= this.connectivityPlan.simCards;

	if ( simCards != null && simCardsIds != null ) {

		// iterate over array of simCards ids
		simCards.forEach(function (obj) {
			if ( simCardsIds.indexOf(obj._id) > -1 ) {
				// remove the SimCard
				this.connectivityPlan.simCards.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a ConnectivityPlan
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/ConnectivityPlan/update/' + this.connectivityPlan;

	return  this.http.post(uri_, this.connectivityPlan );
}

	//********************************************************************
	// loadHelper - internal helper to load a ConnectivityPlan
	//********************************************************************	
	loadHelper( id ) {
		this.getConnectivityPlan(id)
			.subscribe((res : ConnectivityPlan) => {
				this.connectivityPlan = res;
			});
	}
}