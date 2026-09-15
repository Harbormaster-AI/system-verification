
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {SimCard} from '../models/SimCard';
import {NetworkProfileService} from '../services/NetworkProfile.service';
import {TenantService} from '../services/Tenant.service';
import {ConnectivityPlanService} from '../services/ConnectivityPlan.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class SimCardService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	simCard : SimCard;

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
	// add a SimCard
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addSimCard(iccid, imsi, carrier, NetworkProfiles, Tenant, ConnectivityPlan, Status) : Observable<any> {
		const uri_ = this.apiUrl + '/SimCard/create';
		const obj = {
			      		iccid: iccid,
      		imsi: imsi,
      		carrier: carrier,
      		NetworkProfiles: NetworkProfiles != null && NetworkProfiles.length > 0 ? NetworkProfiles : null,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
      		ConnectivityPlan: ConnectivityPlan != null && ConnectivityPlan.length > 0 ? ConnectivityPlan : null,
			Status: Status
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a SimCard
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateSimCard(iccid, imsi, carrier, NetworkProfiles, Tenant, ConnectivityPlan, Status, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/SimCard/update/' + id;
		const obj = {
				      		iccid: iccid,
      		imsi: imsi,
      		carrier: carrier,
      		NetworkProfiles: NetworkProfiles != null && NetworkProfiles.length > 0 ? NetworkProfiles : null,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
      		ConnectivityPlan: ConnectivityPlan != null && ConnectivityPlan.length > 0 ? ConnectivityPlan : null,
			Status: Status
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a SimCard
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteSimCard(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/SimCard/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a SimCard
	// returns the results untouched as an Observable SimCard
	// SimCard model
	// delegates via URI
	//********************************************************************
	getSimCard(id) : Observable<SimCard> {
		const uri_ = this.apiUrl + '/SimCard/load/' + id;

		return this.http.get<SimCard>(uri_);
	}
	
	//********************************************************************
	// gets all SimCard
	// returns the results untouched as JSON representation of an
	// Observable array of SimCard models
	// delegates via URI
	//********************************************************************
	getSimCards() : Observable<SimCard[]> {
		const uri_ = this.apiUrl + '/SimCard/';

		return this
			.http.get<SimCard[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Tenant on a SimCard
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignTenant( simCardId, _tenantId ): Observable<any> {

		// get the SimCard from storage
		this.loadHelper( simCardId );

	// get the Tenant from storage
	var tmp 	= new TenantService(this.http).getTenant(_tenantId);

	// assign the Tenant
	this.simCard.tenant = tmp;

	// save the SimCard
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Tenant on a SimCard
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignTenant( simCardId ): Observable<any> {

		// get the SimCard from storage
		this.loadHelper( simCardId );

	// assign Tenant to null
	this.simCard.tenant = null;

	// save the SimCard
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a ConnectivityPlan on a SimCard
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignConnectivityPlan( simCardId, _connectivityPlanId ): Observable<any> {

		// get the SimCard from storage
		this.loadHelper( simCardId );

	// get the ConnectivityPlan from storage
	var tmp 	= new ConnectivityPlanService(this.http).getConnectivityPlan(_connectivityPlanId);

	// assign the ConnectivityPlan
	this.simCard.connectivityPlan = tmp;

	// save the SimCard
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a ConnectivityPlan on a SimCard
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignConnectivityPlan( simCardId ): Observable<any> {

		// get the SimCard from storage
		this.loadHelper( simCardId );

	// assign ConnectivityPlan to null
	this.simCard.connectivityPlan = null;

	// save the SimCard
	return this.saveHelper();
}

	
		//********************************************************************
	// adds one or more networkProfilesIds as a NetworkProfiles
	// to a SimCard
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addNetworkProfiles( simCardId, networkProfilesIds ): Observable<any> {

		// get the SimCard
		this.loadHelper( simCardId );

	// split on a comma with no spaces
	var idList = networkProfilesIds.split(',')

	// iterate over array of networkProfiles ids
	idList.forEach(function (id) {
		// read the NetworkProfile
		var networkProfile = new NetworkProfileService(this.http).getNetworkProfile(id);
		// add the NetworkProfile if not already assigned
		if ( this.simCard.networkProfiles.indexOf(networkProfile) == -1 )
		this.simCard.networkProfiles.push(networkProfile);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more networkProfilesIds as a NetworkProfiles
	// from a SimCard
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeNetworkProfiles( simCardId, networkProfilesIds ): Observable<any> {

		// get the SimCard
		this.loadHelper( simCardId );


	// split on a comma with no spaces
	var idList 					= networkProfilesIds.split(',');
	var networkProfiles 	= this.simCard.networkProfiles;

	if ( networkProfiles != null && networkProfilesIds != null ) {

		// iterate over array of networkProfiles ids
		networkProfiles.forEach(function (obj) {
			if ( networkProfilesIds.indexOf(obj._id) > -1 ) {
				// remove the NetworkProfile
				this.simCard.networkProfiles.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a SimCard
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/SimCard/update/' + this.simCard;

	return  this.http.post(uri_, this.simCard );
}

	//********************************************************************
	// loadHelper - internal helper to load a SimCard
	//********************************************************************	
	loadHelper( id ) {
		this.getSimCard(id)
			.subscribe((res : SimCard) => {
				this.simCard = res;
			});
	}
}