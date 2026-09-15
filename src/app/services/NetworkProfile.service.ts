
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {NetworkProfile} from '../models/NetworkProfile';
import {IoTDeviceService} from '../services/IoTDevice.service';
import {GatewayService} from '../services/Gateway.service';
import {SimCardService} from '../services/SimCard.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class NetworkProfileService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	networkProfile : NetworkProfile;

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
	// add a NetworkProfile
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addNetworkProfile(profileName, ssid, apn, Device, Gateway, SimCard, ConnectivityType) : Observable<any> {
		const uri_ = this.apiUrl + '/NetworkProfile/create';
		const obj = {
			      		profileName: profileName,
      		ssid: ssid,
      		apn: apn,
      		Device: Device != null && Device.length > 0 ? Device : null,
      		Gateway: Gateway != null && Gateway.length > 0 ? Gateway : null,
      		SimCard: SimCard != null && SimCard.length > 0 ? SimCard : null,
			ConnectivityType: ConnectivityType
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a NetworkProfile
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateNetworkProfile(profileName, ssid, apn, Device, Gateway, SimCard, ConnectivityType, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/NetworkProfile/update/' + id;
		const obj = {
				      		profileName: profileName,
      		ssid: ssid,
      		apn: apn,
      		Device: Device != null && Device.length > 0 ? Device : null,
      		Gateway: Gateway != null && Gateway.length > 0 ? Gateway : null,
      		SimCard: SimCard != null && SimCard.length > 0 ? SimCard : null,
			ConnectivityType: ConnectivityType
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a NetworkProfile
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteNetworkProfile(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/NetworkProfile/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a NetworkProfile
	// returns the results untouched as an Observable NetworkProfile
	// NetworkProfile model
	// delegates via URI
	//********************************************************************
	getNetworkProfile(id) : Observable<NetworkProfile> {
		const uri_ = this.apiUrl + '/NetworkProfile/load/' + id;

		return this.http.get<NetworkProfile>(uri_);
	}
	
	//********************************************************************
	// gets all NetworkProfile
	// returns the results untouched as JSON representation of an
	// Observable array of NetworkProfile models
	// delegates via URI
	//********************************************************************
	getNetworkProfiles() : Observable<NetworkProfile[]> {
		const uri_ = this.apiUrl + '/NetworkProfile/';

		return this
			.http.get<NetworkProfile[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Device on a NetworkProfile
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignDevice( networkProfileId, _deviceId ): Observable<any> {

		// get the NetworkProfile from storage
		this.loadHelper( networkProfileId );

	// get the IoTDevice from storage
	var tmp 	= new IoTDeviceService(this.http).getIoTDevice(_deviceId);

	// assign the Device
	this.networkProfile.device = tmp;

	// save the NetworkProfile
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Device on a NetworkProfile
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignDevice( networkProfileId ): Observable<any> {

		// get the NetworkProfile from storage
		this.loadHelper( networkProfileId );

	// assign Device to null
	this.networkProfile.device = null;

	// save the NetworkProfile
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a Gateway on a NetworkProfile
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignGateway( networkProfileId, _gatewayId ): Observable<any> {

		// get the NetworkProfile from storage
		this.loadHelper( networkProfileId );

	// get the Gateway from storage
	var tmp 	= new GatewayService(this.http).getGateway(_gatewayId);

	// assign the Gateway
	this.networkProfile.gateway = tmp;

	// save the NetworkProfile
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Gateway on a NetworkProfile
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignGateway( networkProfileId ): Observable<any> {

		// get the NetworkProfile from storage
		this.loadHelper( networkProfileId );

	// assign Gateway to null
	this.networkProfile.gateway = null;

	// save the NetworkProfile
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a SimCard on a NetworkProfile
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignSimCard( networkProfileId, _simCardId ): Observable<any> {

		// get the NetworkProfile from storage
		this.loadHelper( networkProfileId );

	// get the SimCard from storage
	var tmp 	= new SimCardService(this.http).getSimCard(_simCardId);

	// assign the SimCard
	this.networkProfile.simCard = tmp;

	// save the NetworkProfile
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a SimCard on a NetworkProfile
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignSimCard( networkProfileId ): Observable<any> {

		// get the NetworkProfile from storage
		this.loadHelper( networkProfileId );

	// assign SimCard to null
	this.networkProfile.simCard = null;

	// save the NetworkProfile
	return this.saveHelper();
}

	
	
	//********************************************************************
	// saveHelper - internal helper to save a NetworkProfile
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/NetworkProfile/update/' + this.networkProfile;

	return  this.http.post(uri_, this.networkProfile );
}

	//********************************************************************
	// loadHelper - internal helper to load a NetworkProfile
	//********************************************************************	
	loadHelper( id ) {
		this.getNetworkProfile(id)
			.subscribe((res : NetworkProfile) => {
				this.networkProfile = res;
			});
	}
}