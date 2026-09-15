import { HttpClient } from '@angular/common/http';
import { BaseComponent } from '../base.component';

import { Directive } from '@angular/core';

/**
	Base class of all IoTDevice Edit and Create Components.  
 **/
@Directive()
export class SubBaseComponent extends BaseComponent {

  constructor (http: HttpClient) { super(http); }
  
  ngOnInit() {
  	super.ngOnInit();
  	
	this.initDeviceModelList();
	this.initTenantList();
	this.initSiteList();
	this.initRoomList();
	this.initGatewayList();
	this.initSensorInstanceList();
	this.initActuatorInstanceList();
	this.initDeviceCertificateList();
	this.initDigitalTwinList();
	this.initTelemetryStreamList();
	this.initCommandInvocationList();
	this.initAlertList();
	this.initProvisioningRecordList();
	this.initDeviceGroupList();
	this.initNetworkProfileList();
  }
}
