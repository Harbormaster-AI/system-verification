
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {ProvisioningRecord} from '../models/ProvisioningRecord';
import {IoTDeviceService} from '../services/IoTDevice.service';
import {DeviceCertificateService} from '../services/DeviceCertificate.service';
import {TenantService} from '../services/Tenant.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class ProvisioningRecordService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	provisioningRecord : ProvisioningRecord;

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
	// add a ProvisioningRecord
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addProvisioningRecord(enrolledAt, provisioningService, Device, Certificate, Tenant, Method, Status) : Observable<any> {
		const uri_ = this.apiUrl + '/ProvisioningRecord/create';
		const obj = {
			      		enrolledAt: enrolledAt,
      		provisioningService: provisioningService,
      		Device: Device != null && Device.length > 0 ? Device : null,
      		Certificate: Certificate != null && Certificate.length > 0 ? Certificate : null,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
      		Method: Method,
			Status: Status
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a ProvisioningRecord
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateProvisioningRecord(enrolledAt, provisioningService, Device, Certificate, Tenant, Method, Status, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/ProvisioningRecord/update/' + id;
		const obj = {
				      		enrolledAt: enrolledAt,
      		provisioningService: provisioningService,
      		Device: Device != null && Device.length > 0 ? Device : null,
      		Certificate: Certificate != null && Certificate.length > 0 ? Certificate : null,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
      		Method: Method,
			Status: Status
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a ProvisioningRecord
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteProvisioningRecord(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/ProvisioningRecord/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a ProvisioningRecord
	// returns the results untouched as an Observable ProvisioningRecord
	// ProvisioningRecord model
	// delegates via URI
	//********************************************************************
	getProvisioningRecord(id) : Observable<ProvisioningRecord> {
		const uri_ = this.apiUrl + '/ProvisioningRecord/load/' + id;

		return this.http.get<ProvisioningRecord>(uri_);
	}
	
	//********************************************************************
	// gets all ProvisioningRecord
	// returns the results untouched as JSON representation of an
	// Observable array of ProvisioningRecord models
	// delegates via URI
	//********************************************************************
	getProvisioningRecords() : Observable<ProvisioningRecord[]> {
		const uri_ = this.apiUrl + '/ProvisioningRecord/';

		return this
			.http.get<ProvisioningRecord[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Device on a ProvisioningRecord
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignDevice( provisioningRecordId, _deviceId ): Observable<any> {

		// get the ProvisioningRecord from storage
		this.loadHelper( provisioningRecordId );

	// get the IoTDevice from storage
	var tmp 	= new IoTDeviceService(this.http).getIoTDevice(_deviceId);

	// assign the Device
	this.provisioningRecord.device = tmp;

	// save the ProvisioningRecord
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Device on a ProvisioningRecord
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignDevice( provisioningRecordId ): Observable<any> {

		// get the ProvisioningRecord from storage
		this.loadHelper( provisioningRecordId );

	// assign Device to null
	this.provisioningRecord.device = null;

	// save the ProvisioningRecord
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a Certificate on a ProvisioningRecord
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignCertificate( provisioningRecordId, _certificateId ): Observable<any> {

		// get the ProvisioningRecord from storage
		this.loadHelper( provisioningRecordId );

	// get the DeviceCertificate from storage
	var tmp 	= new DeviceCertificateService(this.http).getDeviceCertificate(_certificateId);

	// assign the Certificate
	this.provisioningRecord.certificate = tmp;

	// save the ProvisioningRecord
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Certificate on a ProvisioningRecord
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignCertificate( provisioningRecordId ): Observable<any> {

		// get the ProvisioningRecord from storage
		this.loadHelper( provisioningRecordId );

	// assign Certificate to null
	this.provisioningRecord.certificate = null;

	// save the ProvisioningRecord
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a Tenant on a ProvisioningRecord
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignTenant( provisioningRecordId, _tenantId ): Observable<any> {

		// get the ProvisioningRecord from storage
		this.loadHelper( provisioningRecordId );

	// get the Tenant from storage
	var tmp 	= new TenantService(this.http).getTenant(_tenantId);

	// assign the Tenant
	this.provisioningRecord.tenant = tmp;

	// save the ProvisioningRecord
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Tenant on a ProvisioningRecord
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignTenant( provisioningRecordId ): Observable<any> {

		// get the ProvisioningRecord from storage
		this.loadHelper( provisioningRecordId );

	// assign Tenant to null
	this.provisioningRecord.tenant = null;

	// save the ProvisioningRecord
	return this.saveHelper();
}

	
	
	//********************************************************************
	// saveHelper - internal helper to save a ProvisioningRecord
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/ProvisioningRecord/update/' + this.provisioningRecord;

	return  this.http.post(uri_, this.provisioningRecord );
}

	//********************************************************************
	// loadHelper - internal helper to load a ProvisioningRecord
	//********************************************************************	
	loadHelper( id ) {
		this.getProvisioningRecord(id)
			.subscribe((res : ProvisioningRecord) => {
				this.provisioningRecord = res;
			});
	}
}