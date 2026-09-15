
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {UsageRecord} from '../models/UsageRecord';
import {TenantService} from '../services/Tenant.service';
import {IoTDeviceService} from '../services/IoTDevice.service';
import {ConnectivityPlanService} from '../services/ConnectivityPlan.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class UsageRecordService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	usageRecord : UsageRecord;

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
	// add a UsageRecord
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addUsageRecord(periodStart, periodEnd, messagesSent, dataVolumeMB, Tenant, Device, ConnectivityPlan) : Observable<any> {
		const uri_ = this.apiUrl + '/UsageRecord/create';
		const obj = {
			      		periodStart: periodStart,
      		periodEnd: periodEnd,
      		messagesSent: messagesSent,
      		dataVolumeMB: dataVolumeMB,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
      		Device: Device != null && Device.length > 0 ? Device : null,
			ConnectivityPlan: ConnectivityPlan != null && ConnectivityPlan.length > 0 ? ConnectivityPlan : null
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a UsageRecord
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateUsageRecord(periodStart, periodEnd, messagesSent, dataVolumeMB, Tenant, Device, ConnectivityPlan, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/UsageRecord/update/' + id;
		const obj = {
				      		periodStart: periodStart,
      		periodEnd: periodEnd,
      		messagesSent: messagesSent,
      		dataVolumeMB: dataVolumeMB,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
      		Device: Device != null && Device.length > 0 ? Device : null,
			ConnectivityPlan: ConnectivityPlan != null && ConnectivityPlan.length > 0 ? ConnectivityPlan : null
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a UsageRecord
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteUsageRecord(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/UsageRecord/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a UsageRecord
	// returns the results untouched as an Observable UsageRecord
	// UsageRecord model
	// delegates via URI
	//********************************************************************
	getUsageRecord(id) : Observable<UsageRecord> {
		const uri_ = this.apiUrl + '/UsageRecord/load/' + id;

		return this.http.get<UsageRecord>(uri_);
	}
	
	//********************************************************************
	// gets all UsageRecord
	// returns the results untouched as JSON representation of an
	// Observable array of UsageRecord models
	// delegates via URI
	//********************************************************************
	getUsageRecords() : Observable<UsageRecord[]> {
		const uri_ = this.apiUrl + '/UsageRecord/';

		return this
			.http.get<UsageRecord[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Tenant on a UsageRecord
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignTenant( usageRecordId, _tenantId ): Observable<any> {

		// get the UsageRecord from storage
		this.loadHelper( usageRecordId );

	// get the Tenant from storage
	var tmp 	= new TenantService(this.http).getTenant(_tenantId);

	// assign the Tenant
	this.usageRecord.tenant = tmp;

	// save the UsageRecord
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Tenant on a UsageRecord
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignTenant( usageRecordId ): Observable<any> {

		// get the UsageRecord from storage
		this.loadHelper( usageRecordId );

	// assign Tenant to null
	this.usageRecord.tenant = null;

	// save the UsageRecord
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a Device on a UsageRecord
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignDevice( usageRecordId, _deviceId ): Observable<any> {

		// get the UsageRecord from storage
		this.loadHelper( usageRecordId );

	// get the IoTDevice from storage
	var tmp 	= new IoTDeviceService(this.http).getIoTDevice(_deviceId);

	// assign the Device
	this.usageRecord.device = tmp;

	// save the UsageRecord
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Device on a UsageRecord
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignDevice( usageRecordId ): Observable<any> {

		// get the UsageRecord from storage
		this.loadHelper( usageRecordId );

	// assign Device to null
	this.usageRecord.device = null;

	// save the UsageRecord
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a ConnectivityPlan on a UsageRecord
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignConnectivityPlan( usageRecordId, _connectivityPlanId ): Observable<any> {

		// get the UsageRecord from storage
		this.loadHelper( usageRecordId );

	// get the ConnectivityPlan from storage
	var tmp 	= new ConnectivityPlanService(this.http).getConnectivityPlan(_connectivityPlanId);

	// assign the ConnectivityPlan
	this.usageRecord.connectivityPlan = tmp;

	// save the UsageRecord
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a ConnectivityPlan on a UsageRecord
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignConnectivityPlan( usageRecordId ): Observable<any> {

		// get the UsageRecord from storage
		this.loadHelper( usageRecordId );

	// assign ConnectivityPlan to null
	this.usageRecord.connectivityPlan = null;

	// save the UsageRecord
	return this.saveHelper();
}

	
	
	//********************************************************************
	// saveHelper - internal helper to save a UsageRecord
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/UsageRecord/update/' + this.usageRecord;

	return  this.http.post(uri_, this.usageRecord );
}

	//********************************************************************
	// loadHelper - internal helper to load a UsageRecord
	//********************************************************************	
	loadHelper( id ) {
		this.getUsageRecord(id)
			.subscribe((res : UsageRecord) => {
				this.usageRecord = res;
			});
	}
}