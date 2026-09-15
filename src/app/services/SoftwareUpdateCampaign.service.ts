
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {SoftwareUpdateCampaign} from '../models/SoftwareUpdateCampaign';
import {FirmwareReleaseService} from '../services/FirmwareRelease.service';
import {DeviceGroupService} from '../services/DeviceGroup.service';
import {SoftwareUpdateExecutionService} from '../services/SoftwareUpdateExecution.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class SoftwareUpdateCampaignService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	softwareUpdateCampaign : SoftwareUpdateCampaign;

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
	// add a SoftwareUpdateCampaign
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addSoftwareUpdateCampaign(campaignCode, scheduledStart, scheduledEnd, FirmwareRelease, DeviceGroup, Executions, Status) : Observable<any> {
		const uri_ = this.apiUrl + '/SoftwareUpdateCampaign/create';
		const obj = {
			      		campaignCode: campaignCode,
      		scheduledStart: scheduledStart,
      		scheduledEnd: scheduledEnd,
      		FirmwareRelease: FirmwareRelease != null && FirmwareRelease.length > 0 ? FirmwareRelease : null,
      		DeviceGroup: DeviceGroup != null && DeviceGroup.length > 0 ? DeviceGroup : null,
      		Executions: Executions != null && Executions.length > 0 ? Executions : null,
			Status: Status
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a SoftwareUpdateCampaign
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateSoftwareUpdateCampaign(campaignCode, scheduledStart, scheduledEnd, FirmwareRelease, DeviceGroup, Executions, Status, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/SoftwareUpdateCampaign/update/' + id;
		const obj = {
				      		campaignCode: campaignCode,
      		scheduledStart: scheduledStart,
      		scheduledEnd: scheduledEnd,
      		FirmwareRelease: FirmwareRelease != null && FirmwareRelease.length > 0 ? FirmwareRelease : null,
      		DeviceGroup: DeviceGroup != null && DeviceGroup.length > 0 ? DeviceGroup : null,
      		Executions: Executions != null && Executions.length > 0 ? Executions : null,
			Status: Status
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a SoftwareUpdateCampaign
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteSoftwareUpdateCampaign(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/SoftwareUpdateCampaign/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a SoftwareUpdateCampaign
	// returns the results untouched as an Observable SoftwareUpdateCampaign
	// SoftwareUpdateCampaign model
	// delegates via URI
	//********************************************************************
	getSoftwareUpdateCampaign(id) : Observable<SoftwareUpdateCampaign> {
		const uri_ = this.apiUrl + '/SoftwareUpdateCampaign/load/' + id;

		return this.http.get<SoftwareUpdateCampaign>(uri_);
	}
	
	//********************************************************************
	// gets all SoftwareUpdateCampaign
	// returns the results untouched as JSON representation of an
	// Observable array of SoftwareUpdateCampaign models
	// delegates via URI
	//********************************************************************
	getSoftwareUpdateCampaigns() : Observable<SoftwareUpdateCampaign[]> {
		const uri_ = this.apiUrl + '/SoftwareUpdateCampaign/';

		return this
			.http.get<SoftwareUpdateCampaign[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a FirmwareRelease on a SoftwareUpdateCampaign
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignFirmwareRelease( softwareUpdateCampaignId, _firmwareReleaseId ): Observable<any> {

		// get the SoftwareUpdateCampaign from storage
		this.loadHelper( softwareUpdateCampaignId );

	// get the FirmwareRelease from storage
	var tmp 	= new FirmwareReleaseService(this.http).getFirmwareRelease(_firmwareReleaseId);

	// assign the FirmwareRelease
	this.softwareUpdateCampaign.firmwareRelease = tmp;

	// save the SoftwareUpdateCampaign
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a FirmwareRelease on a SoftwareUpdateCampaign
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignFirmwareRelease( softwareUpdateCampaignId ): Observable<any> {

		// get the SoftwareUpdateCampaign from storage
		this.loadHelper( softwareUpdateCampaignId );

	// assign FirmwareRelease to null
	this.softwareUpdateCampaign.firmwareRelease = null;

	// save the SoftwareUpdateCampaign
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a DeviceGroup on a SoftwareUpdateCampaign
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignDeviceGroup( softwareUpdateCampaignId, _deviceGroupId ): Observable<any> {

		// get the SoftwareUpdateCampaign from storage
		this.loadHelper( softwareUpdateCampaignId );

	// get the DeviceGroup from storage
	var tmp 	= new DeviceGroupService(this.http).getDeviceGroup(_deviceGroupId);

	// assign the DeviceGroup
	this.softwareUpdateCampaign.deviceGroup = tmp;

	// save the SoftwareUpdateCampaign
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a DeviceGroup on a SoftwareUpdateCampaign
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignDeviceGroup( softwareUpdateCampaignId ): Observable<any> {

		// get the SoftwareUpdateCampaign from storage
		this.loadHelper( softwareUpdateCampaignId );

	// assign DeviceGroup to null
	this.softwareUpdateCampaign.deviceGroup = null;

	// save the SoftwareUpdateCampaign
	return this.saveHelper();
}

	
		//********************************************************************
	// adds one or more executionsIds as a Executions
	// to a SoftwareUpdateCampaign
	// returns a Promise
	// delegates via URI
	//********************************************************************
	addExecutions( softwareUpdateCampaignId, executionsIds ): Observable<any> {

		// get the SoftwareUpdateCampaign
		this.loadHelper( softwareUpdateCampaignId );

	// split on a comma with no spaces
	var idList = executionsIds.split(',')

	// iterate over array of executions ids
	idList.forEach(function (id) {
		// read the SoftwareUpdateExecution
		var softwareUpdateExecution = new SoftwareUpdateExecutionService(this.http).getSoftwareUpdateExecution(id);
		// add the SoftwareUpdateExecution if not already assigned
		if ( this.softwareUpdateCampaign.executions.indexOf(softwareUpdateExecution) == -1 )
		this.softwareUpdateCampaign.executions.push(softwareUpdateExecution);
	});

	// save it
	return this.saveHelper();
}

	//********************************************************************
	// removes one or more executionsIds as a Executions
	// from a SoftwareUpdateCampaign
	// returns a Promise
	// delegates via URI
	//********************************************************************
	removeExecutions( softwareUpdateCampaignId, executionsIds ): Observable<any> {

		// get the SoftwareUpdateCampaign
		this.loadHelper( softwareUpdateCampaignId );


	// split on a comma with no spaces
	var idList 					= executionsIds.split(',');
	var executions 	= this.softwareUpdateCampaign.executions;

	if ( executions != null && executionsIds != null ) {

		// iterate over array of executions ids
		executions.forEach(function (obj) {
			if ( executionsIds.indexOf(obj._id) > -1 ) {
				// remove the SoftwareUpdateExecution
				this.softwareUpdateCampaign.executions.pop(obj);
			}
		});

		// save it
		return this.saveHelper();
	}
}

	
	//********************************************************************
	// saveHelper - internal helper to save a SoftwareUpdateCampaign
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/SoftwareUpdateCampaign/update/' + this.softwareUpdateCampaign;

	return  this.http.post(uri_, this.softwareUpdateCampaign );
}

	//********************************************************************
	// loadHelper - internal helper to load a SoftwareUpdateCampaign
	//********************************************************************	
	loadHelper( id ) {
		this.getSoftwareUpdateCampaign(id)
			.subscribe((res : SoftwareUpdateCampaign) => {
				this.softwareUpdateCampaign = res;
			});
	}
}