
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {SoftwareUpdateExecution} from '../models/SoftwareUpdateExecution';
import {SoftwareUpdateCampaignService} from '../services/SoftwareUpdateCampaign.service';
import {IoTDeviceService} from '../services/IoTDevice.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class SoftwareUpdateExecutionService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	softwareUpdateExecution : SoftwareUpdateExecution;

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
	// add a SoftwareUpdateExecution
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addSoftwareUpdateExecution(startedAt, completedAt, Campaign, Device, Status) : Observable<any> {
		const uri_ = this.apiUrl + '/SoftwareUpdateExecution/create';
		const obj = {
			      		startedAt: startedAt,
      		completedAt: completedAt,
      		Campaign: Campaign != null && Campaign.length > 0 ? Campaign : null,
      		Device: Device != null && Device.length > 0 ? Device : null,
			Status: Status
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a SoftwareUpdateExecution
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateSoftwareUpdateExecution(startedAt, completedAt, Campaign, Device, Status, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/SoftwareUpdateExecution/update/' + id;
		const obj = {
				      		startedAt: startedAt,
      		completedAt: completedAt,
      		Campaign: Campaign != null && Campaign.length > 0 ? Campaign : null,
      		Device: Device != null && Device.length > 0 ? Device : null,
			Status: Status
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a SoftwareUpdateExecution
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteSoftwareUpdateExecution(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/SoftwareUpdateExecution/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a SoftwareUpdateExecution
	// returns the results untouched as an Observable SoftwareUpdateExecution
	// SoftwareUpdateExecution model
	// delegates via URI
	//********************************************************************
	getSoftwareUpdateExecution(id) : Observable<SoftwareUpdateExecution> {
		const uri_ = this.apiUrl + '/SoftwareUpdateExecution/load/' + id;

		return this.http.get<SoftwareUpdateExecution>(uri_);
	}
	
	//********************************************************************
	// gets all SoftwareUpdateExecution
	// returns the results untouched as JSON representation of an
	// Observable array of SoftwareUpdateExecution models
	// delegates via URI
	//********************************************************************
	getSoftwareUpdateExecutions() : Observable<SoftwareUpdateExecution[]> {
		const uri_ = this.apiUrl + '/SoftwareUpdateExecution/';

		return this
			.http.get<SoftwareUpdateExecution[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Campaign on a SoftwareUpdateExecution
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignCampaign( softwareUpdateExecutionId, _campaignId ): Observable<any> {

		// get the SoftwareUpdateExecution from storage
		this.loadHelper( softwareUpdateExecutionId );

	// get the SoftwareUpdateCampaign from storage
	var tmp 	= new SoftwareUpdateCampaignService(this.http).getSoftwareUpdateCampaign(_campaignId);

	// assign the Campaign
	this.softwareUpdateExecution.campaign = tmp;

	// save the SoftwareUpdateExecution
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Campaign on a SoftwareUpdateExecution
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignCampaign( softwareUpdateExecutionId ): Observable<any> {

		// get the SoftwareUpdateExecution from storage
		this.loadHelper( softwareUpdateExecutionId );

	// assign Campaign to null
	this.softwareUpdateExecution.campaign = null;

	// save the SoftwareUpdateExecution
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a Device on a SoftwareUpdateExecution
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignDevice( softwareUpdateExecutionId, _deviceId ): Observable<any> {

		// get the SoftwareUpdateExecution from storage
		this.loadHelper( softwareUpdateExecutionId );

	// get the IoTDevice from storage
	var tmp 	= new IoTDeviceService(this.http).getIoTDevice(_deviceId);

	// assign the Device
	this.softwareUpdateExecution.device = tmp;

	// save the SoftwareUpdateExecution
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Device on a SoftwareUpdateExecution
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignDevice( softwareUpdateExecutionId ): Observable<any> {

		// get the SoftwareUpdateExecution from storage
		this.loadHelper( softwareUpdateExecutionId );

	// assign Device to null
	this.softwareUpdateExecution.device = null;

	// save the SoftwareUpdateExecution
	return this.saveHelper();
}

	
	
	//********************************************************************
	// saveHelper - internal helper to save a SoftwareUpdateExecution
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/SoftwareUpdateExecution/update/' + this.softwareUpdateExecution;

	return  this.http.post(uri_, this.softwareUpdateExecution );
}

	//********************************************************************
	// loadHelper - internal helper to load a SoftwareUpdateExecution
	//********************************************************************	
	loadHelper( id ) {
		this.getSoftwareUpdateExecution(id)
			.subscribe((res : SoftwareUpdateExecution) => {
				this.softwareUpdateExecution = res;
			});
	}
}