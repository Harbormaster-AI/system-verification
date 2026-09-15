
import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {MaintenanceTicket} from '../models/MaintenanceTicket';
import {IoTDeviceService} from '../services/IoTDevice.service';
import {TenantService} from '../services/Tenant.service';
import { HelperBaseService } from './helperbase.service';

@Injectable({
	providedIn: 'root'
})

export class MaintenanceTicketService extends HelperBaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	maintenanceTicket : MaintenanceTicket;

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
	// add a MaintenanceTicket
	// returns the results untouched as a JSON representation
	// delegates via URI
	//********************************************************************
	addMaintenanceTicket(ticketNumber, openedAt, closedAt, Device, Tenant, Priority, Status) : Observable<any> {
		const uri_ = this.apiUrl + '/MaintenanceTicket/create';
		const obj = {
			      		ticketNumber: ticketNumber,
      		openedAt: openedAt,
      		closedAt: closedAt,
      		Device: Device != null && Device.length > 0 ? Device : null,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
      		Priority: Priority,
			Status: Status
		};

		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// update a MaintenanceTicket
	// returns an Observable
	// delegates via URI
	//********************************************************************
		updateMaintenanceTicket(ticketNumber, openedAt, closedAt, Device, Tenant, Priority, Status, id)  :  Observable<any>  {
			const uri_ = this.apiUrl + '/MaintenanceTicket/update/' + id;
		const obj = {
				      		ticketNumber: ticketNumber,
      		openedAt: openedAt,
      		closedAt: closedAt,
      		Device: Device != null && Device.length > 0 ? Device : null,
      		Tenant: Tenant != null && Tenant.length > 0 ? Tenant : null,
      		Priority: Priority,
			Status: Status
		};
		return this.http.post(uri_, obj);
	}

	//********************************************************************
	// delete a MaintenanceTicket
	// returns an Observable
	// delegates via URI
	//********************************************************************
	deleteMaintenanceTicket(id)  : Observable<any> {
		const uri_ = this.apiUrl + '/MaintenanceTicket/delete/' + id;

		return this.http.get(uri_);
	}
	
	//********************************************************************
	// loads a MaintenanceTicket
	// returns the results untouched as an Observable MaintenanceTicket
	// MaintenanceTicket model
	// delegates via URI
	//********************************************************************
	getMaintenanceTicket(id) : Observable<MaintenanceTicket> {
		const uri_ = this.apiUrl + '/MaintenanceTicket/load/' + id;

		return this.http.get<MaintenanceTicket>(uri_);
	}
	
	//********************************************************************
	// gets all MaintenanceTicket
	// returns the results untouched as JSON representation of an
	// Observable array of MaintenanceTicket models
	// delegates via URI
	//********************************************************************
	getMaintenanceTickets() : Observable<MaintenanceTicket[]> {
		const uri_ = this.apiUrl + '/MaintenanceTicket/';

		return this
			.http.get<MaintenanceTicket[]>(uri_);
	}
	
		
	//********************************************************************
	// assigns a Device on a MaintenanceTicket
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignDevice( maintenanceTicketId, _deviceId ): Observable<any> {

		// get the MaintenanceTicket from storage
		this.loadHelper( maintenanceTicketId );

	// get the IoTDevice from storage
	var tmp 	= new IoTDeviceService(this.http).getIoTDevice(_deviceId);

	// assign the Device
	this.maintenanceTicket.device = tmp;

	// save the MaintenanceTicket
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Device on a MaintenanceTicket
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignDevice( maintenanceTicketId ): Observable<any> {

		// get the MaintenanceTicket from storage
		this.loadHelper( maintenanceTicketId );

	// assign Device to null
	this.maintenanceTicket.device = null;

	// save the MaintenanceTicket
	return this.saveHelper();
}

	
	//********************************************************************
	// assigns a Tenant on a MaintenanceTicket
	// returns an Observable
	// delegates via URI
	//********************************************************************
	assignTenant( maintenanceTicketId, _tenantId ): Observable<any> {

		// get the MaintenanceTicket from storage
		this.loadHelper( maintenanceTicketId );

	// get the Tenant from storage
	var tmp 	= new TenantService(this.http).getTenant(_tenantId);

	// assign the Tenant
	this.maintenanceTicket.tenant = tmp;

	// save the MaintenanceTicket
	return this.saveHelper();
}

	//********************************************************************
	// unassigns a Tenant on a MaintenanceTicket
	// returns an Observable
	// delegates via URI
	//********************************************************************
	unassignTenant( maintenanceTicketId ): Observable<any> {

		// get the MaintenanceTicket from storage
		this.loadHelper( maintenanceTicketId );

	// assign Tenant to null
	this.maintenanceTicket.tenant = null;

	// save the MaintenanceTicket
	return this.saveHelper();
}

	
	
	//********************************************************************
	// saveHelper - internal helper to save a MaintenanceTicket
	//********************************************************************
	saveHelper() : Observable<any> {

		const uri_ = this.apiUrl + '/MaintenanceTicket/update/' + this.maintenanceTicket;

	return  this.http.post(uri_, this.maintenanceTicket );
}

	//********************************************************************
	// loadHelper - internal helper to load a MaintenanceTicket
	//********************************************************************	
	loadHelper( id ) {
		this.getMaintenanceTicket(id)
			.subscribe((res : MaintenanceTicket) => {
				this.maintenanceTicket = res;
			});
	}
}