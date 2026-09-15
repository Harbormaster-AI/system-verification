
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {DeviceCertificate} from '../models/DeviceCertificate';
import {IoTDeviceService} from '../services/IoTDevice.service';
import {GatewayService} from '../services/Gateway.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class DeviceCertificateService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	deviceCertificate : DeviceCertificate;

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
	// add a DeviceCertificate
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addDeviceCertificate(serialNumber, notBefore, notAfter, fingerprint, Device, Gateway, CertificateType) : Observable<any> {
		const uri_ = this.apiUrl + '/DeviceCertificate/create';
		const obj = {
			      		serialNumber: serialNumber,
      		notBefore: notBefore,
      		notAfter: notAfter,
      		fingerprint: fingerprint,
      		Device: Device != null && Device.length > 0 ? Device : null,
      		Gateway: Gateway != null && Gateway.length > 0 ? Gateway : null,
			CertificateType: CertificateType
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a DeviceCertificate
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateDeviceCertificate(serialNumber, notBefore, notAfter, fingerprint, Device, Gateway, CertificateType, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/DeviceCertificate/update/' + id;
		const obj = {
				      		serialNumber: serialNumber,
      		notBefore: notBefore,
      		notAfter: notAfter,
      		fingerprint: fingerprint,
      		Device: Device != null && Device.length > 0 ? Device : null,
      		Gateway: Gateway != null && Gateway.length > 0 ? Gateway : null,
			CertificateType: CertificateType
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a DeviceCertificate
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteDeviceCertificate(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/DeviceCertificate/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a DeviceCertificate
	// returns the results untouched as an Observable DeviceCertificate
	// DeviceCertificate model
	// delegates via URI
	//********************************************************************
	getDeviceCertificate(id) : Observable<DeviceCertificate> {
		const uri_ = this.apiUrl + '/DeviceCertificate/load/' + id;

		return this.http.get<DeviceCertificate>(uri_);
	}
	
	//********************************************************************
	// gets all DeviceCertificate
	// returns the results untouched as JSON representation of an
	// Observable array of DeviceCertificate models
	// delegates via URI
	//********************************************************************
	getDeviceCertificates() : Observable<DeviceCertificate[]> {
		const uri_ = this.apiUrl + '/DeviceCertificate/';

		return this
			.http.get<DeviceCertificate[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Device on a DeviceCertificate
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignDevice( deviceCertificateId, _deviceId ): Observable<any> {

		// get the DeviceCertificate from storage
		this.loadHelper( deviceCertificateId );

	// get the IoTDevice from storage
	var tmp 	= new IoTDeviceService(this.http).getIoTDevice(_deviceId);

	// assign the Device
	this.deviceCertificate.device = tmp;

	// save the DeviceCertificate
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Device on a DeviceCertificate
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignDevice( deviceCertificateId ): Observable<any> {

		// get the DeviceCertificate from storage
		this.loadHelper( deviceCertificateId );

	// assign Device to null
	this.deviceCertificate.device = null;

	// save the DeviceCertificate
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a Gateway on a DeviceCertificate
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignGateway( deviceCertificateId, _gatewayId ): Observable<any> {

		// get the DeviceCertificate from storage
		this.loadHelper( deviceCertificateId );

	// get the Gateway from storage
	var tmp 	= new GatewayService(this.http).getGateway(_gatewayId);

	// assign the Gateway
	this.deviceCertificate.gateway = tmp;

	// save the DeviceCertificate
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Gateway on a DeviceCertificate
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignGateway( deviceCertificateId ): Observable<any> {

		// get the DeviceCertificate from storage
		this.loadHelper( deviceCertificateId );

	// assign Gateway to null
	this.deviceCertificate.gateway = null;

	// save the DeviceCertificate
	return this.saveHelper();
}

	
	
	//********************************************************************
	// saveHelper - internal helper to save a DeviceCertificate
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/DeviceCertificate/update/' + this.deviceCertificate;

	return  this.http.post(uri_, this.deviceCertificate );
}

	//********************************************************************
	// loadHelper - internal helper to load a DeviceCertificate
	//********************************************************************	
	loadHelper( id ) {
		this.getDeviceCertificate(id)
			.subscribe((res : DeviceCertificate) => {
				this.deviceCertificate = res;
			});
	}
}